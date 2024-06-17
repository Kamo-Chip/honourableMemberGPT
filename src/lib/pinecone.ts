import {
  Document,
  RecursiveCharacterTextSplitter,
} from "@pinecone-database/doc-splitter";
import { Pinecone, PineconeRecord } from "@pinecone-database/pinecone";
import { PDFLoader } from "langchain/document_loaders/fs/pdf";
import { getEmbeddings } from "./embeddings";
import md5 from "md5";
import { convertToAscii } from "./utils";

export const getPineconeClient = () => {
  return new Pinecone({ apiKey: process.env.PINECONE_API_KEY as string });
};

async function embedDocument(doc: Document, politicalParty: string) {
  try {
    const embeddings = await getEmbeddings(doc.pageContent);
    const hash = md5(doc.pageContent);

    return {
      id: hash,
      values: embeddings,
      metadata: {
        text: doc.metadata.text,
        pageNumber: doc.metadata.pageNumber,
        politicalParty: politicalParty,
      },
    } as PineconeRecord;
  } catch (error) {
    console.log("error embedding document", error);
    throw error;
  }
}

export const truncateStringByBytes = (str: string, bytes: number) => {
  const enc = new TextEncoder();
  return new TextDecoder("utf-8").decode(enc.encode(str).slice(0, bytes));
};

const prepareDocument = async (page: any) => {
  let { pageContent, metadata } = page;
  pageContent = pageContent.replace(/\n/g, "");

  const splitter = new RecursiveCharacterTextSplitter();
  const docs = await splitter.splitDocuments([
    new Document({
      pageContent,
      metadata: {
        pageNumber: metadata.loc.pageNumber,
        text: truncateStringByBytes(pageContent, 36000),
      },
    }),
  ]);
  return docs;
};

// A helper function that breaks an array into chunks of size batchSize
const chunks = (array: any[], batchSize = 100) => {
  const chunks = [];

  for (let i = 0; i < array.length; i += batchSize) {
    chunks.push(array.slice(i, i + batchSize));
  }

  return chunks;
};

export const loadDocumentIntoPinecone = async (
  fileName: string,
  politicalParty: string
) => {
  try {
    console.log("Loading file into pinecone");
    if (!fileName || !politicalParty) {
      throw new Error(
        "Could not load file: [File name and/or political party was not provided]"
      );
    }
    // Obtain the pdf
    const loader = new PDFLoader(`./documents/${fileName}.pdf`);
    const pages = await loader.load();

    // Split and segment the pdf
    const documents = await Promise.all(pages.map(prepareDocument));

    // Vectorise and embed individual documents
    const vectors = await Promise.all(
      documents.flat().map((doc) => embedDocument(doc, politicalParty))
    );

    // Upload to pinecone
    const client = getPineconeClient();
    const pineconeIndex = client.index("manifesto-testing");
    const namespace = pineconeIndex.namespace(convertToAscii("manifestos"));

    console.log("Inserting vectors into pinecone");

    const chunkedVectors = chunks(vectors);
    try {
      // Upsert data with 100 records per upsert request
      for (const chunk of chunkedVectors) {
        await namespace.upsert(chunk);
      }
    } catch (error: any) {
      console.log(error.message);
    }
    console.log("Finished loading into pinecone");
    return documents[0];
  } catch (error: any) {
    console.log("Could not load file into pinecone: ", error.message);
  }
};

import { Pinecone, RecordValues } from "@pinecone-database/pinecone";
import { getPineconeClient } from "./pinecone";
import { convertToAscii } from "./utils";
import { getEmbeddings } from "./embeddings";

export const getMatchesFromEmbeddings = async (
  embeddings: RecordValues,
  namespaceToAccess: string,
  topK: number,
  politicalParty: string
) => {
  try {
    const pinecone = getPineconeClient();

    const index = pinecone.index("manifesto-testing");
    const namespace = index.namespace(convertToAscii(namespaceToAccess));

    const queryResult = await namespace.query({
      topK: topK,
      vector: embeddings,
      includeMetadata: true,
      filter: { politicalParty: { $eq: politicalParty } },
    });

    return queryResult.matches || [];
  } catch (e: any) {
    console.log("Error querying embeddings: ", e.message);
    throw e;
  }
};

export const getContext = async (
  query: string,
  namespaceToAccess: string,
  politicalParty: string
) => {
  try {
    const queryEmbeddings = await getEmbeddings(query);
    const matches = await getMatchesFromEmbeddings(
      queryEmbeddings,
      namespaceToAccess,
      3,
      politicalParty
    );

    console.log(matches);

    const qualifyingDocs = matches.filter(
      (match) => match.score && match.score > 0.7
    );

    let docs = qualifyingDocs.map((match) => match?.metadata?.text);
    return docs.join("\n").substring(0, 3000);
  } catch (e: any) {
    console.log("Error getting context: ", e.message);
    return [];
  }
};

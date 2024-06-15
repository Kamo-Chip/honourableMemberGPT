import { loadDocumentIntoPinecone } from "@/lib/pinecone";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const {
    fileName,
    politicalParty,
  }: { fileName: string; politicalParty: string } = await req.json();
  try {
    await loadDocumentIntoPinecone(fileName, politicalParty);
    return NextResponse.json(
      { message: "Successfully loaded document" },
      { status: 200 }
    );
  } catch (error: any) {
    console.log(error.message);
    return NextResponse.json(
      { message: "Could not load document into pinecone" },
      { status: 500 }
    );
  }
}

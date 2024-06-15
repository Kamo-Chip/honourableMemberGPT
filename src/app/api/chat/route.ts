import { getContext } from "@/lib/context";
import { openai } from "@ai-sdk/openai";
import { CoreMessage, streamText } from "ai";

export async function POST(req: Request) {
  const {
    messages,
    politicalParty,
  }: { messages: CoreMessage[]; politicalParty: string } = await req.json();

  console.log(politicalParty);
  const lastMessage = messages[messages.length - 1];

  const context = await getContext(
    lastMessage.content.toString(),
    "manifestos",
    politicalParty
  );

  const prompt: CoreMessage = {
    role: "system",
    content: `You are a helpful assistant. Your task is to answer a question regarding a given document. The first step is to extract information relevant to the question from the document. The document is delimited by "####". Include the page number closest to the section where you extract your answer from. Include the page number in the format '(From Page number)' at the end of your message. Page numbers are delimited by $$$$$. Respond with "No relevant information found. Try rephrasing question" if no relevant information was found. Focus on answering the most recent question.
    ####
    ${context}
    ####`,
  };

  const result = await streamText({
    model: openai("gpt-3.5-turbo"),
    system: "You are a helpful ai assistant",
    messages: [
      prompt,
      ...messages.filter((message) => message.role === "user"),
    ],
  });

  return result.toAIStreamResponse();
}

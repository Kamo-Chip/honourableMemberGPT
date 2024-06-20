import { getContext } from "@/lib/context";
import { openai } from "@ai-sdk/openai";
import { CoreMessage, streamText } from "ai";

export async function POST(req: Request) {
  const {
    messages,
    politicalParty,
  }: { messages: CoreMessage[]; politicalParty: string } = await req.json();

  const lastMessage = messages[messages.length - 1];

  const context = await getContext(
    lastMessage.content.toString(),
    "manifestos",
    politicalParty
  );

  const prompt: CoreMessage = {
    role: "system",
    content: `INSTRUCTIONS: You are a helpful assistant. Your task is to answer questions based on the given document. The document is provided between "####". Only answer the most recent question. If no relevant information is found, respond with "These oaks don't have the answer to your question bru 🚶‍♂️"
    ####
    ${context}
    ####`,
  };

  const result = await streamText({
    model: openai("gpt-4o"),
    messages: [
      prompt,
      ...messages.filter((message) => message.role === "user"),
    ],
  });

  return result.toAIStreamResponse();
}

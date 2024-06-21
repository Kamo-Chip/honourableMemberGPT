import { getContext } from "@/lib/context";
import { openai } from "@ai-sdk/openai";
import { CoreMessage, streamText } from "ai";

export async function POST(req: Request) {
  const {
    messages,
    politicalParty,
  }: { messages: CoreMessage[]; politicalParty: string } = await req.json();

  const lastMessage = messages[messages.length - 1];
  const prevMessage = messages[messages.length - 3]; // User's previous message
  const prevResponse = messages[messages.length - 2]; // Bot's previous response

  let messageContext = `--THE USER'S CURRENT MESSAGE: ${lastMessage.content.toString()}`;
  if (prevMessage && prevResponse) {
    messageContext += `--YOUR PREVIOUS RESPONSE: ${prevResponse.content.toString()}`;
    messageContext += `--THE USER'S PREVIOUS MESSAGE: ${prevMessage.content.toString()}--`;
  }

  console.log("Message Context: ", messageContext);
  const context = await getContext(
    lastMessage.content.toString(),
    "manifestos",
    politicalParty
  );

  const prompt: CoreMessage = {
    role: "system",
    content: `INSTRUCTIONS: You are a helpful assistant. Your task is to answer questions based on the provided document. The document content is enclosed between "####". Use the recent message history below to assist in answering follow-up questions. Be concise. If the document does not contain relevant information, respond with "These oaks don't have the answer to your question bru 🚶‍♂️".

    #### 
    DOCUMENT CONTENT: ${context}
    ####
    RECENT MESSAGE HISTORY: ${messageContext}`,
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

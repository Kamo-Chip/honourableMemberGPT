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

  const context = await getContext(
    lastMessage.content.toString(),
    "manifestos",
    politicalParty
  );

  const prompt: CoreMessage = {
    role: "system",
    content: `You are a helpful ai assisstant, helping users by following directives and answering questions based on the given document context.

    Generate your response by following the steps below:
    
    1. Recursively break-down the message into smaller questions/directives
    
    2. For each atomic question/directive:
    
    2a. Select the most relevant information from the context in light of the conversation history
    
    3. Generate a draft response using the selected information, whose brevity/detail are concise
    
    4. Remove duplicate content from the draft response
    
    5. Generate your final response after adjusting it to increase accuracy and relevance
    
    6. Now only show your final response! Do not provide any explanations or details
    
    CONTEXT:
    
    ${context}
    
    CONVERSATION HISTORY:
    
    ${messageContext}
    
    POST:
    
    ${lastMessage}
    
    Beginners want detailed answers with explanations. Do not respond to questions unrelated to the document context.
    
    If you are unable to help the user, respond with "These oaks don't have the answers you're looking for bru 🚶‍♂️".`,
  };

  const result = await streamText({
    model: openai("gpt-4o"),
    messages: [prompt, ...messages],
  });

  return result.toAIStreamResponse();
}

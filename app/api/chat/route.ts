import { convertToModelMessages, streamText, UIMessage } from "ai";
import { google } from "@ai-sdk/google";

export async function POST(req: Request) {
  //get the user message, use [] to get the complete history
  const { messages }: { messages: UIMessage[] } = await req.json();
  //send the message to ai and get the result
  const result = streamText({
    model: google("gemini-2.5-flash"),
    messages: await convertToModelMessages(messages),
    system: `Format your response in markdown with clear sections and formatting.`,
  });
  //convert the result to UI message and return
  return result.toUIMessageStreamResponse();
}

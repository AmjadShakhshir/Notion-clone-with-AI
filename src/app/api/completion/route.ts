import { OpenAIApi, Configuration } from "openai-edge";
import { OpenAIStream, StreamingTextResponse } from "ai";
import { handleAsyncErrors } from "@/helper/catchErrorHandler";

// POST /api/completion
const config = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(config);

export const POST = handleAsyncErrors(async (req: Request) => {
  // extract the prompt from the request body
  const { prompt } = await req.json();

  if (!prompt || typeof prompt !== "string") {
    console.error("Invalid prompt provided.");
    return new Response("Invalid prompt. Please provide a valid input.", { status: 400 });
  }

  const response = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: "system",
        content: `You are a helpful AI embedded in a notion text editor app that is used to autocomplete sentences
            The traits of AI include expert knowledge, helpfulness, cleverness, and articulateness.
        AI is a well-behaved and well-mannered individual.
        AI is always friendly, kind, and inspiring, and he is eager to provide vivid and thoughtful responses to the user.`,
      },
      {
        role: "user",
        content: `I am drafting some text in a Notion-like text editor.
                    Please help me complete the following thought: "${prompt}"
                    Ensure the tone and style remain consistent with the existing text.
                    Provide a concise and clear completion.`,
      },
    ],
    stream: true,
  });
  const stream = OpenAIStream(response);
  return new StreamingTextResponse(stream);
});


import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { RunnableSequence } from "@langchain/core/runnables";
import { InMemoryChatMessageHistory } from "@langchain/core/chat_history";
import { HumanMessage, AIMessage } from "@langchain/core/messages";
import { NextRequest, NextResponse } from "next/server";

const model = new ChatGoogleGenerativeAI({
  model: process.env.GEMINI_MODEL || "gemini-2.0-flash",
  apiKey: process.env.GEMINI_API_KEY!,
  temperature: 0.7,
});

export async function POST(req: NextRequest) {
  try {
    const { history, userMessage, context } = await req.json();

    const memory = new InMemoryChatMessageHistory();
    for (const msg of history) {
      if (msg.role === "user") {
        await memory.addMessage(new HumanMessage(msg.text));
      } else if (msg.role === "model") {
        await memory.addMessage(new AIMessage(msg.text));
      }
    }

    const pastMessages = await memory.getMessages();
    console.log("Past messages:", pastMessages);

    const prompt = ChatPromptTemplate.fromMessages([
      ["system", "You are an insurance assistant. Use the following policy document text as context:{context}"],
      ...pastMessages.map((msg) => {
        const role = msg._getType() === "human" ? "human" : "ai";
        const text = typeof msg.content === "string" ? msg.content : String(msg.content);
        return [role, text] as [string, string];
      }),
      ["human", "{input}"],
    ]);

    const chain = RunnableSequence.from([prompt, model]);

    const result = await chain.invoke({
      context,
      input: userMessage,
    });
    console.log("Chain result:", result);

    return NextResponse.json({ reply: result.content });
  } catch (err) {
    console.error("LangChain error:", err);
    return NextResponse.json({ reply: "Sorry, something went wrong." }, { status: 500 });
  }
}

// app/api/claim/questions/route.ts
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { NextResponse } from "next/server";

const model = new ChatGoogleGenerativeAI({
  model: process.env.GEMINI_MODEL || "gemini-2.0-flash",
  apiKey: process.env.GEMINI_API_KEY!,
});

export async function GET() {
  const prompt = `You are an insurance claim assistant. Generate a list of 5 essential questions needed to estimate whether a user is eligible to make a successful claim. Return just the questions as a plain text list.`;

  const result = await model.invoke(prompt);
  const rawContent = String(result.content);

  const questions = rawContent
    .split("\n")
    .map(q => q.replace(/^\d+\.\s*/, '').trim())
    .filter(Boolean);

  return NextResponse.json({ questions });
}

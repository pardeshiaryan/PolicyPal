import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { RunnableSequence } from "@langchain/core/runnables";
import { NextRequest, NextResponse } from "next/server";
import type { MessageContent } from "@langchain/core/messages";

const model = new ChatGoogleGenerativeAI({
  model: process.env.GEMINI_MODEL || "gemini-1.5-flash",
  apiKey: process.env.GEMINI_API_KEY!,
});

/** Helper to extract plain text from LLM response content */
function extractText(content: MessageContent): string {
  if (typeof content === "string") return content;

  if (Array.isArray(content)) {
    return content
      .filter((part): part is { type: "text"; text: string } => part.type === "text" && "text" in part)
      .map(part => part.text)
      .join(" ");
  }

  return "";
}

/** Strip code fences like ```json and ``` */
function stripFences(text: string): string {
  return text.replace(/```[a-zA-Z]*\n?/g, "").replace(/```/g, "");
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const answers = body.answers;

    if (!Array.isArray(answers)) {
      return NextResponse.json({ error: "Invalid answers format" }, { status: 400 });
    }

    const formattedAnswers = answers.map((a: string, i: number) => `Q${i + 1}: ${a}`).join("\n");

    const prompt = ChatPromptTemplate.fromMessages([
      ["system", `
You are an insurance claim eligibility estimator. Your job is to analyze the user's answers and return ONLY a structured JSON result with the following keys:

- claimScore: number (0-100, likelihood of successful claim)
- eligibility: string (e.g., 'High', 'Medium', 'Low', 'Unknown')
- reasons: string[] (List of factors contributing to the decision)
- nextSteps: string[] (What user should do to improve eligibility or proceed)

NEVER give disclaimers or say "I can't tell." If information is missing, say so in the 'reasons' and reflect uncertainty in score.
`],
      ["human", "{answers}"]
    ]);

    const chain = RunnableSequence.from([prompt, model]);
    const result = await chain.invoke({ answers: formattedAnswers });

    let text = extractText(result.content);
    text = stripFences(text).trim();

    const parsed = JSON.parse(text);
    return NextResponse.json(parsed);
  } catch (err) {
    console.error("Failed to parse LLM response:", err);
    return NextResponse.json({ error: "Failed to parse claim eligibility." }, { status: 500 });
  }
}

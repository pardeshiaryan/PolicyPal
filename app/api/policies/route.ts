import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { RunnableSequence } from "@langchain/core/runnables";
import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const model = new ChatGoogleGenerativeAI({
  model: process.env.GEMINI_MODEL || "gemini-2.0-flash",
  apiKey: process.env.GEMINI_API_KEY!,
  temperature: 0.7,
});

export async function POST(req: NextRequest) {
  const { currentPolicyText, problem } = await req.json();

  // Step 1: Load all 6 policy documents
  const policyDir = path.resolve(process.cwd(), "data/policies");
  const files = fs.readdirSync(policyDir);
  const allPolicies = files.map((file) => {
    const type = file.replace(".txt", "");
    const content = fs.readFileSync(path.join(policyDir, file), "utf-8");
    return { type, content };
  });

  // Step 2: Merge as a context block
  const context = allPolicies
    .map(p => `---\n[${p.type.toUpperCase()} POLICY]\n${p.content}`)
    .join("\n\n");

  // Step 3: Build LangChain prompt including user concerns
  const prompt = ChatPromptTemplate.fromMessages([
    ["system", `
You are an insurance advisor AI. Based on a user's current policy description and their stated concerns, suggest the most suitable insurance policy from the list provided.

Context policies:
{context}

User's current policy:
{policyText}

User's specific concerns or requests:
{userConcerns}

Your task:
- Identify the key problems or gaps in their policy
- Recommend the best matching policy from the context list
- Explain briefly why it is better suited
- Provide 3-4 bullet points highlighting benefits of the recommended policy

Be concise and clear.`],
    ["human", "Please recommend a better insurance plan."]
  ]);

  // Step 4: Run LangChain with both policy text and user concerns
  const chain = RunnableSequence.from([prompt, model]);
  const result = await chain.invoke({
    context,
    policyText: currentPolicyText,
    userConcerns: problem || "No specific concerns provided"
  });

  return NextResponse.json({ recommendation: result.content });
}

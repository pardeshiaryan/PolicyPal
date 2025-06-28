import { GoogleGenerativeAI } from '@google/generative-ai';
import { NextRequest, NextResponse } from 'next/server';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
const model = genAI.getGenerativeModel({ model: process.env.GEMINI_MODEL || 'gemini-2.0-flash' });

export async function POST(req: NextRequest) {
  try {
    const { history, userMessage, context } = await req.json();

    // Create a chat session with history
  const chat = model.startChat({
  history: history.map((msg: any) => ({
    role: msg.role,
    parts: [{ text: msg.text }],
  })),
  generationConfig: {
    temperature: 0.7,
  },
});

const prompt = `You are an insurance assistant chatbot. Use the following context:\n\n${context}\n\nUser: ${userMessage}`;

const result = await chat.sendMessage(prompt); // 👈 THIS LINE IS NOW FIXED ✅
const reply = result.response.text();


    return NextResponse.json({ reply });
  } catch (err) {
    console.error('Gemini error:', err);
    return NextResponse.json({ reply: 'Sorry, something went wrong.' }, { status: 500 });
  }
}

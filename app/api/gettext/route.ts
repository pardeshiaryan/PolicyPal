import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY as string);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

export async function POST(req: NextRequest) {
  try {
    console.log("Received request to /api/gettext");
    const formData = await req.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json({ error: "No file uploaded." }, { status: 400 });
    }

    const supportedTypes = ["application/pdf", "image/png", "image/jpeg", "image/webp"];
    if (!supportedTypes.includes(file.type)) {
      return NextResponse.json({ error: "Unsupported file type. Upload PDF or image." }, { status: 400 });
    }

    const arrayBuffer = await file.arrayBuffer();
    const base64File = Buffer.from(arrayBuffer).toString("base64");

    const prompt = "Extract all the text from this insurance document and return it as plain text.";

    const result = await model.generateContent({
      contents: [
        {
          role: "user",
          parts: [
            { text: prompt },
            {
              inlineData: {
                mimeType: file.type, // 👈 dynamic type: PDF or image
                data: base64File,
              },
            },
          ],
        },
      ],
    });

    const response = await result.response;
    const message = response.text();
    console.log("Gemini API response:", message);

    return NextResponse.json({ message }, { status: 200 });

  } catch (error) {
    console.error("Gemini API error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

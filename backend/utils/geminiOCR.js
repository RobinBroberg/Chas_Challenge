import fs from "fs/promises";
import { GoogleGenAI } from "@google/genai";

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const ai = new GoogleGenAI({ apiKey: GEMINI_API_KEY });

export async function extractReceiptData(filePath) {
  const imageBuffer = await fs.readFile(filePath);
  const base64 = imageBuffer.toString("base64");

  const response = await ai.models.generateContent({
    model: "gemini-2.0-flash-001",
    contents: [
      {
        role: "user",
        parts: [
          {
            inlineData: {
              mimeType: "image/jpeg",
              data: base64,
            },
          },
          {
            text: `Extract the total amount, vendor name, and purchase date from this receipt. 
            Respond only with a JSON object. 
            :
            {
            "amount": 389,
            "vendor": "SATS",
            "purchase_date": "2024-05-10"
          }`,
          },
        ],
      },
    ],
  });

  let text = response.candidates?.[0]?.content?.parts?.[0]?.text || "";

  text = text.replace(/```json|```/g, "").trim();

  try {
    return JSON.parse(text);
  } catch (err) {
    console.error("Failed to parse OCR JSON:", text);
    throw new Error("Gemini response was not valid JSON.");
  }
}

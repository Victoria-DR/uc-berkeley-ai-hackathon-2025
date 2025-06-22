import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.NEXT_PUBLIC_GOOGLE_API_KEY });

export async function analyzeAudio(base64AudioFile) {
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: [
      {
        text: "Evaluate this recording of me playing piano and give me feedback on how to improve my playing.",
      },
      {
        inlineData: {
          mimeType: "audio/wav",
          data: base64AudioFile,
        },
      },
    ],
  });
  console.log(response.text);
}


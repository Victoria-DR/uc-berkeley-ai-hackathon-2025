import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.NEXT_PUBLIC_GOOGLE_API_KEY });

export async function analyzeAudio(instrument, songTitle, base64AudioFile) {
  const result = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: [
      {
        text: `Evaluate this recording of me playing ${songTitle} on ${instrument} and give me feedback on how to improve my playing.`,
      },
      {
        inlineData: {
          mimeType: "audio/wav",
          data: base64AudioFile,
        },
      },
    ],
  });

  return result.candidates[0].content.parts[0].text ?? "Sorry, I couldn't analyze the audio file. Please try again later.";
}


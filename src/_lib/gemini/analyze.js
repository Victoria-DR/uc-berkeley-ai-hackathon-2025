import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.NEXT_PUBLIC_GOOGLE_API_KEY });

export async function analyzeAudio(instrument, songTitle, base64AudioFile) {
  const config = {
    thinkingConfig: {
      thinkingBudget: -1,
    },
    responseMimeType: "text/plain",
    systemInstruction: [
      {
        text: `You are an expert music teacher. Use Markdown format in your response.`,
      },
    ],
  };

  const result = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: [
      {
        text: `Analyze this recording of me playing ${songTitle} on the ${instrument} and provide 3 brief strengths and areas for improvement in bullet point form. Note my tempo, dynamics, phrasing, and articulation. Offer resources that illustrate what an ideal performance should sound like. Make reference to specific timestamps or sections of the piece.`,
      },
      {
        inlineData: {
          mimeType: "audio/wav",
          data: base64AudioFile,
        },
      },
    ],
  });

  return (
    result.candidates[0].content.parts[0].text ??
    "Sorry, I couldn't analyze the audio file. Please try again later."
  );
}


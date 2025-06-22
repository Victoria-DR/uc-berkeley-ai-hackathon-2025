import "dotenv/config";
import {
  GoogleGenAI,
  // createUserContent,
  // createPartFromUri,
} from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GOOGLE_API_KEY });

export async function analyzeAudio(base64AudioFile) {
  // const myfile = await ai.files.upload({
  //   file: path,
  //   config: { mimeType: "audio/wav" },
  // });

  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: [
      { text: "Evaluate this recording of me playing piano and give me feedback on how to improve my playing. The name of the piece is Etude op. 25 no. 1 by Chopin." },
      {
        inlineData: {
          mimeType: "audio/wav",
          data: base64AudioFile,
        }
      }
    ]
  });
  console.log(response.text);
}

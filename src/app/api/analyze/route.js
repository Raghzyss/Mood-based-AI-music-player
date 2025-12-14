import { NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

export async function POST(req) {
  let text = "";

  try {
    const body = await req.json();
    text = body.text || "";

    if (!text.trim()) {
      return NextResponse.json(
        { error: "Empty input" },
        { status: 400 }
      );
    }

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: [
        {
          role: "user",
          parts: [
            {
              text: `Classify the user's mood into EXACTLY one word from this list:
happy, sad, energetic, chill.

User text: "${text}"

Return ONLY the word.`,
            },
          ],
        },
      ],
    });

    const rawMood = response.text?.toLowerCase().trim() || "";

    let mood = "chill";

    if (rawMood.includes("sad") || rawMood.includes("cry")) {
      mood = "sad";
    } else if (rawMood.includes("happy") || rawMood.includes("joy")) {
      mood = "happy";
    } else if (
      rawMood.includes("energetic") ||
      rawMood.includes("energy") ||
      rawMood.includes("gym")
    ) {
      mood = "energetic";
    }

    return NextResponse.json({
      mood,
      source: "gemini",
    });

  } catch (err) {
    console.error("Gemini error, using fallback");

    const fallbackText = text.toLowerCase();
    let mood = "chill";

    if (fallbackText.includes("sad") || fallbackText.includes("cry")) {
      mood = "sad";
    } else if (
      fallbackText.includes("happy") ||
      fallbackText.includes("excited") ||
      fallbackText.includes("love")
    ) {
      mood = "happy";
    } else if (
      fallbackText.includes("gym") ||
      fallbackText.includes("energy") ||
      fallbackText.includes("workout")
    ) {
      mood = "energetic";
    }

    // 🔒 ALWAYS return JSON
    return NextResponse.json({
      mood,
      source: "fallback",
    });
  }
}

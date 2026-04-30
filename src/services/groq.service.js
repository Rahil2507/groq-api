import Groq from "groq-sdk";
import { GROQ_API_KEY } from "../config/env.js";

const groq = new Groq({ apiKey: GROQ_API_KEY });

export const streamGroq = async (messages) => {
  const stream = await groq.chat.completions.create({
    model: "llama-3.1-8b-instant",
    messages,
    stream: true
  });

  return stream;
};
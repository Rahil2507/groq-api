import { buildPrompt } from "../utils/prompt.js";
import { streamGroq } from "../services/groq.service.js";

export const chatController = async (req, res) => {
  const { message } = req.body;

  if (!message || typeof message !== "string") {
    return res.status(400).json({ error: "Invalid input" });
  }

  try {
    req.setTimeout(0);

    const messages = buildPrompt(message);
    const stream = await streamGroq(messages);

    res.setHeader("Content-Type", "text/plain; charset=utf-8");
    res.setHeader("Transfer-Encoding", "chunked");
    res.setHeader("Cache-Control", "no-cache, no-transform");
    res.setHeader("Connection", "keep-alive");

    res.flushHeaders?.();

    const heartbeat = setInterval(() => {
      res.write(" ");
    }, 15000);

    for await (const chunk of stream) {
      const content = chunk.choices?.[0]?.delta?.content;
      if (content) res.write(content);
    }

    clearInterval(heartbeat);
    res.end();
  } catch (err) {
    console.error(err);
    if (!res.headersSent) {
      res.status(500).json({ error: "LLM error" });
    } else {
      res.end("\n[Error]");
    }
  }
};
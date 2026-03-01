import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: 'Chat service not configured' });
  }

  const { messages, userMessage } = req.body ?? {};

  if (!userMessage || typeof userMessage !== 'string') {
    return res.status(400).json({ error: 'userMessage is required' });
  }

  try {
    const { GoogleGenAI } = await import('@google/genai');
    const ai = new GoogleGenAI({ apiKey });

    const history = Array.isArray(messages)
      ? messages.map((m: { role: string; text: string }) => ({
          role: m.role,
          parts: [{ text: m.text }],
        }))
      : [];

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: [
        ...history,
        { role: 'user', parts: [{ text: userMessage }] },
      ],
      config: {
        systemInstruction:
          "You are an AI assistant for Kurt Wuckert Jr.'s portfolio. Kurt is the Chief Bitcoin Historian. You answer questions about Bitcoin history, blockchain strategy, and cybersecurity using Kurt's philosophical lens (Satoshi's original vision, scaling on-chain, and technical deconstruction). Be professional, insightful, and slightly provocative regarding mainstream crypto narratives. Keep answers concise.",
      },
    });

    const text = response.text || "I'm having trouble right now.";
    return res.status(200).json({ text });
  } catch (err) {
    console.error('Chat error:', err);
    return res.status(500).json({ error: 'Failed to generate response' });
  }
}

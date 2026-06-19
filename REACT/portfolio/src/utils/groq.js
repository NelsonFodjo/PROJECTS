/* Groq chat completion call, configured via the VITE_GROQ_API_KEY env var.
   This is baked into the JS bundle at build time, so it's only appropriate
   for local/personal use — anyone with devtools on a deployed build could
   extract it. See .env.example. */

const MODEL = "llama-3.3-70b-versatile";

export async function groqComplete(messages, { temperature = 0.4, maxTokens = 400 } = {}) {
  const key = import.meta.env.VITE_GROQ_API_KEY;
  if (!key) return null;

  const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${key}`,
    },
    body: JSON.stringify({
      model: MODEL,
      messages,
      temperature,
      max_tokens: maxTokens,
    }),
  });

  if (!res.ok) {
    const body = await res.text().catch(() => "");
    throw new Error(`Groq API error ${res.status}: ${body.slice(0, 200)}`);
  }

  const data = await res.json();
  return data?.choices?.[0]?.message?.content?.trim() || null;
}

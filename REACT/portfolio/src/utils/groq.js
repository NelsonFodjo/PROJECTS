/* Local-only Groq API key storage + chat completion call.
   The key lives in this browser's localStorage and is never sent anywhere
   except directly from this browser to Groq's API. There is no backend —
   anyone with devtools access to this browser could read it, so only use
   a key you're comfortable having scoped to personal/demo use. */

const KEY_STORE = "nf_groq_key";
const MODEL_STORE = "nf_groq_model";

export const DEFAULT_MODEL = "llama-3.3-70b-versatile";

export const GROQ_MODELS = [
  { id: "llama-3.3-70b-versatile", label: "Llama 3.3 70B — best quality" },
  { id: "llama-3.1-8b-instant", label: "Llama 3.1 8B — fastest" },
  { id: "gemma2-9b-it", label: "Gemma 2 9B" },
];

export function getGroqKey() {
  try {
    const stored = localStorage.getItem(KEY_STORE);
    if (stored) return stored;
  } catch { /* ignored */ }
  // Dev-only fallback baked in at build time from .env — never relied on in production.
  return import.meta.env.VITE_GROQ_API_KEY || "";
}

export function setGroqKey(key) {
  try {
    if (key) localStorage.setItem(KEY_STORE, key);
    else localStorage.removeItem(KEY_STORE);
  } catch { /* ignored */ }
}

export function getGroqModel() {
  try { return localStorage.getItem(MODEL_STORE) || DEFAULT_MODEL; } catch { return DEFAULT_MODEL; }
}

export function setGroqModel(model) {
  try { localStorage.setItem(MODEL_STORE, model); } catch { /* ignored */ }
}

export async function groqComplete(messages, { temperature = 0.4, maxTokens = 400 } = {}) {
  const key = getGroqKey();
  if (!key) return null;

  const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${key}`,
    },
    body: JSON.stringify({
      model: getGroqModel(),
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

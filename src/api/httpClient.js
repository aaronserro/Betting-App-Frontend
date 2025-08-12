const BASE = import.meta.env.VITE_API_BASE ?? "http://localhost:8080";
let AUTH_TOKEN = null;
export function setAuthToken(token) {
  AUTH_TOKEN = token;
  if (token) localStorage.setItem("token", token);
  else localStorage.removeItem("token");
}

const saved = localStorage.getItem("token");
if (saved) AUTH_TOKEN = saved;

async function handle(res) {
  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(text || `HTTP ${res.status}`);
  }
  // Allow boolean/plain JSON
  const text = await res.text();
  try { return JSON.parse(text); } catch { return text; }
}

export function get(path) {

  return fetch(`${BASE}${path}`, {
    credentials: "include",
    headers: AUTH_TOKEN ? { Authorization: `Bearer ${AUTH_TOKEN}` } : undefined,   // <-- CHANGED
  }).then(handle);

}

export function post(path, body) {
  return fetch(`${BASE}${path}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(AUTH_TOKEN ? { Authorization: `Bearer ${AUTH_TOKEN}` } : {}),            // <-- CHANGED
    },
    credentials: "include",
    body: JSON.stringify(body),
  }).then(handle);
}

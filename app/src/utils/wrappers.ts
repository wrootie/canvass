// Wrapper for fetch calls to the API server.
// /api is an alias defined in vite.config.ts.
export const api = async (path: string, options?: RequestInit) => {
  console.log('[api] Fetching', path);
  const res = await window.fetch(`/api${path}`, options);
  if (!res.ok) throw new Error(await res.text());
  return res.json();
};
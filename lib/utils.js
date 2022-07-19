export function jsonResponse(status, data, init) {
  return new Response(JSON.stringify(data), {
    status,
    ...init,
    headers: {
      "Content-Type": "application/json",
      ...init?.headers,
    },
  });
}
export const server = "https://nextjs-social-mediaaa.vercel.app";
// http://localhost:3000";
// export const fetcher = (...args) => fetch(...args).then((res) => res.json());
export const fetcher = (url) => axios.get(url, {}).then((res) => res.data);

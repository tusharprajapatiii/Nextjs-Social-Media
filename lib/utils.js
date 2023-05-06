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
// export const server = "http://localhost:3001";
export const server = process.env.DOMAIN;
// export const fetcher = (...args) => fetch(...args).then((res) => res.json());
export const fetcher = (url) => axios.get(url, {}).then((res) => res.data);

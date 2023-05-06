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
export const fetcher = (url) => axios.get(url, {}).then((res) => res.data);

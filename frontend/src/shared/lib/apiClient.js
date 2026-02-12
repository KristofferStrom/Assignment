const BASE_URL = (
  import.meta.env.VITE_API_BASE_URL ?? "http://localhost:3000"
).replace(/\/$/, "");

export class ApiError extends Error {
  constructor(message, { status, code, data } = {}) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.code = code;
    this.data = data;
  }
}

async function parseJson(res) {
  if (res.status === 204) return null;

  const contentType = res.headers.get("content-type") ?? "";
  if (!contentType.includes("application/json")) return null;

  return res.json();
}

async function request(method, path, body, options = {}) {
  const { signal, headers: extraHeaders } = options;
  const normalizedPath = `/${String(path ?? "").replace(/^\/+/, "")}`;

  const headers = {
    ...(body ? { "Content-Type": "application/json" } : null),
    ...(extraHeaders ?? null),
  };

  const res = await fetch(`${BASE_URL}${normalizedPath}`, {
    method,
    headers: Object.keys(headers).length ? headers : undefined,
    body: body ? JSON.stringify(body) : undefined,
    signal,
  });

  const data = await parseJson(res);

  if (!res.ok) {
    const message =
      (data && (data.message ?? data.Message)) ||
      `Request failed (${res.status})`;
    const code = data && (data.code ?? data.Code);

    throw new ApiError(message, { status: res.status, code, data });
  }

  return data;
}

export const api = {
  get: (path, options) => request("GET", path, undefined, options),
  post: (path, body, options) => request("POST", path, body, options),
  delete: (path, options) => request("DELETE", path, undefined, options),
  put: (path, body, options) => request("PUT", path, body, options),
};

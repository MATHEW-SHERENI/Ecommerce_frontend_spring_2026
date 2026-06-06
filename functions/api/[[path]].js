export async function onRequest(context) {
  const { request, params, env } = context;
  const backendOrigin = env.BACKEND_API_ORIGIN || "https://api.smartcart.munashemudabura.com";

  const url = new URL(request.url);
  const path = Array.isArray(params.path) ? params.path.join("/") : (params.path || "");
  const targetUrl = `${backendOrigin}/api/${path}${url.search}`;

  const headers = new Headers(request.headers);
  headers.set("host", new URL(backendOrigin).host);

  const body = ["GET", "HEAD"].includes(request.method) ? undefined : await request.arrayBuffer();

  const proxyReq = new Request(targetUrl, {
    method: request.method,
    headers,
    body,
    redirect: "follow",
  });

  return fetch(proxyReq);
}

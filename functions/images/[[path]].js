export async function onRequest(context) {
  const { request, params, env } = context;
  const backendOrigin = env.BACKEND_API_ORIGIN || "https://api.smartcart.munashemudabura.com";

  const url = new URL(request.url);
  const path = Array.isArray(params.path) ? params.path.join("/") : (params.path || "");
  const targetUrl = `${backendOrigin}/images/${path}${url.search}`;

  const proxyReq = new Request(targetUrl, {
    method: request.method,
    headers: request.headers,
    redirect: "follow",
  });

  return fetch(proxyReq);
}

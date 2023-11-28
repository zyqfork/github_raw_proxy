import { serve } from "https://deno.land/std/http/server.ts";

async function handleRequest(request: Request) {
  const { hostname, pathname, searchParams } = new URL(request.url);
  // 去掉第一个字符
  const modifiedHostname = hostname.slice(1);
  const url = new URL(pathname, modifiedHostname);

  const token = searchParams.get("token");
  if (token) {
    url.searchParams.delete("token");
    const headers = {
      Authorization: `token ${token}`,
    };
    return fetch(url, { headers });
  } else {
    return fetch(url);
  }
}

serve(handleRequest);

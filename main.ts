import { serve } from "https://deno.land/std@0.148.0/http/server.ts";

async function handleRequest(request: Request) {
  console.log(request);

  const { pathname } = new URL(request.url);

  if (pathname === "/") {
    const usage = await Deno.readFile("README.md");
    return new Response(usage, {
      headers: {
        "content-type": "text/plain",
      },
    });
  }

  const url = new URL(pathname, "https://raw.githubusercontent.com");
  return fetch(url);
}

serve(handleRequest);

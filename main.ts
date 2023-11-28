import { serve } from "https://deno.land/std@0.150.0/http/server.ts";
import { CSS, render } from "https://deno.land/x/gfm@0.1.22/mod.ts";

async function handleRequest(request: Request) {
  const { pathname, searchParams } = new URL(request.url);

  if (pathname === "/") {
    const readme = await Deno.readTextFile("./README.md");
    const body = render(readme);
    const html = `<!DOCTYPE html>
      <html lang="en">
        <body">
        test
        </body>
      </html>`;
    return new Response(html, {
      headers: {
        "content-type": "text/html;charset=utf-8",
      },
    });
  }

  if (pathname === "/favicon.ico") {
    return new Response(await Deno.readFile("favicon.ico"), {
      headers: {
        "content-type": "image/x-icon",
      },
    });
  }


  const url = new URL(pathname, "https://github.com");
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

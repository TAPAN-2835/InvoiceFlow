import { createServer } from "http";
import { pathToFileURL } from "url";
import { resolve } from "path";
import http from "http";

const dir = resolve(".vercel/output/functions/__server.func");
const handlerMod = await import(pathToFileURL(dir + "/node-handler.mjs").href);
const handler = handlerMod.default;

const server = createServer((req, res) => handler(req, res));
server.listen(3999, async () => {
  console.log("Test server started on 3999");
  await new Promise((ok) => setTimeout(ok, 500));
  const req = http.get("http://localhost:3999/", (r) => {
    let body = "";
    r.on("data", (c) => (body += c));
    r.on("end", () => {
      console.log("STATUS:", r.statusCode);
      console.log("BODY (first 800):", body.substring(0, 800));
      server.close();
    });
  });
  req.on("error", (e) => {
    console.error("Request error:", e);
    server.close();
  });
});

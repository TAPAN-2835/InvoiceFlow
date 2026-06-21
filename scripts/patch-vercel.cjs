// scripts/patch-vercel.cjs
// Post-build patch: writes a Node.js-compatible bridge handler and updates .vc-config.json
const fs = require("fs");
const path = require("path");

const dir = path.resolve(__dirname, "../.vercel/output/functions/__server.func");

// 1. Write .vc-config.json pointing to the bridge
const vcConfig = {
  handler: "node-handler.mjs",
  launcherType: "Nodejs",
  shouldAddHelpers: false,
  runtime: "nodejs20.x",
};
fs.writeFileSync(path.join(dir, ".vc-config.json"), JSON.stringify(vcConfig, null, 2));
console.log("✓ Patched .vc-config.json → nodejs20.x, handler: node-handler.mjs");

// 2. Write the bridge file
const bridge = `// Node.js bridge: converts Node IncomingMessage/ServerResponse to Web Request/Response
import fetchHandler from "./index.mjs";

export default async function handler(req, res) {
  try {
    const proto = req.headers["x-forwarded-proto"] || "https";
    const host = req.headers["x-forwarded-host"] || req.headers.host || "localhost";
    const url = proto + "://" + host + req.url;

    const headers = new Headers();
    for (const [k, v] of Object.entries(req.headers)) {
      if (v != null) headers.set(k, Array.isArray(v) ? v.join(", ") : String(v));
    }

    const hasBody = req.method !== "GET" && req.method !== "HEAD";
    let body = undefined;
    if (hasBody) {
      const chunks = [];
      for await (const chunk of req) chunks.push(chunk);
      body = Buffer.concat(chunks);
    }

    const webReq = new Request(url, {
      method: req.method,
      headers,
      body: hasBody && body && body.length ? body : undefined,
      duplex: "half",
    });

    const webRes = await fetchHandler.fetch(webReq, {});

    res.statusCode = webRes.status;
    webRes.headers.forEach((v, k) => res.setHeader(k, v));

    const buf = Buffer.from(await webRes.arrayBuffer());
    res.end(buf);
  } catch (err) {
    console.error("[vercel-bridge]", err);
    res.statusCode = 500;
    res.end("Internal Server Error: " + (err && err.message));
  }
}
`;

fs.writeFileSync(path.join(dir, "node-handler.mjs"), bridge);
console.log("✓ Wrote node-handler.mjs bridge");

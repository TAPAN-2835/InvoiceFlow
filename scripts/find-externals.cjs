const fs = require("fs");
const path = require("path");
const libsDir = ".vercel/output/functions/__server.func/_libs";
const libs = fs.readdirSync(libsDir);
const externals = new Set();
libs.forEach((f) => {
  const fullPath = path.join(libsDir, f);
  if (!fs.statSync(fullPath).isFile()) return;
  const code = fs.readFileSync(fullPath, "utf8");
  const re = /from\s+["']([^./][^"']+)["']/g;
  let m;
  while ((m = re.exec(code)) !== null) {
    const spec = m[1];
    const pkg = spec.startsWith("@") ? spec.split("/").slice(0, 2).join("/") : spec.split("/")[0];
    externals.add(pkg);
  }
});
console.log([...externals].sort().join("\n"));

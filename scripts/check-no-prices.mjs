// Fails the build if any dollar amount ($ followed by a digit) remains in source or built HTML/RSC.
// Usage: node scripts/check-no-prices.mjs src   |   node scripts/check-no-prices.mjs .next
import { readdirSync, readFileSync, statSync } from "node:fs";
import { join, extname } from "node:path";

const root = process.argv[2] ?? "src";
const RE = /\$\s?\d/g;
const exts = root === "src" ? [".ts", ".tsx", ".js", ".mjs", ".json", ".md", ".css"] : [".html", ".rsc", ".json", ".xml", ".txt"];
const skipDirs = new Set(["node_modules", "cache", "static"]);
let files = 0;
const hits = [];
function walk(d) {
  for (const n of readdirSync(d)) {
    const p = join(d, n);
    const st = statSync(p);
    if (st.isDirectory()) { if (!skipDirs.has(n)) walk(p); continue; }
    if (!exts.includes(extname(n))) continue;
    files++;
    const raw = readFileSync(p, "utf8");
    // Built output: React Flight refs ("$1", "$L2", "$0:f:…") always follow a quote, so ignore
    // matches right after a quote in raw payloads; visible HTML text + JSON-LD are checked strictly.
    let text = raw;
    if (root !== "src") {
      const ld = [...raw.matchAll(/<script type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)].map((m) => m[1]).join(" ");
      const visible = raw.replace(/<script[\s\S]*?<\/script>/g, " ").replace(/<style[\s\S]*?<\/style>/g, " ").replace(/<[^>]+>/g, " ").replace(/&#x24;|&#36;|&dollar;/g, "$");
      const payload = raw.replace(/(["\\])\$/g, "$1§");
      text = (extname(n) === ".html" ? visible + "\n" + ld + "\n" : "") + payload;
    }
    for (const m of text.matchAll(RE)) {
      hits.push(`${p}: …${text.slice(Math.max(0, m.index - 40), m.index + 20).replace(/\s+/g, " ")}…`);
    }
  }
}
walk(root);
if (hits.length) {
  console.error(`check-no-prices: ${hits.length} dollar amount(s) in ${root}:\n` + hits.slice(0, 50).join("\n"));
  process.exit(1);
}
console.log(`check-no-prices: OK — 0 dollar amounts in ${files} files under ${root}`);

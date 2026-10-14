// Revamp content gate (run in `npm run build`). Ported from brew/pet, plus car safety-claim hedging.
import { products } from "../src/data/products";
import { categories } from "../src/data/categories";
import { guides } from "../src/data/guides";
import { TOP10, PICKS, getTopPicks, TOP10_SHORT, TOP10_MIN } from "../src/data/top10";
import * as fs from "fs";
import * as path from "path";

const errors: string[] = [];
const warnings: string[] = [];
const TIERS = new Set(["$", "$$", "$$$"]);
const R: Record<string, number> = { $: 1, $$: 2, $$$: 3 };
const CAT = new Set(categories.map((c) => c.slug));
/** Categories allowed to omit Premium (spec exception). None on car. */
const OPTIONAL_PREMIUM = new Set<string>(["cabin", "cleaning"]); // Maya: no clear cabin upgrade; cleaning Premium dropped
/** Categories whose rating claims (amps, PSI, mAh, Wh, engine litres, lumens) must be hedged. */
const SAFETY_CATS = new Set(["roadside", "safety"]);
const RATING = /\b\d[\d,.]*\s?(A|amps?|PSI|mAh|Wh|L|lumens|gauge)\b/i;
const HEDGE = /per the listing|\blisted\b|\blisting\b|\brated\b/i;
const STANDARD = /\b(ANSI|ECE|FMVSS|SAE|UL|ETL|CSA|FCC|ISO|IP6\d)\b/;

function voice(owner: string, t: string) {
  if (/not tested hands-on|we have not tested it hands-on/i.test(t)) errors.push(`${owner}: testing boilerplate: ${t.slice(0, 60)}`);
  if (/^Shoppers comparing/i.test(t)) errors.push(`${owner}: generic who-it's-for line`);
  if (/per the amazon listing/i.test(t)) errors.push(`${owner}: "Per the Amazon listing": ${t.slice(0, 60)}`);
  if (/(^|[.;]\s+)[A-Z0-9][A-Z0-9 &'\-\/]{3,}\s*[:：]/.test(t)) errors.push(`${owner}: ALL-CAPS label bullet: ${t.slice(0, 60)}`);
  const sv = t.replace(/\bour\b[^.;]{0,40}\bpicks?\b/gi, "");
  const m = sv.match(/\b(our|ours|you'll love|effortlessly|say goodbye|experience (smooth|the)|maximize)\b/i);
  if (m) errors.push(`${owner}: seller voice "${m[0]}": ${t.slice(0, 70)}`);
  if (/[✔✅【】♛➤]/.test(t)) errors.push(`${owner}: listing emoji/bracket marker: ${t.slice(0, 60)}`);
  if (/crash[- ]?tested|\bcertified\b/i.test(t) && !STANDARD.test(t)) errors.push(`${owner}: certification/crash-test claim without a named standard: ${t.slice(0, 70)}`);
  if (/\b(safest|guaranteed?|will save your life|never fails?)\b/i.test(t)) errors.push(`${owner}: absolute safety claim: ${t.slice(0, 70)}`);
}
function hedge(owner: string, t: string) {
  if (RATING.test(t) && !HEDGE.test(t)) errors.push(`${owner}: unhedged rating (add "per the listing"): ${t.slice(0, 70)}`);
}

// Products
const asins = new Map<string, string>();
for (const p of products) {
  if (!CAT.has(p.category)) errors.push(`${p.slug}: unknown category ${p.category}`);
  if (!TIERS.has(p.tier)) errors.push(`${p.slug}: missing/invalid tier`);
  if (p.pros.length < 2 || p.pros.length > 4) errors.push(`${p.slug}: ${p.pros.length} pros (need 2-4)`);
  if (p.cons.length < 1 || p.cons.length > 3) errors.push(`${p.slug}: ${p.cons.length} cons (need 1-3)`);
  if (!/^[A-Z0-9]{10}$/.test(p.amazonAsin)) errors.push(`${p.slug}: invalid ASIN`);
  const dup = asins.get(p.amazonAsin);
  if (dup) errors.push(`duplicate ASIN ${p.amazonAsin}: ${dup} and ${p.slug}`);
  asins.set(p.amazonAsin, p.slug);
  for (const k of ["price", "priceBand", "priceMin", "priceMax", "budget", "verdict"]) if (k in p) errors.push(`${p.slug}: leftover ${k} field`);
  const texts = [p.summary, p.tagline, p.whoItsFor, ...p.pros, ...p.cons];
  for (const t of texts) voice(p.slug, t);
  if (SAFETY_CATS.has(p.category)) for (const t of [p.summary, p.tagline, ...p.pros]) hedge(p.slug, t);
}
// Guides: same voice + hedge rules on roadside/safety guides; every pick must exist.
const slugs = new Set(products.map((p) => p.slug));
for (const g of guides) {
  for (const pk of g.picks) {
    if (!slugs.has(pk.slug)) errors.push(`guide ${g.slug}: pick ${pk.slug} not found`);
    for (const t of [pk.quickNote, pk.verdict, ...pk.pros, ...pk.cons, pk.bestFor]) {
      voice(`guide ${g.slug}/${pk.slug}`, t);
      if (SAFETY_CATS.has(g.category)) hedge(`guide ${g.slug}/${pk.slug}`, t);
    }
  }
}
const GIFT_REQUIRED: [RegExp, RegExp][] = [
  [/dash-cam|garmin|viofo|rove|70mai|redtiger/i, /windshield-mounting rules/i],
  [/^(noco|gooloo|oxilam|s-zevzo)\b/i, /extreme heat/i],
];
// Gift-guide gate: 6-10 distinct picks covering $, $$ and $$$, first award "Best overall gift", hedging checked
// against each pick's own category, no price phrasing, and site-specific required safety/privacy lines.
for (const g of guides) {
  if (!g.slug.startsWith("gifts-")) continue;
  if (g.picks.length < 6 || g.picks.length > 10) errors.push(`guide ${g.slug}: ${g.picks.length} picks (need 6-10)`);
  if (g.picks[0]?.award !== "Best overall gift") errors.push(`guide ${g.slug}: first pick must be "Best overall gift"`);
  const tiers = new Set<string>();
  const seen = new Set<string>();
  for (const pk of g.picks) {
    const p = products.find((x) => x.slug === pk.slug);
    if (!p) continue;
    if (seen.has(p.slug)) errors.push(`guide ${g.slug}: duplicate pick ${p.slug}`);
    seen.add(p.slug); tiers.add(p.tier);
    if (pk.pros.length < 2 || pk.pros.length > 4) errors.push(`guide ${g.slug}: ${p.slug} has ${pk.pros.length} pros`);
    if (pk.cons.length < 1 || pk.cons.length > 3) errors.push(`guide ${g.slug}: ${p.slug} has ${pk.cons.length} cons`);
    for (const t of [pk.quickNote, pk.verdict, ...pk.pros, ...pk.cons, pk.bestFor]) hedge(`guide ${g.slug}/${p.slug}`, t);
    const txt = [pk.verdict, ...pk.cons].join(" ");
    for (const [re, line] of GIFT_REQUIRED) if (re.test(p.slug + " " + p.brand) && !line.test(txt)) errors.push(`guide ${g.slug}: ${p.slug} is missing a required line (${line})`);
  }
  for (const t of ["$", "$$", "$$$"]) if (!tiers.has(t)) errors.push(`guide ${g.slug}: no ${t} pick`);
  const texts = [g.title, g.description, ...g.sections.map((x) => x.body), ...g.criteria.map((x) => x.body), ...g.faqs.map((f) => f.answer), ...g.picks.flatMap((x) => [x.quickNote, x.verdict, x.bestFor, ...x.pros, ...x.cons])];
  for (const t of texts) {
    voice(`guide ${g.slug}`, t);
    if (/under\s*\$|\$\s*\d/i.test(t)) errors.push(`guide ${g.slug}: price phrasing: ${t.slice(0, 60)}`);
    const m = t.match(/\b(must-have|perfect for everyone|the best ever|a safe gift)\b/i);
    if (m) errors.push(`guide ${g.slug}: unhedged "${m[0]}": ${t.slice(0, 60)}`);
  }
}
// Top 10 + picks
for (const c of categories) {
  const list = TOP10[c.slug] ?? [];
  for (const s of list) {
    const p = products.find((x) => x.slug === s);
    if (!p) errors.push(`${c.slug}: Top 10 slug not found: ${s}`);
    else if (p.category !== c.slug) errors.push(`${c.slug}: Top 10 item ${s} belongs to ${p.category}`);
  }
  if (new Set(list).size !== list.length) errors.push(`${c.slug}: duplicate slug in Top 10`);
  const n = getTopPicks(c.slug).length;
  if (TOP10_SHORT[c.slug]) {
    const min = TOP10_MIN[c.slug] ?? 7;
    if (n < min || n > 10) errors.push(`${c.slug}: short list has ${n} items (allowed ${min}-10: ${TOP10_SHORT[c.slug]})`);
    else if (n < 10) warnings.push(`${c.slug}: Top list has ${n} items (accepted: ${TOP10_SHORT[c.slug]})`);
  } else if (n !== 10) errors.push(`${c.slug}: Top 10 has ${n} items (need exactly 10)`);
  const pk = PICKS[c.slug];
  if (!pk) { errors.push(`${c.slug}: missing picks`); continue; }
  if (list[0] !== pk.best) errors.push(`${c.slug}: Best Overall ${pk.best} is not #1 in Top 10`);
  if (!pk.premium && !OPTIONAL_PREMIUM.has(c.slug)) errors.push(`${c.slug}: missing Premium pick`);
  for (const [k, s] of Object.entries(pk) as [string, string][]) {
    if (!slugs.has(s)) errors.push(`${c.slug}: ${k} pick not found: ${s}`);
    else if (!list.includes(s)) errors.push(`${c.slug}: ${k} pick ${s} not in Top 10`);
  }
  const by = (x?: string) => (x ? products.find((p) => p.slug === x) : undefined);
  const [b, pr, v] = [by(pk.best), by(pk.premium), by(pk.value)];
  if (b && pr && R[pr.tier] < R[b.tier]) errors.push(`${c.slug}: Premium ${pr.slug} (${pr.tier}) is below Best Overall ${b.slug} (${b.tier})`);
  if (v && getTopPicks(c.slug).some((p) => p.tier === "$") && v.tier !== "$") errors.push(`${c.slug}: Value ${v.slug} is ${v.tier} but the Top 10 has a $ item`);
  const pv = Object.values(pk).filter(Boolean);
  if (new Set(pv).size !== pv.length) errors.push(`${c.slug}: picks are not distinct`);
}
// Tier order vs internal price reference (scripts/tier-prices.json; never imported by src/, never shipped).
{
  const ref = JSON.parse(fs.readFileSync(path.join(process.cwd(), "scripts/tier-prices.json"), "utf8")).prices as Record<string, number>;
  for (const p of products) if (typeof ref[p.slug] !== "number") errors.push(`${p.slug}: no internal price in scripts/tier-prices.json`);
  for (const c of categories) {
    const list = products.filter((p) => p.category === c.slug && typeof ref[p.slug] === "number");
    for (const a of list) for (const b of list) {
      if (ref[a.slug] < ref[b.slug] && R[a.tier] > R[b.tier]) errors.push(`${c.slug}: tier inversion: ${a.slug} (${a.tier}) costs less than ${b.slug} (${b.tier})`);
      if (ref[a.slug] === ref[b.slug] && a.slug < b.slug && a.tier !== b.tier) errors.push(`${c.slug}: tie in different tiers: ${a.slug} vs ${b.slug}`);
    }
  }
}
for (const w of warnings) console.warn(`validate-revamp: WARNING ${w}`);
if (errors.length) { console.error(`validate-revamp: ${errors.length} error(s)\n` + errors.join("\n")); process.exit(1); }
console.log(`validate-revamp: OK — ${products.length} products, ${categories.length} categories, picks + tiers + pros/cons + hedging valid`);

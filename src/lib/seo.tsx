import type { Metadata } from "next";
import { SITE, DOMAIN } from "@/data/site";

const OG_IMAGE = { url: `${DOMAIN}/og-default.png`, width: 1200, height: 630, alt: SITE };

/** Shorten text at a word boundary so titles and descriptions stay within search-result limits. */
export function fit(text: string, max: number): string {
  const t = text.replace(/\s+/g, " ").trim();
  if (t.length <= max) return t;
  const cut = t.slice(0, max - 1);
  const i = cut.lastIndexOf(" ");
  return `${(i > max * 0.6 ? cut.slice(0, i) : cut).replace(/[\s,;:—–\-·|(]+$/, "")}…`;
}

/** Title, description, canonical, Open Graph and Twitter tags for one page. Pass title null to use the site default. */
export function meta({ path, title, description, type = "website" }: { path: string; title: string | null; description: string; type?: "website" | "article" }): Metadata {
  const t = title ? fit(title, 55) : null;
  const d = fit(description, 160);
  const ogTitle = t ? `${t} · ${SITE}` : SITE;
  return {
    ...(t ? { title: t } : {}),
    description: d,
    alternates: { canonical: path },
    openGraph: { type, siteName: SITE, locale: "en_US", url: `${DOMAIN}${path}`, title: ogTitle, description: d, images: [OG_IMAGE] },
    twitter: { card: "summary_large_image", title: ogTitle, description: d, images: [OG_IMAGE.url] },
  };
}

function Ld({ data }: { data: object }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />;
}

/** BreadcrumbList JSON-LD. Home is added first; pass the rest as [name, path]. */
export function BreadcrumbLd({ trail }: { trail: [string, string][] }) {
  const all: [string, string][] = [["Home", "/"], ...trail];
  return <Ld data={{ "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: all.map(([name, path], i) => ({ "@type": "ListItem", position: i + 1, name, item: `${DOMAIN}${path}` })) }} />;
}

/** ItemList JSON-LD (no price, rating, or review fields). */
export function ItemListLd({ name, items }: { name: string; items: { name: string; path: string }[] }) {
  return <Ld data={{ "@context": "https://schema.org", "@type": "ItemList", name, numberOfItems: items.length, itemListElement: items.map((it, i) => ({ "@type": "ListItem", position: i + 1, name: it.name, url: `${DOMAIN}${it.path}` })) }} />;
}

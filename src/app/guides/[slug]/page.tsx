import Link from "next/link";
import { notFound } from "next/navigation";
import { guides } from "@/data/guides";
import { products, categories, url, DOMAIN, SITE } from "@/data/site";

export function generateStaticParams() { return guides.map((g) => ({ slug: g.slug })); }

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const g = guides.find((x) => x.slug === slug);
  if (!g) return {};
  return { title: g.title, description: g.description, alternates: { canonical: `/guides/${g.slug}` } };
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const guide = guides.find((g) => g.slug === slug);
  if (!guide) notFound();
  const picks = guide.picks.flatMap((pick) => {
    const product = products.find((p) => p.slug === pick.slug);
    return product ? [{ pick, product }] : [];
  });
  const cat = categories.find((c) => c.slug === guide.category);
  const others = guides.filter((g) => g.slug !== guide.slug);
  const pageUrl = `${DOMAIN}/guides/${guide.slug}`;
  const ld: object[] = [
    { "@context": "https://schema.org", "@type": "Article", headline: guide.title, description: guide.description, datePublished: guide.publishedAt, url: pageUrl, publisher: { "@type": "Organization", name: SITE } },
    { "@context": "https://schema.org", "@type": "ItemList", name: guide.title, itemListElement: picks.map(({ product }, i) => ({ "@type": "ListItem", position: i + 1, name: product.name })) },
  ];
  if (guide.faqs.length) ld.push({ "@context": "https://schema.org", "@type": "FAQPage", mainEntity: guide.faqs.map((f) => ({ "@type": "Question", name: f.question, acceptedAnswer: { "@type": "Answer", text: f.answer } })) });
  return <article className="guide">
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
    <p className="note small"><Link href="/guides">Guides</Link> · {guide.readingTime} · {guide.publishedAt}</p>
    <h1>{guide.title}</h1>
    <p className="lede">{guide.description}</p>

    <section id="quick-picks" className="panel">
      <h2>Quick picks</h2>
      <ol className="quick">{picks.map(({ pick, product }) => <li key={product.slug}>
        <span className="award">{pick.award}</span>
        <a href={`#pick-${product.slug}`}><strong>{product.name}</strong></a>
        <p className="note">{pick.quickNote}</p>
      </li>)}</ol>
    </section>

    {picks.map(({ pick, product }, i) => <section key={product.slug} id={`pick-${product.slug}`} className="pick">
      <span className="award">{i + 1}. {pick.award}</span>
      <h2>{product.name}</h2>
      {product.image && <a href={url(product)} rel="nofollow sponsored noopener" target="_blank" className="shot"><img src={product.image} alt={product.name} loading={i === 0 ? "eager" : "lazy"}/></a>}
      <p>{pick.verdict}</p>
      <div className="pc">
        <div className="pros"><h3>Pros</h3><ul>{pick.pros.map((x) => <li key={x}>{x}</li>)}</ul></div>
        <div className="cons"><h3>Cons</h3><ul>{pick.cons.map((x) => <li key={x}>{x}</li>)}</ul></div>
      </div>
      <p><strong>Best for:</strong> {pick.bestFor}</p>
      <a className="btn" href={url(product)} rel="nofollow sponsored noopener" target="_blank">Check price on Amazon</a>
    </section>)}

    <section className="panel">
      <h2>How to choose</h2>
      <dl>{guide.criteria.map((c) => <div key={c.heading}><dt>{c.heading}</dt><dd>{c.body}</dd></div>)}</dl>
    </section>

    {guide.sections.map((s) => <section key={s.heading}><h2>{s.heading}</h2><p>{s.body}</p></section>)}

    {guide.faqs.length > 0 && <section id="faq">
      <h2>Frequently asked questions</h2>
      {guide.faqs.map((f) => <div key={f.question} className="faq"><h3>{f.question}</h3><p>{f.answer}</p></div>)}
    </section>}

    <section className="panel">
      <h2>Keep reading</h2>
      <ul className="links">
        {others.map((g) => <li key={g.slug}><Link href={`/guides/${g.slug}`}>{g.title}</Link></li>)}
        {cat && <li><Link href={`/categories/${cat.slug}`}>Top 10: {cat.name}</Link></li>}
      </ul>
    </section>
  </article>;
}

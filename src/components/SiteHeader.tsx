"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const links = [
  { href: "/compare", label: "Compare" },
  { href: "/guides", label: "Guides" },
  { href: "/products", label: "All products" },

];
const HUB = "https://theworthguide.com/";

export function Mark() {
  return (
    <svg aria-hidden viewBox="0 0 24 24" width="22" height="22">
      <circle cx="12" cy="12" r="9" fill="none" stroke="#d4af37" strokeWidth="1.8" />
      <path d="M7.5 12.2 10.6 15.3 16.5 8.8" fill="none" stroke="#d4af37" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function SiteHeader({ mark }: { mark: string }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const active = (h: string) => pathname === h || pathname.startsWith(h + "/");
  return (
    <header>
      <div className="wrap bar">
        <Link href="/" className="mark"><Mark />{mark}<span>Worth</span></Link>
        <button type="button" className="mbtn" aria-label="Menu" aria-controls="site-nav" aria-expanded={open} onClick={() => setOpen(!open)}>
          <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M4 7h16M4 12h16M4 17h16" /></svg>
        </button>
        <nav id="site-nav" className={open ? "open" : undefined} aria-label="Main">
          {links.map((l) => (
            <Link key={l.href} href={l.href} aria-current={active(l.href) ? "page" : undefined} onClick={() => setOpen(false)}>{l.label}</Link>
          ))}
          <a className="hub" href={HUB}>The Worth Guide</a>
        </nav>
      </div>
    </header>
  );
}

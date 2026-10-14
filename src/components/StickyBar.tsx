"use client";

import { useEffect, useRef, useState } from "react";

/** Fixed bottom "Check price on Amazon" bar. Reserves body padding (bar height + safe area), hides while the
 *  footer is on screen, and (with showAfterId) stays hidden until the reader scrolls past that element. */
export function StickyBar({ href, productName, label, showAfterId }: { href: string; productName: string; label?: string; showAfterId?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [past, setPast] = useState(!showAfterId);
  const [foot, setFoot] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const prev = document.body.style.paddingBottom;
    const apply = () => { document.body.style.paddingBottom = `calc(${el.offsetHeight}px + env(safe-area-inset-bottom, 0px))`; };
    apply();
    const ro = typeof ResizeObserver !== "undefined" ? new ResizeObserver(apply) : null;
    ro?.observe(el);
    return () => { ro?.disconnect(); document.body.style.paddingBottom = prev; };
  }, []);
  useEffect(() => {
    const a = showAfterId ? document.getElementById(showAfterId) : null;
    if (showAfterId && !a) setPast(true);
    const on = () => {
      const f = document.querySelector("footer");
      if (a) setPast(a.getBoundingClientRect().bottom < 0);
      setFoot(!!f && f.getBoundingClientRect().top < window.innerHeight);
    };
    on();
    window.addEventListener("scroll", on, { passive: true });
    window.addEventListener("resize", on);
    return () => { window.removeEventListener("scroll", on); window.removeEventListener("resize", on); };
  }, [showAfterId]);
  const visible = past && !foot;
  return <div ref={ref} className={"stickybar" + (visible ? "" : " off")} aria-hidden={!visible} data-sticky-cta>
    <div className="wrap stickybar-in">
      <div className="stickybar-txt">{label && <p className="stickybar-label">{label}</p>}<p className="stickybar-name">{productName}</p></div>
      <a className="btn" href={href} rel="sponsored nofollow noopener" target="_blank" tabIndex={visible ? 0 : -1} aria-label={`Check price on Amazon: ${productName}`}>Check price on Amazon</a>
    </div>
  </div>;
}

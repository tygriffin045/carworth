import { affiliateUrl } from "@/lib/affiliate";
export function AffiliateButton({ asin, name }: { asin: string; name: string }) {
  return (
    <a className="cta" href={affiliateUrl(asin)} rel="sponsored nofollow noopener" target="_blank" aria-label={`Check price on Amazon for ${name}`}>
      Check price on Amazon
    </a>
  );
}

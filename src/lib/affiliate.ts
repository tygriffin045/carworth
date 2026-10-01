export const AMAZON_ASSOCIATE_TAG = "carworth20-20";
export function affiliateUrl(asin: string) {
  return `https://www.amazon.com/dp/${asin}?tag=${AMAZON_ASSOCIATE_TAG}`;
}

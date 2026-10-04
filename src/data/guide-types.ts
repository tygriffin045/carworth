export type GuidePick = {
  slug: string;
  award: string;
  quickNote: string;
  verdict: string;
  pros: string[];
  cons: string[];
  bestFor: string;
};
export type Guide = {
  slug: string;
  title: string;
  description: string;
  readingTime: string;
  publishedAt: string;
  category: string;
  picks: GuidePick[];
  criteria: { heading: string; body: string }[];
  sections: { heading: string; body: string }[];
  faqs: { question: string; answer: string }[];
};

export const site = {
  name: "Sydrek",
  shortName: "Sydrek",
  url: "https://sydrek.com",
  locale: "en_US",
  title: "Sydrek — Software solutions, engineered for what's next",
  description:
    "Sydrek builds websites, landing pages, CRMs, ERPs, advanced dashboards, LMS and CMS platforms, and mobile apps — plus SEO, GEO, and AI automation.",
  keywords: [
    "Sydrek",
    "websites",
    "landing pages",
    "CRM",
    "ERP",
    "dashboards",
    "SEO",
    "GEO",
    "AI automation",
    "LMS",
    "CMS",
    "mobile apps",
  ],
  email: "info@sydrek.com",
  ogImage: "/og.jpg",
  ogWidth: 1200,
  ogHeight: 630,
  ogAlt: "Sydrek logo: a silver S between chevrons, beside the sydrek wordmark on navy",
} as const;

export const absoluteUrl = (path = "/") => new URL(path, site.url).toString();

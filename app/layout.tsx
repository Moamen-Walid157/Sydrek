import type { Metadata, Viewport } from "next";
import { Suspense } from "react";
import { Inter, JetBrains_Mono, Space_Grotesk } from "next/font/google";
import { BootScreen } from "@/components/boot-screen";
import { CustomCursor } from "@/components/cursor";
import { Footer } from "@/components/footer";
import { Loader } from "@/components/loader";
import { Navbar } from "@/components/navbar";
import { Providers } from "@/components/providers";
import { WhatsAppFloat } from "@/components/whatsapp-float";
import { socials } from "@/lib/content";
import { absoluteUrl, site } from "@/lib/site";
import "./globals.css";

const display = Space_Grotesk({
  subsets: ["latin"],
  weight: ["500", "700"],
  variable: "--font-display-family",
});

const sans = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-sans-family",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono-family",
});

const shareImage = {
  url: site.ogImage,
  width: site.ogWidth,
  height: site.ogHeight,
  alt: site.ogAlt,
  type: "image/jpeg",
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#070B1A" },
    { media: "(prefers-color-scheme: light)", color: "#EEF3FF" },
  ],
  colorScheme: "dark light",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: site.title,
    template: "%s · Sydrek",
  },
  description: site.description,
  applicationName: site.name,
  authors: [{ name: site.name, url: site.url }],
  creator: site.name,
  publisher: site.name,
  keywords: [...site.keywords],
  category: "technology",
  referrer: "origin-when-cross-origin",
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
    shortcut: ["/favicon.ico"],
  },
  manifest: "/site.webmanifest",
  openGraph: {
    type: "website",
    locale: site.locale,
    url: site.url,
    siteName: site.name,
    title: site.title,
    description: site.description,
    images: [shareImage],
  },
  twitter: {
    card: "summary_large_image",
    title: site.title,
    description: site.description,
    images: [shareImage],
  },
  appleWebApp: {
    capable: true,
    title: site.name,
    statusBarStyle: "black-translucent",
  },
  formatDetection: {
    telephone: true,
    email: true,
    address: false,
  },
  other: {
    "msapplication-TileColor": "#070B1A",
    "msapplication-TileImage": "/icon-192.png",
  },
};

const themeBoot = `(function(){try{var t=localStorage.getItem("sydrek-theme");var dark=t==="light"?false:true;var root=document.documentElement;root.classList.toggle("dark",dark);root.style.colorScheme=dark?"dark":"light";root.classList.add("is-loading");window.__sydrekBoot=performance.now();setTimeout(function(){root.classList.remove("is-loading");},8000);}catch(e){}})();`;

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: site.name,
  url: site.url,
  logo: absoluteUrl("/icon-512.png"),
  image: absoluteUrl(site.ogImage),
  description: site.description,
  email: site.email,
  telephone: "+201092322282",
  sameAs: [socials.facebook, socials.instagram, socials.whatsapp],
  contactPoint: {
    "@type": "ContactPoint",
    telephone: "+201092322282",
    contactType: "sales",
    availableLanguage: ["en", "ar"],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning className={`${display.variable} ${sans.variable} ${mono.variable} dark h-full`}>
      <body className="min-h-full bg-bg font-sans text-fg antialiased">
        <script dangerouslySetInnerHTML={{ __html: themeBoot }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        <BootScreen />
        <Loader />
        <Providers>
          <div className="nebula" aria-hidden>
            <span className="orb orb-a" />
            <span className="orb orb-b" />
          </div>
          <a href="#content" className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[120] focus:rounded-full focus:bg-white focus:px-4 focus:py-2 focus:text-black">
            Skip to content
          </a>
          <Suspense fallback={null}>
            <Navbar />
          </Suspense>
          <CustomCursor />
          <main id="content">{children}</main>
          <Footer />
          <WhatsAppFloat />
        </Providers>
      </body>
    </html>
  );
}

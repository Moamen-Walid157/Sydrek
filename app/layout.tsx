import type { Metadata } from "next";
import { Suspense } from "react";
import { Inter, JetBrains_Mono, Space_Grotesk } from "next/font/google";
import { CustomCursor } from "@/components/cursor";
import { Footer } from "@/components/footer";
import { Navbar } from "@/components/navbar";
import { Providers } from "@/components/providers";
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

export const metadata: Metadata = {
  title: {
    default: "Sydrek — Software solutions, engineered for what's next",
    template: "%s · Sydrek",
  },
  description:
    "Sydrek builds precision infrastructure: platforms, cloud, security, and data systems, in a Quantum Core glass interface.",
  icons: { icon: "/images/mark.png" },
  openGraph: {
    title: "Sydrek",
    description: "Software solutions, engineered for what's next.",
    images: ["/images/cover.jpg"],
  },
};

const themeBoot = `(function(){try{var t=localStorage.getItem("sydrek-theme");var dark=t==="light"?false:true;var root=document.documentElement;root.classList.toggle("dark",dark);root.style.colorScheme=dark?"dark":"light";}catch(e){}})();`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning className={`${display.variable} ${sans.variable} ${mono.variable} dark h-full`}>
      <body className="min-h-full bg-bg font-sans text-fg antialiased">
        <script dangerouslySetInnerHTML={{ __html: themeBoot }} />
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
        </Providers>
      </body>
    </html>
  );
}

import type { Metadata, Viewport } from "next";

import { Providers } from "@/components/site/providers";
import { SiteHeader } from "@/components/site/site-header";
import { SiteFooter } from "@/components/site/site-footer";
import { cn } from "@/lib/utils";
import { experience, links, profile, site } from "@/data/portfolio";

import { GeistSans, InstrumentSerif, MartianMono } from "./fonts";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: site.title, template: `%s · ${profile.name}` },
  description: site.description,
  applicationName: `${profile.shortName}.`,
  authors: [{ name: profile.name, url: site.url }],
  creator: profile.name,
  keywords: [
    "Enterprise AI Engineer",
    "Agentic AI",
    "LLM observability",
    "MLOps",
    "LLMOps",
    "Databricks",
    profile.name,
  ],
  alternates: { canonical: "/" },
  icons: {
    icon: [{ url: "/favicon.svg", type: "image/svg+xml" }],
    apple: "/apple-touch-icon.png",
  },
  openGraph: {
    type: "website",
    url: "/",
    siteName: profile.name,
    title: site.title,
    description: site.description,
    images: [{ url: "/og.png", width: 1200, height: 630, alt: site.title }],
  },
  twitter: {
    card: "summary_large_image",
    title: site.title,
    description: site.description,
    images: ["/og.png"],
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#0d0f16" },
    { media: "(prefers-color-scheme: light)", color: "#fcfcfe" },
  ],
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: profile.name,
  alternateName: profile.shortName,
  jobTitle: profile.title,
  url: site.url,
  image: `${site.url}${profile.avatarUrl}`,
  sameAs: [links.github, links.linkedin, links.medium],
  knowsAbout: ["Agentic AI", "LLM observability", "LLMOps", "MLOps", "Machine Learning", "Databricks", "Azure"],
  worksFor: { "@type": "Organization", name: experience[0].company },
};

// Links from the old hash-router era (/#/projects) land on real pages.
const legacyRedirect = `(function(l){if(l.hash.indexOf('#/')===0){var p=l.hash.slice(1);l.replace(p.slice(-1)==='/'?p:p+'/')}})(location)`;

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning className={cn(GeistSans.variable, MartianMono.variable, InstrumentSerif.variable)}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: legacyRedirect }} />
      </head>
      <body className="min-h-dvh font-sans">
        <Providers>
          <a
            href="#main"
            className="sr-only z-[70] rounded-full bg-primary px-4 py-2 text-sm font-medium text-primary-foreground focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
          >
            Skip to content
          </a>
          <SiteHeader />
          <main id="main" tabIndex={-1} className="outline-none">
            {children}
          </main>
          <SiteFooter />
        </Providers>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </body>
    </html>
  );
}

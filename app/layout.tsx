import type { Metadata, Viewport } from "next";
import { Space_Grotesk, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import { profile } from "@/lib/data";

const display = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["500", "600", "700"],
  display: "swap",
});

const body = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["400", "500", "600"],
  display: "swap",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  weight: ["400", "500"],
  display: "swap",
});

const siteUrl = "https://nachiketkale.dev";

export const viewport: Viewport = {
  themeColor: "#0A0E14",
  colorScheme: "dark",
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Nachiket Kale — Software Engineer",
    template: "%s — Nachiket Kale",
  },
  description:
    "Software engineer building real-time, fault-tolerant systems — computer vision pipelines, distributed architectures, and risk-detection engines.",
  keywords: [
    "Nachiket Kale",
    "Software Engineer",
    "Computer Vision",
    "Distributed Systems",
    "React Developer",
    "Machine Learning Engineer",
    "SPIT Mumbai",
  ],
  authors: [{ name: "Nachiket Kale", url: siteUrl }],
  creator: "Nachiket Kale",
  openGraph: {
    type: "website",
    url: siteUrl,
    title: "Nachiket Kale — Software Engineer",
    description:
      "Building real-time, fault-tolerant systems — computer vision pipelines, distributed architectures, and risk-detection engines.",
    siteName: "Nachiket Kale",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Nachiket Kale — Software Engineer",
    description:
      "Building real-time, fault-tolerant systems — computer vision pipelines, distributed architectures, and risk-detection engines.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: profile.name,
    jobTitle: profile.role,
    url: siteUrl,
    email: profile.email,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Mumbai",
      addressCountry: "IN",
    },
    sameAs: [profile.github, profile.linkedin],
  };

  return (
    <html lang="en" className={`${display.variable} ${body.variable} ${mono.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="grain">
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}

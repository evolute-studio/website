import type { Metadata, Viewport } from "next";
import { Exo_2 } from "next/font/google";
import GoogleAnalytics from "@/components/GoogleAnalytics";
import "./globals.css";

const exo2 = Exo_2({
  variable: "--font-exo2",
  subsets: ["latin"],
  display: "swap",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.evolute.network";

export const viewport: Viewport = {
  themeColor: "#0a0a0a",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Evolute Studio | Indie Mobile Games Developer - Pixel Art Games",
    template: "%s | Evolute Studio",
  },
  description:
    "Evolute Studio is an indie game studio crafting unique pixel art mobile games. Join our community on Discord and follow our game development journey. Play our decentralized mobile games today!",
  keywords: [
    "indie games",
    "mobile games",
    "pixel art games",
    "indie game studio",
    "game developer",
    "Evolute Studio",
    "Mage Duel",
    "mage duel game",
    "pixel games",
    "card game",
    "strategy game",
    "mobile gaming",
    "indie developer",
    "android games",
    "ios games",
    "free mobile games",
  ],
  authors: [{ name: "Evolute Studio" }],
  creator: "Evolute Studio",
  publisher: "Evolute Studio",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [
      { url: "/favicon/icon-72.png", sizes: "72x72", type: "image/png" },
      { url: "/favicon/icon-128.png", sizes: "128x128", type: "image/png" },
      { url: "/favicon/icon-144.png", sizes: "144x144", type: "image/png" },
      { url: "/favicon/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/favicon/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: "/favicon/icon-192.png",
    shortcut: "/favicon/icon-128.png",
  },
  manifest: "/manifest.json",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: "Evolute Studio",
    title: "Evolute Studio | Indie Mobile Games Developer",
    description:
      "Indie game studio crafting unique pixel art mobile games. Join our community and follow our game development journey!",
    images: [
      {
        url: "/poster.webp",
        width: 1200,
        height: 630,
        alt: "Evolute Studio - Indie Mobile Games",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@evolute_studio",
    creator: "@evolute_studio",
    title: "Evolute Studio | Indie Mobile Games Developer",
    description:
      "Indie game studio crafting unique pixel art mobile games. Join our community!",
    images: ["/poster.webp"],
  },
  alternates: {
    canonical: siteUrl,
  },
  category: "Games",
};

// JSON-LD Structured Data for Organization
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Evolute Studio",
  url: siteUrl,
  logo: `${siteUrl}/favicon/icon-512.png`,
  description:
    "Indie game studio crafting unique pixel art mobile games.",
  sameAs: [
    "https://x.com/evolute_studio",
    "https://discord.gg/s7XXRGRwVw",
  ],
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "customer support",
    url: "https://discord.gg/s7XXRGRwVw",
  },
};

// WebSite schema
const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Evolute Studio",
  url: siteUrl,
  description: "Indie game studio crafting unique pixel art mobile games.",
};

// MobileApplication schema for Mage Duel
const mobileAppJsonLd = {
  "@context": "https://schema.org",
  "@type": "MobileApplication",
  name: "Mage Duel",
  operatingSystem: "ANDROID, IOS",
  applicationCategory: "GameApplication",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
  },
  author: {
    "@type": "Organization",
    name: "Evolute Studio",
    url: siteUrl,
  },
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "5",
    ratingCount: "1",
  },
  downloadUrl: [
    "https://play.google.com/store/apps/details?id=com.evolute.mageduel",
    "https://apps.apple.com/us/app/mage-duel/id6745639584",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* Preconnect to external resources for better performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        
        {/* DNS Prefetch for external domains */}
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
        
        {/* Preload critical assets for LCP */}
        <link rel="preload" href="/poster.webp" as="image" type="image/webp" />
        <link rel="preload" href="/small.svg" as="image" type="image/svg+xml" />
        <link rel="preload" href="/app_icon.png" as="image" />
        
        {/* Social profile verification links */}
        <link rel="me" href="https://x.com/evolute_studio" />
        <link rel="me" href="https://discord.gg/s7XXRGRwVw" />
        
        {/* JSON-LD Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(mobileAppJsonLd) }}
        />
      </head>
      <body className={`${exo2.variable} antialiased`}>
        {/* Google Analytics - Replace with your Measurement ID */}
        <GoogleAnalytics measurementId={process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || ""} />
        {children}
      </body>
    </html>
  );
}

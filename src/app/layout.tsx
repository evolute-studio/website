import type { Metadata } from "next";
import { Exo_2 } from "next/font/google";
import "./globals.css";

const exo2 = Exo_2({
  variable: "--font-exo2",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Evolute - Indie Games Studio",
  description: "Evolute Studio - Indie Game Studio. Pixel, mobile, decentralized",
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
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${exo2.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}

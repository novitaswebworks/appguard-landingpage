import type { Metadata, Viewport } from "next";
import { SITE } from "@/lib/site";
import "./globals.css";

export const viewport: Viewport = {
  themeColor: "#eeeadf",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: `${SITE.name} — ${SITE.tagline}`,
    template: `%s | ${SITE.name}`,
  },
  description: SITE.description,
  applicationName: SITE.name,
  authors: [{ name: SITE.author, url: "https://novitasweb.works" }],
  creator: SITE.author,
  publisher: SITE.author,
  keywords: [
    "AppGuard",
    "cross-platform app locker",
    "Touch ID app lock",
    "Windows Hello app lock",
    "Linux PAM app lock",
    "biometric security macOS Windows Linux",
    "privacy vault desktop",
    "encrypted folder vault",
    "AES-256 vault",
    "local-first privacy software",
    "airgapped security vault",
    "Tauri biometric lock",
  ],
  alternates: {
    canonical: SITE.url,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE.url,
    title: `${SITE.name} — ${SITE.tagline}`,
    description: SITE.description,
    siteName: SITE.name,
    images: [
      {
        url: "/assets/hero.webp",
        width: 1200,
        height: 630,
        alt: "AppGuard — Biometric Privacy & App Lock for macOS, Windows & Linux",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE.name} — ${SITE.tagline}`,
    description: SITE.description,
    images: ["/assets/hero.webp"],
    creator: "@novitaswebworks",
  },
  icons: {
    icon: [
      { url: "/assets/appguard-icon.svg", type: "image/svg+xml" },
      { url: "/assets/appguard-icon.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [
      { url: "/assets/appguard-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
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
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}

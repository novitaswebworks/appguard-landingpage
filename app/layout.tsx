import type { Metadata, Viewport } from "next";
import "./globals.css";

export const viewport: Viewport = {
  themeColor: "#eeeadf",
};

export const metadata: Metadata = {
  title: "APPGUARD — Biometric App Lock & Privacy Vault for macOS",
  description:
    "Instant Touch ID biometric protection for macOS applications, AES-256 encrypted folder vault, sleep-lock defense, and zero-telemetry local security.",
  icons: {
    icon: "/assets/appguard-icon.svg",
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

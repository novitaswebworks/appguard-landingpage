# AppGuard Landing Page

> The official landing page and distribution hub for **AppGuard** — Biometric App Lock & Hardware-Accelerated Privacy Vault for macOS, Windows & Linux.

[![Live Site](https://img.shields.io/badge/live-appguard.novitasweb.works-emerald.svg)](https://appguard.novitasweb.works)
[![Version](https://img.shields.io/badge/release-v0.6.0-blue.svg)](https://github.com/novitaswebworks/appguard/releases)
[![Next.js](https://img.shields.io/badge/Next.js-16%20(Turbopack)-black.svg)](https://nextjs.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-v4-38bdf8.svg)](https://tailwindcss.com/)
[![Deployment](https://img.shields.io/badge/deploy-Vercel-black.svg)](https://vercel.com/)

---

## 🌐 Live Website

- **Production URL:** [https://appguard.novitasweb.works](https://appguard.novitasweb.works)
- **Desktop Application Repo:** [github.com/novitaswebworks/appguard](https://github.com/novitaswebworks/appguard)

---

## ⚡ Tech Stack

- **Framework:** Next.js 16 (App Router + Turbopack)
- **Language:** TypeScript 5.9
- **Styling:** Vanilla CSS design system + Tailwind CSS v4
- **SEO & Metadata:** Dynamic Schema.org `SoftwareApplication` JSON-LD, OpenGraph cards, Twitter preview cards, sitemap, robots, manifest
- **Interactions:** Custom 60fps parallax scroll engine, interactive biometric sensor emulator, dynamic OS platform detection, modal download dialogs

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18+)
- [pnpm](https://pnpm.io/)

### Installation & Local Development

1. Clone the repository:
   ```bash
   git clone https://github.com/novitaswebworks/appguard-landingpage.git
   cd appguard-landingpage
   ```

2. Install dependencies:
   ```bash
   pnpm install
   ```

3. Run local development server:
   ```bash
   pnpm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🛠️ Verification & Building

Run static type checking and production compilation:

```bash
pnpm run build
```

---

## 🔄 Automated Release Synchronization

Whenever a new release is published in the main [`appguard`](https://github.com/novitaswebworks/appguard) repository, GitHub Actions automatically dispatches a workflow to update the `VERSION` constant in [`lib/site.ts`](lib/site.ts), updating all direct download links and version badges across the site in real time.

---

## 📄 License

MIT © [Novitas Web Works](https://novitasweb.works)

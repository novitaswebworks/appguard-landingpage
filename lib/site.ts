export const VERSION = "0.5.0";

export const SITE = {
  name: "AppGuard",
  domain: "appguard.novitasweb.works",
  url: "https://appguard.novitasweb.works",
  tagline: "Biometric App Lock & Privacy Vault for macOS",
  description:
    "Instant Touch ID biometric protection for macOS applications, AES-256 encrypted folder vault, sleep-lock defense, and zero-telemetry local security.",
  github: "https://github.com/novitaswebworks/appguard",
  githubReleases: "https://github.com/novitaswebworks/appguard/releases",
  author: "Novitas Web Works",
} as const;

export const DOWNLOADS = {
  universalDmg: {
    label: "macOS (Universal DMG)",
    file: `AppGuard_${VERSION}_universal.dmg`,
    arch: "Apple Silicon (M1/M2/M3/M4) & Intel",
    url: `${SITE.githubReleases}/download/v${VERSION}/AppGuard_${VERSION}_universal.dmg`,
    available: true,
  },
  homebrew: {
    command: "brew install appguard",
  },
} as const;

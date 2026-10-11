export const VERSION = "0.5.2";

export const SITE = {
  name: "AppGuard",
  domain: "appguard.novitasweb.works",
  url: "https://appguard.novitasweb.works",
  tagline: "Biometric App Lock & Privacy Vault for macOS, Windows & Linux",
  description:
    "Cross-platform biometric app locking and hardware-accelerated AES-256 encrypted privacy vault. Native Touch ID, Windows Hello, and Linux PAM security with zero cloud telemetry.",
  github: "https://github.com/novitaswebworks/appguard",
  githubReleases: "https://github.com/novitaswebworks/appguard/releases",
  author: "Novitas Web Works",
} as const;

const releaseBase = `${SITE.githubReleases}/download/v${VERSION}`;

export const DOWNLOADS = {
  macos: {
    label: "macOS (Universal)",
    file: `AppGuard_${VERSION}_universal.dmg`,
    arch: "Apple Silicon & Intel · macOS 12+",
    url: `${releaseBase}/AppGuard_${VERSION}_universal.dmg`,
    available: true,
  },
  windows: {
    label: "Windows (x64)",
    file: `AppGuard_${VERSION}_x64-setup.exe`,
    arch: "Windows 10 / 11 · 64-bit",
    url: `${releaseBase}/AppGuard_${VERSION}_x64-setup.exe`,
    available: true,
  },
  linux: {
    label: "Linux (AppImage & .deb)",
    file: `AppGuard_${VERSION}_amd64.AppImage`,
    arch: "x86_64 · Ubuntu, Fedora, Arch",
    url: `${releaseBase}/AppGuard_${VERSION}_amd64.AppImage`,
    available: true,
  },
  homebrew: {
    command: "brew install --cask novitaswebworks/tap/appguard",
    tapCommand: "brew tap novitaswebworks/tap && brew install --cask appguard",
  },
} as const;

"use client";

import React, { useEffect, useRef, useState } from "react";
import { SITE, VERSION } from "@/lib/site";

export default function HomePage() {
  const [paused, setPaused] = useState(false);
  const [nodesActive, setNodesActive] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedPlatform, setSelectedPlatform] = useState<"macos" | "windows" | "linux">("macos");

  const heroPhotoRef = useRef<HTMLImageElement>(null);
  const heroCopyRef = useRef<HTMLDivElement>(null);
  const heroRunwayRef = useRef<HTMLDivElement>(null);
  const waveRef = useRef<HTMLDivElement>(null);

  // Auto-detect OS on client mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      const ua = window.navigator.userAgent.toLowerCase();
      if (ua.includes("win")) setSelectedPlatform("windows");
      else if (ua.includes("linux")) setSelectedPlatform("linux");
      else setSelectedPlatform("macos");
    }
  }, []);

  // Initialize soundwave bars
  useEffect(() => {
    if (!waveRef.current) return;
    waveRef.current.innerHTML = "";
    for (let i = 0; i < 32; i++) {
      const bar = document.createElement("i");
      bar.style.setProperty("--h", 7 + Math.sin(i * 0.6) ** 2 * 23 + "px");
      bar.style.setProperty("--d", -i * 0.08 + "s");
      waveRef.current.appendChild(bar);
    }
  }, []);

  // IntersectionObserver for reveal elements
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("in");
          }
        });
      },
      { threshold: 0.12 }
    );

    const elements = document.querySelectorAll(".reveal");
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  // Parallax scroll engine
  useEffect(() => {
    let dirty = true;
    let animId: number;

    const onScroll = () => {
      dirty = true;
    };
    const onResize = () => {
      dirty = true;
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);

    const render = () => {
      if (dirty && heroRunwayRef.current && heroPhotoRef.current && heroCopyRef.current) {
        dirty = false;
        const scrollY = window.scrollY;
        const runwayHeight = heroRunwayRef.current.offsetHeight;
        const maxScroll = Math.max(1, runwayHeight - window.innerHeight);
        const p = Math.min(1, Math.max(0, scrollY / maxScroll));

        heroPhotoRef.current.style.transform = paused
          ? "none"
          : `translate3d(${p * -18}px, ${p * -10}px, 0) scale(${1 + p * 0.06})`;

        heroCopyRef.current.style.transform = paused ? "none" : `translateY(${p * -35}px)`;
      }
      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      cancelAnimationFrame(animId);
    };
  }, [paused]);

  const togglePauseMotion = () => {
    setPaused((prev) => {
      const next = !prev;
      document.body.classList.toggle("paused", next);
      return next;
    });
  };

  const copyBrew = () => {
    navigator.clipboard.writeText("brew install --cask novitaswebworks/tap/appguard");
    alert("Copied to clipboard: brew install --cask novitaswebworks/tap/appguard");
  };

  const triggerDownload = (os: "macos" | "windows" | "linux" = selectedPlatform) => {
    setDialogOpen(false);
    const filenames = {
      macos: `AppGuard_${VERSION}_universal.dmg`,
      windows: `AppGuard_${VERSION}_x64-setup.exe`,
      linux: `AppGuard_${VERSION}_amd64.AppImage`,
    };
    alert(`AppGuard v${VERSION} (${filenames[os]}) download initiated.`);
  };

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "AppGuard",
    description:
      "Cross-platform biometric app locking and hardware-accelerated AES-256 encrypted privacy vault for macOS, Windows, and Linux with zero cloud telemetry.",
    applicationCategory: "SecurityApplication",
    applicationSubCategory: "Privacy & Biometric Access Control",
    operatingSystem: "macOS 12.0+, Windows 10/11, Linux (X11 & Wayland)",
    softwareVersion: VERSION,
    downloadUrl: `${SITE.githubReleases}/download/v${VERSION}/AppGuard_${VERSION}_universal.dmg`,
    url: SITE.url,
    screenshot: `${SITE.url}/assets/hero.webp`,
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    author: {
      "@type": "Organization",
      name: "Novitas Web Works",
      url: "https://novitasweb.works",
    },
    featureList: [
      "Cross-Platform Biometric App Intercept",
      "Touch ID & Apple Watch Integration (macOS)",
      "Windows Hello Facial & Fingerprint Auth (Windows 10/11)",
      "Linux PAM & fprintd Biometrics (X11 & Wayland)",
      "AES-256 Hardware Encrypted Folder Vault",
      "Lock-on-Sleep and Idle Session Security",
      "Tamper-Resistant Background Watchdog Daemon",
      "SHA-256 Salted Master PIN Fallback",
      "Zero Cloud Telemetry Guarantee",
    ],
  };

  return (
    <>
      {/* Schema.org Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <a
        href="#solutions"
        style={{ position: "absolute", left: "-9999px" }}
        onFocus={(e) => (e.currentTarget.style.left = "20px")}
        onBlur={(e) => (e.currentTarget.style.left = "-9999px")}
      >
        Skip to AppGuard security features
      </a>

      {/* Navigation */}
      <header className="nav">
        <a className="brand" href="#top">
          APPGUARD<span> /</span> <span className="brand-badge">v{VERSION}</span>
        </a>
        <nav aria-label="Main navigation">
          <a href="#solutions">Features</a>
          <a href="#stats">Benchmarks</a>
          <a href="#visibility">Biometric Demo</a>
          <a href="#matrix">Capabilities</a>
          <a href="#platforms">Platforms</a>
          <a href="#faq">FAQ</a>
        </nav>
        <button className="pill" onClick={() => setDialogOpen(true)}>
          Download AppGuard ↗
        </button>
      </header>

      <main id="top">
        {/* Hero Section */}
        <div className="hero-runway" ref={heroRunwayRef}>
          <section className="hero" aria-label="AppGuard biometric lock and privacy vault for macOS, Windows and Linux">
            <img
              ref={heroPhotoRef}
              className="hero-photo"
              src="/assets/hero.webp"
              alt="AppGuard sculptural emerald protection emblem"
              fetchPriority="high"
            />
            <div className="wash"></div>
            <div className="hero-copy" ref={heroCopyRef}>
              <div className="eyebrow">
                <span className="dot dot-live"></span> CROSS-PLATFORM DESKTOP PRIVACY
              </div>
              <h1>
                Lock tight.
                <br />
                <em>Move freely.</em>
              </h1>
              <p>
                Instant biometric gating for your desktop applications, hardware-accelerated AES-256
                folder cloaking, and seamless stealth protection across macOS, Windows, and Linux.
              </p>
              <div className="actions">
                <a className="pill solid" href="#solutions">
                  Explore Features ↗
                </a>
                <a className="text-link" href="#visibility">
                  Interactive Demo
                </a>
              </div>
            </div>
            <div className="hero-bottom">
              <p>
                CROSS-PLATFORM BIOMETRICS.
                <br />
                AES-256 HARDWARE VAULT.
                <br />↓ SCROLL TO EXPLORE
              </p>
              <div className="signal">
                <div>
                  <span>AUTH SENSOR / ACTIVE ENGINE</span>
                  <span className="dot dot-live"></span>
                </div>
                <div className="wave" ref={waveRef} aria-hidden="true"></div>
                <div>
                  <span>PROTECTED · SLEEP-LOCKED</span>
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* Section 01: Core Pillars */}
        <section className="section" id="solutions">
          <div className="intro">
            <div className="reveal">
              <span className="eyebrow">01 / APPGUARD DEFENSE MATRIX</span>
              <h2>
                Total privacy.<br />
                <em>Across every OS.</em>
              </h2>
            </div>
            <p className="reveal">
              Engineered natively in Rust and Tauri with direct hooks into macOS LocalAuthentication,
              Windows Hello UserConsentVerifier, and Linux PAM. AppGuard shields your workspace apps,
              source repositories, private credentials, and personal chats behind instant hardware-backed
              biometric verification before unauthorized windows can ever render.
            </p>
          </div>

          <div className="steps">
            <article className="reveal">
              <b>01 / APP SHIELD</b>
              <h3>Per-App Biometric Gate.</h3>
              <p>
                Lock Telegram, WhatsApp, Terminal, Discord, IDEs, or any native application behind Touch ID,
                Windows Hello, Linux PAM, or Master PIN fallback before windows draw.
              </p>
            </article>
            <article className="reveal">
              <b>02 / ENCRYPTED VAULT</b>
              <h3>AES-256 Folder Cloaking.</h3>
              <p>
                Encrypt confidential repositories, SSH keys, credentials, and client documents with
                hardware-accelerated AES-GCM cryptography. Fully encrypted at rest.
              </p>
            </article>
            <article className="reveal">
              <b>03 / STEALTH &amp; SLEEP</b>
              <h3>Instant Auto-Arming.</h3>
              <p>
                Arm your workstation the millisecond your laptop lid closes, display sleeps, screensaver
                activates, or customizable zero-click inactivity grace timers expire.
              </p>
            </article>
          </div>

          {/* Benchmark Stats Strip */}
          <div className="stats-bar reveal" id="stats">
            <div className="stat-card">
              <div className="val">&lt; 5ms</div>
              <div className="lbl">Biometric Intercept</div>
            </div>
            <div className="stat-card">
              <div className="val">~12 MB</div>
              <div className="lbl">RAM Footprint</div>
            </div>
            <div className="stat-card">
              <div className="val">3 Platforms</div>
              <div className="lbl">macOS · Windows · Linux</div>
            </div>
            <div className="stat-card">
              <div className="val">0% Cloud</div>
              <div className="lbl">Zero Telemetry · Airgapped</div>
            </div>
          </div>
        </section>

        {/* Section 02: Interactive Biometric Simulation */}
        <section className="section dark" id="visibility">
          <div className="reveal">
            <span className="eyebrow">02 / INTERACTIVE BIOMETRIC SIMULATION</span>
            <h2>
              One touch.<br />
              <em>Instant verification.</em>
            </h2>
          </div>
          <div className="console reveal">
            <div>
              <h3>BIOMETRIC SENSOR → HARDWARE ENCLAVE → VAULT UNLOCKED</h3>
              <p id="demo-status" role="status">
                {nodesActive
                  ? "Sensor handshake verified → Hardware keystore validated → Protected apps unlocked. Session active."
                  : "System idle · Awaiting biometric handshake or PIN passkey."}
              </p>
              <button
                className="demo-btn"
                id="demo"
                onClick={() => setNodesActive((prev) => !prev)}
              >
                Simulate Biometric Auth ↗
              </button>
              <p style={{ marginTop: "12px", fontSize: "11px" }}>
                Touch ID / Windows Hello / PAM emulation · No telemetry recorded
              </p>
            </div>
            <div
              className={`nodes ${nodesActive ? "on" : ""}`}
              aria-label="AppGuard biometric verification flow"
            >
              <span>AUTH</span>
              <span>KEYSTORE</span>
              <span>UNLOCKED</span>
            </div>
          </div>
        </section>

        {/* Section 03: Feature Grid & Themes */}
        <section className="section" id="matrix">
          <div className="reveal">
            <span className="eyebrow">03 / BUILT IN. NO SUBSCRIPTION REQUIRED.</span>
            <h2>
              Engineered for power users.<br />
              <em>Native across desktop OSes.</em>
            </h2>
            <p style={{ color: "var(--muted)", maxWidth: "540px", marginTop: "10px" }}>
              Every tool you need to protect client code, trade secrets, sensitive chats, and personal files
              without clunky third-party bloat.
            </p>
          </div>

          <div className="feature-grid reveal">
            <div className="feature-card">
              <span className="f-tag">MULTI-BIOMETRIC</span>
              <h3>Touch ID, Hello &amp; PAM</h3>
              <p>
                Native hardware support: Apple Secure Enclave Touch ID, Windows Hello facial &amp; fingerprint
                sensors, and Linux fprintd / PAM credential prompts.
              </p>
            </div>
            <div className="feature-card">
              <span className="f-tag">STORAGE</span>
              <h3>Hardware AES-256 Vault</h3>
              <p>
                Military-grade AES-GCM encryption cloaks sensitive folders until authorized. Files remain
                completely encrypted at rest across all file systems.
              </p>
            </div>
            <div className="feature-card">
              <span className="f-tag">BACKGROUND</span>
              <h3>Tamper-Proof Watchdog</h3>
              <p>
                Runs as a persistent background daemon with automatic recovery hooks (launchd, Windows Service,
                systemd) to prevent unauthorized process termination.
              </p>
            </div>
            <div className="feature-card">
              <span className="f-tag">PRIVACY</span>
              <h3>Lock-on-Sleep &amp; Screensaver</h3>
              <p>
                Monitors OS power and session events to lock applications immediately the millisecond your machine
                sleeps or your screensaver engages.
              </p>
            </div>
            <div className="feature-card">
              <span className="f-tag">FAILSAFE</span>
              <h3>Master PIN Fallback</h3>
              <p>
                SHA-256 salted PIN safeguard ensures you never lose access when external displays are connected
                or biometrics are temporarily unavailable.
              </p>
            </div>
            <div className="feature-card">
              <span className="f-tag">WORKFLOW</span>
              <h3>Smart Grace Timers</h3>
              <p>
                Configurable unlock grace periods (30s to 15m) so you stay in flow during rapid app switching
                without repeated prompts.
              </p>
            </div>
          </div>

          {/* Theme Chips */}
          <div className="themes-showcase reveal">
            <span className="eyebrow">04 / CRAFTED APPEARANCE</span>
            <h3 style={{ font: "26px Georgia, serif", letterSpacing: "-.03em", margin: "12px 0 6px" }}>
              7 Handcrafted Themes
            </h3>
            <p style={{ fontSize: "14px", color: "var(--muted)", margin: 0, maxWidth: "520px" }}>
              Tailored to match your setup. Switch seamlessly between daylight minimal and late-night dark
              modes.
            </p>
            <div className="theme-chips">
              <span className="theme-chip">✦ Nordic Minimal</span>
              <span className="theme-chip">✦ Editorial Warm</span>
              <span className="theme-chip">✦ Obsidian Cyber</span>
              <span className="theme-chip">✦ Modern Slate</span>
              <span className="theme-chip">✦ Emerald Zen</span>
              <span className="theme-chip">✦ Rose Quartz</span>
              <span className="theme-chip">✦ Sunset Amber</span>
            </div>
          </div>
        </section>

        {/* Section 04: Privacy Guarantee */}
        <section className="section approach" id="approach">
          <img
            src="/assets/hero.webp"
            alt="Close detail of the sculptural emerald shield"
            loading="lazy"
            className="reveal"
          />
          <div className="reveal">
            <span className="eyebrow">05 / PRIVACY GUARANTEE</span>
            <h2>
              Your machine.<br />
              <em>Your sovereignty.</em>
            </h2>
            <p>
              Most modern security apps secretly phone home with telemetry and require cloud subscriptions.
              AppGuard takes the opposite stance: pure, local-first computing.
            </p>
            <ul>
              <li>Zero telemetry, zero crash analytics, and zero external trackers.</li>
              <li>Runs fully offline — no internet connection required after download.</li>
              <li>Lightweight Rust core with &lt; 15 MB binary size and negligible battery drain.</li>
              <li>Complete user ownership of encryption keys and local config files.</li>
            </ul>
          </div>
        </section>

        {/* Section 05: Platforms & Downloads */}
        <section className="section" id="platforms">
          <div className="reveal">
            <span className="eyebrow">06 / INSTALLATION &amp; BUILDS</span>
            <h2>
              Available today.<br />
              <em>Universal desktop support.</em>
            </h2>
          </div>
          <div className="platform-matrix reveal">
            <div className="platform-card">
              <b>macOS</b>
              <span className="badge">Universal Binary</span>
              <p>
                Native ARM64 &amp; Intel x86_64 build for macOS 12+ (Monterey, Ventura, Sonoma, Sequoia) with
                Touch ID &amp; Apple Watch verification.
              </p>
              <button
                className="card-action"
                onClick={() => {
                  setSelectedPlatform("macos");
                  setDialogOpen(true);
                }}
              >
                Download for macOS (.dmg) ↗
              </button>
            </div>
            <div className="platform-card">
              <b>Windows</b>
              <span className="badge">64-bit Installer</span>
              <p>
                Full Windows 10 &amp; 11 support with Windows Hello facial recognition, fingerprint sensor,
                and Credential Manager integration.
              </p>
              <button
                className="card-action"
                onClick={() => {
                  setSelectedPlatform("windows");
                  setDialogOpen(true);
                }}
              >
                Download for Windows (.exe) ↗
              </button>
            </div>
            <div className="platform-card">
              <b>Linux</b>
              <span className="badge">AppImage &amp; .deb</span>
              <p>
                Compatible with Ubuntu, Debian, Fedora, Arch &amp; all major distros across X11 and Wayland
                with PAM &amp; fprintd authentication.
              </p>
              <button
                className="card-action"
                onClick={() => {
                  setSelectedPlatform("linux");
                  setDialogOpen(true);
                }}
              >
                Download for Linux (.AppImage) ↗
              </button>
            </div>
          </div>

          <div
            className="reveal"
            style={{
              marginTop: "30px",
              padding: "24px 28px",
              border: "1px solid var(--line)",
              borderRadius: "18px",
              background: "rgba(255,255,255,0.45)",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              flexWrap: "wrap",
              gap: "16px",
            }}
          >
            <div>
              <b style={{ fontSize: "14px", fontFamily: "Georgia, serif" }}>Prefer Homebrew on macOS?</b>
              <p style={{ margin: "4px 0 0", fontSize: "12px", color: "var(--muted)", fontFamily: "monospace" }}>
                brew install --cask novitaswebworks/tap/appguard
              </p>
            </div>
            <button className="card-action" onClick={copyBrew}>
              Copy Brew Command ↗
            </button>
          </div>
        </section>

        {/* Section 06: Accordion FAQ */}
        <section className="section" id="faq">
          <div className="reveal" style={{ textAlign: "center" }}>
            <span className="eyebrow" style={{ justifyContent: "center" }}>
              07 / FREQUENTLY ASKED QUESTIONS
            </span>
            <h2>
              Clear answers.<br />
              <em>No surprises.</em>
            </h2>
          </div>
          <div
            className="faq-list reveal"
            style={{ maxWidth: "820px", marginLeft: "auto", marginRight: "auto" }}
          >
            <details className="faq-item">
              <summary className="faq-summary">Which operating systems are supported by AppGuard?</summary>
              <div className="faq-body">
                AppGuard is fully cross-platform. It runs natively on <strong>macOS</strong> (Apple Silicon M1/M2/M3/M4 &amp; Intel), <strong>Windows 10/11</strong> (64-bit), and <strong>Linux</strong> (Ubuntu, Debian, Fedora, Arch, with support for both X11 and Wayland desktop environments).
              </div>
            </details>
            <details className="faq-item">
              <summary className="faq-summary">How does AppGuard intercept applications before they open?</summary>
              <div className="faq-body">
                AppGuard leverages native platform windowing and workspace notification APIs—NSWorkspace on macOS, Win32 Foreground Hooks on Windows, and xdotool / D-Bus on Linux—combined with a high-performance Rust daemon to intercept window activations in under 5ms, displaying the biometric challenge before sensitive screen content renders.
              </div>
            </details>
            <details className="faq-item">
              <summary className="faq-summary">Which biometric authentication methods are supported?</summary>
              <div className="faq-body">
                On macOS, AppGuard uses Touch ID and Apple Watch via LocalAuthentication. On Windows, it integrates with Windows Hello (fingerprint, facial recognition, and PIN) via UserConsentVerifier. On Linux, it supports PAM and fprintd. A salted SHA-256 Master PIN fallback is always available across all platforms.
              </div>
            </details>
            <details className="faq-item">
              <summary className="faq-summary">Does AppGuard send any data or keys to the cloud?</summary>
              <div className="faq-body">
                Never. AppGuard is strictly local-first and airgapped by design. It makes zero external network requests, contains no analytics SDKs, and stores your encrypted vault keys exclusively inside your local OS credential store (macOS Keychain, Windows Credential Manager, Linux Secret Service).
              </div>
            </details>
            <details className="faq-item">
              <summary className="faq-summary">Can someone bypass AppGuard by force-quitting the app in Task Manager or Activity Monitor?</summary>
              <div className="faq-body">
                AppGuard features built-in tamper protection. The core watchdog daemon integrates with system-level supervisor hooks (launchd KeepAlive on macOS, Windows Service AutoRestart, and systemd on Linux). If the daemon is interrupted, locked applications are immediately minimized, cloaked, or terminated.
              </div>
            </details>
            <details className="faq-item">
              <summary className="faq-summary">Is AppGuard a subscription or one-time purchase?</summary>
              <div className="faq-body">
                AppGuard is free and open-source with no recurring subscription tiers. Download the binary for your operating system, install it, and enjoy lifetime protection.
              </div>
            </details>
          </div>
        </section>

        {/* Section 07: Closing CTA */}
        <section className="closing reveal" id="start">
          <span className="eyebrow" style={{ justifyContent: "center" }}>
            GET STARTED IN SECONDS
          </span>
          <h2>
            Protect your<br />
            private horizon.
          </h2>
          <p>
            Download AppGuard for macOS, Windows, or Linux. Effortless biometric privacy that runs
            whisper-quiet in the background.
          </p>
          <button className="pill solid" onClick={() => setDialogOpen(true)}>
            Download AppGuard v{VERSION} ↗
          </button>
        </section>
      </main>

      {/* Footer */}
      <footer>
        <a className="brand" href="#top">
          APPGUARD /
        </a>
        <span>Private, cross-platform biometric application locking and encrypted vault</span>
        <button
          className="motion-btn"
          id="pause"
          aria-pressed={paused}
          onClick={togglePauseMotion}
        >
          {paused ? "Resume motion" : "Pause motion"}
        </button>
        <a href="#top">Back to top ↑</a>
      </footer>

      {/* Download Modal Dialog */}
      {dialogOpen && (
        <dialog
          open
          style={{
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            margin: 0,
            zIndex: 100,
            boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.4)",
          }}
          onClick={(e) => {
            if (e.target === e.currentTarget) setDialogOpen(false);
          }}
        >
          <button
            className="dialog-close"
            aria-label="Close download dialog"
            onClick={() => setDialogOpen(false)}
          >
            ×
          </button>
          <h2>Get AppGuard for Desktop</h2>
          <p>
            Experience effortless biometric app protection and encrypted folders on macOS, Windows, and Linux.
          </p>

          <div style={{ display: "flex", gap: "8px", margin: "16px 0 12px" }}>
            <button
              style={{
                flex: 1,
                padding: "8px 12px",
                borderRadius: "100px",
                border: selectedPlatform === "macos" ? "1px solid var(--ink)" : "1px solid var(--line)",
                background: selectedPlatform === "macos" ? "var(--ink)" : "transparent",
                color: selectedPlatform === "macos" ? "var(--ivory)" : "var(--ink)",
                fontSize: "12px",
                fontWeight: 600,
                cursor: "pointer",
              }}
              onClick={() => setSelectedPlatform("macos")}
            >
              macOS
            </button>
            <button
              style={{
                flex: 1,
                padding: "8px 12px",
                borderRadius: "100px",
                border: selectedPlatform === "windows" ? "1px solid var(--ink)" : "1px solid var(--line)",
                background: selectedPlatform === "windows" ? "var(--ink)" : "transparent",
                color: selectedPlatform === "windows" ? "var(--ivory)" : "var(--ink)",
                fontSize: "12px",
                fontWeight: 600,
                cursor: "pointer",
              }}
              onClick={() => setSelectedPlatform("windows")}
            >
              Windows
            </button>
            <button
              style={{
                flex: 1,
                padding: "8px 12px",
                borderRadius: "100px",
                border: selectedPlatform === "linux" ? "1px solid var(--ink)" : "1px solid var(--line)",
                background: selectedPlatform === "linux" ? "var(--ink)" : "transparent",
                color: selectedPlatform === "linux" ? "var(--ivory)" : "var(--ink)",
                fontSize: "12px",
                fontWeight: 600,
                cursor: "pointer",
              }}
              onClick={() => setSelectedPlatform("linux")}
            >
              Linux
            </button>
          </div>

          <div className="dialog-meta">
            <strong>Version:</strong> AppGuard {VERSION}
            <br />
            <strong>Target:</strong>{" "}
            {selectedPlatform === "macos"
              ? "Apple Silicon & Intel (Universal DMG)"
              : selectedPlatform === "windows"
              ? "Windows 10 / 11 (64-bit NSIS Setup)"
              : "Linux (AppImage / .deb x86_64)"}
            <br />
            <strong>Package:</strong>{" "}
            {selectedPlatform === "macos"
              ? `AppGuard_${VERSION}_universal.dmg`
              : selectedPlatform === "windows"
              ? `AppGuard_${VERSION}_x64-setup.exe`
              : `AppGuard_${VERSION}_amd64.AppImage`}
            <br />
            <strong>Security:</strong> Touch ID, Windows Hello &amp; PAM · 100% Local-First
          </div>
          <div className="dialog-actions">
            <button className="pill solid" onClick={() => triggerDownload(selectedPlatform)}>
              Download for {selectedPlatform === "macos" ? "macOS (.dmg)" : selectedPlatform === "windows" ? "Windows (.exe)" : "Linux (.AppImage)"} ↗
            </button>
            <button className="text-link" onClick={() => setDialogOpen(false)}>
              Dismiss
            </button>
          </div>
        </dialog>
      )}
    </>
  );
}

"use client";

import React, { useEffect, useRef, useState } from "react";
import { SITE, VERSION } from "@/lib/site";

export default function HomePage() {
  const [paused, setPaused] = useState(false);
  const [nodesActive, setNodesActive] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);

  const heroPhotoRef = useRef<HTMLImageElement>(null);
  const heroCopyRef = useRef<HTMLDivElement>(null);
  const heroRunwayRef = useRef<HTMLDivElement>(null);
  const waveRef = useRef<HTMLDivElement>(null);

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

  const triggerDownload = () => {
    setDialogOpen(false);
    alert(`AppGuard v${VERSION} universal installer downloaded.`);
  };

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "AppGuard",
    description: "Instant Touch ID biometric protection for macOS applications, AES-256 encrypted folder vault, sleep-lock defense, and zero-telemetry local security.",
    applicationCategory: "SecurityApplication",
    applicationSubCategory: "Privacy & Biometric Access Control",
    operatingSystem: "macOS 12.0+",
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
      "Per-App Touch ID Biometric Gate",
      "Apple Secure Enclave Hardware Integration",
      "AES-256 Hardware Encrypted Folder Vault",
      "Lock-on-Sleep and Screensaver Detection",
      "Tamper-Resistant Background Watchdog Daemon",
      "SHA-256 Salted Master PIN Fallback",
      "Zero Cloud Telemetry Guarantee",
      "Native Apple Silicon (ARM64) & Intel Builds",
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
          <a href="#platforms">Downloads</a>
          <a href="#faq">FAQ</a>
        </nav>
        <button className="pill" onClick={() => setDialogOpen(true)}>
          Download AppGuard ↗
        </button>
      </header>

      <main id="top">
        {/* Hero Section */}
        <div className="hero-runway" ref={heroRunwayRef}>
          <section className="hero" aria-label="AppGuard biometric lock and privacy vault for macOS">
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
                <span className="dot dot-live"></span> BIOMETRIC PRIVACY FOR MACOS
              </div>
              <h1>
                Lock tight.
                <br />
                <em>Move freely.</em>
              </h1>
              <p>
                Instant Touch ID protection for sensitive macOS applications, military-grade encrypted
                folder vaults, and instant stealth privacy when you step away.
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
                LOCAL SECURE ENCLAVE.
                <br />
                AES-256 ENCRYPTED VAULT.
                <br />↓ SCROLL TO EXPLORE
              </p>
              <div className="signal">
                <div>
                  <span>TOUCH ID / ACTIVE ENGINE</span>
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
              <span className="eyebrow">01 / APPGUARD CORE PILLARS</span>
              <h2>
                Total privacy.
                <br />
                <em>Zero friction.</em>
              </h2>
            </div>
            <p className="reveal">
              Built natively in Rust and Tauri with macOS LocalAuthentication and kernel-level event
              monitoring. AppGuard shields your conversations, source code, credentials, and confidential
              files behind biometric gates.
            </p>
          </div>

          <div className="steps">
            <article className="reveal">
              <b>01 / APP SHIELD</b>
              <h3>Per-App Biometric Gate.</h3>
              <p>
                Gate Telegram, WhatsApp, Terminal, Xcode, or any app behind Touch ID or Master PIN fallback
                before windows render.
              </p>
            </article>
            <article className="reveal">
              <b>02 / ENCRYPTED VAULT</b>
              <h3>AES-256 Folder Cloaking.</h3>
              <p>
                Encrypt confidential directories, SSH keys, and client documents with hardware-accelerated
                AES-GCM cryptography.
              </p>
            </article>
            <article className="reveal">
              <b>03 / STEALTH &amp; SLEEP</b>
              <h3>Instant Auto-Arming.</h3>
              <p>
                Locks apps immediately upon display sleep, screensaver activation, or custom zero-click grace
                timeout windows.
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
              <div className="val">0% Cloud</div>
              <div className="lbl">Zero Telemetry · Airgapped</div>
            </div>
            <div className="stat-card">
              <div className="val">AES-GCM</div>
              <div className="lbl">Hardware Cryptography</div>
            </div>
          </div>
        </section>

        {/* Section 02: Interactive Biometric Simulation */}
        <section className="section dark" id="visibility">
          <div className="reveal">
            <span className="eyebrow">02 / INTERACTIVE BIOMETRIC SIMULATION</span>
            <h2>
              One touch.
              <br />
              <em>Instant verification.</em>
            </h2>
          </div>
          <div className="console reveal">
            <div>
              <h3>TOUCH ID → SECURE ENCLAVE → VAULT UNLOCKED</h3>
              <p id="demo-status" role="status">
                {nodesActive
                  ? "Touch ID verified → Secure Enclave validated → Protected apps unlocked. Session active."
                  : "System idle · Awaiting biometric handshake or PIN passkey."}
              </p>
              <button
                className="demo-btn"
                id="demo"
                onClick={() => setNodesActive((prev) => !prev)}
              >
                Simulate Touch ID Auth ↗
              </button>
              <p style={{ marginTop: "12px", fontSize: "11px" }}>
                Local Secure Enclave emulation · No telemetry recorded
              </p>
            </div>
            <div
              className={`nodes ${nodesActive ? "on" : ""}`}
              aria-label="AppGuard biometric verification flow"
            >
              <span>TOUCH ID</span>
              <span>ENCLAVE</span>
              <span>UNLOCKED</span>
            </div>
          </div>
        </section>

        {/* Section 03: Feature Grid & Themes */}
        <section className="section" id="matrix">
          <div className="reveal">
            <span className="eyebrow">03 / BUILT IN. NO SUBSCRIPTION REQUIRED.</span>
            <h2>
              Engineered for power users.
              <br />
              <em>Crafted for macOS.</em>
            </h2>
            <p style={{ color: "var(--muted)", maxWidth: "540px", marginTop: "10px" }}>
              Every tool you need to protect client code, trade secrets, sensitive chats, and personal files
              without clunky third-party bloat.
            </p>
          </div>

          <div className="feature-grid reveal">
            <div className="feature-card">
              <span className="f-tag">LOCAL AUTH</span>
              <h3>Touch ID &amp; Apple Watch</h3>
              <p>
                Authenticates against the Apple Secure Enclave coprocessor in under 5 milliseconds with native
                system dialogs.
              </p>
            </div>
            <div className="feature-card">
              <span className="f-tag">STORAGE</span>
              <h3>Hardware AES-256 Vault</h3>
              <p>
                Military-grade AES-GCM encryption cloaks sensitive folders until authorized. Files remain
                completely encrypted at rest.
              </p>
            </div>
            <div className="feature-card">
              <span className="f-tag">BACKGROUND</span>
              <h3>Tamper-Proof Daemon</h3>
              <p>
                Runs as a persistent background daemon with watchdog recovery to prevent unauthorized process
                termination.
              </p>
            </div>
            <div className="feature-card">
              <span className="f-tag">PRIVACY</span>
              <h3>Lock-on-Sleep</h3>
              <p>
                Monitors macOS IOKit power events to arm protection immediately the millisecond your MacBook
                lid closes or screensaver starts.
              </p>
            </div>
            <div className="feature-card">
              <span className="f-tag">FAILSAFE</span>
              <h3>Master PIN Fallback</h3>
              <p>
                SHA-256 salted PIN safeguard ensures you never lose access when clamshell mode is active or
                Touch ID is temporarily unavailable.
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
              Your machine.
              <br />
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
              Available today.
              <br />
              <em>Universal macOS binaries.</em>
            </h2>
          </div>
          <div className="platform-matrix reveal">
            <div className="platform-card">
              <b>Apple Silicon</b>
              <span className="badge">Recommended</span>
              <p>
                Optimized for M1, M2, M3, and M4 chips with native ARM64 instructions and Secure Enclave
                acceleration.
              </p>
              <button className="card-action" onClick={() => setDialogOpen(true)}>
                Download for Apple Silicon ↗
              </button>
            </div>
            <div className="platform-card">
              <b>Intel x86_64</b>
              <span className="badge">Universal</span>
              <p>
                Full support for Intel-based MacBooks, iMacs, and Mac Minis with T2 Security Chip Touch ID
                integration.
              </p>
              <button className="card-action" onClick={() => setDialogOpen(true)}>
                Download for Intel Mac ↗
              </button>
            </div>
            <div className="platform-card">
              <b>Homebrew Tap</b>
              <span className="badge">CLI Package</span>
              <p>
                Install and update automatically via your terminal with a single command:{" "}
                <code style={{ fontSize: "11px", wordBreak: "break-all" }}>brew install --cask novitaswebworks/tap/appguard</code>.
              </p>
              <button className="card-action" onClick={copyBrew}>
                Copy Brew Command ↗
              </button>
            </div>
          </div>
        </section>

        {/* Section 06: Accordion FAQ */}
        <section className="section" id="faq">
          <div className="reveal" style={{ textAlign: "center" }}>
            <span className="eyebrow" style={{ justifyContent: "center" }}>
              07 / FREQUENTLY ASKED QUESTIONS
            </span>
            <h2>
              Clear answers.
              <br />
              <em>No surprises.</em>
            </h2>
          </div>
          <div
            className="faq-list reveal"
            style={{ maxWidth: "820px", marginLeft: "auto", marginRight: "auto" }}
          >
            <details className="faq-item">
              <summary className="faq-summary">How does AppGuard intercept apps before they open?</summary>
              <div className="faq-body">
                AppGuard leverages native macOS accessibility and workspace notification APIs (NSWorkspace)
                combined with a high-performance Rust daemon to intercept window activations in under 5ms,
                displaying the biometric challenge before any sensitive screen content is drawn.
              </div>
            </details>
            <details className="faq-item">
              <summary className="faq-summary">Does AppGuard send any data or keys to the cloud?</summary>
              <div className="faq-body">
                Never. AppGuard is strictly local-first and airgapped by design. It makes zero external network
                requests, contains no analytics SDKs, and stores your encrypted vault keys exclusively inside
                your local keychain and encrypted app state.
              </div>
            </details>
            <details className="faq-item">
              <summary className="faq-summary">
                What happens if Touch ID fails or my Mac is in clamshell mode?
              </summary>
              <div className="faq-body">
                You can instantly authenticate using your encrypted Master PIN fallback or your macOS system
                passcode. You will never be locked out of your workstation.
              </div>
            </details>
            <details className="faq-item">
              <summary className="faq-summary">
                Can someone bypass AppGuard by force-quitting the app in Activity Monitor?
              </summary>
              <div className="faq-body">
                AppGuard features built-in tamper protection. The core daemon runs as a privileged system
                helper with auto-restart hooks, and locked applications are immediately hidden or terminated if
                the security daemon is interrupted.
              </div>
            </details>
            <details className="faq-item">
              <summary className="faq-summary">Is AppGuard a subscription or one-time purchase?</summary>
              <div className="faq-body">
                AppGuard is free and open-source with no recurring subscription tiers. Download the binary,
                install it to /Applications, and enjoy lifetime protection.
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
            Protect your
            <br />
            private horizon.
          </h2>
          <p>
            Download AppGuard for macOS. One click to install, effortless biometric privacy that runs
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
        <span>Private, hardware-backed macOS application locking and encrypted vault</span>
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
          <h2>Get AppGuard for macOS</h2>
          <p>
            Experience effortless biometric app protection and encrypted folders on macOS Monterey,
            Ventura, Sonoma &amp; Sequoia.
          </p>
          <div className="dialog-meta">
            <strong>Version:</strong> AppGuard {VERSION} (Universal Binary)
            <br />
            <strong>Architecture:</strong> Apple Silicon (M1/M2/M3/M4) &amp; Intel x86_64
            <br />
            <strong>Package:</strong> AppGuard_{VERSION}_universal.dmg
            <br />
            <strong>Requires:</strong> macOS 12.0+ with Touch ID or System Passcode
            <br />
            <strong>Privacy:</strong> 100% Local-First · Zero Cloud Telemetry
          </div>
          <div className="dialog-actions">
            <button className="pill solid" onClick={triggerDownload}>
              Download DMG (Universal) ↗
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

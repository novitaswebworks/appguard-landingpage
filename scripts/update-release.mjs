#!/usr/bin/env node
/**
 * update-release.mjs
 *
 * Called by the "sync-release" GitHub Actions workflow or locally.
 * Usage: node scripts/update-release.mjs <version> [release_notes]
 *
 * What it does:
 *  1. Updates VERSION in lib/site.ts (all download URLs and UI badges update automatically)
 */

import { readFileSync, writeFileSync } from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");

const version = process.argv[2]?.replace(/^v/, "");

if (!version) {
  console.error("Usage: node scripts/update-release.mjs <version> [release_notes]");
  process.exit(1);
}

// Update VERSION in lib/site.ts
const sitePath = join(ROOT, "lib", "site.ts");
let siteContent = readFileSync(sitePath, "utf8");
siteContent = siteContent.replace(
  /export const VERSION = "[^"]+"/,
  `export const VERSION = "${version}"`
);
writeFileSync(sitePath, siteContent);
console.log(`✓ Successfully updated AppGuard to v${version} in lib/site.ts`);

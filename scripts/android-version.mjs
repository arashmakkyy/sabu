#!/usr/bin/env node
// Derives Android versionName/versionCode from a strict semver tag.
//
//   node scripts/android-version.mjs v0.1.0
//   -> versionName=0.1.0 versionCode=1000
//
// Rules (same as metto — Myket and Play both need an increasing integer):
// - Tag must match ^v([0-9]+)\.([0-9]+)\.([0-9]+)$ — nothing else.
// - versionCode = major * 1_000_000 + minor * 1_000 + patch
// - minor <= 999, patch <= 999.
// - 1 <= versionCode <= 2_100_000_000 (Play maximum; Myket accepts the same range).
// - Emits KEY=VALUE lines for easy GITHUB_OUTPUT consumption.
import { resolve } from "node:path";
import { fileURLToPath } from "node:url";

const TAG_RE = /^v([0-9]+)\.([0-9]+)\.([0-9]+)$/;
const PLAY_MAX_VERSION_CODE = 2_100_000_000;

export function androidVersionFromTag(tag) {
  const m = TAG_RE.exec(String(tag).trim());
  if (!m) throw new Error(`tag must match ^vMAJOR.MINOR.PATCH (got ${JSON.stringify(tag)})`);
  const major = Number(m[1]);
  const minor = Number(m[2]);
  const patch = Number(m[3]);
  if (!Number.isSafeInteger(major) || !Number.isSafeInteger(minor) || !Number.isSafeInteger(patch)) {
    throw new Error(`non-integer version components in ${tag}`);
  }
  if (minor > 999) throw new Error(`minor must be <= 999 (got ${minor})`);
  if (patch > 999) throw new Error(`patch must be <= 999 (got ${patch})`);
  const versionName = `${major}.${minor}.${patch}`;
  const versionCode = major * 1_000_000 + minor * 1_000 + patch;
  if (!Number.isSafeInteger(versionCode) || versionCode < 1 || versionCode > PLAY_MAX_VERSION_CODE) {
    throw new Error(
      `derived versionCode must satisfy 1 <= versionCode <= ${PLAY_MAX_VERSION_CODE} (got ${versionCode})`,
    );
  }
  return { versionName, versionCode };
}

const isMain = (() => {
  try {
    const invoked = process.argv[1] ? resolve(process.argv[1]) : "";
    const self = resolve(fileURLToPath(import.meta.url));
    return invoked !== "" && invoked.toLowerCase() === self.toLowerCase();
  } catch {
    return false;
  }
})();
if (isMain) {
  const [tag] = process.argv.slice(2);
  if (!tag || tag === "--help" || tag === "-h") {
    console.log("Usage: android-version.mjs vMAJOR.MINOR.PATCH");
    process.exit(tag ? 0 : 2);
  }
  try {
    const { versionName, versionCode } = androidVersionFromTag(tag);
    console.log(`versionName=${versionName}`);
    console.log(`versionCode=${versionCode}`);
  } catch (err) {
    console.error(`android-version: ${err.message}`);
    process.exit(1);
  }
}

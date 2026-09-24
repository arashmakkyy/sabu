#!/usr/bin/env node
// Asserts the committed Saboo Android TWA configuration.
// Adapted from metto's check-android-config.mjs for:
//   package ir.mysaboo.app, host mysaboo.ir, app name سبو.
// Saboo needs NO location delegation (unlike metto's map app), so the
// location checks are intentionally absent.
//
// Fails non-zero with a clear message on drift. Does NOT invoke Bubblewrap
// and does NOT regenerate anything. If android/ does not exist yet, it
// prints the exact Bubblewrap init command instead of a cryptic ENOENT.
import { existsSync, readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const repoRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const fail = [];
const ok = (cond, msg) => {
  if (cond) console.log(`  ok: ${msg}`);
  else fail.push(msg);
};

const TWA_MANIFEST = resolve(repoRoot, "android/twa-manifest.json");
if (!existsSync(TWA_MANIFEST)) {
  console.error(`
check-android-config: android/ wrapper not generated yet.

  Run once (after public/manifest.webmanifest is deployed to https://mysaboo.ir/):

    npx @bubblewrap/cli init --manifest https://mysaboo.ir/manifest.webmanifest --directory android

  Then in android/twa-manifest.json set:
    packageId "ir.mysaboo.app", host "mysaboo.ir",
    name/launcherName "سبو", startUrl "/",
    webManifestUrl "https://mysaboo.ir/manifest.webmanifest"

  And in android/app/build.gradle apply the sabooRelease env-signing block
  (see docs/ANDROID_MYKET.md). Re-run this script to verify.
`);
  process.exit(1);
}

const twa = JSON.parse(readFileSync(TWA_MANIFEST, "utf8"));
ok(twa.packageId === "ir.mysaboo.app", `twa-manifest packageId == ir.mysaboo.app (got ${twa.packageId})`);
ok(twa.host === "mysaboo.ir", `twa-manifest host == mysaboo.ir (got ${twa.host})`);
ok(twa.name === "سبو", `twa-manifest name == سبو (got ${twa.name})`);
ok(twa.launcherName === "سبو", `twa-manifest launcherName == سبو (got ${twa.launcherName})`);
ok(twa.startUrl === "/", `twa-manifest startUrl == / (got ${twa.startUrl})`);
ok(twa.display === "standalone", `twa-manifest display == standalone (got ${twa.display})`);
ok(
  twa.webManifestUrl === "https://mysaboo.ir/manifest.webmanifest",
  `twa-manifest webManifestUrl points at prod (got ${twa.webManifestUrl})`,
);

const gradle = readFileSync(resolve(repoRoot, "android/app/build.gradle"), "utf8");
ok(gradle.includes("targetSdkVersion 35") || gradle.includes("targetSdkVersion 36"), "app/build.gradle targetSdkVersion 35/36 (Myket-ready)");
ok(gradle.includes("compileSdkVersion 35") || gradle.includes("compileSdkVersion 36"), "app/build.gradle compileSdkVersion 35/36");
ok(gradle.includes('applicationId "ir.mysaboo.app"'), 'app/build.gradle applicationId "ir.mysaboo.app"');
ok(gradle.includes("signingConfigs") && gradle.includes("sabooRelease"), "app/build.gradle sabooRelease signing block");
ok(gradle.includes("ANDROID_KEYSTORE_PATH"), "app/build.gradle reads ANDROID_KEYSTORE_PATH env");
ok(gradle.includes("sabooVersionCode") && gradle.includes("sabooVersionName"), "app/build.gradle sabooVersion overrides");
ok(!/storePassword\s+"[^"]+"/.test(gradle), "app/build.gradle contains no hard-coded password");

// Web manifest backing the TWA (must be deployed at /manifest.webmanifest,
// NOT the platform /__grok/manifest.webmanifest which is host-dependent).
const webManifestPath = resolve(repoRoot, "public/manifest.webmanifest");
if (!existsSync(webManifestPath)) {
  fail.push("public/manifest.webmanifest is missing (TWA needs a stable /manifest.webmanifest)");
} else {
  const wm = JSON.parse(readFileSync(webManifestPath, "utf8"));
  ok(wm.name?.includes("سبو"), "web manifest name mentions سبو");
  ok(wm.start_url === "/", "web manifest start_url == /");
  ok(wm.display === "standalone", "web manifest display == standalone");
  ok(
    Array.isArray(wm.icons) && wm.icons.some((i) => String(i.sizes).includes("512")),
    "web manifest has a 512px icon (Myket/TWA installable)",
  );
}

if (fail.length) {
  console.error("\ncheck-android-config: FAILED");
  for (const m of fail) console.error(`  missing: ${m}`);
  process.exit(1);
}
console.log("\ncheck-android-config: OK (ir.mysaboo.app, mysaboo.ir, env signing, manifest)");

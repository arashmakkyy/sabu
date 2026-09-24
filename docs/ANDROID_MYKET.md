# اندروید سبو برای مایکت (TWA)

این سند مسیر کامل گرفتن APK امضاشده برای مایکت است. ورک‌فلوها از metto اقتباس
شده‌اند با این تفاوت‌ها: پکیج `ir.mysaboo.app`، هاست `mysaboo.ir`، استک npm
(نه pnpm)، بدون location-delegation (سبو نقشه/GPS ندارد)، و خروجی اول APK
برای مایکت.

## ۱. پیش‌نیاز وب (یک‌بار)

1. `public/manifest.webmanifest` در ریپو هست و روی `https://mysaboo.ir/manifest.webmanifest`
   سرو می‌شود. (نه `/__grok/manifest.webmanifest` که هاست-وابسته است.)
2. دیپلوی Vercel روی `mysaboo.ir` وصل و سبز باشد.

## ۲. ساخت کی‌استور انتشار ✅ انجام شد (۱۴۰۵/۰۷/۰۲)

کی‌استور `saboo-release.jks` (RSA 2048، اعتبار تا ~۲۵ سال بعد) ساخته و
gitignore شده — **هرگز کامیت نمی‌شود**. نکته مهم: keytool جدید فرمت PKCS12
می‌سازد که پسورد جدا برای کلید قبول نمی‌کند، پس **پسورد استور و کلید یکی است**
(مقدار `STOREPASS` زیر را برای هر دو سکرت پسوردی بگذار).

| Secret | مقدار |
|---|---|
| `ANDROID_KEYSTORE_BASE64` | محتوای فایل `saboo-release.jks.b64` (کنار کی‌استور) |
| `ANDROID_KEYSTORE_PASSWORD` | `dEU5cdEqB3vpJpZ6mtBXShmk` |
| `ANDROID_KEY_ALIAS` | `saboo` |
| `ANDROID_KEY_PASSWORD` | `dEU5cdEqB3vpJpZ6mtBXShmk` (همان پسورد استور — PKCS12) |

⚠️ این پسوردها و فایل `saboo-release.jks` را در پسوردمنیجر + یک بکاپ آفلاین
نگه دار. گم شدن کی‌استور = مایکت اپ را همان اپ قبلی نمی‌شناسد و باید اپ جدید
ثبت کنی. برای ساخت مجدد از صفر (فقط اگر هنوز چیزی در مایکت منتشر نکرده‌ای):

```bash
keytool -genkeypair \
  -keystore saboo-release.jks -alias saboo \
  -keyalg RSA -keysize 2048 -validity 9125 \
  -storepass 'STORE_PASS' -keypass 'STORE_PASS' \
  -dname "CN=Saboo, OU=Mobile, O=Saboo, L=Tehran, ST=Tehran, C=IR"
```

## ۳. ثبت سکرت‌ها در گیت‌هاب (یک‌بار — مانده با تو)

Repo → Settings → Environments → New environment به نام `android-release`
(حتماً همین اسم — ورک‌فلوها به آن قفل شده‌اند)، بعد ۴ سکرت جدول مرحله ۲.

## ۴. ساخت رپر `android/` با Bubblewrap (یک‌بار — مانده با تو)

بعد از اینکه manifest روی دامنه اصلی لایو شد:

```bash
npx @bubblewrap/cli init --manifest https://mysaboo.ir/manifest.webmanifest --directory android
```

بعد در `android/twa-manifest.json` این‌ها را ست کن:

- `packageId`: `ir.mysaboo.app`
- `host`: `mysaboo.ir`
- `name` / `launcherName`: `سبو`
- `startUrl`: `/`
- `webManifestUrl`: `https://mysaboo.ir/manifest.webmanifest`
- آیکون‌ها از `public/icon-512.png`

و در `android/app/build.gradle` بلوک امضای env-محور (الگوی metto، با اسم
`sabooRelease` + پراپ‌های `sabooVersionCode` / `sabooVersionName`):

```groovy
signingConfigs {
    sabooRelease {
        def ksPath = System.getenv('ANDROID_KEYSTORE_PATH')
        if (ksPath) {
            storeFile file(ksPath)
            storePassword System.getenv('ANDROID_KEYSTORE_PASSWORD')
            keyAlias System.getenv('ANDROID_KEY_ALIAS')
            keyPassword System.getenv('ANDROID_KEY_PASSWORD')
        }
    }
}
// در defaultConfig بعد از versionCode/versionName:
if (project.hasProperty('sabooVersionCode')) {
    versionCode project.property('sabooVersionCode').toString().toInteger()
}
if (project.hasProperty('sabooVersionName')) {
    versionName project.property('sabooVersionName').toString()
}
// در buildTypes.release:
release {
    minifyEnabled true
    if (System.getenv('ANDROID_KEYSTORE_PATH')) {
        signingConfig signingConfigs.sabooRelease
    }
}
```

اعتبارسنجی:

```bash
node scripts/check-android-config.mjs
```

## ۵. Asset Links ✅ فایل آماده و کامیت‌شدنی است

`public/.well-known/assetlinks.json` با اثر انگشت واقعی کی‌استور ساخته شد.
فقط بعد از دیپلوی چک کن `https://mysaboo.ir/.well-known/assetlinks.json`
همان JSON را برگرداند (بدون ریدایرکت لاگین). اگر روزی کی‌استور را عوض کردی،
این فایل را هم باید به‌روز کنی. قالب فایل:

```json
[
  {
    "relation": ["delegate_permission/common.handle_all_urls"],
    "target": {
      "namespace": "android_app",
      "package_name": "ir.mysaboo.app",
      "sha256_cert_fingerprints": ["<SHA256 از مرحله ۲>"]
    }
  }
]
```

بعد از دیپلوی، `https://mysaboo.ir/.well-known/assetlinks.json` باید JSON
برگرداند (بدون ریدایرکت لاگین).

## ۶. فلوی انتشار (هر نسخه)

```bash
# آماده‌سازی و چک (Actions → Prepare Release → نسخه مثل v0.1.0)
# بعد:
git tag v0.1.0 && git push origin v0.1.0
```

`android-release.yml` بیلد امضاشده می‌گیرد و GitHub Release با این فایل‌ها
می‌سازد: `saboo-v0.1.0.apk` (← همین را در کنسول مایکت آپلود کن) +
` saboo-v0.1.0.aab` + `SHA256SUMS.txt`.

- `versionCode = major*1_000_000 + minor*1_000 + patch` — همیشه صعودی، مایکت
  آپدیت را فقط با versionCode بزرگ‌تر قبول می‌کند.
- تست روی گوشی واقعی قبل از مایکت: Actions → Android Signed Test APK
  (آرتیفکت، بدون انتشار).

## ۷. چک‌لیست مایکت

- [ ] APK امضاشده با گواهی انتشار (نه debug)
- [ ] `applicationId` همیشه `ir.mysaboo.app`
- [ ] `versionCode` بیشتر از نسخه قبلی مایکت
- [ ] آیکون ۵۱۲، نام «سبو»، توضیح فارسی، اسکرین‌شات موبایل
- [ ] targetSdk ‏۳۵/۳۶، minSdk ‏۲۱+

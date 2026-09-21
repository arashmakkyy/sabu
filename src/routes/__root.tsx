import { createRootRoute, HeadContent, Outlet, Scripts } from "@tanstack/react-router";
import { AuthProvider } from "@/lib/auth/provider";
import { PreviewHostBridge } from "@/components/preview-host-bridge";
import { AppGate } from "@/components/app-gate";
import appCss from "../styles.css?url";

const APP_NAME = "سبو";

export const Route = createRootRoute({
  notFoundComponent: NotFound,
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      {
        name: "viewport",
        content: "width=device-width, initial-scale=1, viewport-fit=cover",
      },
      { title: APP_NAME },
      { name: "theme-color", content: "#FDF9EF" },
      {
        name: "description",
        content:
          "سبو — سلامت روان برای فردایی بهتر. آرام‌تر، آگاه‌تر، زندگی روشن‌تر. ذهنت ظرف همه‌چیز نیست.",
      },
      { name: "application-name", content: "سبو" },
    ],
    links: [
      { rel: "icon", type: "image/svg+xml", href: "/favicon.svg" },
      { rel: "icon", type: "image/png", sizes: "32x32", href: "/favicon-32.png" },
      { rel: "icon", type: "image/png", sizes: "16x16", href: "/favicon-16.png" },
      { rel: "canonical", href: "https://mysaboo.ir/" },
      { rel: "stylesheet", href: appCss },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Vazirmatn:wght@300;400;500;600;700;800&display=swap",
      },
      { rel: "manifest", href: "/__grok/manifest.webmanifest" },
      { rel: "apple-touch-icon", href: "/__grok/icon-180.png" },
    ],
  }),
  component: RootDocument,
});

function NotFound() {
  return (
    <div className="flex min-h-full flex-col items-center justify-center px-8 text-center">
      <p className="text-sm text-muted">این صفحه توی سبو نیست.</p>
      <a href="/" className="mt-4 text-sm font-medium text-primary">
        برگرد خونه
      </a>
    </div>
  );
}

function RootDocument() {
  return (
    <html lang="fa" dir="rtl" suppressHydrationWarning className="antialiased">
      <head>
        <HeadContent />
      </head>
      <body className="bg-sand text-ink">
        <PreviewHostBridge />
        <AuthProvider>
          <AppGate>
            <Outlet />
          </AppGate>
        </AuthProvider>
        <Scripts />
      </body>
    </html>
  );
}

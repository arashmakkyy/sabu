import { useEffect, useState } from "react";
import { useRouterState } from "@tanstack/react-router";
import { Toaster } from "sonner";
import { useSaboo } from "@/lib/store";
import { BottomNav } from "./bottom-nav";
import { GuideHost } from "./guide";
import { Onboarding, Splash } from "./onboarding";
import { Overlays } from "./overlays";

const NAV_PATHS = new Set(["/", "/archive", "/stats", "/settings"]);
const SPLASH_MS = 5000;
const SPLASH_FADE_MS = 420;
const SPLASH_KEY = "saboo.splash";

function splashAlreadySeen() {
  try {
    return sessionStorage.getItem(SPLASH_KEY) === "1";
  } catch {
    return false;
  }
}

function markSplashSeen() {
  try {
    sessionStorage.setItem(SPLASH_KEY, "1");
  } catch {
    /* ignore */
  }
}

export function AppGate({ children }: { children: React.ReactNode }) {
  const hydrated = useSaboo((s) => s.hydrated);
  const onboarded = useSaboo((s) => s.onboarded);
  const guide = useSaboo((s) => s.guide);
  const guideDone = useSaboo((s) => s.guideDone);
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const showNav = onboarded && hydrated && NAV_PATHS.has(pathname);
  const [splash, setSplash] = useState<"in" | "out" | "done">(() =>
    splashAlreadySeen() ? "done" : "in",
  );

  useEffect(() => {
    const t = window.setTimeout(() => {
      if (!useSaboo.getState().hydrated) useSaboo.setState({ hydrated: true });
    }, 80);
    return () => window.clearTimeout(t);
  }, []);

  useEffect(() => {
    if (splash === "done") return;
    const fade = window.setTimeout(() => setSplash("out"), SPLASH_MS - SPLASH_FADE_MS);
    const done = window.setTimeout(() => {
      if (!useSaboo.getState().hydrated) useSaboo.setState({ hydrated: true });
      markSplashSeen();
      setSplash("done");
    }, SPLASH_MS);
    return () => {
      window.clearTimeout(fade);
      window.clearTimeout(done);
    };
  }, [splash]);

  useEffect(() => {
    if (splash === "done" && onboarded) useSaboo.getState().maybeAskGuide();
  }, [splash, onboarded, guideDone]);

  useEffect(() => {
    if (splash === "done" && onboarded && !guide) useSaboo.getState().maybeDailyPrompts();
  }, [splash, onboarded, guide]);

  useEffect(() => {
    if (splash === "done" && onboarded && !guide) useSaboo.getState().maybeNightGate();
  }, [splash, onboarded, guide]);

  return (
    <div className="desk-stage">
      <div className="phone-shell">
        {splash !== "done" ? (
          <Splash exiting={splash === "out"} />
        ) : !onboarded ? (
          <Onboarding />
        ) : (
          <>
            <div
              className={
                showNav
                  ? "h-full overflow-y-auto overscroll-contain pb-24"
                  : "h-full overflow-y-auto overscroll-contain"
              }
            >
              {children}
            </div>
            {showNav && <BottomNav />}
            <Overlays />
            <GuideHost />
          </>
        )}
        <Toaster
          position="top-center"
          dir="rtl"
          toastOptions={{
            className: "font-sans",
            style: {
              background: "#fffaf3",
              color: "#24352c",
              border: "none",
              borderRadius: 16,
              fontFamily: "Vazirmatn, sans-serif",
            },
          }}
        />
      </div>
    </div>
  );
}

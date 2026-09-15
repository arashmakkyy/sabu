import { useEffect } from "react";
import { useRouterState } from "@tanstack/react-router";
import { Toaster } from "sonner";
import { useSaboo } from "@/lib/store";
import { BottomNav } from "./bottom-nav";
import { Onboarding, Splash } from "./onboarding";
import { Overlays } from "./overlays";

const NAV_PATHS = new Set(["/", "/archive", "/stats", "/settings"]);

export function AppGate({ children }: { children: React.ReactNode }) {
  const hydrated = useSaboo((s) => s.hydrated);
  const onboarded = useSaboo((s) => s.onboarded);
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const showNav = onboarded && hydrated && NAV_PATHS.has(pathname);

  useEffect(() => {
    const t = window.setTimeout(() => {
      if (!useSaboo.getState().hydrated) useSaboo.setState({ hydrated: true });
    }, 80);
    return () => window.clearTimeout(t);
  }, []);

  useEffect(() => {
    if (hydrated && onboarded) useSaboo.getState().maybeDailyPrompts();
  }, [hydrated, onboarded]);

  return (
    <div className="desk-stage">
      <div className="phone-shell">
        {!hydrated ? (
          <Splash />
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

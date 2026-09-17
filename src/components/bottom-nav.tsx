import { Link, useRouterState } from "@tanstack/react-router";
import { Archive, BarChart3, Home, SlidersHorizontal } from "lucide-react";
import { cn } from "@/lib/cn";

const TABS = [
  { to: "/", label: "خانه", icon: Home },
  { to: "/archive", label: "آرشیو", icon: Archive },
  { to: "/stats", label: "آمار", icon: BarChart3 },
  { to: "/settings", label: "تنظیمات", icon: SlidersHorizontal },
] as const;

export function BottomNav() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  return (
    <nav
      data-tour="nav"
      className="absolute inset-x-0 bottom-0 z-30 border-t border-line bg-bg/92 px-2 pt-1 backdrop-blur-md"
      style={{ paddingBottom: "max(10px, env(safe-area-inset-bottom))" }}
    >
      <ul className="grid grid-cols-4">
        {TABS.map((tab) => {
          const active = pathname === tab.to;
          const Icon = tab.icon;
          return (
            <li key={tab.to}>
              <Link
                to={tab.to}
                className={cn(
                  "flex min-h-14 flex-col items-center justify-center gap-0.5 text-[11px] font-medium",
                  active ? "text-primary" : "text-muted",
                )}
              >
                <Icon
                  className="size-5"
                  strokeWidth={active ? 2.4 : 1.8}
                  fill={active && tab.to === "/" ? "currentColor" : "none"}
                />
                {tab.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

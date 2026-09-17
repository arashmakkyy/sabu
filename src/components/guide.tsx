import { useLayoutEffect, useState } from "react";
import { useNavigate, useRouterState } from "@tanstack/react-router";
import { X } from "lucide-react";
import { useSaboo } from "@/lib/store";
import { Button } from "./ui";

export const GUIDE_STEPS = [
  {
    id: "compose",
    title: "بسپار",
    body: "اینجا بنویس و بده به عروسک. تا صبح پیش اونه.",
  },
  {
    id: "dolls",
    title: "عروسکای فعال",
    body: "نگرانی که سپردی، این‌جا می‌شینه تا تو خالی شی.",
  },
  {
    id: "bell",
    title: "یادآوری",
    body: "اگه چیزی بود، از این زنگ می‌گم.",
  },
  {
    id: "nav",
    title: "بقیه خانه‌ها",
    body: "آرشیو، آمار و تنظیمات این پایینن.",
  },
] as const;

type Hole = { top: number; left: number; width: number; height: number; radius: number };

export function GuideHost() {
  const guide = useSaboo((s) => s.guide);
  if (!guide) return null;
  if (guide.phase === "ask") return <AskCard />;
  return <Tour step={guide.step} />;
}

function AskCard() {
  const start = useSaboo((s) => s.startGuide);
  const skip = useSaboo((s) => s.skipGuide);

  return (
    <div className="absolute inset-0 z-50 grid place-items-center bg-[rgba(36,53,44,0.42)] px-7">
      <div className="w-full rounded-[28px] bg-card px-6 py-8 text-center shadow-soft enter-up">
        <div className="mx-auto size-14 overflow-hidden rounded-full shadow-card">
          <img src="/dolls/mehr.jpg" alt="" className="size-full object-cover" />
        </div>
        <h2 className="mt-5 text-xl font-semibold">یه تور کوتاه؟</h2>
        <p className="mt-2 text-sm leading-7 text-ink-soft">چند ثانیه‌ست. فقط چیزای اصلی.</p>
        <Button className="mt-6" onClick={start}>
          بزن بریم
        </Button>
        <button
          type="button"
          onClick={skip}
          className="mt-3 text-sm text-muted"
        >
          بعداً خودم می‌گردم
        </button>
      </div>
    </div>
  );
}

function Tour({ step }: { step: number }) {
  const navigate = useNavigate();
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const next = useSaboo((s) => s.nextGuide);
  const prev = useSaboo((s) => s.prevGuide);
  const skip = useSaboo((s) => s.skipGuide);
  const [hole, setHole] = useState<Hole | null>(null);
  const [shell, setShell] = useState({ w: 0, h: 0 });
  const current = GUIDE_STEPS[step] ?? GUIDE_STEPS[0];
  const last = step >= GUIDE_STEPS.length - 1;

  useLayoutEffect(() => {
    if (pathname !== "/") {
      void navigate({ to: "/" });
      setHole(null);
      return;
    }

    let tries = 0;
    let raf = 0;
    let timer = 0;

    const measure = () => {
      const root = document.querySelector(".phone-shell");
      const el = document.querySelector(`[data-tour="${current.id}"]`);
      if (!root || !el) {
        if (tries++ < 24) raf = requestAnimationFrame(measure);
        return;
      }
      const sr = root.getBoundingClientRect();
      const r = el.getBoundingClientRect();
      const pad = current.id === "bell" ? 10 : current.id === "nav" ? 4 : 8;
      setShell({ w: sr.width, h: sr.height });
      setHole({
        top: r.top - sr.top - pad,
        left: r.left - sr.left - pad,
        width: r.width + pad * 2,
        height: r.height + pad * 2,
        radius:
          current.id === "bell"
            ? 999
            : Math.min(28, Math.max(14, parseFloat(getComputedStyle(el).borderRadius) || 22)),
      });
    };

    const scroller = document.querySelector(".phone-shell .overflow-y-auto");
    if (current.id === "compose" || current.id === "bell") {
      scroller?.scrollTo({ top: 0, behavior: "smooth" });
    } else if (current.id !== "nav") {
      document
        .querySelector(`[data-tour="${current.id}"]`)
        ?.scrollIntoView({ block: "center", behavior: "smooth" });
    }

    raf = requestAnimationFrame(measure);
    timer = window.setTimeout(measure, 340);
    window.addEventListener("resize", measure);
    return () => {
      cancelAnimationFrame(raf);
      window.clearTimeout(timer);
      window.removeEventListener("resize", measure);
    };
  }, [current.id, pathname, navigate]);

  const tip = hole && shell.w ? placeTip(hole, shell.w, shell.h, current.id) : null;

  return (
    <div className="absolute inset-0 z-50 overflow-hidden">
      <div className="absolute inset-0" />
      {!hole && <div className="absolute inset-0 bg-[rgba(36,53,44,0.4)]" />}
      {hole && (
        <div
          className="pointer-events-none absolute"
          style={{
            top: hole.top,
            left: hole.left,
            width: hole.width,
            height: hole.height,
            borderRadius: hole.radius,
            boxShadow: "0 0 0 9999px rgba(36, 53, 44, 0.4)",
            outline: "2px solid rgba(255,250,243,0.92)",
            outlineOffset: 0,
            transition:
              "top 280ms var(--ease-out-smooth), left 280ms var(--ease-out-smooth), width 280ms var(--ease-out-smooth), height 280ms var(--ease-out-smooth), border-radius 280ms var(--ease-out-smooth)",
          }}
        />
      )}

      {tip && (
        <div
          className="pointer-events-auto absolute z-10 rounded-2xl bg-card px-4 pt-4 pb-3.5 shadow-soft"
          style={
            tip.caret === "bottom"
              ? { bottom: tip.edge, left: tip.left, width: tip.width }
              : { top: tip.edge, left: tip.left, width: tip.width }
          }
        >
          <span
            className="absolute size-2.5 rotate-45 bg-card"
            style={
              tip.caret === "top"
                ? { top: -5, left: tip.caretX }
                : { bottom: -5, left: tip.caretX }
            }
          />
          <button
            type="button"
            aria-label="بستن"
            onClick={skip}
            className="absolute top-2.5 left-2.5 grid size-7 place-items-center rounded-full text-muted"
          >
            <X className="size-4" strokeWidth={1.8} />
          </button>
          <h2 className="pl-7 text-[15px] font-semibold leading-6">{current.title}</h2>
          <p className="mt-1 text-[13px] leading-6 text-ink-soft">{current.body}</p>
          <div className="mt-3 h-0.5 overflow-hidden rounded-full bg-mint">
            <div
              className="h-full rounded-full bg-primary"
              style={{
                width: `${((step + 1) / GUIDE_STEPS.length) * 100}%`,
                transition: "width 280ms var(--ease-out-smooth)",
              }}
            />
          </div>
          <div className="mt-3 flex items-center gap-2">
            {step > 0 && (
              <button
                type="button"
                onClick={prev}
                className="tap h-9 flex-1 rounded-full bg-sand text-[13px] font-medium text-ink"
              >
                قبلی
              </button>
            )}
            <button
              type="button"
              onClick={next}
              className="tap h-9 flex-1 rounded-full bg-primary text-[13px] font-medium text-primary-fg"
            >
              {last ? "تمام" : "بعدی"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function placeTip(
  hole: Hole,
  shellW: number,
  shellH: number,
  id: (typeof GUIDE_STEPS)[number]["id"],
) {
  const width = Math.min(268, shellW - 32);
  const gap = 16;
  const belowEdge = hole.top + hole.height + gap;
  const aboveEdge = shellH - hole.top + gap;
  const roomBelow = shellH - belowEdge - 24;
  const roomAbove = hole.top - 24;

  let caret: "top" | "bottom";
  if (id === "nav") caret = "bottom";
  else if (id === "bell") caret = "top";
  else if (id === "compose" || id === "dolls") caret = roomAbove > 160 ? "bottom" : "top";
  else caret = roomBelow >= roomAbove ? "top" : "bottom";

  const edge = caret === "bottom" ? Math.max(12, aboveEdge) : Math.max(12, belowEdge);

  let left = hole.left + hole.width / 2 - width / 2;
  if (id === "bell") left = Math.min(hole.left, shellW - width - 16);
  left = Math.max(16, Math.min(left, shellW - width - 16));

  const caretX = Math.max(
    16,
    Math.min(hole.left + hole.width / 2 - left - 5, width - 26),
  );

  return { edge, left, width, caret, caretX };
}

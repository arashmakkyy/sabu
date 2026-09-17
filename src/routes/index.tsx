import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Bell, PencilLine, Send } from "lucide-react";
import { useState } from "react";
import { DollPortrait } from "@/components/doll-portrait";
import { Button, IconButton } from "@/components/ui";
import { categoryLabel, getDoll } from "@/lib/dolls";
import { toFaDigits } from "@/lib/persian";
import { selectActive, useSaboo } from "@/lib/store";

export const Route = createFileRoute("/")({ component: Home });

function Home() {
  const navigate = useNavigate();
  const worries = useSaboo((s) => s.worries);
  const unread = useSaboo((s) => s.notifications.some((n) => !n.read));
  const setNotifOpen = useSaboo((s) => s.setNotifOpen);
  const name = useSaboo((s) => s.settings.displayName);
  const [draft, setDraft] = useState("");
  const active = selectActive(worries);

  const dollCards = active.reduce<
    { dollId: string; label: string; worryId: string }[]
  >((acc, w) => {
    if (acc.some((d) => d.dollId === w.dollId)) return acc;
    acc.push({
      dollId: w.dollId,
      label: categoryLabel(w.category) ?? getDoll(w.dollId).name,
      worryId: w.id,
    });
    return acc;
  }, []);

  function goNew() {
    const q = draft.trim();
    navigate({ to: "/new", search: { q: q || undefined } });
  }

  return (
    <div className="px-5 pb-6 pt-5">
      <header className="flex items-start justify-between gap-3 enter-up">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight">سبو</h1>
          <p className="mt-1 max-w-52 text-xs leading-5 text-muted">
            {name
              ? `${name}، جای نگرانی‌هات`
              : "جای نگرانی‌هات و آرامش فردا"}
          </p>
        </div>
        <div className="relative" data-tour="bell">
          <IconButton label="یادآوری‌ها" onClick={() => setNotifOpen(true)}>
            <Bell className="size-5" strokeWidth={1.7} />
          </IconButton>
          {unread && (
            <span className="absolute top-1 right-1 size-2 rounded-full bg-primary" />
          )}
        </div>
      </header>

      <section className="enter-up-2 relative mt-5 overflow-hidden rounded-3xl shadow-card">
        <img
          src="/scenes/banner.jpg"
          alt=""
          className="h-52 w-full object-cover object-center"
        />
        <p className="absolute bottom-5 left-4 max-w-32 text-sm font-medium leading-6 text-ink">
          تو قوی‌تر
          <br />
          از نگرانی‌هایی
          <span className="mt-0.5 inline-block align-middle text-leaf" aria-hidden>
            <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor">
              <path d="M8 14s-6-3.4-6-7.2C2 4.6 3.6 3 5.6 3c1.2 0 2.2.6 2.4 1.5C8.2 3.6 9.2 3 10.4 3 12.4 3 14 4.6 14 6.8 14 10.6 8 14 8 14z" />
            </svg>
          </span>
        </p>
      </section>

      <section className="enter-up-3 mt-6" data-tour="compose">
        <h2 className="text-lg font-semibold">امروز حالت چطوره؟</h2>
        <p className="mt-3 text-sm font-medium text-ink-soft">چی ذهنت رو درگیر کرده؟</p>
        <div className="mt-3 flex items-center gap-3 rounded-2xl bg-card px-4 py-2 shadow-card">
          <input
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") goNew();
            }}
            placeholder="مثلاً: نگران جلسه فردا هستم…"
            className="h-11 flex-1 bg-transparent text-sm outline-none placeholder:text-muted"
          />
          <PencilLine className="size-4 text-muted" />
        </div>
        <Button className="mt-4" onClick={goNew}>
          بسپارش به عروسک
          <Send className="size-4" />
        </Button>
      </section>

      <section className="enter-up-4 mt-8" data-tour="dolls">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-semibold">عروسک‌های فعال من</h2>
          <button
            type="button"
            onClick={() => navigate({ to: "/archive" })}
            className="text-xs text-muted"
          >
            همه
          </button>
        </div>
        {dollCards.length === 0 ? (
          <div className="mt-4 rounded-3xl bg-card px-5 py-7 text-center shadow-card">
            <div className="mx-auto size-16 overflow-hidden rounded-full shadow-card">
              <img src="/dolls/mehr.jpg" alt="" className="size-full object-cover" />
            </div>
            <p className="mt-3 text-sm font-medium">هنوز کسی بیدار نیست.</p>
            <p className="mt-1 text-xs leading-5 text-muted">
              اولین نگرانی‌تو که بسپاری، عروسکش این‌جا می‌شینه.
            </p>
          </div>
        ) : (
          <div className="-mx-5 mt-4 flex gap-3 overflow-x-auto px-5 pb-2">
            {dollCards.map((d) => (
              <button
                key={d.dollId}
                type="button"
                onClick={() =>
                  navigate({ to: "/worry/$id", params: { id: d.worryId } })
                }
                className="tap w-28 shrink-0 rounded-2xl bg-card p-2 shadow-card"
              >
                <div className="aspect-square overflow-hidden rounded-xl">
                  <DollPortrait dollId={d.dollId} />
                </div>
                <p className="mt-2 text-center text-xs font-medium">{d.label}</p>
              </button>
            ))}
          </div>
        )}
        {active.length > 0 && (
          <p className="mt-3 text-center text-xs text-muted">
            {toFaDigits(active.length)} تا الان پیش عروسکاست
          </p>
        )}
      </section>
    </div>
  );
}

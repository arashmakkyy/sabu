import { useEffect, useMemo, useState } from "react";
import { Check, Wind, X } from "lucide-react";
import { cn } from "@/lib/cn";
import { getDoll } from "@/lib/dolls";
import { toFaDigits } from "@/lib/persian";
import { useSaboo } from "@/lib/store";
import { MOOD_LABELS, type MoodValue, type Reflection } from "@/lib/types";
import { DollPortrait } from "./doll-portrait";
import { Button } from "./ui";

export function Overlays() {
  const ritual = useSaboo((s) => s.ritual);
  const notifOpen = useSaboo((s) => s.notifOpen);
  if (!ritual && !notifOpen) return null;
  return (
    <>
      {notifOpen && <NotifSheet />}
      {ritual?.kind === "hand" && <HandRitual worryId={ritual.worryId} />}
      {ritual?.kind === "breath" && <BreathRitual worryId={ritual.worryId} />}
      {ritual?.kind === "night" && <NightRitual via={ritual.via} />}
      {ritual?.kind === "mood" && <MoodSheet />}
      {ritual?.kind === "resolve" && <ResolveSheet worryId={ritual.worryId} />}
    </>
  );
}

function Backdrop({ children, onClose }: { children: React.ReactNode; onClose?: () => void }) {
  return (
    <div className="absolute inset-0 z-40 flex flex-col bg-bg/96 backdrop-blur-sm">
      {onClose && (
        <button
          type="button"
          aria-label="بستن"
          onClick={onClose}
          className="absolute top-4 left-4 z-10 grid size-11 place-items-center rounded-full bg-card shadow-card"
        >
          <X className="size-4" />
        </button>
      )}
      {children}
    </div>
  );
}

function HandRitual({ worryId }: { worryId: string }) {
  const worry = useSaboo((s) => s.worries.find((w) => w.id === worryId));
  const openRitual = useSaboo((s) => s.openRitual);
  const closeRitual = useSaboo((s) => s.closeRitual);
  const doll = getDoll(worry?.dollId ?? "mehr");

  return (
    <Backdrop>
      <div className="flex flex-1 flex-col items-center justify-center px-8 text-center">
        <div className="enter-up relative size-56 overflow-hidden rounded-full shadow-soft">
          <div className="absolute inset-0 animate-[saboo-glow_3s_ease-in-out_infinite]">
            <DollPortrait dollId={doll.id} />
          </div>
        </div>
        <p className="enter-up-2 mt-6 text-sm text-muted">{doll.name} شنید.</p>
        <h2 className="enter-up-2 mt-1 text-2xl font-semibold">سبو گرفت</h2>
        <p className="enter-up-3 mt-3 max-w-xs text-sm leading-7 text-ink-soft">
          {worry?.text}
        </p>
        <p className="enter-up-3 mt-4 text-xs text-muted">ذهنت ظرف همه‌چیز نیست.</p>
      </div>
      <div className="enter-up-4 space-y-3 px-6 pb-8">
        <Button onClick={() => openRitual({ kind: "breath", worryId })}>
          <Wind className="size-4" />
          یه نفس عمیق
        </Button>
        <Button variant="ghost" className="w-full" onClick={closeRitual}>
          باشه
        </Button>
      </div>
    </Backdrop>
  );
}

function BreathRitual({ worryId }: { worryId: string }) {
  const closeRitual = useSaboo((s) => s.closeRitual);
  const [phase, setPhase] = useState<"in" | "out">("in");
  const [cycles, setCycles] = useState(0);

  useEffect(() => {
    const id = window.setInterval(() => {
      setPhase((p) => {
        if (p === "in") return "out";
        setCycles((c) => c + 1);
        return "in";
      });
    }, 4000);
    return () => window.clearInterval(id);
  }, []);

  useEffect(() => {
    if (cycles >= 3) closeRitual();
  }, [cycles, closeRitual]);

  return (
    <Backdrop onClose={closeRitual}>
      <div className="flex flex-1 flex-col items-center justify-center px-8 text-center">
        <div
          className="grid size-44 place-items-center rounded-full bg-mint"
          style={{ animation: "saboo-breathe 4s ease-in-out infinite" }}
        >
          <div className="size-24 rounded-full bg-primary/80" />
        </div>
        <p className="mt-8 text-xl font-semibold">{phase === "in" ? "دم…" : "بازدم…"}</p>
        <p className="mt-2 text-sm text-muted">
          {toFaDigits(Math.min(cycles + 1, 3))} از ۳ نفس
        </p>
        <p className="mt-6 max-w-xs text-sm leading-7 text-ink-soft">
          نگرانی پیش عروسکه. تو فقط نفس بکش.
        </p>
      </div>
      <div className="px-6 pb-8">
        <Button variant="ghost" className="w-full" onClick={closeRitual}>
          بسه
        </Button>
      </div>
      <span className="sr-only">{worryId}</span>
    </Backdrop>
  );
}

function NightRitual({ via }: { via: "gate" | "manual" }) {
  const wake = useSaboo((s) => s.wakeDolls);
  const close = useSaboo((s) => s.closeRitual);
  const gate = via === "gate";
  return (
    <Backdrop>
      <div className="relative flex flex-1 flex-col">
        <img
          src="/scenes/night.jpg"
          alt=""
          className="absolute inset-0 size-full object-cover"
        />
        <div className="absolute inset-0 bg-linear-to-t from-ink/70 via-ink/20 to-transparent" />
        <div className="relative mt-auto px-7 pb-10 text-primary-fg">
          <p className="text-sm text-primary-fg/80">آیین شب</p>
          <h2 className="mt-1 text-2xl font-semibold">عروسکا رفتن زیر بالش</h2>
          <p className="mt-3 text-sm leading-7 text-primary-fg/85">
            تا صبح پیش مهتاب می‌مونن. تو بخواب.
          </p>
          <Button className="mt-6" onClick={gate ? wake : close}>
            {gate ? "دیدن عروسک‌ها" : "شب بخیر"}
          </Button>
        </div>
      </div>
    </Backdrop>
  );
}

function MoodSheet() {
  const setMood = useSaboo((s) => s.setMood);
  const closeRitual = useSaboo((s) => s.closeRitual);
  const today = useSaboo((s) => s.moods.find((m) => m.date === new Date().toISOString().slice(0, 10)));

  return (
    <Backdrop onClose={closeRitual}>
      <div className="mt-auto rounded-t-3xl bg-card px-6 pt-6 pb-8 shadow-soft">
        <h2 className="text-xl font-semibold">امروز حالت چطوره؟</h2>
        <p className="mt-1 text-sm text-muted">یه لمس کافیه. لازم نیست توضیح بدی.</p>
        <div className="mt-6 grid grid-cols-5 gap-2">
          {([1, 2, 3, 4, 5] as MoodValue[]).map((m) => (
            <button
              key={m}
              type="button"
              onClick={() => setMood(m)}
              className={cn(
                "tap flex h-20 flex-col items-center justify-center rounded-2xl text-xs",
                today?.mood === m ? "bg-primary text-primary-fg" : "bg-card-2 text-ink-soft",
              )}
            >
              <span
                className="mb-2 rounded-full bg-current/20"
                style={{ width: 8 + m * 4, height: 8 + m * 4 }}
              />
              {MOOD_LABELS[m]}
            </button>
          ))}
        </div>
      </div>
    </Backdrop>
  );
}

function ResolveSheet({ worryId }: { worryId: string }) {
  const worry = useSaboo((s) => s.worries.find((w) => w.id === worryId));
  const resolveWorry = useSaboo((s) => s.resolveWorry);
  const closeRitual = useSaboo((s) => s.closeRitual);
  const [reflection, setReflection] = useState<Reflection>("better");
  const [note, setNote] = useState("");

  if (!worry) return null;

  const options: { id: Reflection; title: string; body: string }[] = [
    { id: "better", title: "بهتر از فکر من", body: "انقدرها هم بد نبود." },
    { id: "same", title: "همون‌قدر", body: "همون بود که فکر می‌کردم." },
    { id: "worse", title: "سخت‌تر بود", body: "سخت‌تر از چیزی که فکر می‌کردم." },
  ];

  return (
    <Backdrop onClose={closeRitual}>
      <div className="flex flex-1 flex-col overflow-y-auto px-5 pt-16 pb-8">
        <div className="mx-auto size-28 overflow-hidden rounded-full shadow-card">
          <DollPortrait dollId={worry.dollId} />
        </div>
        <h2 className="mt-5 text-center text-xl font-semibold">این نگرانی تموم شد؟</h2>
        <p className="mt-2 text-center text-sm leading-7 text-muted">
          نسبت به چیزی که فکر می‌کردی چطور بود؟
        </p>
        <div className="mt-5 space-y-2">
          {options.map((o) => (
            <button
              key={o.id}
              type="button"
              onClick={() => setReflection(o.id)}
              className={cn(
                "tap flex w-full items-center justify-between rounded-2xl px-4 py-3 text-right shadow-card",
                reflection === o.id ? "bg-mint" : "bg-card",
              )}
            >
              <span>
                <span className="block text-sm font-medium">{o.title}</span>
                <span className="text-xs text-muted">{o.body}</span>
              </span>
              {reflection === o.id && <Check className="size-4 text-primary" />}
            </button>
          ))}
        </div>
        <textarea
          value={note}
          onChange={(e) => setNote(e.target.value)}
          rows={3}
          maxLength={280}
          placeholder="اگه خواستی یه جمله برای بعد بنویس…"
          className="mt-4 resize-none rounded-2xl bg-card px-4 py-3 text-sm leading-7 shadow-card outline-none placeholder:text-muted"
        />
        <Button className="mt-5" onClick={() => resolveWorry(worryId, reflection, note)}>
          این نگرانی تموم شد
        </Button>
      </div>
    </Backdrop>
  );
}

function NotifSheet() {
  const items = useSaboo((s) => s.notifications);
  const setNotifOpen = useSaboo((s) => s.setNotifOpen);
  const putDollsToSleep = useSaboo((s) => s.putDollsToSleep);
  const hour = useMemo(() => new Date().getHours(), []);

  return (
    <Backdrop onClose={() => setNotifOpen(false)}>
      <div className="flex flex-1 flex-col overflow-y-auto px-5 pt-16 pb-8">
        <h2 className="text-xl font-semibold">یادآوری‌ها</h2>
        <p className="mt-1 text-sm text-muted">از این گوشی جایی نمی‌ره.</p>
        {hour >= 21 && (
          <button
            type="button"
            onClick={() => {
              setNotifOpen(false);
              putDollsToSleep();
            }}
            className="tap mt-5 overflow-hidden rounded-2xl text-right shadow-card"
          >
            <img src="/scenes/night.jpg" alt="" className="h-28 w-full object-cover" />
            <span className="block bg-card px-4 py-3 text-sm font-medium">
              عروسکا رو بخوابون
            </span>
          </button>
        )}
        <ul className="mt-5 space-y-2">
          {items.length === 0 && (
            <li className="rounded-2xl bg-card px-4 py-5 text-sm text-muted shadow-card">
              هنوز چیزی نیست.
            </li>
          )}
          {items.map((n) => (
            <li key={n.id} className="rounded-2xl bg-card px-4 py-3 shadow-card">
              <p className="text-sm font-medium">{n.title}</p>
              <p className="mt-1 text-xs leading-5 text-muted">{n.body}</p>
            </li>
          ))}
        </ul>
      </div>
    </Backdrop>
  );
}

import { createFileRoute } from "@tanstack/react-router";
import { useMemo } from "react";
import {
  Area,
  AreaChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { quoteForDay } from "@/lib/quotes";
import {
  formatDurationDays,
  isoDay,
  toFaDigits,
  toJalaliParts,
} from "@/lib/persian";
import {
  checkInStreak,
  insightStats,
  selectActive,
  useSaboo,
} from "@/lib/store";
import { MOOD_LABELS } from "@/lib/types";
import { Button } from "@/components/ui";

export const Route = createFileRoute("/stats")({ component: Stats });

function Stats() {
  const worries = useSaboo((s) => s.worries);
  const moods = useSaboo((s) => s.moods);
  const setMoodOpen = useSaboo((s) => s.openRitual);
  const stats = insightStats(worries);
  const streak = checkInStreak(moods, worries);
  const active = selectActive(worries);
  const quote = quoteForDay();

  const chart = useMemo(() => {
    const map = new Map(moods.map((m) => [m.date, m.mood]));
    const out: { day: string; mood: number; label: string }[] = [];
    for (let i = 13; i >= 0; i--) {
      const ts = Date.now() - i * 86_400_000;
      const key = isoDay(ts);
      const { jd } = toJalaliParts(new Date(ts));
      out.push({
        day: toFaDigits(jd),
        mood: map.get(key) ?? 0,
        label: key,
      });
    }
    return out;
  }, [moods]);

  async function shareInsight() {
    const text = `از ${toFaDigits(stats.resolvedCount)} نگرانی‌م، ${toFaDigits(stats.percent)}٪ بهتر از چیزی بود که فکر می‌کردم.\nذهنت ظرف همه‌چیز نیست. — سبو`;
    try {
      if (navigator.share) {
        await navigator.share({ text, title: "سبو" });
      } else {
        await navigator.clipboard.writeText(text);
      }
    } catch {
      /* cancelled */
    }
  }

  return (
    <div className="px-5 pb-8 pt-6">
      <h1 className="text-center text-xl font-semibold">آمار</h1>

      <section className="enter-up mt-5 rounded-3xl bg-primary px-5 py-6 text-primary-fg">
        <p className="text-xs text-primary-fg/80">روز پشت‌سرهم</p>
        <p className="mt-1 text-4xl font-semibold tabular-nums">
          {toFaDigits(streak)} روز
        </p>
        <p className="mt-2 text-sm leading-6 text-primary-fg/85">
          {streak === 0 ? "از امروز می‌تونه شروع بشه." : quote}
        </p>
      </section>

      <div className="enter-up-2 mt-4 grid grid-cols-2 gap-3">
        <Mini label="فعال" value={toFaDigits(stats.activeCount)} />
        <Mini label="تموم‌شده" value={toFaDigits(stats.resolvedCount)} />
        <Mini
          label="آروم‌تر از فکر"
          value={stats.resolvedCount === 0 ? "—" : `${toFaDigits(stats.percent)}٪`}
        />
        <Mini
          label="میانگین عمر"
          value={stats.resolvedCount === 0 ? "—" : formatDurationDays(stats.avgMs)}
        />
      </div>

      <section className="enter-up-3 mt-6 rounded-3xl bg-card p-4 shadow-card">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-semibold">حال این دو هفته</h2>
          <button
            type="button"
            className="text-xs text-primary"
            onClick={() => setMoodOpen({ kind: "mood" })}
          >
            ثبت امروز
          </button>
        </div>
        <div className="mt-3 h-40" dir="ltr">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chart} margin={{ top: 8, right: 8, left: -24, bottom: 0 }}>
              <defs>
                <linearGradient id="moodFill" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="var(--color-primary)" stopOpacity={0.35} />
                  <stop offset="100%" stopColor="var(--color-primary)" stopOpacity={0.02} />
                </linearGradient>
              </defs>
              <XAxis dataKey="day" tick={{ fontSize: 10, fill: "var(--color-muted)" }} axisLine={false} tickLine={false} />
              <YAxis domain={[0, 5]} hide />
              <Tooltip
                content={({ active, payload }) => {
                  if (!active || !payload?.[0]) return null;
                  const mood = Number(payload[0].value);
                  return (
                    <div className="rounded-lg bg-card px-2 py-1 text-xs shadow-card">
                      {mood ? MOOD_LABELS[mood as 1 | 2 | 3 | 4 | 5] : "ثبت نشده"}
                    </div>
                  );
                }}
              />
              <Area
                type="monotone"
                dataKey="mood"
                stroke="var(--color-primary)"
                strokeWidth={2}
                fill="url(#moodFill)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </section>

      <section className="mt-6 rounded-3xl bg-card px-5 py-5 shadow-card">
        <h2 className="text-sm font-semibold">الان پیش عروسک‌ها</h2>
        <p className="mt-1 text-sm leading-6 text-muted">
          {active.length === 0
            ? "هنوز چیزی پیش عروسکا نیست. وقتی آماده بودی بسپار."
            : `${toFaDigits(active.length)} تا هنوز فعاله. لازم نیست همه‌رو امروز تموم کنی.`}
        </p>
        {stats.resolvedCount > 0 && (
          <Button className="mt-4" variant="secondary" onClick={shareInsight}>
            اشتراک بده
          </Button>
        )}
      </section>
    </div>
  );
}

function Mini({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl bg-card px-4 py-4 shadow-card">
      <p className="text-[11px] text-muted">{label}</p>
      <p className="mt-1 text-xl font-semibold tabular-nums">{value}</p>
    </div>
  );
}

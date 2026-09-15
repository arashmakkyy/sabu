import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { BarChart3, Clock } from "lucide-react";
import type { ReactNode } from "react";
import { DollPortrait } from "@/components/doll-portrait";
import { categoryLabel } from "@/lib/dolls";
import { formatDurationShort, toFaDigits } from "@/lib/persian";
import { insightStats, selectResolved, useSaboo } from "@/lib/store";

export const Route = createFileRoute("/archive")({ component: Archive });

function Archive() {
  const navigate = useNavigate();
  const worries = useSaboo((s) => s.worries);
  const resolved = selectResolved(worries);
  const stats = insightStats(worries);

  return (
    <div className="px-5 pb-8 pt-6">
      <h1 className="text-center text-xl font-semibold">آرشیو و بینش</h1>

      <section className="enter-up relative mt-5 overflow-hidden rounded-3xl shadow-card">
        <img src="/scenes/hills.jpg" alt="" className="h-44 w-full object-cover" />
        <div className="absolute inset-0 bg-linear-to-t from-ink/25 to-transparent" />
        <div className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center text-ink">
          <p className="text-5xl font-semibold tabular-nums">
            {toFaDigits(stats.percent)}٪
          </p>
          <p className="mt-2 max-w-56 text-sm font-medium leading-6">
            بیشتر نگرانی‌ها بهتر از چیزی بود که فکر می‌کردی
          </p>
        </div>
      </section>
      <p className="mt-3 text-center text-xs text-muted">
        هر نگرانی، یه قدم آروم‌تر.
      </p>

      <div className="mt-5 grid grid-cols-2 gap-3">
        <StatChip
          icon={<Clock className="size-4" />}
          label="میانگین مدت"
          value={`${formatDurationShort(stats.avgMs)} روز`}
        />
        <StatChip
          icon={<BarChart3 className="size-4" />}
          label="نگرانی‌های تموم‌شده"
          value={toFaDigits(stats.resolvedCount)}
        />
      </div>

      <div className="mt-7 flex items-center justify-between">
        <h2 className="text-base font-semibold">نگرانی‌های حل‌شده</h2>
        <button
          type="button"
          onClick={() => navigate({ to: "/stats" })}
          className="text-xs text-muted"
        >
          همه
        </button>
      </div>

      {resolved.length === 0 ? (
        <p className="mt-4 rounded-2xl bg-card px-4 py-8 text-center text-sm leading-7 text-muted shadow-card">
          هنوز چیزی تموم نشده. وقتی آماده بودی بگو دیگه لازم نیست نگران بمونه.
        </p>
      ) : (
        <div className="mt-4 grid grid-cols-2 gap-3">
          {resolved.slice(0, 12).map((w) => (
            <button
              key={w.id}
              type="button"
              onClick={() => navigate({ to: "/worry/$id", params: { id: w.id } })}
              className="tap overflow-hidden rounded-2xl bg-card text-right shadow-card"
            >
              <div className="relative h-36">
                <DollPortrait dollId={w.dollId} className="object-top" />
                <span className="absolute top-2 left-2 rounded-full bg-primary px-2.5 py-1 text-[10px] text-primary-fg">
                  حل‌شده
                </span>
              </div>
              <div className="px-3 py-3">
                <p className="truncate text-sm font-medium">
                  {categoryLabel(w.category) ?? w.text}
                </p>
                <p className="mt-1 line-clamp-2 text-xs leading-5 text-muted">
                  {w.reflectionNote || w.text}
                </p>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

function StatChip({
  icon,
  label,
  value,
}: {
  icon: ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-2xl bg-card px-4 py-4 shadow-card">
      <div className="flex items-center gap-1.5 text-muted">
        {icon}
        <span className="text-[11px]">{label}</span>
      </div>
      <p className="mt-2 text-2xl font-semibold tabular-nums">{value}</p>
    </div>
  );
}

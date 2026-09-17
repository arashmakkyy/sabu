import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Send } from "lucide-react";
import { useMemo, useState } from "react";
import { DollTile } from "@/components/doll-portrait";
import { SubHeader } from "@/components/sub-header";
import { Button } from "@/components/ui";
import { CATEGORIES, DOLLS, type CategoryId, type DollId } from "@/lib/dolls";
import { toFaDigits } from "@/lib/persian";
import { useSaboo } from "@/lib/store";

type NewSearch = { q?: string };

export const Route = createFileRoute("/new")({
  component: NewWorry,
  validateSearch: (s: Record<string, unknown>): NewSearch => ({
    q: typeof s.q === "string" ? s.q : undefined,
  }),
});

function NewWorry() {
  const { q } = Route.useSearch();
  const navigate = useNavigate();
  const addWorry = useSaboo((s) => s.addWorry);
  const openRitual = useSaboo((s) => s.openRitual);
  const [text, setText] = useState(q ?? "");
  const [category, setCategory] = useState<CategoryId | undefined>();
  const [dollId, setDollId] = useState<DollId>("setare");

  const remaining = 500 - text.length;
  const canSubmit = text.trim().length > 1;

  const suggested = useMemo(
    () => CATEGORIES.find((c) => c.id === category)?.dollId,
    [category],
  );

  function pickCategory(id: CategoryId) {
    setCategory(id);
    const d = CATEGORIES.find((c) => c.id === id)?.dollId;
    if (d) setDollId(d);
  }

  function submit() {
    if (!canSubmit) return;
    const id = addWorry({
      text: text.trim(),
      dollId,
      category,
    });
    openRitual({ kind: "hand", worryId: id });
    void navigate({ to: "/worry/$id", params: { id } });
  }

  return (
    <div className="flex min-h-full flex-col pb-8">
      <SubHeader
        title="نگرانی جدید"
        subtitle="راحت بنویس. اینجا قضاوت نیست."
      />
      <div className="flex flex-1 flex-col px-5">
        <div className="relative rounded-2xl bg-card shadow-card">
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value.slice(0, 500))}
            rows={5}
            autoFocus
            placeholder="می‌ترسم ارائه‌ام خوب پیش نره."
            className="w-full resize-none rounded-2xl bg-transparent px-4 py-4 text-sm leading-7 outline-none placeholder:text-muted"
          />
          <span className="absolute bottom-3 left-3 text-[11px] text-muted">
            {toFaDigits(text.length)}/{toFaDigits(500)}
          </span>
        </div>

        <p className="mt-6 text-sm font-medium">موضوع</p>
        <div className="mt-2 flex flex-wrap gap-2">
          {CATEGORIES.map((c) => (
            <button
              key={c.id}
              type="button"
              onClick={() => pickCategory(c.id)}
              className={
                category === c.id
                  ? "h-9 rounded-full bg-primary px-3 text-xs text-primary-fg"
                  : "h-9 rounded-full bg-card px-3 text-xs text-ink-soft shadow-card"
              }
            >
              {c.label}
            </button>
          ))}
        </div>

        <div className="mt-6" data-tour="new-dolls">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium">عروسکتو انتخاب کن</p>
            {suggested && dollId !== suggested && (
              <button
                type="button"
                className="text-xs text-primary"
                onClick={() => setDollId(suggested)}
              >
                پیشنهاد سبو
              </button>
            )}
          </div>
          <div className="mt-3 grid grid-cols-2 gap-3">
            {DOLLS.map((d) => (
              <DollTile
                key={d.id}
                dollId={d.id}
                selected={dollId === d.id}
                onSelect={() => setDollId(d.id)}
              />
            ))}
          </div>
        </div>

        <Button className="mt-6" disabled={!canSubmit} onClick={submit}>
          این نگرانی رو می‌سپارم
          <Send className="size-4" />
        </Button>
        <p className="mt-3 text-center text-xs leading-5 text-muted">
          هر وقت خواستی می‌تونی دوباره بهش بگی.
        </p>
        <p className="sr-only">{remaining}</p>
      </div>
    </div>
  );
}

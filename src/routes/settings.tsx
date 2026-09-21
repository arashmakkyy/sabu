import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Download, Upload } from "lucide-react";
import { useRef, useState } from "react";
import { Button, Switch } from "@/components/ui";
import { backupFilename, makeBackup, parseBackup } from "@/lib/backup";
import { toFaDigits } from "@/lib/persian";
import { useSaboo } from "@/lib/store";

export const Route = createFileRoute("/settings")({ component: Settings });

function Settings() {
  const navigate = useNavigate();
  const settings = useSaboo((s) => s.settings);
  const updateSettings = useSaboo((s) => s.updateSettings);
  const resetAll = useSaboo((s) => s.resetAll);
  const snapshot = useSaboo((s) => s.snapshot);
  const importSnapshot = useSaboo((s) => s.importSnapshot);
  const putDollsToSleep = useSaboo((s) => s.putDollsToSleep);
  const openRitual = useSaboo((s) => s.openRitual);
  const startGuide = useSaboo((s) => s.startGuide);
  const [name, setName] = useState(settings.displayName);
  const [status, setStatus] = useState<{ kind: "ok" | "err"; text: string } | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  function exportData() {
    const backup = makeBackup(snapshot());
    const blob = new Blob([JSON.stringify(backup, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = backupFilename();
    a.click();
    URL.revokeObjectURL(url);
    setStatus({ kind: "ok", text: "فایل ذخیره شد. بعداً همون رو بیار تو." });
  }

  async function onPickFile(file: File | undefined) {
    if (!file) return;
    const raw = await file.text();
    const result = parseBackup(raw);
    if (!result.ok) {
      setStatus({ kind: "err", text: result.error });
      return;
    }
    const { summary } = result;
    const ok = confirm(
      `${toFaDigits(summary.worries)} نگرانی و ${toFaDigits(summary.moods)} حال تو این فایل‌ه.\nدادهٔ الان این گوشی عوض می‌شه. ادامه می‌دی؟`,
    );
    if (!ok) return;
    importSnapshot(result.data);
    setName(result.data.settings.displayName);
    setStatus({
      kind: "ok",
      text: `اومد: ${toFaDigits(summary.active)} فعال، ${toFaDigits(summary.resolved)} تموم‌شده.`,
    });
  }

  return (
    <div className="px-5 pb-8 pt-6">
      <h1 className="text-center text-xl font-semibold">تنظیمات</h1>

      <section className="mt-6 overflow-hidden rounded-3xl bg-card shadow-card">
        <div className="flex items-center gap-4 px-4 py-4">
          <img
            src="/dolls/mehr.jpg"
            alt=""
            className="size-16 rounded-full object-cover"
          />
          <div className="flex-1">
            <p className="text-xs text-muted">اسمت</p>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              onBlur={() => updateSettings({ displayName: name.trim() })}
              placeholder="اختیاری"
              className="mt-1 w-full bg-transparent text-base font-medium outline-none placeholder:text-muted"
            />
          </div>
        </div>
      </section>

      <section className="mt-4 overflow-hidden rounded-3xl bg-card shadow-card">
        <Row
          title="صدای نرم"
          body="وقتی می‌سپاری یه زنگ کوچیک می‌زنه"
          checked={settings.sound}
          onChange={(v) => updateSettings({ sound: v })}
        />
        <Row
          title="لرزش آروم"
          body="دکمه‌های اصلی یه لرزش کوچیک دارن"
          checked={settings.haptics}
          onChange={(v) => updateSettings({ haptics: v })}
        />
        <Row
          title="آیین شب"
          body="بعد از نه، عروسکا می‌رن زیر بالش"
          checked={settings.nightRitual}
          onChange={(v) => updateSettings({ nightRitual: v })}
          last
        />
      </section>

      <section className="mt-4 overflow-hidden rounded-3xl bg-card shadow-card">
        <button
          type="button"
          onClick={() => putDollsToSleep()}
          className="flex w-full items-center justify-between px-4 py-4 text-right"
        >
          <span>
            <span className="block text-sm font-medium">خوابوندن عروسکا</span>
            <span className="text-xs text-muted">همین الان بخوابونشون</span>
          </span>
        </button>
        <button
          type="button"
          onClick={() => openRitual({ kind: "mood" })}
          className="flex w-full items-center justify-between border-t border-line px-4 py-4 text-right"
        >
          <span>
            <span className="block text-sm font-medium">حال امروز</span>
            <span className="text-xs text-muted">یه لمس، بدون حرف</span>
          </span>
        </button>
        <button
          type="button"
          onClick={() => navigate({ to: "/new" })}
          className="flex w-full items-center justify-between border-t border-line px-4 py-4 text-right"
        >
          <span>
            <span className="block text-sm font-medium">نگرانی تازه</span>
            <span className="text-xs text-muted">بسپار و خالی شو</span>
          </span>
        </button>
      </section>

      <section className="mt-4 rounded-3xl bg-card px-5 py-5 shadow-card" data-tour="backup">
        <h2 className="text-sm font-semibold">خروجی و ورود</h2>
        <p className="mt-2 text-sm leading-7 text-ink-soft">
          همه نگرانی‌ها، حال‌ها و عکسا تو یه فایل می‌مونه. ببرش رو گوشی دیگه.
        </p>
        <div className="mt-4 grid grid-cols-2 gap-2">
          <Button variant="secondary" className="w-full" onClick={exportData}>
            <Download className="size-4" />
            خروجی
          </Button>
          <Button variant="secondary" className="w-full" onClick={() => fileRef.current?.click()}>
            <Upload className="size-4" />
            ورود
          </Button>
        </div>
        <input
          ref={fileRef}
          type="file"
          accept="application/json,.json"
          className="hidden"
          onChange={(e) => {
            const file = e.target.files?.[0];
            e.target.value = "";
            void onPickFile(file);
          }}
        />
        {status && (
          <p
            className={
              status.kind === "ok"
                ? "mt-3 text-sm leading-6 text-primary"
                : "mt-3 text-sm leading-6 text-danger"
            }
          >
            {status.text}
          </p>
        )}
      </section>

      <section className="mt-6 rounded-3xl bg-card px-5 py-5 shadow-card">
        <div className="flex items-center gap-3">
          <img
            src="/saboo-logo.png"
            alt="لوگوی سبو"
            width={40}
            height={40}
            className="size-10 rounded-xl shadow-card"
          />
          <h2 className="text-sm font-semibold">درباره سبو</h2>
        </div>
        <p className="mt-2 text-sm leading-7 text-ink-soft">
          سبو جای بیرون از ذهنه. عروسکا نگرانی‌تو نگه می‌دارن تا تو سبک‌تر شی.
          داده‌هات فقط رو همین گوشی می‌مونه؛ نه اکانت، نه ابر، نه تبلیغ.
        </p>
        <p className="mt-3 text-sm leading-7 text-ink-soft">
          این برنامه جای درمان نیست. اگه سنگینه، با یکی که اعتماد داری حرف بزن.
        </p>
      </section>

      <div className="mt-5 space-y-2">
        <Button variant="secondary" className="w-full" onClick={startGuide}>
          دوباره راهنما
        </Button>
        <Button
          variant="ghost"
          className="w-full text-danger"
          onClick={() => {
            if (confirm("همه چیز پاک بشه؟ برگشت نداره.")) resetAll();
          }}
        >
          همه چیز پاک بشه
        </Button>
      </div>
    </div>
  );
}

function Row({
  title,
  body,
  checked,
  onChange,
  last,
}: {
  title: string;
  body: string;
  checked: boolean;
  onChange: (v: boolean) => void;
  last?: boolean;
}) {
  return (
    <div
      className={
        last
          ? "flex items-center justify-between gap-4 px-4 py-4"
          : "flex items-center justify-between gap-4 border-b border-line px-4 py-4"
      }
    >
      <div>
        <p className="text-sm font-medium">{title}</p>
        <p className="mt-0.5 text-xs leading-5 text-muted">{body}</p>
      </div>
      <Switch checked={checked} onCheckedChange={onChange} label={title} />
    </div>
  );
}

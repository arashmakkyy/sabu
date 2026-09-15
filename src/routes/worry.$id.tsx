import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Check, ImagePlus, Mic, Type, Plus } from "lucide-react";
import { useRef, useState, type ReactNode } from "react";
import { toast } from "sonner";
import { DollPortrait } from "@/components/doll-portrait";
import { SubHeader } from "@/components/sub-header";
import { Button } from "@/components/ui";
import { getDoll, categoryLabel } from "@/lib/dolls";
import { fileToDataUrl, startSpeech } from "@/lib/media";
import { formatRelative } from "@/lib/persian";
import { useSaboo } from "@/lib/store";
import { cn } from "@/lib/cn";

export const Route = createFileRoute("/worry/$id")({
  component: WorryDetail,
});

function WorryDetail() {
  const { id } = Route.useParams();
  const navigate = useNavigate();
  const worry = useSaboo((s) => s.worries.find((w) => w.id === id));
  const addNote = useSaboo((s) => s.addNote);
  const deleteWorry = useSaboo((s) => s.deleteWorry);
  const openRitual = useSaboo((s) => s.openRitual);
  const reopenWorry = useSaboo((s) => s.reopenWorry);
  const [draft, setDraft] = useState("");
  const [listening, setListening] = useState(false);
  const stopRef = useRef<(() => void) | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  if (!worry) {
    return (
      <div className="flex min-h-full flex-col items-center justify-center px-8 text-center">
        <p className="text-sm text-muted">این یکی نیست.</p>
        <Button className="mt-4 max-w-xs" onClick={() => navigate({ to: "/" })}>
          خانه
        </Button>
      </div>
    );
  }

  const doll = getDoll(worry.dollId);
  const events = [
    { id: "origin", at: worry.createdAt, text: worry.text, photo: undefined as string | undefined },
    ...worry.notes.map((n) => ({
      id: n.id,
      at: n.createdAt,
      text: n.content,
      photo: n.photoDataUrl,
    })),
  ].sort((a, b) => a.at - b.at);

  function saveNote(type: "text" | "voice" | "photo", content: string, photo?: string) {
    if (!content.trim() && !photo) return;
    addNote(worry!.id, { type, content: content.trim() || "عکس", photoDataUrl: photo });
    setDraft("");
  }

  async function onPhoto(file?: File) {
    if (!file) return;
    try {
      const url = await fileToDataUrl(file);
      saveNote("photo", "یه عکس", url);
    } catch {
      toast("نتونستم عکس رو بخونم.");
    }
  }

  function toggleMic() {
    if (listening) {
      stopRef.current?.();
      setListening(false);
      return;
    }
    try {
      stopRef.current = startSpeech((t) => setDraft(t));
      setListening(true);
    } catch {
      toast("رو این گوشی صدا کار نمی‌کنه. بنویس.");
    }
  }

  return (
    <div className="flex min-h-full flex-col pb-8">
      <SubHeader
        title={doll.name}
        onMore={() => {
          if (confirm("این نگرانی پاک بشه؟")) {
            deleteWorry(worry.id);
            void navigate({ to: "/" });
          }
        }}
      />

      <div className="px-5">
        <div className="overflow-hidden rounded-3xl bg-card shadow-card">
          <div className="relative h-72">
            <DollPortrait dollId={doll.id} className="object-top" />
            <div className="absolute inset-x-0 bottom-0 bg-linear-to-t from-bg via-bg/40 to-transparent px-4 pb-4 pt-16">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold">
                  {categoryLabel(worry.category) ? `نگرانی ${categoryLabel(worry.category)}` : worry.text.slice(0, 22)}
                </h2>
                <span
                  className={cn(
                    "rounded-full px-3 py-1 text-[11px] font-medium",
                    worry.status === "active"
                      ? "bg-mint text-primary"
                      : "bg-sun text-ink",
                  )}
                >
                  {worry.status === "active" ? "فعال" : "حل‌شده"}
                </span>
              </div>
            </div>
          </div>
        </div>

        <ol className="relative mt-6 space-y-4 pr-3">
          <span className="absolute top-2 bottom-2 right-[5px] w-px bg-mint" />
          {events.map((e, i) => (
            <li key={e.id} className="relative pr-6">
              <span
                className={cn(
                  "absolute top-3 right-0 size-2.5 rounded-full",
                  i === events.length - 1 ? "bg-primary" : "bg-leaf/50",
                )}
              />
              <p className="text-[11px] text-muted">{formatRelative(e.at)}</p>
              <div className="mt-1 rounded-2xl bg-card px-4 py-3 text-sm leading-7 shadow-card">
                {e.text}
                {e.photo && (
                  <img
                    src={e.photo}
                    alt=""
                    className="mt-2 max-h-40 w-full rounded-xl object-cover"
                  />
                )}
              </div>
            </li>
          ))}
        </ol>

        {worry.status === "resolved" && worry.reflectionNote && (
          <div className="mt-4 rounded-2xl bg-mint px-4 py-3 text-sm leading-7">
            {worry.reflectionNote}
          </div>
        )}

        {worry.status === "active" && (
          <>
            <div className="mt-6 rounded-2xl bg-card px-3 py-2 shadow-card">
              <div className="flex items-center gap-2">
                <Plus className="size-4 text-muted" />
                <input
                  value={draft}
                  onChange={(e) => setDraft(e.target.value)}
                  placeholder="یه خط برای بعد"
                  className="h-11 flex-1 bg-transparent text-sm outline-none placeholder:text-muted"
                  onKeyDown={(e) => {
                    if (e.key === "Enter") saveNote("text", draft);
                  }}
                />
              </div>
            </div>
            <div className="mt-3 grid grid-cols-3 gap-2">
              <ToolBtn
                label="متن"
                icon={<Type className="size-4" />}
                onClick={() => {
                  if (draft.trim()) saveNote("text", draft);
                }}
              />
              <ToolBtn
                label={listening ? "می‌شنوم" : "صدا"}
                icon={<Mic className="size-4" />}
                active={listening}
                onClick={toggleMic}
              />
              <ToolBtn
                label="عکس"
                icon={<ImagePlus className="size-4" />}
                onClick={() => fileRef.current?.click()}
              />
            </div>
            <input
              ref={fileRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => onPhoto(e.target.files?.[0])}
            />
            <Button
              className="mt-6"
              onClick={() => openRitual({ kind: "resolve", worryId: worry.id })}
            >
              <Check className="size-4" />
              این نگرانی تموم شد
            </Button>
          </>
        )}

        {worry.status === "resolved" && (
          <Button
            variant="secondary"
            className="mt-6 w-full"
            onClick={() => reopenWorry(worry.id)}
          >
            دوباره فعالش کن
          </Button>
        )}
      </div>
    </div>
  );
}

function ToolBtn({
  label,
  icon,
  onClick,
  active,
}: {
  label: string;
  icon: ReactNode;
  onClick: () => void;
  active?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "tap flex h-16 flex-col items-center justify-center gap-1 rounded-2xl text-xs shadow-card",
        active ? "bg-mint text-primary" : "bg-card text-ink-soft",
      )}
    >
      {icon}
      {label}
    </button>
  );
}

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { DOLLS, type CategoryId, type DollId } from "./dolls";
import { uid } from "./id";
import { isoDay } from "./persian";
import { buildDemoMoods, buildDemoWorries } from "./seed";
import type {
  AppNotification,
  MoodValue,
  Note,
  NoteType,
  Reflection,
  Settings,
  Worry,
} from "./types";
import { haptic, playChime, playResolve } from "./audio";
import type { SabooBackupData } from "./backup";

type RitualState =
  | { kind: "hand"; worryId: string }
  | { kind: "breath"; worryId: string }
  | { kind: "night" }
  | { kind: "mood" }
  | { kind: "resolve"; worryId: string }
  | null;

type SabooState = {
  hydrated: boolean;
  onboarded: boolean;
  worries: Worry[];
  moods: { date: string; mood: MoodValue }[];
  notifications: AppNotification[];
  settings: Settings;
  lastNightRitualDay?: string;
  lastMoodPromptDay?: string;
  ritual: RitualState;
  notifOpen: boolean;

  markHydrated: () => void;
  completeOnboarding: () => void;
  addWorry: (input: { text: string; dollId: DollId; category?: CategoryId }) => string;
  addNote: (
    worryId: string,
    input: { type: NoteType; content: string; photoDataUrl?: string },
  ) => void;
  resolveWorry: (worryId: string, reflection: Reflection, note?: string) => void;
  reopenWorry: (worryId: string) => void;
  deleteWorry: (worryId: string) => void;
  updateWorry: (worryId: string, patch: Partial<Pick<Worry, "text" | "dollId" | "category">>) => void;
  setMood: (mood: MoodValue) => void;
  markNotifsRead: () => void;
  updateSettings: (patch: Partial<Settings>) => void;
  openRitual: (ritual: RitualState) => void;
  closeRitual: () => void;
  setNotifOpen: (open: boolean) => void;
  completeNightRitual: () => void;
  maybeDailyPrompts: () => void;
  resetAll: () => void;
  loadDemo: () => void;
  snapshot: () => SabooBackupData;
  importSnapshot: (data: SabooBackupData) => void;
};

const defaultSettings: Settings = {
  displayName: "",
  sound: true,
  haptics: true,
  nightRitual: true,
};

function pushNotif(
  list: AppNotification[],
  title: string,
  body: string,
): AppNotification[] {
  return [
    {
      id: uid(),
      title,
      body,
      createdAt: Date.now(),
      read: false,
    },
    ...list,
  ].slice(0, 24);
}

function feedback(kind: "chime" | "resolve", settings: Settings) {
  if (settings.haptics) haptic(kind === "resolve" ? [12, 40, 18] : 16);
  if (!settings.sound) return;
  if (kind === "resolve") void playResolve();
  else void playChime();
}

export const useSaboo = create<SabooState>()(
  persist(
    (set, get) => ({
      hydrated: false,
      onboarded: false,
      worries: [],
      moods: [],
      notifications: [],
      settings: defaultSettings,
      ritual: null,
      notifOpen: false,

      markHydrated: () => set({ hydrated: true }),

      completeOnboarding: () => {
        const hasData = get().worries.length > 0;
        set({
          onboarded: true,
          worries: hasData ? get().worries : buildDemoWorries(),
          moods: hasData ? get().moods : buildDemoMoods(),
          notifications: hasData
            ? get().notifications
            : pushNotif(
                [],
                "سبو آماده‌ست",
                "نگرانی‌هاتو اینجا بذار.",
              ),
        });
      },

      addWorry: ({ text, dollId, category }) => {
        const id = uid();
        const now = Date.now();
        const worry: Worry = {
          id,
          text: text.trim(),
          dollId,
          category,
          status: "active",
          createdAt: now,
          updatedAt: now,
          notes: [],
        };
        const doll = DOLLS.find((d) => d.id === dollId)?.name ?? "عروسک";
        set((s) => ({
          worries: [worry, ...s.worries],
          notifications: pushNotif(
            s.notifications,
            `${doll} گرفت`,
            "تا وقتی لازم باشه پیش خودش نگه می‌داره.",
          ),
        }));
        feedback("chime", get().settings);
        return id;
      },

      addNote: (worryId, input) => {
        const note: Note = {
          id: uid(),
          type: input.type,
          content: input.content.trim(),
          createdAt: Date.now(),
          photoDataUrl: input.photoDataUrl,
        };
        set((s) => ({
          worries: s.worries.map((w) =>
            w.id === worryId
              ? { ...w, notes: [...w.notes, note], updatedAt: note.createdAt }
              : w,
          ),
        }));
        if (get().settings.haptics) haptic(10);
      },

      resolveWorry: (worryId, reflection, note) => {
        const now = Date.now();
        set((s) => ({
          worries: s.worries.map((w) =>
            w.id === worryId
              ? {
                  ...w,
                  status: "resolved" as const,
                  resolvedAt: now,
                  updatedAt: now,
                  reflection,
                  reflectionNote: note?.trim() || w.reflectionNote,
                }
              : w,
          ),
          notifications: pushNotif(
            s.notifications,
            "این نگرانی تموم شد",
            "برو آرشیو، ببینش.",
          ),
          ritual: null,
        }));
        feedback("resolve", get().settings);
      },

      reopenWorry: (worryId) => {
        set((s) => ({
          worries: s.worries.map((w) =>
            w.id === worryId
              ? {
                  ...w,
                  status: "active",
                  resolvedAt: undefined,
                  updatedAt: Date.now(),
                }
              : w,
          ),
        }));
      },

      deleteWorry: (worryId) => {
        set((s) => ({
          worries: s.worries.filter((w) => w.id !== worryId),
        }));
      },

      updateWorry: (worryId, patch) => {
        set((s) => ({
          worries: s.worries.map((w) =>
            w.id === worryId ? { ...w, ...patch, updatedAt: Date.now() } : w,
          ),
        }));
      },

      setMood: (mood) => {
        const date = isoDay();
        set((s) => ({
          moods: [
            ...s.moods.filter((m) => m.date !== date),
            { date, mood },
          ].sort((a, b) => a.date.localeCompare(b.date)),
          lastMoodPromptDay: date,
          ritual: s.ritual?.kind === "mood" ? null : s.ritual,
        }));
      },

      markNotifsRead: () => {
        set((s) => ({
          notifications: s.notifications.map((n) => ({ ...n, read: true })),
        }));
      },

      updateSettings: (patch) => {
        set((s) => ({ settings: { ...s.settings, ...patch } }));
      },

      openRitual: (ritual) => set({ ritual }),
      closeRitual: () => set({ ritual: null }),
      setNotifOpen: (open) => {
        set({ notifOpen: open });
        if (open) get().markNotifsRead();
      },

      completeNightRitual: () => {
        set({ lastNightRitualDay: isoDay(), ritual: null });
        feedback("chime", get().settings);
      },

      maybeDailyPrompts: () => {
        const today = isoDay();
        const hour = new Date().getHours();
        const s = get();
        let notifications = s.notifications;
        let ritual = s.ritual;
        let lastMoodPromptDay = s.lastMoodPromptDay;

        const hasMoodToday = s.moods.some((m) => m.date === today);
        if (!hasMoodToday && s.lastMoodPromptDay !== today && s.onboarded) {
          lastMoodPromptDay = today;
        }

        if (
          s.settings.nightRitual &&
          hour >= 21 &&
          s.lastNightRitualDay !== today &&
          !notifications.some(
            (n) => n.title.includes("بخوابون") && isoDay(n.createdAt) === today,
          )
        ) {
          notifications = pushNotif(
            notifications,
            "وقت خوابوندن عروسکاست",
            "بذارشون زیر بالش. مهتاب تا صبح بیداره.",
          );
        }
        set({ notifications, ritual, lastMoodPromptDay });
      },

      resetAll: () => {
        set({
          onboarded: true,
          worries: [],
          moods: [],
          notifications: [],
          lastNightRitualDay: undefined,
          lastMoodPromptDay: undefined,
          ritual: null,
        });
      },

      loadDemo: () => {
        set({
          onboarded: true,
          worries: buildDemoWorries(),
          moods: buildDemoMoods(),
          notifications: pushNotif(
            [],
            "نمونه اومد",
            "چند تا نگرانی نمونه گذاشتم تا حسش کنی.",
          ),
        });
      },

      snapshot: () => {
        const s = get();
        return {
          onboarded: s.onboarded,
          worries: s.worries,
          moods: s.moods,
          notifications: s.notifications,
          settings: s.settings,
          lastNightRitualDay: s.lastNightRitualDay,
          lastMoodPromptDay: s.lastMoodPromptDay,
        };
      },

      importSnapshot: (data) => {
        set({
          onboarded: data.onboarded,
          worries: data.worries,
          moods: data.moods,
          notifications: pushNotif(
            data.notifications,
            "داده‌ها اومد",
            "فایل سبو اومد رو این گوشی.",
          ),
          settings: data.settings,
          lastNightRitualDay: data.lastNightRitualDay,
          lastMoodPromptDay: data.lastMoodPromptDay,
          ritual: null,
          notifOpen: false,
        });
      },
    }),
    {
      name: "saboo-v1",
      partialize: (s) => ({
        onboarded: s.onboarded,
        worries: s.worries,
        moods: s.moods,
        notifications: s.notifications,
        settings: s.settings,
        lastNightRitualDay: s.lastNightRitualDay,
        lastMoodPromptDay: s.lastMoodPromptDay,
      }),
      onRehydrateStorage: () => () => {
        useSaboo.setState({ hydrated: true });
      },
    },
  ),
);

export function selectActive(worries: Worry[]) {
  return worries
    .filter((w) => w.status === "active")
    .sort((a, b) => b.updatedAt - a.updatedAt);
}

export function selectResolved(worries: Worry[]) {
  return worries
    .filter((w) => w.status === "resolved")
    .sort((a, b) => (b.resolvedAt ?? 0) - (a.resolvedAt ?? 0));
}

export function insightStats(worries: Worry[]) {
  const resolved = selectResolved(worries);
  const better = resolved.filter((w) => w.reflection === "better").length;
  const percent =
    resolved.length === 0 ? 0 : Math.round((better / resolved.length) * 100);
  const durations = resolved
    .filter((w) => w.resolvedAt)
    .map((w) => (w.resolvedAt as number) - w.createdAt);
  const avgMs =
    durations.length === 0
      ? 0
      : durations.reduce((a, b) => a + b, 0) / durations.length;
  return {
    resolvedCount: resolved.length,
    activeCount: selectActive(worries).length,
    betterCount: better,
    percent,
    avgMs,
  };
}

export function checkInStreak(moods: { date: string }[], worries: Worry[]): number {
  const days = new Set<string>([
    ...moods.map((m) => m.date),
    ...worries.map((w) => isoDay(w.createdAt)),
    ...worries.flatMap((w) => w.notes.map((n) => isoDay(n.createdAt))),
    ...worries.filter((w) => w.resolvedAt).map((w) => isoDay(w.resolvedAt as number)),
  ]);
  let streak = 0;
  const cursor = new Date();
  cursor.setHours(0, 0, 0, 0);
  for (let i = 0; i < 400; i++) {
    const key = isoDay(cursor.getTime());
    if (days.has(key)) {
      streak += 1;
      cursor.setDate(cursor.getDate() - 1);
    } else if (i === 0) {
      cursor.setDate(cursor.getDate() - 1);
    } else {
      break;
    }
  }
  return streak;
}

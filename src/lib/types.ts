import type { CategoryId, DollId } from "./dolls";

export type NoteType = "text" | "voice" | "photo";

export type Note = {
  id: string;
  type: NoteType;
  content: string;
  createdAt: number;
  photoDataUrl?: string;
};

export type Reflection = "better" | "same" | "worse";

export type WorryStatus = "active" | "resolved";

export type Worry = {
  id: string;
  text: string;
  dollId: DollId;
  category?: CategoryId;
  status: WorryStatus;
  createdAt: number;
  updatedAt: number;
  resolvedAt?: number;
  notes: Note[];
  reflection?: Reflection;
  reflectionNote?: string;
};

export type MoodValue = 1 | 2 | 3 | 4 | 5;

export type MoodEntry = {
  date: string;
  mood: MoodValue;
};

export type AppNotification = {
  id: string;
  title: string;
  body: string;
  createdAt: number;
  read: boolean;
};

export type Settings = {
  displayName: string;
  sound: boolean;
  haptics: boolean;
  nightRitual: boolean;
};

export const MOOD_LABELS: Record<MoodValue, string> = {
  1: "سنگین",
  2: "خسته",
  3: "معمولی",
  4: "آرام",
  5: "سبک",
};

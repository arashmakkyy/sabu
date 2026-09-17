import { DOLLS, type CategoryId, type DollId } from "./dolls";
import type {
  AppNotification,
  MoodEntry,
  MoodValue,
  Note,
  NoteType,
  Reflection,
  Settings,
  Worry,
  WorryStatus,
} from "./types";

export const BACKUP_APP = "saboo";
export const BACKUP_VERSION = 1;

const DOLL_IDS = new Set<string>(DOLLS.map((d) => d.id));
const CATEGORIES = new Set<string>([
  "work",
  "family",
  "study",
  "future",
  "health",
  "love",
  "money",
  "sleep",
  "other",
]);

export type SabooBackupData = {
  onboarded: boolean;
  guideDone?: boolean;
  worries: Worry[];
  moods: MoodEntry[];
  notifications: AppNotification[];
  settings: Settings;
  lastNightRitualDay?: string;
  lastMoodPromptDay?: string;
  lastAutoSleepNight?: string;
  dollsAsleep?: boolean;
};

export type SabooBackup = {
  app: typeof BACKUP_APP;
  version: number;
  exportedAt: string;
  data: SabooBackupData;
};

export type BackupResult =
  | { ok: true; data: SabooBackupData; summary: BackupSummary }
  | { ok: false; error: string };

export type BackupSummary = {
  worries: number;
  active: number;
  resolved: number;
  moods: number;
  notes: number;
};

const defaultSettings: Settings = {
  displayName: "",
  sound: true,
  haptics: true,
  nightRitual: true,
};

function isRecord(v: unknown): v is Record<string, unknown> {
  return typeof v === "object" && v !== null && !Array.isArray(v);
}

function asString(v: unknown, fallback = ""): string {
  return typeof v === "string" ? v : fallback;
}

function asNumber(v: unknown, fallback: number): number {
  return typeof v === "number" && Number.isFinite(v) ? v : fallback;
}

function asBool(v: unknown, fallback: boolean): boolean {
  return typeof v === "boolean" ? v : fallback;
}

function parseDollId(v: unknown): DollId {
  return DOLL_IDS.has(String(v)) ? (v as DollId) : "mehr";
}

function parseCategory(v: unknown): CategoryId | undefined {
  return CATEGORIES.has(String(v)) ? (v as CategoryId) : undefined;
}

function parseNote(raw: unknown, index: number): Note | null {
  if (!isRecord(raw)) return null;
  const type: NoteType =
    raw.type === "voice" || raw.type === "photo" || raw.type === "text" ? raw.type : "text";
  const content = asString(raw.content);
  if (!content && type !== "photo") return null;
  const photo = asString(raw.photoDataUrl);
  return {
    id: asString(raw.id, `note-${index}`),
    type,
    content,
    createdAt: asNumber(raw.createdAt, Date.now()),
    photoDataUrl: photo.startsWith("data:") ? photo : undefined,
  };
}

function parseWorry(raw: unknown): Worry | null {
  if (!isRecord(raw)) return null;
  const text = asString(raw.text).trim();
  if (!text) return null;
  const status: WorryStatus = raw.status === "resolved" ? "resolved" : "active";
  const notes = Array.isArray(raw.notes)
    ? raw.notes.map(parseNote).filter((n): n is Note => n !== null)
    : [];
  const reflection: Reflection | undefined =
    raw.reflection === "better" || raw.reflection === "same" || raw.reflection === "worse"
      ? raw.reflection
      : undefined;
  const createdAt = asNumber(raw.createdAt, Date.now());
  return {
    id: asString(raw.id, `w-${createdAt}`),
    text,
    dollId: parseDollId(raw.dollId),
    category: parseCategory(raw.category),
    status,
    createdAt,
    updatedAt: asNumber(raw.updatedAt, createdAt),
    resolvedAt: typeof raw.resolvedAt === "number" ? raw.resolvedAt : undefined,
    notes,
    reflection,
    reflectionNote: asString(raw.reflectionNote) || undefined,
  };
}

function parseMood(raw: unknown): MoodEntry | null {
  if (!isRecord(raw)) return null;
  const date = asString(raw.date);
  const mood = raw.mood;
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) return null;
  if (mood !== 1 && mood !== 2 && mood !== 3 && mood !== 4 && mood !== 5) return null;
  return { date, mood: mood as MoodValue };
}

function parseNotif(raw: unknown): AppNotification | null {
  if (!isRecord(raw)) return null;
  const title = asString(raw.title).trim();
  const body = asString(raw.body).trim();
  if (!title) return null;
  return {
    id: asString(raw.id, `n-${asNumber(raw.createdAt, Date.now())}`),
    title,
    body,
    createdAt: asNumber(raw.createdAt, Date.now()),
    read: asBool(raw.read, true),
  };
}

function parseSettings(raw: unknown): Settings {
  if (!isRecord(raw)) return { ...defaultSettings };
  return {
    displayName: asString(raw.displayName).slice(0, 40),
    sound: asBool(raw.sound, true),
    haptics: asBool(raw.haptics, true),
    nightRitual: asBool(raw.nightRitual, true),
  };
}

function unwrap(parsed: unknown): Record<string, unknown> | null {
  if (!isRecord(parsed)) return null;
  if (parsed.app === BACKUP_APP && isRecord(parsed.data)) return parsed.data;
  if (Array.isArray(parsed.worries)) return parsed;
  if (isRecord(parsed.state) && Array.isArray(parsed.state.worries)) return parsed.state;
  return null;
}

export function parseBackup(raw: string): BackupResult {
  let parsed: unknown;
  try {
    parsed = JSON.parse(raw);
  } catch {
    return { ok: false, error: "این فایل خراب‌ه." };
  }
  const source = unwrap(parsed);
  if (!source) {
    return { ok: false, error: "این فایل مال سبو نیست." };
  }
  const worries = Array.isArray(source.worries)
    ? source.worries.map(parseWorry).filter((w): w is Worry => w !== null)
    : [];
  const moods = Array.isArray(source.moods)
    ? source.moods.map(parseMood).filter((m): m is MoodEntry => m !== null)
    : [];
  const notifications = Array.isArray(source.notifications)
    ? source.notifications.map(parseNotif).filter((n): n is AppNotification => n !== null)
    : [];

  const data: SabooBackupData = {
    onboarded: asBool(source.onboarded, true),
    guideDone: asBool(source.guideDone, true),
    worries,
    moods,
    notifications,
    settings: parseSettings(source.settings),
    lastNightRitualDay: asString(source.lastNightRitualDay) || undefined,
    lastMoodPromptDay: asString(source.lastMoodPromptDay) || undefined,
    lastAutoSleepNight: asString(source.lastAutoSleepNight) || undefined,
    dollsAsleep: asBool(source.dollsAsleep, false),
  };

  return {
    ok: true,
    data,
    summary: {
      worries: worries.length,
      active: worries.filter((w) => w.status === "active").length,
      resolved: worries.filter((w) => w.status === "resolved").length,
      moods: moods.length,
      notes: worries.reduce((n, w) => n + w.notes.length, 0),
    },
  };
}

export function makeBackup(data: SabooBackupData): SabooBackup {
  return {
    app: BACKUP_APP,
    version: BACKUP_VERSION,
    exportedAt: new Date().toISOString(),
    data,
  };
}

export function backupFilename(now = new Date()): string {
  const y = now.getFullYear();
  const m = String(now.getMonth() + 1).padStart(2, "0");
  const d = String(now.getDate()).padStart(2, "0");
  return `saboo-${y}-${m}-${d}.json`;
}

export function summarizeBackup(data: SabooBackupData): BackupSummary {
  return {
    worries: data.worries.length,
    active: data.worries.filter((w) => w.status === "active").length,
    resolved: data.worries.filter((w) => w.status === "resolved").length,
    moods: data.moods.length,
    notes: data.worries.reduce((n, w) => n + w.notes.length, 0),
  };
}

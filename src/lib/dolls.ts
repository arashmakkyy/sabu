export type DollId =
  | "mehr"
  | "setare"
  | "yasaman"
  | "kian"
  | "dana"
  | "arya"
  | "roham"
  | "gol"
  | "narges"
  | "mahtab";

export type CategoryId =
  | "work"
  | "family"
  | "study"
  | "future"
  | "health"
  | "love"
  | "money"
  | "sleep"
  | "other";

export type Doll = {
  id: DollId;
  name: string;
  image: string;
  tint: string;
  whisper: string;
};

export const DOLLS: Doll[] = [
  {
    id: "mehr",
    name: "مهر",
    image: "/dolls/mehr.jpg",
    tint: "#E7D7C3",
    whisper: "خانواده‌تو نرم نگه می‌داره.",
  },
  {
    id: "setare",
    name: "ستاره",
    image: "/dolls/setare.jpg",
    tint: "#C9D7E6",
    whisper: "کار و ارائه پیششه.",
  },
  {
    id: "yasaman",
    name: "یاسمن",
    image: "/dolls/yasaman.jpg",
    tint: "#D5C8DC",
    whisper: "حال تنت پیششه.",
  },
  {
    id: "kian",
    name: "کیان",
    image: "/dolls/kian.jpg",
    tint: "#C9D9C6",
    whisper: "حرفای ناگفته‌تو می‌شنوه.",
  },
  {
    id: "dana",
    name: "دانا",
    image: "/dolls/dana.jpg",
    tint: "#E4D6C4",
    whisper: "درس و امتحان پیششه.",
  },
  {
    id: "arya",
    name: "آریا",
    image: "/dolls/arya.jpg",
    tint: "#C5D2DE",
    whisper: "آینده‌تو تا صبح نگه می‌داره.",
  },
  {
    id: "roham",
    name: "رهام",
    image: "/dolls/roham.jpg",
    tint: "#E2D4C0",
    whisper: "کارای روزانه روی میزش می‌مونه.",
  },
  {
    id: "gol",
    name: "گل",
    image: "/dolls/gol.jpg",
    tint: "#D8CBDC",
    whisper: "دل‌نگرانی‌های نرم پیششه.",
  },
  {
    id: "narges",
    name: "نرگس",
    image: "/dolls/narges.jpg",
    tint: "#C7D8C4",
    whisper: "امتحانا رو آروم جمع می‌کنه.",
  },
  {
    id: "mahtab",
    name: "مهتاب",
    image: "/dolls/mahtab.jpg",
    tint: "#E8D5B8",
    whisper: "شب بیدار می‌مونه تا تو بخوابی.",
  },
];

export const DOLL_MAP: Record<DollId, Doll> = Object.fromEntries(
  DOLLS.map((d) => [d.id, d]),
) as Record<DollId, Doll>;

export const CATEGORIES: { id: CategoryId; label: string; dollId: DollId }[] = [
  { id: "work", label: "کار", dollId: "roham" },
  { id: "family", label: "خانواده", dollId: "mehr" },
  { id: "study", label: "درس", dollId: "dana" },
  { id: "future", label: "آینده", dollId: "arya" },
  { id: "health", label: "بدن", dollId: "yasaman" },
  { id: "love", label: "رابطه", dollId: "kian" },
  { id: "money", label: "پول", dollId: "setare" },
  { id: "sleep", label: "خواب", dollId: "mahtab" },
  { id: "other", label: "دیگر", dollId: "gol" },
];

export function getDoll(id: string): Doll {
  return DOLL_MAP[id as DollId] ?? DOLLS[0];
}

export function categoryLabel(id?: CategoryId | null): string | undefined {
  return CATEGORIES.find((c) => c.id === id)?.label;
}

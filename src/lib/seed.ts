import { uid } from "./id";
import type { MoodEntry, Worry } from "./types";
import { isoDay } from "./persian";
import type { DollId } from "./dolls";

const day = 86_400_000;

function w(partial: Omit<Worry, "id" | "updatedAt"> & { id?: string }): Worry {
  return {
    id: partial.id ?? uid(),
    updatedAt: partial.resolvedAt ?? partial.createdAt,
    ...partial,
  };
}

export function buildDemoWorries(now = Date.now()): Worry[] {
  return [
    w({
      id: "demo-present",
      text: "می‌ترسم ارائه‌ام خوب پیش نره.",
      dollId: "setare",
      category: "work",
      status: "active",
      createdAt: now - day,
      notes: [
        {
          id: "n-p1",
          type: "text",
          content: "نگرانم که جلوی همه استرس بگیرم.",
          createdAt: now - day + 2 * 3_600_000,
        },
        {
          id: "n-p2",
          type: "text",
          content: "اسلایدها رو دوباره مرور کردم و کمی بهترم.",
          createdAt: now - 3 * 3_600_000,
        },
      ],
    }),
    w({
      id: "demo-family",
      text: "نگران حال مامانم هستم و نمی‌دونم باید چی بگم.",
      dollId: "mehr",
      category: "family",
      status: "active",
      createdAt: now - 2 * day,
      notes: [
        {
          id: "n-f1",
          type: "text",
          content: "امروز صبح صدای خسته‌ای داشت.",
          createdAt: now - day,
        },
      ],
    }),
    w({
      id: "demo-work",
      text: "می‌ترسم از پس این پروژه برنیام و همه بفهمن بلدم نیستم.",
      dollId: "roham",
      category: "work",
      status: "active",
      createdAt: now - 3 * day,
      notes: [],
    }),
    w({
      id: "demo-future",
      text: "نمی‌دونم مسیر درستی رو برای سال بعد انتخاب کردم یا نه.",
      dollId: "arya",
      category: "future",
      status: "active",
      createdAt: now - 4 * day,
      notes: [],
    }),
    w({
      id: "demo-exam",
      text: "نگرانی امتحان",
      dollId: "narges",
      category: "study",
      status: "resolved",
      createdAt: now - 9 * day,
      resolvedAt: now - 5 * day,
      reflection: "better",
      reflectionNote: "همه چی خوب پیش رفت. از خودم راضیم.",
      notes: [],
    }),
    w({
      id: "demo-fam2",
      text: "دل‌نگرانی خانواده",
      dollId: "gol",
      category: "family",
      status: "resolved",
      createdAt: now - 12 * day,
      resolvedAt: now - 8 * day,
      reflection: "better",
      reflectionNote: "با حرف زدن خیلی بهتر شد.",
      notes: [],
    }),
    ...demoResolved(now),
  ];
}

function demoResolved(now: number): Worry[] {
  const rows: {
    text: string;
    dollId: DollId;
    daysAgoStart: number;
    daysAgoEnd: number;
    reflection: Worry["reflection"];
    note: string;
  }[] = [
    {
      text: "خواب شب قبل مصاحبه",
      dollId: "mahtab",
      daysAgoStart: 16,
      daysAgoEnd: 14,
      reflection: "better",
      note: "خوابیدم. صبح انقدرها هم خراب نبود.",
    },
    {
      text: "پیام ندادن دوست",
      dollId: "kian",
      daysAgoStart: 15,
      daysAgoEnd: 11,
      reflection: "better",
      note: "فرداش پیام داد. من داشتم داستان می‌ساختم.",
    },
    {
      text: "انتخاب واحد",
      dollId: "dana",
      daysAgoStart: 20,
      daysAgoEnd: 13,
      reflection: "same",
      note: "سخت بود، ولی تموم شد.",
    },
    {
      text: "پول این ماه",
      dollId: "setare",
      daysAgoStart: 18,
      daysAgoEnd: 10,
      reflection: "better",
      note: "با یه جابه‌جایی کوچیک رسیدم.",
    },
    {
      text: "سرماخوردگی بی‌موقع",
      dollId: "yasaman",
      daysAgoStart: 11,
      daysAgoEnd: 7,
      reflection: "better",
      note: "دو روزه خوب شدم.",
    },
    {
      text: "ارائه قبلی",
      dollId: "setare",
      daysAgoStart: 22,
      daysAgoEnd: 19,
      reflection: "better",
      note: "تعریف هم شنیدم.",
    },
    {
      text: "قهر کوتاه با خواهر",
      dollId: "mehr",
      daysAgoStart: 14,
      daysAgoEnd: 12,
      reflection: "better",
      note: "همون شب حرف زدیم.",
    },
    {
      text: "پروژه دانشگاه",
      dollId: "dana",
      daysAgoStart: 25,
      daysAgoEnd: 6,
      reflection: "worse",
      note: "سخت‌تر از چیزی بود که فکر می‌کردم؛ ولی تموم شد.",
    },
    {
      text: "اسباب‌کشی",
      dollId: "arya",
      daysAgoStart: 30,
      daysAgoEnd: 21,
      reflection: "better",
      note: "با کمک دوستا سبک شد.",
    },
    {
      text: "ترافیک مسیر کار",
      dollId: "roham",
      daysAgoStart: 8,
      daysAgoEnd: 3,
      reflection: "same",
      note: "هنوز شلوغه، ولی دیگه نمی‌ترسم ازش.",
    },
    {
      text: "حرف زدن جلوی جمع",
      dollId: "kian",
      daysAgoStart: 28,
      daysAgoEnd: 17,
      reflection: "better",
      note: "صدام لرزید، ولی گفتم.",
    },
    {
      text: "نتیجه آزمایش",
      dollId: "yasaman",
      daysAgoStart: 19,
      daysAgoEnd: 15,
      reflection: "better",
      note: "همه چی عادی بود.",
    },
  ];

  return rows.map((r, i) =>
    w({
      id: `demo-r-${i}`,
      text: r.text,
      dollId: r.dollId,
      status: "resolved",
      createdAt: now - r.daysAgoStart * day,
      resolvedAt: now - r.daysAgoEnd * day,
      reflection: r.reflection,
      reflectionNote: r.note,
      notes: [],
    }),
  );
}

export function buildDemoMoods(now = Date.now()): MoodEntry[] {
  const sequence: number[] = [3, 4, 3, 2, 4, 5, 3, 4, 4, 2, 3, 5, 4, 4];
  return sequence.map((mood, i) => ({
    date: isoDay(now - (sequence.length - 1 - i) * day),
    mood: mood as MoodEntry["mood"],
  }));
}

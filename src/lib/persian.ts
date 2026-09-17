const FA_DIGITS = "۰۱۲۳۴۵۶۷۸۹";

export function toFaDigits(value: number | string): string {
  return String(value).replace(/\d/g, (d) => FA_DIGITS[Number(d)] ?? d);
}

const JALALI_MONTHS = [
  "فروردین",
  "اردیبهشت",
  "خرداد",
  "تیر",
  "مرداد",
  "شهریور",
  "مهر",
  "آبان",
  "آذر",
  "دی",
  "بهمن",
  "اسفند",
] as const;

export function gregorianToJalali(
  gy: number,
  gm: number,
  gd: number,
): [number, number, number] {
  const g_d_m = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334];
  const gy2 = gm > 2 ? gy + 1 : gy;
  let days =
    355666 +
    365 * gy +
    Math.floor((gy2 + 3) / 4) -
    Math.floor((gy2 + 99) / 100) +
    Math.floor((gy2 + 399) / 400) +
    gd +
    g_d_m[gm - 1];
  let jy = -1595 + 33 * Math.floor(days / 12053);
  days %= 12053;
  jy += 4 * Math.floor(days / 1461);
  days %= 1461;
  if (days > 365) {
    jy += Math.floor((days - 1) / 365);
    days = (days - 1) % 365;
  }
  const jm = days < 186 ? 1 + Math.floor(days / 31) : 7 + Math.floor((days - 186) / 30);
  const jd = 1 + (days < 186 ? days % 31 : (days - 186) % 30);
  return [jy, jm, jd];
}

export function toJalaliParts(date: Date = new Date()) {
  const [jy, jm, jd] = gregorianToJalali(
    date.getFullYear(),
    date.getMonth() + 1,
    date.getDate(),
  );
  return { jy, jm, jd };
}

export function formatJalali(ts: number): string {
  const { jy, jm, jd } = toJalaliParts(new Date(ts));
  return `${toFaDigits(jd)} ${JALALI_MONTHS[jm - 1]} ${toFaDigits(jy)}`;
}

export function isoDay(ts: number = Date.now()): string {
  const d = new Date(ts);
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

/** 21:00 → 06:00 */
export function isNightHour(d: Date = new Date()): boolean {
  const h = d.getHours();
  return h >= 21 || h < 6;
}

/** Calendar key of the current night (the evening the night started). */
export function nightKey(d: Date = new Date()): string {
  const h = d.getHours();
  return isoDay(h < 6 ? d.getTime() - 6 * 3_600_000 : d.getTime());
}

export function startOfDay(ts: number = Date.now()): number {
  const d = new Date(ts);
  d.setHours(0, 0, 0, 0);
  return d.getTime();
}

export function formatRelative(ts: number, now: number = Date.now()): string {
  const diff = now - ts;
  if (diff < 60_000) return "همین الان";
  if (diff < 3_600_000) {
    return `${toFaDigits(Math.floor(diff / 60_000))} دقیقه پیش`;
  }
  const dayTs = startOfDay(ts);
  const today = startOfDay(now);
  const deltaDays = Math.round((today - dayTs) / 86_400_000);
  if (deltaDays === 0) {
    if (diff < 5 * 3_600_000) {
      return `${toFaDigits(Math.floor(diff / 3_600_000))} ساعت پیش`;
    }
    return "امروز";
  }
  if (deltaDays === 1) return "دیروز";
  if (deltaDays < 7) return `${toFaDigits(deltaDays)} روز پیش`;
  return formatJalali(ts);
}

export function formatDurationDays(ms: number): string {
  const days = ms / 86_400_000;
  if (days < 1) {
    const hours = Math.max(1, Math.round(ms / 3_600_000));
    return `${toFaDigits(hours)} ساعت`;
  }
  const rounded = Math.round(days * 10) / 10;
  const text =
    Number.isInteger(rounded) ? String(rounded) : rounded.toFixed(1).replace(".", "٫");
  return `${toFaDigits(text)} روز`;
}

export function formatDurationShort(ms: number): string {
  const days = ms / 86_400_000;
  if (days < 1) return toFaDigits("۰٫۵");
  const rounded = Math.round(days * 10) / 10;
  const text =
    Number.isInteger(rounded) ? String(rounded) : rounded.toFixed(1).replace(".", "٫");
  return toFaDigits(text);
}

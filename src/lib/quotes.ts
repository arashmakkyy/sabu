export const QUOTES = [
  "ذهنت ظرف همه‌چیز نیست.",
  "اسمشو که بذاری، سبک‌تر می‌شه.",
  "سبو رو پر کن، سرتو خالی.",
  "امشب سنگینه. صبح کوچیک‌تره.",
  "لازم نیست همه فکرا پیش خودت بمونه.",
  "آروم شدن بعد از سپردنه، نه قبلش.",
  "هر نگرانی یه مهمونه. لازم نیست ساکن بشه.",
  "تو قوی‌تر از نگرانی‌هایی.",
];

export function quoteForDay(ts: number = Date.now()): string {
  const day = Math.floor(ts / 86_400_000);
  return QUOTES[day % QUOTES.length] ?? QUOTES[0];
}

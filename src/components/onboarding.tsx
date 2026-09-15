import { useState } from "react";
import { useSaboo } from "@/lib/store";
import { Button } from "./ui";

const SLIDES = [
  {
    image: "/scenes/welcome.jpg",
    kicker: "سبو",
    title: "ذهنت ظرف همه‌چیز نیست.",
    body: "نگرانی‌هاتو بده به یه عروسک. لازم نیست همه‌چی تو سرت بمونه.",
  },
  {
    image: "/dolls/setare.jpg",
    kicker: "بسپار",
    title: "نگرانی‌تو بده به عروسک.",
    body: "اون پیش خودش نگه می‌داره تا تو خالی شی.",
  },
  {
    image: "/scenes/hills.jpg",
    kicker: "پس بگیر",
    title: "بعداً که نگاه کنی، سبک‌تره.",
    body: "وقتی تموم شد برو آرشیو. بیشتر چیزا آروم‌تر از اونین که فکر می‌کردی.",
  },
];

export function Onboarding() {
  const [i, setI] = useState(0);
  const complete = useSaboo((s) => s.completeOnboarding);
  const slide = SLIDES[i] ?? SLIDES[0];
  const last = i === SLIDES.length - 1;

  return (
    <div className="flex min-h-full flex-col bg-bg">
      <div className="relative h-[52dvh] overflow-hidden">
        <img
          key={slide.image}
          src={slide.image}
          alt=""
          className="size-full object-cover object-top enter-up"
        />
        <div className="absolute inset-x-0 bottom-0 h-24 bg-linear-to-t from-bg to-transparent" />
      </div>
      <div className="flex flex-1 flex-col px-6 pt-2 pb-8">
        <p className="text-xs font-medium tracking-wide text-primary">{slide.kicker}</p>
        <h1 className="mt-2 text-3xl font-semibold leading-snug">{slide.title}</h1>
        <p className="mt-3 text-sm leading-7 text-ink-soft">{slide.body}</p>
        <div className="mt-6 flex items-center gap-1.5">
          {SLIDES.map((_, idx) => (
            <span
              key={idx}
              className={
                idx === i ? "h-1.5 w-6 rounded-full bg-primary" : "h-1.5 w-1.5 rounded-full bg-mint"
              }
            />
          ))}
        </div>
        <div className="mt-auto space-y-2 pt-8">
          <Button onClick={() => (last ? complete() : setI((n) => n + 1))}>
            {last ? "بزن بریم" : "ادامه"}
          </Button>
          {!last && (
            <Button variant="ghost" className="w-full" onClick={complete}>
              رد کردن
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}

export function Splash() {
  return (
    <div className="flex min-h-full flex-col items-center justify-center bg-bg px-8 text-center">
      <div className="size-36 overflow-hidden rounded-full shadow-soft">
        <img src="/dolls/mehr.jpg" alt="" className="size-full object-cover" />
      </div>
      <h1 className="mt-6 text-4xl font-semibold">سبو</h1>
      <p className="mt-2 text-sm text-muted">ذهنت ظرف همه‌چیز نیست.</p>
      <p className="mt-3 max-w-xs text-sm leading-7 text-ink-soft">
        نگرانی‌هاتو به عروسک بسپار. اون پیش خودش نگه می‌داره.
      </p>
    </div>
  );
}

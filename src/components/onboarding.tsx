import { useState } from "react";
import { CloudOff, Smartphone, UserRoundX } from "lucide-react";
import { useSaboo } from "@/lib/store";
import { Button } from "./ui";

const SLIDES = [
  {
    kind: "photo" as const,
    image: "/scenes/welcome.jpg",
    kicker: "سبو",
    title: "ذهنت ظرف همه‌چیز نیست.",
    body: "نگرانی‌هاتو بده به یه عروسک. لازم نیست همه‌چی تو سرت بمونه.",
  },
  {
    kind: "privacy" as const,
    image: "/dolls/setare.jpg",
    kicker: "خصوصی",
    title: "اطلاعاتت جایی نمی‌ره.",
    body: "اینا فقط بین تو و عروسکه؛ پس فقط توی همین دستگاه می‌مونه. نه سرورهای ما، نه جای دیگه.",
  },
  {
    kind: "photo" as const,
    image: "/scenes/hills.jpg",
    kicker: "پس بگیر",
    title: "بعداً که نگاه کنی، سبک‌تره.",
    body: "وقتی تموم شد برو آرشیو. بیشتر چیزا آروم‌تر از اونین که فکر می‌کردی.",
  },
];

const PRIVACY_POINTS = [
  { icon: Smartphone, text: "همین گوشی" },
  { icon: CloudOff, text: "بدون سرور" },
  { icon: UserRoundX, text: "بی‌اکانت" },
];

export function Onboarding() {
  const [i, setI] = useState(0);
  const complete = useSaboo((s) => s.completeOnboarding);
  const slide = SLIDES[i] ?? SLIDES[0];
  const last = i === SLIDES.length - 1;

  return (
    <div className="flex min-h-full flex-col bg-bg">
      {slide.kind === "privacy" ? (
        <PrivacyHero image={slide.image} />
      ) : (
        <div className="relative h-[52dvh] overflow-hidden">
          <img
            key={slide.image}
            src={slide.image}
            alt=""
            className="size-full object-cover object-top enter-up"
          />
          <div className="absolute inset-x-0 bottom-0 h-24 bg-linear-to-t from-bg to-transparent" />
        </div>
      )}
      <div className="flex flex-1 flex-col px-6 pt-2 pb-8">
        <p className="text-xs font-medium tracking-wide text-primary">{slide.kicker}</p>
        <h1 className="mt-2 text-3xl font-semibold leading-snug">{slide.title}</h1>
        <p className="mt-3 text-sm leading-7 text-ink-soft">{slide.body}</p>
        {slide.kind === "privacy" && (
          <div className="mt-5 grid grid-cols-3 gap-2">
            {PRIVACY_POINTS.map((p) => (
              <div
                key={p.text}
                className="flex flex-col items-center rounded-2xl bg-card px-2 py-3.5 shadow-card"
              >
                <span className="grid size-10 place-items-center rounded-full bg-mint text-primary">
                  <p.icon className="size-4" strokeWidth={1.8} />
                </span>
                <span className="mt-2 text-center text-[11px] font-medium leading-4 text-ink">
                  {p.text}
                </span>
              </div>
            ))}
          </div>
        )}
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
        <div className="mt-auto space-y-2 pt-6">
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

function PrivacyHero({ image }: { image: string }) {
  return (
    <div className="relative flex h-[38dvh] items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_40%,color-mix(in_oklab,var(--color-mint)_70%,white),transparent_62%)]" />
      <div className="relative enter-up">
        <div className="size-36 overflow-hidden rounded-full shadow-soft ring-4 ring-card">
          <img src={image} alt="" className="size-full object-cover" />
        </div>
        <span className="absolute -bottom-1 -left-1 grid size-11 place-items-center rounded-full bg-primary text-primary-fg shadow-card">
          <CloudOff className="size-5" strokeWidth={1.8} />
        </span>
      </div>
    </div>
  );
}

export function Splash({ exiting }: { exiting?: boolean }) {
  return (
    <div className={exiting ? "splash splash-exit" : "splash"}>
      <div className="splash-glow" />
      <span className="splash-mote splash-mote-1" />
      <span className="splash-mote splash-mote-2" />
      <span className="splash-mote splash-mote-3" />
      <span className="splash-mote splash-mote-4" />
      <span className="splash-mote splash-mote-5" />

      <div className="relative z-10 flex flex-col items-center px-8 text-center">
        <div className="splash-orb">
          <span className="splash-ripple splash-ripple-a" />
          <span className="splash-ripple splash-ripple-b" />
          <svg className="splash-track" viewBox="0 0 168 168" aria-hidden>
            <circle className="splash-track-bg" cx="84" cy="84" r="78" />
            <circle className="splash-track-fg" cx="84" cy="84" r="78" />
          </svg>
          <div className="splash-avatar">
            <img src="/dolls/mehr.jpg" alt="" className="size-full object-cover" />
          </div>
        </div>

        <h1 className="splash-title mt-8 text-4xl font-semibold tracking-tight">
          سَبو
        </h1>
        <p className="splash-line splash-line-a mt-2 text-sm text-muted">
          ذهنت ظرف همه‌چیز نیست.
        </p>
        <p className="splash-line splash-line-b mt-3 max-w-xs text-sm leading-7 text-ink-soft">
          نگرانی‌هاتو به عروسک بسپار. اون پیش خودش نگه می‌داره.
        </p>
      </div>
    </div>
  );
}

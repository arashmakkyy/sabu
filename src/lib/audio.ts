let ctx: AudioContext | null = null;

function getCtx() {
  if (typeof window === "undefined") return null;
  if (!ctx) {
    const Ctor = window.AudioContext || (window as typeof window & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
    if (!Ctor) return null;
    ctx = new Ctor();
  }
  return ctx;
}

function tone(
  audio: AudioContext,
  freq: number,
  start: number,
  dur: number,
  gain = 0.05,
) {
  const osc = audio.createOscillator();
  const g = audio.createGain();
  osc.type = "sine";
  osc.frequency.value = freq;
  g.gain.setValueAtTime(0, start);
  g.gain.linearRampToValueAtTime(gain, start + 0.02);
  g.gain.exponentialRampToValueAtTime(0.0001, start + dur);
  osc.connect(g);
  g.connect(audio.destination);
  osc.start(start);
  osc.stop(start + dur + 0.02);
}

export async function playChime() {
  const audio = getCtx();
  if (!audio) return;
  if (audio.state === "suspended") await audio.resume();
  const t = audio.currentTime;
  tone(audio, 523.25, t, 0.55, 0.045);
  tone(audio, 659.25, t + 0.12, 0.6, 0.035);
  tone(audio, 783.99, t + 0.24, 0.7, 0.03);
}

export async function playResolve() {
  const audio = getCtx();
  if (!audio) return;
  if (audio.state === "suspended") await audio.resume();
  const t = audio.currentTime;
  tone(audio, 392, t, 0.4, 0.04);
  tone(audio, 523.25, t + 0.14, 0.5, 0.04);
  tone(audio, 659.25, t + 0.28, 0.7, 0.035);
  tone(audio, 987.77, t + 0.42, 0.85, 0.025);
}

export function haptic(pattern: number | number[] = 14) {
  try {
    navigator.vibrate?.(pattern);
  } catch {
    /* ignore */
  }
}

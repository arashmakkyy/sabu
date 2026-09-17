export async function fileToDataUrl(file: File, max = 640): Promise<string> {
  const bitmap = await createImageBitmap(file);
  const scale = Math.min(1, max / Math.max(bitmap.width, bitmap.height));
  const w = Math.max(1, Math.round(bitmap.width * scale));
  const h = Math.max(1, Math.round(bitmap.height * scale));
  const canvas = document.createElement("canvas");
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("canvas");
  ctx.drawImage(bitmap, 0, 0, w, h);
  return canvas.toDataURL("image/jpeg", 0.76);
}

export function startSpeech(onResult: (text: string) => void): () => void {
  const SR =
    typeof window !== "undefined"
      ? (window as Window & {
          SpeechRecognition?: new () => SpeechRecognition;
          webkitSpeechRecognition?: new () => SpeechRecognition;
        })
      : undefined;
  const Ctor = SR?.SpeechRecognition || SR?.webkitSpeechRecognition;
  if (!Ctor) {
    throw new Error("speech-unsupported");
  }
  const rec = new Ctor();
  rec.lang = "fa-IR";
  rec.interimResults = true;
  rec.continuous = false;
  rec.onresult = (ev: SpeechRecognitionEvent) => {
    let text = "";
    for (let i = 0; i < ev.results.length; i++) {
      text += ev.results[i]?.[0]?.transcript ?? "";
    }
    onResult(text.trim());
  };
  rec.start();
  return () => {
    try {
      rec.stop();
    } catch {
      /* ignore */
    }
  };
}

interface SpeechRecognition extends EventTarget {
  lang: string;
  interimResults: boolean;
  continuous: boolean;
  onresult: ((ev: SpeechRecognitionEvent) => void) | null;
  start: () => void;
  stop: () => void;
}

interface SpeechRecognitionEvent {
  results: ArrayLike<ArrayLike<{ transcript: string }>>;
}

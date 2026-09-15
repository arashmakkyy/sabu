import { i as __toESM } from "../_runtime.mjs";
import { n as create, t as persist } from "../_libs/zustand.mjs";
import { S as require_jsx_runtime, V as require_react, _ as createFileRoute, d as HeadContent, f as useRouterState, g as lazyRouteComponent, h as Outlet, m as createRouter, u as Scripts, v as createRootRoute, x as useRouter, y as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as clsx } from "../_libs/clsx.mjs";
import { t as twMerge } from "../_libs/tailwind-merge.mjs";
import { a as SlidersHorizontal, d as House, g as ChartColumn, h as Check, i as TriangleAlert, n as Wind, t as X, v as Archive } from "../_libs/lucide-react.mjs";
import { a as union, i as string, n as number, r as object, t as literal } from "../_libs/zod.mjs";
import { t as Toaster } from "../_libs/sonner.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/cn-C7I3xde0.js
var DOLLS = [
	{
		id: "mehr",
		name: "مهر",
		image: "/dolls/mehr.jpg",
		tint: "#E7D7C3",
		whisper: "خانواده و دل‌بستگی‌ها را نرم نگه می‌دارد."
	},
	{
		id: "setare",
		name: "ستاره",
		image: "/dolls/setare.jpg",
		tint: "#C9D7E6",
		whisper: "برای کار، ارائه و درخشیدن می‌ماند."
	},
	{
		id: "yasaman",
		name: "یاسمن",
		image: "/dolls/yasaman.jpg",
		tint: "#D5C8DC",
		whisper: "حال بدن و رشد آرام را نگه می‌دارد."
	},
	{
		id: "kian",
		name: "کیان",
		image: "/dolls/kian.jpg",
		tint: "#C9D9C6",
		whisper: "رابطه‌ها و حرف‌های ناگفته را می‌شنود."
	},
	{
		id: "dana",
		name: "دانا",
		image: "/dolls/dana.jpg",
		tint: "#E4D6C4",
		whisper: "درس، آزمون و فکرهای پیچیده را ورق می‌زند."
	},
	{
		id: "arya",
		name: "آریا",
		image: "/dolls/arya.jpg",
		tint: "#C5D2DE",
		whisper: "آینده و مسیر را تا صبح نگه می‌دارد."
	},
	{
		id: "roham",
		name: "رهام",
		image: "/dolls/roham.jpg",
		tint: "#E2D4C0",
		whisper: "کار روزانه و پروژه‌ها را روی میزش می‌گذارد."
	},
	{
		id: "gol",
		name: "گل",
		image: "/dolls/gol.jpg",
		tint: "#D8CBDC",
		whisper: "دل‌نگرانی‌های نرم و حرف‌های قشنگ را می‌بوید."
	},
	{
		id: "narges",
		name: "نرگس",
		image: "/dolls/narges.jpg",
		tint: "#C7D8C4",
		whisper: "امتحان‌ها را با آرامش جمع می‌کند."
	},
	{
		id: "mahtab",
		name: "مهتاب",
		image: "/dolls/mahtab.jpg",
		tint: "#E8D5B8",
		whisper: "شب‌ها بیدار می‌ماند تا تو بخوابی."
	}
];
var DOLL_MAP = Object.fromEntries(DOLLS.map((d) => [d.id, d]));
var CATEGORIES = [
	{
		id: "work",
		label: "کار",
		dollId: "roham"
	},
	{
		id: "family",
		label: "خانواده",
		dollId: "mehr"
	},
	{
		id: "study",
		label: "درس",
		dollId: "dana"
	},
	{
		id: "future",
		label: "آینده",
		dollId: "arya"
	},
	{
		id: "health",
		label: "حال تن",
		dollId: "yasaman"
	},
	{
		id: "love",
		label: "رابطه",
		dollId: "kian"
	},
	{
		id: "money",
		label: "پول",
		dollId: "setare"
	},
	{
		id: "sleep",
		label: "خواب",
		dollId: "mahtab"
	},
	{
		id: "other",
		label: "دیگر",
		dollId: "gol"
	}
];
function getDoll(id) {
	return DOLL_MAP[id] ?? DOLLS[0];
}
function categoryLabel(id) {
	return CATEGORIES.find((c) => c.id === id)?.label;
}
function uid() {
	if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") return crypto.randomUUID();
	return `s_${Math.random().toString(36).slice(2)}${Date.now().toString(36)}`;
}
var FA_DIGITS = "۰۱۲۳۴۵۶۷۸۹";
function toFaDigits(value) {
	return String(value).replace(/\d/g, (d) => FA_DIGITS[Number(d)] ?? d);
}
var JALALI_MONTHS = [
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
	"اسفند"
];
function gregorianToJalali(gy, gm, gd) {
	const g_d_m = [
		0,
		31,
		59,
		90,
		120,
		151,
		181,
		212,
		243,
		273,
		304,
		334
	];
	const gy2 = gm > 2 ? gy + 1 : gy;
	let days = 355666 + 365 * gy + Math.floor((gy2 + 3) / 4) - Math.floor((gy2 + 99) / 100) + Math.floor((gy2 + 399) / 400) + gd + g_d_m[gm - 1];
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
	return [
		jy,
		jm,
		jd
	];
}
function toJalaliParts(date = /* @__PURE__ */ new Date()) {
	const [jy, jm, jd] = gregorianToJalali(date.getFullYear(), date.getMonth() + 1, date.getDate());
	return {
		jy,
		jm,
		jd
	};
}
function formatJalali(ts) {
	const { jy, jm, jd } = toJalaliParts(new Date(ts));
	return `${toFaDigits(jd)} ${JALALI_MONTHS[jm - 1]} ${toFaDigits(jy)}`;
}
function isoDay(ts = Date.now()) {
	const d = new Date(ts);
	return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}
function startOfDay(ts = Date.now()) {
	const d = new Date(ts);
	d.setHours(0, 0, 0, 0);
	return d.getTime();
}
function formatRelative(ts, now = Date.now()) {
	const diff = now - ts;
	if (diff < 6e4) return "همین الان";
	if (diff < 36e5) return `${toFaDigits(Math.floor(diff / 6e4))} دقیقه پیش`;
	const dayTs = startOfDay(ts);
	const today = startOfDay(now);
	const deltaDays = Math.round((today - dayTs) / 864e5);
	if (deltaDays === 0) {
		if (diff < 18e6) return `${toFaDigits(Math.floor(diff / 36e5))} ساعت پیش`;
		return "امروز";
	}
	if (deltaDays === 1) return "دیروز";
	if (deltaDays < 7) return `${toFaDigits(deltaDays)} روز پیش`;
	return formatJalali(ts);
}
function formatDurationDays(ms) {
	const days = ms / 864e5;
	if (days < 1) return `${toFaDigits(Math.max(1, Math.round(ms / 36e5)))} ساعت`;
	const rounded = Math.round(days * 10) / 10;
	return `${toFaDigits(Number.isInteger(rounded) ? String(rounded) : rounded.toFixed(1).replace(".", "٫"))} روز`;
}
function formatDurationShort(ms) {
	const days = ms / 864e5;
	if (days < 1) return toFaDigits("۰٫۵");
	const rounded = Math.round(days * 10) / 10;
	return toFaDigits(Number.isInteger(rounded) ? String(rounded) : rounded.toFixed(1).replace(".", "٫"));
}
var day = 864e5;
function w(partial) {
	return {
		id: partial.id ?? uid(),
		updatedAt: partial.resolvedAt ?? partial.createdAt,
		...partial
	};
}
function buildDemoWorries(now = Date.now()) {
	return [
		w({
			id: "demo-present",
			text: "می‌ترسم ارائه‌ام خوب پیش نره.",
			dollId: "setare",
			category: "work",
			status: "active",
			createdAt: now - day,
			notes: [{
				id: "n-p1",
				type: "text",
				content: "نگرانم که جلوی همه استرس بگیرم.",
				createdAt: now - day + 72e5
			}, {
				id: "n-p2",
				type: "text",
				content: "اسلایدها رو دوباره مرور کردم و کمی بهترم.",
				createdAt: now - 108e5
			}]
		}),
		w({
			id: "demo-family",
			text: "نگران حال مامانم هستم و نمی‌دونم باید چی بگم.",
			dollId: "mehr",
			category: "family",
			status: "active",
			createdAt: now - 2 * day,
			notes: [{
				id: "n-f1",
				type: "text",
				content: "امروز صبح صدای خسته‌ای داشت.",
				createdAt: now - day
			}]
		}),
		w({
			id: "demo-work",
			text: "می‌ترسم از پس این پروژه برنیام و همه بفهمن بلدم نیستم.",
			dollId: "roham",
			category: "work",
			status: "active",
			createdAt: now - 3 * day,
			notes: []
		}),
		w({
			id: "demo-future",
			text: "نمی‌دونم مسیر درستی رو برای سال بعد انتخاب کردم یا نه.",
			dollId: "arya",
			category: "future",
			status: "active",
			createdAt: now - 4 * day,
			notes: []
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
			reflectionNote: "همه چیز خوب پیش رفت و از خودم راضی‌ام.",
			notes: []
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
			reflectionNote: "با صحبت کردن، خیلی بهتر شد.",
			notes: []
		}),
		...demoResolved(now)
	];
}
function demoResolved(now) {
	return [
		{
			text: "خواب شب قبل مصاحبه",
			dollId: "mahtab",
			daysAgoStart: 16,
			daysAgoEnd: 14,
			reflection: "better",
			note: "خوابیدم. صبح آن‌قدرها هم خراب نبود."
		},
		{
			text: "پیام ندادن دوست",
			dollId: "kian",
			daysAgoStart: 15,
			daysAgoEnd: 11,
			reflection: "better",
			note: "فرداش پیام داد. من داشتم داستان می‌ساختم."
		},
		{
			text: "انتخاب واحد",
			dollId: "dana",
			daysAgoStart: 20,
			daysAgoEnd: 13,
			reflection: "same",
			note: "سخت بود، اما تمام شد."
		},
		{
			text: "پول این ماه",
			dollId: "setare",
			daysAgoStart: 18,
			daysAgoEnd: 10,
			reflection: "better",
			note: "با یک جابه‌جایی کوچک، رسیدم."
		},
		{
			text: "سرماخوردگی بی‌موقع",
			dollId: "yasaman",
			daysAgoStart: 11,
			daysAgoEnd: 7,
			reflection: "better",
			note: "دو روزه خوب شدم."
		},
		{
			text: "ارائه قبلی",
			dollId: "setare",
			daysAgoStart: 22,
			daysAgoEnd: 19,
			reflection: "better",
			note: "تعریف هم شنیدم."
		},
		{
			text: "قهر کوتاه با خواهر",
			dollId: "mehr",
			daysAgoStart: 14,
			daysAgoEnd: 12,
			reflection: "better",
			note: "همان شب حرف زدیم."
		},
		{
			text: "پروژه دانشگاه",
			dollId: "dana",
			daysAgoStart: 25,
			daysAgoEnd: 6,
			reflection: "worse",
			note: "سخت‌تر از چیزی بود که فکر می‌کردم؛ ولی تمام شد."
		},
		{
			text: "اسباب‌کشی",
			dollId: "arya",
			daysAgoStart: 30,
			daysAgoEnd: 21,
			reflection: "better",
			note: "با کمک دوستان سبک شد."
		},
		{
			text: "ترافیک مسیر کار",
			dollId: "roham",
			daysAgoStart: 8,
			daysAgoEnd: 3,
			reflection: "same",
			note: "همچنان شلوغ است، اما دیگر نمی‌ترسم ازش."
		},
		{
			text: "حرف زدن جلوی جمع",
			dollId: "kian",
			daysAgoStart: 28,
			daysAgoEnd: 17,
			reflection: "better",
			note: "صدایم لرزید، ولی گفتم."
		},
		{
			text: "نتیجه آزمایش",
			dollId: "yasaman",
			daysAgoStart: 19,
			daysAgoEnd: 15,
			reflection: "better",
			note: "همه چیز عادی بود."
		}
	].map((r, i) => w({
		id: `demo-r-${i}`,
		text: r.text,
		dollId: r.dollId,
		status: "resolved",
		createdAt: now - r.daysAgoStart * day,
		resolvedAt: now - r.daysAgoEnd * day,
		reflection: r.reflection,
		reflectionNote: r.note,
		notes: []
	}));
}
function buildDemoMoods(now = Date.now()) {
	const sequence = [
		3,
		4,
		3,
		2,
		4,
		5,
		3,
		4,
		4,
		2,
		3,
		5,
		4,
		4
	];
	return sequence.map((mood, i) => ({
		date: isoDay(now - (sequence.length - 1 - i) * day),
		mood
	}));
}
var ctx = null;
function getCtx() {
	if (typeof window === "undefined") return null;
	if (!ctx) {
		const Ctor = window.AudioContext || window.webkitAudioContext;
		if (!Ctor) return null;
		ctx = new Ctor();
	}
	return ctx;
}
function tone(audio, freq, start, dur, gain = .05) {
	const osc = audio.createOscillator();
	const g = audio.createGain();
	osc.type = "sine";
	osc.frequency.value = freq;
	g.gain.setValueAtTime(0, start);
	g.gain.linearRampToValueAtTime(gain, start + .02);
	g.gain.exponentialRampToValueAtTime(1e-4, start + dur);
	osc.connect(g);
	g.connect(audio.destination);
	osc.start(start);
	osc.stop(start + dur + .02);
}
async function playChime() {
	const audio = getCtx();
	if (!audio) return;
	if (audio.state === "suspended") await audio.resume();
	const t = audio.currentTime;
	tone(audio, 523.25, t, .55, .045);
	tone(audio, 659.25, t + .12, .6, .035);
	tone(audio, 783.99, t + .24, .7, .03);
}
async function playResolve() {
	const audio = getCtx();
	if (!audio) return;
	if (audio.state === "suspended") await audio.resume();
	const t = audio.currentTime;
	tone(audio, 392, t, .4, .04);
	tone(audio, 523.25, t + .14, .5, .04);
	tone(audio, 659.25, t + .28, .7, .035);
	tone(audio, 987.77, t + .42, .85, .025);
}
function haptic(pattern = 14) {
	try {
		navigator.vibrate?.(pattern);
	} catch {}
}
var defaultSettings = {
	displayName: "",
	sound: true,
	haptics: true,
	nightRitual: true
};
function pushNotif(list, title, body) {
	return [{
		id: uid(),
		title,
		body,
		createdAt: Date.now(),
		read: false
	}, ...list].slice(0, 24);
}
function feedback(kind, settings) {
	if (settings.haptics) haptic(kind === "resolve" ? [
		12,
		40,
		18
	] : 16);
	if (!settings.sound) return;
	if (kind === "resolve") playResolve();
	else playChime();
}
var useSaboo = create()(persist((set, get) => ({
	hydrated: false,
	onboarded: false,
	worries: [],
	moods: [],
	notifications: [],
	settings: defaultSettings,
	ritual: null,
	notifOpen: false,
	markHydrated: () => set({ hydrated: true }),
	completeOnboarding: () => {
		const hasData = get().worries.length > 0;
		set({
			onboarded: true,
			worries: hasData ? get().worries : buildDemoWorries(),
			moods: hasData ? get().moods : buildDemoMoods(),
			notifications: hasData ? get().notifications : pushNotif([], "سبو آماده‌ست", "نگرانی‌هایت را اینجا بگذار. ذهنت ظرف همه‌چیز نیست.")
		});
	},
	addWorry: ({ text, dollId, category }) => {
		const id = uid();
		const now = Date.now();
		const worry = {
			id,
			text: text.trim(),
			dollId,
			category,
			status: "active",
			createdAt: now,
			updatedAt: now,
			notes: []
		};
		const doll = DOLLS.find((d) => d.id === dollId)?.name ?? "عروسک";
		set((s) => ({
			worries: [worry, ...s.worries],
			notifications: pushNotif(s.notifications, `${doll} نگرانی را گرفت`, "تا وقتی لازم باشد، برایت نگه می‌دارد.")
		}));
		feedback("chime", get().settings);
		return id;
	},
	addNote: (worryId, input) => {
		const note = {
			id: uid(),
			type: input.type,
			content: input.content.trim(),
			createdAt: Date.now(),
			photoDataUrl: input.photoDataUrl
		};
		set((s) => ({ worries: s.worries.map((w) => w.id === worryId ? {
			...w,
			notes: [...w.notes, note],
			updatedAt: note.createdAt
		} : w) }));
		if (get().settings.haptics) haptic(10);
	},
	resolveWorry: (worryId, reflection, note) => {
		const now = Date.now();
		set((s) => ({
			worries: s.worries.map((w) => w.id === worryId ? {
				...w,
				status: "resolved",
				resolvedAt: now,
				updatedAt: now,
				reflection,
				reflectionNote: note?.trim() || w.reflectionNote
			} : w),
			notifications: pushNotif(s.notifications, "این نگرانی تمام شد", "سبو آرام‌تر شد. می‌توانی در آرشیو نگاهش کنی."),
			ritual: null
		}));
		feedback("resolve", get().settings);
	},
	reopenWorry: (worryId) => {
		set((s) => ({ worries: s.worries.map((w) => w.id === worryId ? {
			...w,
			status: "active",
			resolvedAt: void 0,
			updatedAt: Date.now()
		} : w) }));
	},
	deleteWorry: (worryId) => {
		set((s) => ({ worries: s.worries.filter((w) => w.id !== worryId) }));
	},
	updateWorry: (worryId, patch) => {
		set((s) => ({ worries: s.worries.map((w) => w.id === worryId ? {
			...w,
			...patch,
			updatedAt: Date.now()
		} : w) }));
	},
	setMood: (mood) => {
		const date = isoDay();
		set((s) => ({
			moods: [...s.moods.filter((m) => m.date !== date), {
				date,
				mood
			}].sort((a, b) => a.date.localeCompare(b.date)),
			lastMoodPromptDay: date,
			ritual: s.ritual?.kind === "mood" ? null : s.ritual
		}));
	},
	markNotifsRead: () => {
		set((s) => ({ notifications: s.notifications.map((n) => ({
			...n,
			read: true
		})) }));
	},
	updateSettings: (patch) => {
		set((s) => ({ settings: {
			...s.settings,
			...patch
		} }));
	},
	openRitual: (ritual) => set({ ritual }),
	closeRitual: () => set({ ritual: null }),
	setNotifOpen: (open) => {
		set({ notifOpen: open });
		if (open) get().markNotifsRead();
	},
	completeNightRitual: () => {
		set({
			lastNightRitualDay: isoDay(),
			ritual: null
		});
		feedback("chime", get().settings);
	},
	maybeDailyPrompts: () => {
		const today = isoDay();
		const hour = (/* @__PURE__ */ new Date()).getHours();
		const s = get();
		let notifications = s.notifications;
		let ritual = s.ritual;
		let lastMoodPromptDay = s.lastMoodPromptDay;
		if (!s.moods.some((m) => m.date === today) && s.lastMoodPromptDay !== today && s.onboarded) lastMoodPromptDay = today;
		if (s.settings.nightRitual && hour >= 21 && s.lastNightRitualDay !== today && !notifications.some((n) => n.title.includes("بخوابان") && isoDay(n.createdAt) === today)) notifications = pushNotif(notifications, "وقت خواباندن سبوهاست", "نگرانی‌ها را زیر بالش بگذار. مهتاب تا صبح بیدار می‌ماند.");
		set({
			notifications,
			ritual,
			lastMoodPromptDay
		});
	},
	resetAll: () => {
		set({
			onboarded: true,
			worries: [],
			moods: [],
			notifications: [],
			lastNightRitualDay: void 0,
			lastMoodPromptDay: void 0,
			ritual: null
		});
	},
	loadDemo: () => {
		set({
			onboarded: true,
			worries: buildDemoWorries(),
			moods: buildDemoMoods(),
			notifications: pushNotif([], "نمونه بارگذاری شد", "چند نگرانی نمونه آمد تا سبو را حس کنی.")
		});
	}
}), {
	name: "saboo-v1",
	partialize: (s) => ({
		onboarded: s.onboarded,
		worries: s.worries,
		moods: s.moods,
		notifications: s.notifications,
		settings: s.settings,
		lastNightRitualDay: s.lastNightRitualDay,
		lastMoodPromptDay: s.lastMoodPromptDay
	}),
	onRehydrateStorage: () => () => {
		useSaboo.setState({ hydrated: true });
	}
}));
function selectActive(worries) {
	return worries.filter((w) => w.status === "active").sort((a, b) => b.updatedAt - a.updatedAt);
}
function selectResolved(worries) {
	return worries.filter((w) => w.status === "resolved").sort((a, b) => (b.resolvedAt ?? 0) - (a.resolvedAt ?? 0));
}
function insightStats(worries) {
	const resolved = selectResolved(worries);
	const better = resolved.filter((w) => w.reflection === "better").length;
	const percent = resolved.length === 0 ? 0 : Math.round(better / resolved.length * 100);
	const durations = resolved.filter((w) => w.resolvedAt).map((w) => w.resolvedAt - w.createdAt);
	const avgMs = durations.length === 0 ? 0 : durations.reduce((a, b) => a + b, 0) / durations.length;
	return {
		resolvedCount: resolved.length,
		activeCount: selectActive(worries).length,
		betterCount: better,
		percent,
		avgMs
	};
}
function checkInStreak(moods, worries) {
	const days = /* @__PURE__ */ new Set([
		...moods.map((m) => m.date),
		...worries.map((w) => isoDay(w.createdAt)),
		...worries.flatMap((w) => w.notes.map((n) => isoDay(n.createdAt))),
		...worries.filter((w) => w.resolvedAt).map((w) => isoDay(w.resolvedAt))
	]);
	let streak = 0;
	const cursor = /* @__PURE__ */ new Date();
	cursor.setHours(0, 0, 0, 0);
	for (let i = 0; i < 400; i++) {
		const key = isoDay(cursor.getTime());
		if (days.has(key)) {
			streak += 1;
			cursor.setDate(cursor.getDate() - 1);
		} else if (i === 0) cursor.setDate(cursor.getDate() - 1);
		else break;
	}
	return streak;
}
function cn(...inputs) {
	return twMerge(clsx(inputs));
}
//#endregion
//#region node_modules/.nitro/vite/services/ssr/assets/router-D2tNBkkj.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var __defProp = Object.defineProperty;
var __exportAll = (all, no_symbols) => {
	let target = {};
	for (var name in all) __defProp(target, name, {
		get: all[name],
		enumerable: true
	});
	if (!no_symbols) __defProp(target, Symbol.toStringTag, { value: "Module" });
	return target;
};
var FALLBACK_MESSAGE = "An unexpected error occurred. Try reloading the page.";
function errorMessage(error) {
	if (error instanceof Error && error.message) return error.message;
	if (typeof error === "string" && error) return error;
	return FALLBACK_MESSAGE;
}
function AppErrorComponent({ error }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "flex min-h-screen flex-col items-center justify-center gap-3 px-6 text-center bg-zinc-50 text-zinc-900 dark:bg-zinc-950 dark:text-zinc-50",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "text-red-500",
				"aria-hidden": "true",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, {
					className: "size-10",
					strokeWidth: 2
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "text-lg font-semibold",
				children: "Something went wrong"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "max-w-md text-sm break-words text-zinc-500 dark:text-zinc-400",
				children: errorMessage(error)
			})
		]
	});
}
/**
* App-wide client provider mounted once near the root (in `src/routes/__root.tsx`):
*
*   <AuthProvider><Outlet /></AuthProvider>
*
* Better Auth's React client (`@/lib/auth/client`) needs NO context provider —
* its `useSession()` works standalone — so this is a passthrough today. It's
* kept as the single, stable mount point for any future client-side providers
* (e.g. a toast or theme provider) without churning the root shell.
*/
function AuthProvider({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children });
}
var CONNECTOR_TOKEN_READY_EVENT = "grok:connector-token-ready";
function isGrokEmbedderOrigin(origin) {
	try {
		const url = new URL(origin);
		if (url.protocol !== "https:" && url.protocol !== "http:") return false;
		const host = url.hostname.toLowerCase();
		if (host === "grok.com" || host.endsWith(".grok.com")) return true;
		if (host === "localhost" || host === "127.0.0.1" || host === "[::1]") return true;
		return false;
	} catch {
		return false;
	}
}
function isSandboxPreviewGuestHost(hostname) {
	const host = hostname.toLowerCase();
	return host === "grok-sandbox.com" || host.endsWith(".grok-sandbox.com");
}
function isRemintPreviewPair(guestHost, parentHost) {
	const guest = guestHost.toLowerCase();
	const parent = parentHost.toLowerCase();
	const i = guest.indexOf(".preview.");
	if (i <= 0) return false;
	const label = guest.slice(0, i);
	const rest = guest.slice(i + 9);
	if (label.includes(".") || !rest.includes(".")) return false;
	return parent === rest || parent === `grok.${rest}`;
}
function resolveParentEmbedderOrigin(parentIsSelf, referrer, ancestorOrigin, guestHostname = "") {
	if (parentIsSelf) return null;
	for (const candidate of [referrer, ancestorOrigin ?? ""].filter(Boolean)) try {
		const url = new URL(candidate.includes("://") ? candidate : `https://${candidate}`);
		if (url.protocol !== "https:" && url.protocol !== "http:") continue;
		if (isGrokEmbedderOrigin(url.origin)) return url.origin;
		if (isSandboxPreviewGuestHost(guestHostname) || isRemintPreviewPair(guestHostname, url.hostname)) return url.origin;
	} catch {}
	return null;
}
/**
* Guest side of the grok-web ↔ sandbox preview postMessage bridge.
*
* Activates only when this page is framed by an allowlisted Grok embedder.
* Top-level runs (download/export, local `npm run dev`, deployed sites) noop.
*/
var PREVIEW_BRIDGE_CHANNEL = "grok-preview-bridge";
var EnvelopeSchema = object({
	channel: literal(PREVIEW_BRIDGE_CHANNEL),
	version: number().int().positive(),
	type: string().min(1)
});
var HelloSchema = EnvelopeSchema.extend({ type: literal("hello") });
var NavigateSchema = EnvelopeSchema.extend({
	type: literal("navigate"),
	path: string().min(1)
});
var HistorySchema = EnvelopeSchema.extend({
	type: literal("history"),
	delta: union([literal(-1), literal(1)])
});
var ConnectorTokenReadySchema = EnvelopeSchema.extend({ type: literal("connector-token-ready") });
function isSafeBridgePath(path) {
	if (!path.startsWith("/") || path.startsWith("//") || path.includes("\\")) return false;
	try {
		return new URL(path, "https://preview.invalid").origin === "https://preview.invalid";
	} catch {
		return false;
	}
}
/**
* Origin of the Grok embedder framing this page, or null when the page runs
* top-level (download/export, local `npm run dev`, deployed sites) or under a
* non-Grok parent. Client-only; null during SSR.
*/
function resolveCurrentEmbedderOrigin() {
	if (typeof window === "undefined") return null;
	const ancestorOrigin = typeof location.ancestorOrigins !== "undefined" && location.ancestorOrigins.length > 0 ? location.ancestorOrigins[0] : null;
	return resolveParentEmbedderOrigin(window.parent === window, document.referrer, ancestorOrigin, window.location.hostname);
}
/**
* Install host↔guest messaging. Returns a dispose function.
* Noops (returns a no-op dispose) when not embedded under a Grok parent.
*/
function installPreviewHostBridge(options = {}) {
	const parentOrigin = resolveCurrentEmbedderOrigin();
	if (parentOrigin === null) return () => {};
	const ROOT_STATE_KEY = "__grokPreviewBridgeRoot";
	const originalPushState = window.history.pushState.bind(window.history);
	const originalReplaceState = window.history.replaceState.bind(window.history);
	const isAtHistoryRoot = () => {
		const state = window.history.state;
		return Boolean(state && typeof state === "object" && state[ROOT_STATE_KEY] === true);
	};
	try {
		const current = window.history.state;
		if (!(current !== null && typeof current === "object" && Object.prototype.hasOwnProperty.call(current, ROOT_STATE_KEY))) {
			const isRoot = window.history.length <= 1;
			originalReplaceState(current && typeof current === "object" ? {
				...current,
				[ROOT_STATE_KEY]: isRoot
			} : { [ROOT_STATE_KEY]: isRoot }, "", window.location.href);
		}
	} catch {}
	const post = (message) => {
		window.parent.postMessage(message, parentOrigin);
	};
	const reportLocation = () => {
		post({
			channel: PREVIEW_BRIDGE_CHANNEL,
			version: 1,
			type: "location",
			path: window.location.pathname || "/",
			search: window.location.search,
			hash: window.location.hash
		});
	};
	const reportRoutes = () => {
		const paths = options.getRoutePaths?.() ?? [];
		post({
			channel: PREVIEW_BRIDGE_CHANNEL,
			version: 1,
			type: "routes",
			paths
		});
	};
	const defaultNavigate = (path) => {
		if (!isSafeBridgePath(path)) return;
		try {
			const url = new URL(path, window.location.origin);
			if (url.origin !== window.location.origin) return;
			const next = `${url.pathname}${url.search}${url.hash}`;
			window.history.pushState(window.history.state, "", next);
			window.dispatchEvent(new PopStateEvent("popstate", { state: window.history.state }));
		} catch {}
	};
	const navigate = (path) => {
		if (!isSafeBridgePath(path)) return;
		if (options.navigate) {
			options.navigate(path);
			return;
		}
		defaultNavigate(path);
	};
	const announce = () => {
		reportLocation();
		reportRoutes();
		post({
			channel: PREVIEW_BRIDGE_CHANNEL,
			version: 1,
			type: "ready"
		});
	};
	const onHello = (data) => {
		if (!HelloSchema.safeParse(data).success) return;
		announce();
	};
	const onNavigate = (data) => {
		const parsed = NavigateSchema.safeParse(data);
		if (!parsed.success) return;
		navigate(parsed.data.path);
		queueMicrotask(reportLocation);
	};
	const onHistory = (data) => {
		const parsed = HistorySchema.safeParse(data);
		if (!parsed.success) return;
		if (parsed.data.delta === -1 && isAtHistoryRoot()) return;
		window.history.go(parsed.data.delta);
	};
	const onConnectorTokenReady = (data) => {
		if (!ConnectorTokenReadySchema.safeParse(data).success) return;
		window.dispatchEvent(new Event(CONNECTOR_TOKEN_READY_EVENT));
	};
	const hostMessageHandlers = /* @__PURE__ */ new Map([
		["hello", onHello],
		["navigate", onNavigate],
		["history", onHistory],
		["connector-token-ready", onConnectorTokenReady]
	]);
	const onMessage = (event) => {
		if (event.source !== window.parent) return;
		if (event.origin !== parentOrigin) return;
		const envelope = EnvelopeSchema.safeParse(event.data);
		if (!envelope.success || envelope.data.version !== 1) return;
		hostMessageHandlers.get(envelope.data.type)?.(event.data);
	};
	const onPopState = () => {
		reportLocation();
	};
	const onHashChange = () => {
		reportLocation();
	};
	window.history.pushState = (data, unused, url) => {
		const next = data && typeof data === "object" ? {
			...data,
			[ROOT_STATE_KEY]: false
		} : data;
		originalPushState(next, unused, url);
		reportLocation();
	};
	window.history.replaceState = (data, unused, url) => {
		const next = isAtHistoryRoot() ? {
			...data && typeof data === "object" ? data : {},
			[ROOT_STATE_KEY]: true
		} : data;
		originalReplaceState(next, unused, url);
		reportLocation();
	};
	window.addEventListener("message", onMessage);
	window.addEventListener("popstate", onPopState);
	window.addEventListener("hashchange", onHashChange);
	announce();
	return () => {
		window.removeEventListener("message", onMessage);
		window.removeEventListener("popstate", onPopState);
		window.removeEventListener("hashchange", onHashChange);
		window.history.pushState = originalPushState;
		window.history.replaceState = originalReplaceState;
	};
}
/** Collect static path patterns from a TanStack route tree (best-effort). */
function collectRoutePathsFromTree(routeTree) {
	const paths = /* @__PURE__ */ new Set();
	const walk = (node) => {
		if (!node || typeof node !== "object") return;
		const record = node;
		const full = typeof record.fullPath === "string" ? record.fullPath : typeof record.path === "string" ? record.path : null;
		if (full !== null && full !== "") paths.add(full.startsWith("/") ? full : `/${full}`);
		else if (full === "") paths.add("/");
		const children = record.children;
		if (Array.isArray(children)) for (const child of children) walk(child);
		else if (children && typeof children === "object") for (const child of Object.values(children)) walk(child);
	};
	walk(routeTree);
	return [...paths];
}
/**
* Mount once in `__root.tsx` so the Grok preview chrome can drive navigation
* (and later receive registered routes). Noops when the app is not embedded.
*/
function PreviewHostBridge() {
	const router = useRouter();
	(0, import_react.useEffect)(() => {
		return installPreviewHostBridge({
			navigate: (path) => {
				router.history.push(path);
			},
			getRoutePaths: () => collectRoutePathsFromTree(router.routeTree)
		});
	}, [router]);
	return null;
}
var TABS = [
	{
		to: "/",
		label: "خانه",
		icon: House
	},
	{
		to: "/archive",
		label: "آرشیو",
		icon: Archive
	},
	{
		to: "/stats",
		label: "آمار",
		icon: ChartColumn
	},
	{
		to: "/settings",
		label: "تنظیمات",
		icon: SlidersHorizontal
	}
];
function BottomNav() {
	const pathname = useRouterState({ select: (s) => s.location.pathname });
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
		className: "absolute inset-x-0 bottom-0 z-30 border-t border-line bg-bg/92 px-2 pt-1 backdrop-blur-md",
		style: { paddingBottom: "max(10px, env(safe-area-inset-bottom))" },
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
			className: "grid grid-cols-4",
			children: TABS.map((tab) => {
				const active = pathname === tab.to;
				const Icon = tab.icon;
				return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: tab.to,
					className: cn("flex min-h-14 flex-col items-center justify-center gap-0.5 text-[11px] font-medium", active ? "text-primary" : "text-muted"),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
						className: "size-5",
						strokeWidth: active ? 2.4 : 1.8,
						fill: active && tab.to === "/" ? "currentColor" : "none"
					}), tab.label]
				}) }, tab.to);
			})
		})
	});
}
function Button({ className, variant = "primary", type = "button", children, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
		type,
		className: cn("tap inline-flex items-center justify-center gap-2 font-medium select-none", "disabled:pointer-events-none disabled:opacity-40", variant === "primary" && "h-14 w-full rounded-full bg-primary px-5 text-base text-primary-fg shadow-[0_8px_20px_-10px_rgba(78,122,92,0.7)]", variant === "secondary" && "h-12 rounded-full bg-card px-4 text-sm text-ink shadow-card", variant === "ghost" && "h-11 rounded-full px-3 text-sm text-ink-soft", variant === "icon" && "size-11 rounded-full bg-card text-ink shadow-card", className),
		...props,
		children
	});
}
function IconButton({ className, children, label, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
		type: "button",
		"aria-label": label,
		className: cn("tap grid size-11 place-items-center rounded-full bg-card text-ink shadow-card", className),
		...props,
		children
	});
}
function Switch({ checked, onCheckedChange, label }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
		type: "button",
		role: "switch",
		"aria-checked": checked,
		"aria-label": label,
		onClick: () => onCheckedChange(!checked),
		className: cn("relative h-7 w-12 rounded-full transition-colors duration-200", checked ? "bg-primary" : "bg-mint"),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: cn("absolute top-0.5 size-6 rounded-full bg-card shadow-sm transition-[inset-inline-start] duration-200", checked ? "start-5" : "start-0.5") })
	});
}
var SLIDES = [
	{
		image: "/scenes/vessel.jpg",
		kicker: "سبو",
		title: "ذهنت ظرف همه‌چیز نیست.",
		body: "سبو ظرف قدیمی ایرانی‌ست؛ جایی بیرون از سر، برای نگه داشتن آنچه نباید تمام شب در فکر بچرخد."
	},
	{
		image: "/dolls/setare.jpg",
		kicker: "بسپار",
		title: "نگرانی را به عروسک بده.",
		body: "هر فکر یک نگهبان دارد. تا وقتی لازم باشد، او نگران می‌ماند تا تو کمی خالی شوی."
	},
	{
		image: "/scenes/hills.jpg",
		kicker: "پس بگیر",
		title: "بعداً که نگاه کنی، سبک‌تر است.",
		body: "وقتی نگرانی تمام شد، به آرشیو برگرد. بیشتر چیزها آرام‌تر از چیزی‌اند که فکر می‌کردی."
	}
];
function Onboarding() {
	const [i, setI] = (0, import_react.useState)(0);
	const complete = useSaboo((s) => s.completeOnboarding);
	const slide = SLIDES[i] ?? SLIDES[0];
	const last = i === SLIDES.length - 1;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex min-h-full flex-col bg-bg",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "relative h-[52dvh] overflow-hidden",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
				src: slide.image,
				alt: "",
				className: "size-full object-cover object-top enter-up"
			}, slide.image), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-x-0 bottom-0 h-24 bg-linear-to-t from-bg to-transparent" })]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-1 flex-col px-6 pt-2 pb-8",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs font-medium tracking-wide text-primary",
					children: slide.kicker
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "mt-2 text-3xl font-semibold leading-snug",
					children: slide.title
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-3 text-sm leading-7 text-ink-soft",
					children: slide.body
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-6 flex items-center gap-1.5",
					children: SLIDES.map((_, idx) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: idx === i ? "h-1.5 w-6 rounded-full bg-primary" : "h-1.5 w-1.5 rounded-full bg-mint" }, idx))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-auto space-y-2 pt-8",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						onClick: () => last ? complete() : setI((n) => n + 1),
						children: last ? "ورود به سبو" : "ادامه"
					}), !last && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "ghost",
						className: "w-full",
						onClick: complete,
						children: "رد کردن"
					})]
				})
			]
		})]
	});
}
function Splash() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex min-h-full flex-col items-center justify-center bg-bg px-8 text-center",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "size-36 overflow-hidden rounded-full shadow-soft",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					src: "/scenes/vessel.jpg",
					alt: "",
					className: "size-full object-cover"
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "mt-6 text-4xl font-semibold",
				children: "سبو"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 text-sm text-muted",
				children: "ذهنت ظرف همه‌چیز نیست."
			})
		]
	});
}
var MOOD_LABELS = {
	1: "سنگین",
	2: "خسته",
	3: "معمولی",
	4: "آرام",
	5: "سبک"
};
function DollPortrait({ dollId, className, alt }) {
	const doll = getDoll(dollId);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
		src: doll.image,
		alt: alt ?? doll.name,
		width: 640,
		height: 640,
		decoding: "async",
		className: cn("block size-full object-cover object-center", className)
	});
}
function DollTile({ dollId, selected, onSelect, label }) {
	const doll = getDoll(dollId);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
		type: "button",
		onClick: onSelect,
		className: cn("tap relative overflow-hidden rounded-2xl bg-card shadow-card", selected && "ring-2 ring-primary ring-offset-2 ring-offset-bg"),
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "aspect-square",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DollPortrait, {
					dollId,
					alt: ""
				})
			}),
			selected && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "absolute top-2 left-2 grid size-6 place-items-center rounded-full bg-primary text-primary-fg",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
					width: "12",
					height: "12",
					viewBox: "0 0 12 12",
					fill: "none",
					"aria-hidden": true,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
						d: "M2.2 6.2 4.6 8.6 9.8 3.4",
						stroke: "currentColor",
						strokeWidth: "1.8",
						strokeLinecap: "round",
						strokeLinejoin: "round"
					})
				})
			}),
			label && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "absolute inset-x-0 bottom-0 bg-linear-to-t from-ink/50 to-transparent px-2 pb-2 pt-6 text-center text-xs text-primary-fg",
				children: label
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "sr-only",
				children: doll.name
			})
		]
	});
}
function Overlays() {
	const ritual = useSaboo((s) => s.ritual);
	const notifOpen = useSaboo((s) => s.notifOpen);
	if (!ritual && !notifOpen) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		notifOpen && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NotifSheet, {}),
		ritual?.kind === "hand" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HandRitual, { worryId: ritual.worryId }),
		ritual?.kind === "breath" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BreathRitual, { worryId: ritual.worryId }),
		ritual?.kind === "night" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NightRitual, {}),
		ritual?.kind === "mood" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MoodSheet, {}),
		ritual?.kind === "resolve" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResolveSheet, { worryId: ritual.worryId })
	] });
}
function Backdrop({ children, onClose }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "absolute inset-0 z-40 flex flex-col bg-bg/96 backdrop-blur-sm",
		children: [onClose && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
			type: "button",
			"aria-label": "بستن",
			onClick: onClose,
			className: "absolute top-4 left-4 z-10 grid size-11 place-items-center rounded-full bg-card shadow-card",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-4" })
		}), children]
	});
}
function HandRitual({ worryId }) {
	const worry = useSaboo((s) => s.worries.find((w) => w.id === worryId));
	const openRitual = useSaboo((s) => s.openRitual);
	const closeRitual = useSaboo((s) => s.closeRitual);
	const doll = getDoll(worry?.dollId ?? "mehr");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Backdrop, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-1 flex-col items-center justify-center px-8 text-center",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "enter-up relative size-56 overflow-hidden rounded-full shadow-soft",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "absolute inset-0 animate-[saboo-glow_3s_ease-in-out_infinite]",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DollPortrait, { dollId: doll.id })
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "enter-up-2 mt-6 text-sm text-muted",
				children: [doll.name, " شنید."]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "enter-up-2 mt-1 text-2xl font-semibold",
				children: "سبو این نگرانی را گرفت"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "enter-up-3 mt-3 max-w-xs text-sm leading-7 text-ink-soft",
				children: worry?.text
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "enter-up-3 mt-4 text-xs text-muted",
				children: "ذهنت ظرف همه‌چیز نیست."
			})
		]
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "enter-up-4 space-y-3 px-6 pb-8",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
			onClick: () => openRitual({
				kind: "breath",
				worryId
			}),
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Wind, { className: "size-4" }), "یک نفس عمیق"]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
			variant: "ghost",
			className: "w-full",
			onClick: closeRitual,
			children: "باشه"
		})]
	})] });
}
function BreathRitual({ worryId }) {
	const closeRitual = useSaboo((s) => s.closeRitual);
	const [phase, setPhase] = (0, import_react.useState)("in");
	const [cycles, setCycles] = (0, import_react.useState)(0);
	(0, import_react.useEffect)(() => {
		const id = window.setInterval(() => {
			setPhase((p) => {
				if (p === "in") return "out";
				setCycles((c) => c + 1);
				return "in";
			});
		}, 4e3);
		return () => window.clearInterval(id);
	}, []);
	(0, import_react.useEffect)(() => {
		if (cycles >= 3) closeRitual();
	}, [cycles, closeRitual]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Backdrop, {
		onClose: closeRitual,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-1 flex-col items-center justify-center px-8 text-center",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "grid size-44 place-items-center rounded-full bg-mint",
						style: { animation: "saboo-breathe 4s ease-in-out infinite" },
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "size-24 rounded-full bg-primary/80" })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-8 text-xl font-semibold",
						children: phase === "in" ? "دم…" : "بازدم…"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-2 text-sm text-muted",
						children: [toFaDigits(Math.min(cycles + 1, 3)), " از ۳ نفس"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-6 max-w-xs text-sm leading-7 text-ink-soft",
						children: "نگرانی پیش عروسک ماند. تو فقط نفس بکش."
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "px-6 pb-8",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					variant: "ghost",
					className: "w-full",
					onClick: closeRitual,
					children: "کافی‌ست"
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "sr-only",
				children: worryId
			})
		]
	});
}
function NightRitual() {
	const complete = useSaboo((s) => s.completeNightRitual);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Backdrop, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "relative flex flex-1 flex-col",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
				src: "/scenes/night.jpg",
				alt: "",
				className: "absolute inset-0 size-full object-cover"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-linear-to-t from-ink/70 via-ink/20 to-transparent" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative mt-auto px-7 pb-10 text-primary-fg",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-primary-fg/80",
						children: "آیین شب"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "mt-1 text-2xl font-semibold",
						children: "سبوها زیر بالش رفتند"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-3 text-sm leading-7 text-primary-fg/85",
						children: "نگرانی‌هایت تا صبح پیش مهتاب می‌مانند. تو بخواب."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						className: "mt-6",
						onClick: complete,
						children: "شب بخیر"
					})
				]
			})
		]
	}) });
}
function MoodSheet() {
	const setMood = useSaboo((s) => s.setMood);
	const closeRitual = useSaboo((s) => s.closeRitual);
	const today = useSaboo((s) => s.moods.find((m) => m.date === (/* @__PURE__ */ new Date()).toISOString().slice(0, 10)));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Backdrop, {
		onClose: closeRitual,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-auto rounded-t-3xl bg-card px-6 pt-6 pb-8 shadow-soft",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "text-xl font-semibold",
					children: "امروز حالت چطوره؟"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 text-sm text-muted",
					children: "یک لمس کافی‌ست. لازم نیست توضیح بدهی."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-6 grid grid-cols-5 gap-2",
					children: [
						1,
						2,
						3,
						4,
						5
					].map((m) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						onClick: () => setMood(m),
						className: cn("tap flex h-20 flex-col items-center justify-center rounded-2xl text-xs", today?.mood === m ? "bg-primary text-primary-fg" : "bg-card-2 text-ink-soft"),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "mb-2 rounded-full bg-current/20",
							style: {
								width: 8 + m * 4,
								height: 8 + m * 4
							}
						}), MOOD_LABELS[m]]
					}, m))
				})
			]
		})
	});
}
function ResolveSheet({ worryId }) {
	const worry = useSaboo((s) => s.worries.find((w) => w.id === worryId));
	const resolveWorry = useSaboo((s) => s.resolveWorry);
	const closeRitual = useSaboo((s) => s.closeRitual);
	const [reflection, setReflection] = (0, import_react.useState)("better");
	const [note, setNote] = (0, import_react.useState)("");
	if (!worry) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Backdrop, {
		onClose: closeRitual,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-1 flex-col overflow-y-auto px-5 pt-16 pb-8",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mx-auto size-28 overflow-hidden rounded-full shadow-card",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DollPortrait, { dollId: worry.dollId })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mt-5 text-center text-xl font-semibold",
					children: "این نگرانی تمام شد؟"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-center text-sm leading-7 text-muted",
					children: "نسبت به چیزی که فکر می‌کردی، چقدر بد بود؟"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-5 space-y-2",
					children: [
						{
							id: "better",
							title: "بهتر از فکر من",
							body: "آن‌قدرها هم بد نبود."
						},
						{
							id: "same",
							title: "همان‌قدر",
							body: "درست همان چیزی بود که حدس می‌زدم."
						},
						{
							id: "worse",
							title: "سخت‌تر بود",
							body: "سنگین‌تر از چیزی که فکر می‌کردم."
						}
					].map((o) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						onClick: () => setReflection(o.id),
						className: cn("tap flex w-full items-center justify-between rounded-2xl px-4 py-3 text-right shadow-card", reflection === o.id ? "bg-mint" : "bg-card"),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "block text-sm font-medium",
							children: o.title
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-xs text-muted",
							children: o.body
						})] }), reflection === o.id && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "size-4 text-primary" })]
					}, o.id))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
					value: note,
					onChange: (e) => setNote(e.target.value),
					rows: 3,
					maxLength: 280,
					placeholder: "اگر خواستی، یک جمله برای بعداً بنویس…",
					className: "mt-4 resize-none rounded-2xl bg-card px-4 py-3 text-sm leading-7 shadow-card outline-none placeholder:text-muted"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					className: "mt-5",
					onClick: () => resolveWorry(worryId, reflection, note),
					children: "این نگرانی تمام شد"
				})
			]
		})
	});
}
function NotifSheet() {
	const items = useSaboo((s) => s.notifications);
	const setNotifOpen = useSaboo((s) => s.setNotifOpen);
	const openRitual = useSaboo((s) => s.openRitual);
	const hour = (0, import_react.useMemo)(() => (/* @__PURE__ */ new Date()).getHours(), []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Backdrop, {
		onClose: () => setNotifOpen(false),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-1 flex-col overflow-y-auto px-5 pt-16 pb-8",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "text-xl font-semibold",
					children: "یادآوری‌های نرم"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 text-sm text-muted",
					children: "هیچ اعلانی از این دستگاه بیرون نمی‌رود."
				}),
				hour >= 21 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					onClick: () => {
						setNotifOpen(false);
						openRitual({ kind: "night" });
					},
					className: "tap mt-5 overflow-hidden rounded-2xl text-right shadow-card",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: "/scenes/night.jpg",
						alt: "",
						className: "h-28 w-full object-cover"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "block bg-card px-4 py-3 text-sm font-medium",
						children: "سبوها را بخوابان"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
					className: "mt-5 space-y-2",
					children: [items.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
						className: "rounded-2xl bg-card px-4 py-5 text-sm text-muted shadow-card",
						children: "هنوز یادآوری‌ای نیست."
					}), items.map((n) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "rounded-2xl bg-card px-4 py-3 shadow-card",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm font-medium",
							children: n.title
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 text-xs leading-5 text-muted",
							children: n.body
						})]
					}, n.id))]
				})
			]
		})
	});
}
var NAV_PATHS = /* @__PURE__ */ new Set([
	"/",
	"/archive",
	"/stats",
	"/settings"
]);
function AppGate({ children }) {
	const hydrated = useSaboo((s) => s.hydrated);
	const onboarded = useSaboo((s) => s.onboarded);
	const pathname = useRouterState({ select: (s) => s.location.pathname });
	const showNav = onboarded && hydrated && NAV_PATHS.has(pathname);
	(0, import_react.useEffect)(() => {
		const t = window.setTimeout(() => {
			if (!useSaboo.getState().hydrated) useSaboo.setState({ hydrated: true });
		}, 80);
		return () => window.clearTimeout(t);
	}, []);
	(0, import_react.useEffect)(() => {
		if (hydrated && onboarded) useSaboo.getState().maybeDailyPrompts();
	}, [hydrated, onboarded]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "desk-stage",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "phone-shell",
			children: [!hydrated ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Splash, {}) : !onboarded ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Onboarding, {}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: showNav ? "h-full overflow-y-auto overscroll-contain pb-24" : "h-full overflow-y-auto overscroll-contain",
					children
				}),
				showNav && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BottomNav, {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Overlays, {})
			] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toaster, {
				position: "top-center",
				dir: "rtl",
				toastOptions: {
					className: "font-sans",
					style: {
						background: "#fffaf3",
						color: "#24352c",
						border: "none",
						borderRadius: 16,
						fontFamily: "Vazirmatn, sans-serif"
					}
				}
			})]
		})
	});
}
var styles_default = "/assets/styles-COf_YJm_.css";
var APP_NAME = "سبو";
var Route$6 = createRootRoute({
	notFoundComponent: NotFound,
	head: () => ({
		meta: [
			{ charSet: "utf-8" },
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1, viewport-fit=cover"
			},
			{ title: APP_NAME },
			{
				name: "theme-color",
				content: "#F4EFE6"
			},
			{
				name: "description",
				content: "نگرانی‌هایت را بسپار، آرامش را پس بگیر. ذهنت ظرف همه‌چیز نیست."
			}
		],
		links: [
			{
				rel: "icon",
				type: "image/svg+xml",
				href: "/favicon.svg"
			},
			{
				rel: "stylesheet",
				href: styles_default
			},
			{
				rel: "stylesheet",
				href: "https://fonts.googleapis.com/css2?family=Vazirmatn:wght@300;400;500;600;700;800&display=swap"
			},
			{
				rel: "manifest",
				href: "/__grok/manifest.webmanifest"
			},
			{
				rel: "apple-touch-icon",
				href: "/__grok/icon-180.png"
			}
		]
	}),
	component: RootDocument
});
function NotFound() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex min-h-full flex-col items-center justify-center px-8 text-center",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-sm text-muted",
			children: "این صفحه در سبو نیست."
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
			href: "/",
			className: "mt-4 text-sm font-medium text-primary",
			children: "بازگشت به خانه"
		})]
	});
}
function RootDocument() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("html", {
		lang: "fa",
		dir: "rtl",
		suppressHydrationWarning: true,
		className: "antialiased",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("head", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeadContent, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("body", {
			className: "bg-sand text-ink",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PreviewHostBridge, {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AuthProvider, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppGate, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {}) }) }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scripts, {})
			]
		})]
	});
}
var $$splitComponentImporter$5 = () => import("./routes-CxJk5wGI.mjs");
var Route$5 = createFileRoute("/")({ component: lazyRouteComponent($$splitComponentImporter$5, "component") });
var $$splitComponentImporter$4 = () => import("./archive-CzW1qJSN.mjs");
var Route$4 = createFileRoute("/archive")({ component: lazyRouteComponent($$splitComponentImporter$4, "component") });
var $$splitComponentImporter$3 = () => import("./new-CnzYGIfq.mjs");
var Route$3 = createFileRoute("/new")({
	component: lazyRouteComponent($$splitComponentImporter$3, "component"),
	validateSearch: (s) => ({ q: typeof s.q === "string" ? s.q : void 0 })
});
var $$splitComponentImporter$2 = () => import("./settings-M5bOyPq_.mjs");
var Route$2 = createFileRoute("/settings")({ component: lazyRouteComponent($$splitComponentImporter$2, "component") });
var $$splitComponentImporter$1 = () => import("./stats-Bo-YptaI.mjs");
var Route$1 = createFileRoute("/stats")({ component: lazyRouteComponent($$splitComponentImporter$1, "component") });
var $$splitComponentImporter = () => import("./worry._id-BrfsHIHt.mjs");
var Route = createFileRoute("/worry/$id")({ component: lazyRouteComponent($$splitComponentImporter, "component") });
var rootRouteChildren = {
	IndexRoute: Route$5.update({
		id: "/",
		path: "/",
		getParentRoute: () => Route$6
	}),
	ArchiveRoute: Route$4.update({
		id: "/archive",
		path: "/archive",
		getParentRoute: () => Route$6
	}),
	NewRoute: Route$3.update({
		id: "/new",
		path: "/new",
		getParentRoute: () => Route$6
	}),
	SettingsRoute: Route$2.update({
		id: "/settings",
		path: "/settings",
		getParentRoute: () => Route$6
	}),
	StatsRoute: Route$1.update({
		id: "/stats",
		path: "/stats",
		getParentRoute: () => Route$6
	}),
	WorryIdRoute: Route.update({
		id: "/worry/$id",
		path: "/worry/$id",
		getParentRoute: () => Route$6
	})
};
var routeTree = Route$6._addFileChildren(rootRouteChildren)._addFileTypes();
var router_exports = /* @__PURE__ */ __exportAll({ getRouter: () => getRouter });
function getRouter() {
	return createRouter({
		routeTree,
		defaultErrorComponent: AppErrorComponent,
		scrollRestoration: true
	});
}
//#endregion
export { toFaDigits as C, selectResolved as S, useSaboo as T, formatRelative as _, DollTile as a, isoDay as b, IconButton as c, DOLLS as d, categoryLabel as f, formatDurationShort as g, formatDurationDays as h, DollPortrait as i, Switch as l, cn as m, Route as n, MOOD_LABELS as o, checkInStreak as p, Route$3 as r, Button as s, router_exports as t, CATEGORIES as u, getDoll as v, toJalaliParts as w, selectActive as x, insightStats as y };

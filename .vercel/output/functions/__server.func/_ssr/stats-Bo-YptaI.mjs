import { i as __toESM } from "../_runtime.mjs";
import { S as require_jsx_runtime, V as require_react } from "../_libs/@tanstack/react-router+[...].mjs";
import { C as toFaDigits, T as useSaboo, b as isoDay, h as formatDurationDays, o as MOOD_LABELS, p as checkInStreak, s as Button, w as toJalaliParts, x as selectActive, y as insightStats } from "./router-D2tNBkkj.mjs";
import { t as quoteForDay } from "./quotes-CBilUwSU.mjs";
import { a as ResponsiveContainer, i as Area, n as YAxis, o as Tooltip, r as XAxis, t as AreaChart } from "../_libs/recharts+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/stats-Bo-YptaI.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function Stats() {
	const worries = useSaboo((s) => s.worries);
	const moods = useSaboo((s) => s.moods);
	const setMoodOpen = useSaboo((s) => s.openRitual);
	const stats = insightStats(worries);
	const streak = checkInStreak(moods, worries);
	const active = selectActive(worries);
	const quote = quoteForDay();
	const chart = (0, import_react.useMemo)(() => {
		const map = new Map(moods.map((m) => [m.date, m.mood]));
		const out = [];
		for (let i = 13; i >= 0; i--) {
			const ts = Date.now() - i * 864e5;
			const key = isoDay(ts);
			const { jd } = toJalaliParts(new Date(ts));
			out.push({
				day: toFaDigits(jd),
				mood: map.get(key) ?? 0,
				label: key
			});
		}
		return out;
	}, [moods]);
	async function shareInsight() {
		const text = `از ${toFaDigits(stats.resolvedCount)} نگرانی من، ${toFaDigits(stats.percent)}٪ بهتر از چیزی بود که فکر می‌کردم.\nذهنت ظرف همه‌چیز نیست. — سبو`;
		try {
			if (navigator.share) await navigator.share({
				text,
				title: "سبو"
			});
			else await navigator.clipboard.writeText(text);
		} catch {}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "px-5 pb-8 pt-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "text-center text-xl font-semibold",
				children: "آمار"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "enter-up mt-5 rounded-3xl bg-primary px-5 py-6 text-primary-fg",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs text-primary-fg/80",
						children: "زنجیره حضور"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-1 text-4xl font-semibold tabular-nums",
						children: [toFaDigits(streak), " روز"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-sm leading-6 text-primary-fg/85",
						children: quote
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "enter-up-2 mt-4 grid grid-cols-2 gap-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mini, {
						label: "فعال",
						value: toFaDigits(stats.activeCount)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mini, {
						label: "تمام‌شده",
						value: toFaDigits(stats.resolvedCount)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mini, {
						label: "آرام‌تر از تصور",
						value: `${toFaDigits(stats.percent)}٪`
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mini, {
						label: "میانگین عمر نگرانی",
						value: formatDurationDays(stats.avgMs)
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "enter-up-3 mt-6 rounded-3xl bg-card p-4 shadow-card",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center justify-between",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "text-sm font-semibold",
						children: "حال این دو هفته"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: "text-xs text-primary",
						onClick: () => setMoodOpen({ kind: "mood" }),
						children: "ثبت امروز"
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-3 h-40",
					dir: "ltr",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResponsiveContainer, {
						width: "100%",
						height: "100%",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AreaChart, {
							data: chart,
							margin: {
								top: 8,
								right: 8,
								left: -24,
								bottom: 0
							},
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("defs", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("linearGradient", {
									id: "moodFill",
									x1: "0",
									y1: "0",
									x2: "0",
									y2: "1",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
										offset: "0%",
										stopColor: "var(--color-primary)",
										stopOpacity: .35
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
										offset: "100%",
										stopColor: "var(--color-primary)",
										stopOpacity: .02
									})]
								}) }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(XAxis, {
									dataKey: "day",
									tick: {
										fontSize: 10,
										fill: "var(--color-muted)"
									},
									axisLine: false,
									tickLine: false
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(YAxis, {
									domain: [0, 5],
									hide: true
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, { content: ({ active, payload }) => {
									if (!active || !payload?.[0]) return null;
									const mood = Number(payload[0].value);
									return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "rounded-lg bg-card px-2 py-1 text-xs shadow-card",
										children: mood ? MOOD_LABELS[mood] : "بدون ثبت"
									});
								} }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Area, {
									type: "monotone",
									dataKey: "mood",
									stroke: "var(--color-primary)",
									strokeWidth: 2,
									fill: "url(#moodFill)"
								})
							]
						})
					})
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "mt-6 rounded-3xl bg-card px-5 py-5 shadow-card",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "text-sm font-semibold",
						children: "الان پیش عروسک‌ها"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-sm leading-6 text-muted",
						children: active.length === 0 ? "سبو خالی‌ست. یک نفس بکش." : `${toFaDigits(active.length)} نگرانی هنوز فعال است. لازم نیست همه را امروز تمام کنی.`
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						className: "mt-4",
						variant: "secondary",
						onClick: shareInsight,
						children: "اشتراک بینش (بدون متن نگرانی)"
					})
				]
			})
		]
	});
}
function Mini({ label, value }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-2xl bg-card px-4 py-4 shadow-card",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-[11px] text-muted",
			children: label
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-1 text-xl font-semibold tabular-nums",
			children: value
		})]
	});
}
//#endregion
export { Stats as component };

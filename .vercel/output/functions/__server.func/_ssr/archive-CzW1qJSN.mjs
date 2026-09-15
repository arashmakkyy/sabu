import { S as require_jsx_runtime, b as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { g as ChartColumn, p as Clock } from "../_libs/lucide-react.mjs";
import { C as toFaDigits, S as selectResolved, T as useSaboo, f as categoryLabel, g as formatDurationShort, i as DollPortrait, y as insightStats } from "./router-D2tNBkkj.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/archive-CzW1qJSN.js
var import_jsx_runtime = require_jsx_runtime();
function Archive() {
	const navigate = useNavigate();
	const worries = useSaboo((s) => s.worries);
	const resolved = selectResolved(worries);
	const stats = insightStats(worries);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "px-5 pb-8 pt-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "text-center text-xl font-semibold",
				children: "آرشیو و بینش"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "enter-up relative mt-5 overflow-hidden rounded-3xl shadow-card",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: "/scenes/hills.jpg",
						alt: "",
						className: "h-44 w-full object-cover"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-linear-to-t from-ink/25 to-transparent" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "absolute inset-0 flex flex-col items-center justify-center px-6 text-center text-ink",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-5xl font-semibold tabular-nums",
							children: [toFaDigits(stats.percent), "٪"]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 max-w-56 text-sm font-medium leading-6",
							children: "بیشتر نگرانی‌ها بهتر از چیزی بود که فکر می‌کردی"
						})]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-3 text-center text-xs text-muted",
				children: "هر نگرانی، یک قدم به سمت آرامش بیشتر."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-5 grid grid-cols-2 gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatChip, {
					icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock, { className: "size-4" }),
					label: "میانگین مدت",
					value: `${formatDurationShort(stats.avgMs)} روز`
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatChip, {
					icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChartColumn, { className: "size-4" }),
					label: "نگرانی‌های تمام‌شده",
					value: toFaDigits(stats.resolvedCount)
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-7 flex items-center justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "text-base font-semibold",
					children: "نگرانی‌های حل‌شده"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: () => navigate({ to: "/stats" }),
					className: "text-xs text-muted",
					children: "مشاهده همه"
				})]
			}),
			resolved.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-4 rounded-2xl bg-card px-4 py-8 text-center text-sm leading-7 text-muted shadow-card",
				children: "هنوز نگرانی تمام‌شده‌ای نیست. وقتی آماده بودی، به عروسک بگو دیگر لازم نیست نگران بماند."
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-4 grid grid-cols-2 gap-3",
				children: resolved.slice(0, 12).map((w) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					onClick: () => navigate({
						to: "/worry/$id",
						params: { id: w.id }
					}),
					className: "tap overflow-hidden rounded-2xl bg-card text-right shadow-card",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "relative h-36",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DollPortrait, {
							dollId: w.dollId,
							className: "object-top"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "absolute top-2 left-2 rounded-full bg-primary px-2.5 py-1 text-[10px] text-primary-fg",
							children: "حل‌شده"
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "px-3 py-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "truncate text-sm font-medium",
							children: categoryLabel(w.category) ?? w.text
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 line-clamp-2 text-xs leading-5 text-muted",
							children: w.reflectionNote || w.text
						})]
					})]
				}, w.id))
			})
		]
	});
}
function StatChip({ icon, label, value }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-2xl bg-card px-4 py-4 shadow-card",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-center gap-1.5 text-muted",
			children: [icon, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "text-[11px]",
				children: label
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-2 text-2xl font-semibold tabular-nums",
			children: value
		})]
	});
}
//#endregion
export { Archive as component };

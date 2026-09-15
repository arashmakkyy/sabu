import { i as __toESM } from "../_runtime.mjs";
import { S as require_jsx_runtime, V as require_react, b as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { _ as Bell, c as PencilLine, o as Send } from "../_libs/lucide-react.mjs";
import { C as toFaDigits, T as useSaboo, c as IconButton, f as categoryLabel, i as DollPortrait, s as Button, v as getDoll, x as selectActive } from "./router-D2tNBkkj.mjs";
import { t as quoteForDay } from "./quotes-CBilUwSU.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-CxJk5wGI.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function Home() {
	const navigate = useNavigate();
	const worries = useSaboo((s) => s.worries);
	const unread = useSaboo((s) => s.notifications.some((n) => !n.read));
	const setNotifOpen = useSaboo((s) => s.setNotifOpen);
	const name = useSaboo((s) => s.settings.displayName);
	const [draft, setDraft] = (0, import_react.useState)("");
	const active = selectActive(worries);
	const quote = (0, import_react.useMemo)(() => quoteForDay(), []);
	const dollCards = active.reduce((acc, w) => {
		if (acc.some((d) => d.dollId === w.dollId)) return acc;
		acc.push({
			dollId: w.dollId,
			label: categoryLabel(w.category) ?? getDoll(w.dollId).name,
			worryId: w.id
		});
		return acc;
	}, []);
	function goNew() {
		const q = draft.trim();
		navigate({
			to: "/new",
			search: { q: q || void 0 }
		});
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "px-5 pb-6 pt-5",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "flex items-start justify-between gap-3 enter-up",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-3xl font-semibold tracking-tight",
					children: "سبو"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 max-w-52 text-xs leading-5 text-muted",
					children: name ? `${name}، جایی برای نگرانی‌های تو و آرامش فردایت` : "جایی برای نگرانی‌های تو و آرامش فردایت"
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "relative",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(IconButton, {
						label: "یادآوری‌ها",
						onClick: () => setNotifOpen(true),
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bell, {
							className: "size-5",
							strokeWidth: 1.7
						})
					}), unread && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "absolute top-1 right-1 size-2 rounded-full bg-primary" })]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "enter-up-2 relative mt-5 h-56 overflow-hidden rounded-3xl bg-card shadow-card",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-linear-to-r from-mint/50 via-card to-card" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: "/dolls/mehr.jpg",
						alt: "",
						className: "absolute -right-6 -bottom-10 h-72 w-72 object-cover"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "absolute top-10 left-6 max-w-32 text-sm font-medium leading-7 text-ink",
						children: [
							"تو قوی‌تر",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
							"از نگرانی‌هایی"
						]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "enter-up-3 mt-6",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "text-lg font-semibold",
						children: "امروز حالت چطوره؟"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-3 text-sm font-medium text-ink-soft",
						children: "چی ذهنت رو درگیر کرده؟"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-3 flex items-center gap-3 rounded-2xl bg-card px-4 py-2 shadow-card",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							value: draft,
							onChange: (e) => setDraft(e.target.value),
							onKeyDown: (e) => {
								if (e.key === "Enter") goNew();
							},
							placeholder: "مثلاً: نگران جلسه فردا هستم…",
							className: "h-11 flex-1 bg-transparent text-sm outline-none placeholder:text-muted"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PencilLine, { className: "size-4 text-muted" })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						className: "mt-4",
						onClick: goNew,
						children: ["بسپارش به عروسک", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Send, { className: "size-4" })]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "enter-up-4 mt-8",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center justify-between",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "text-base font-semibold",
							children: "عروسک‌های فعال من"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: () => navigate({ to: "/archive" }),
							className: "text-xs text-muted",
							children: "مشاهده همه"
						})]
					}),
					dollCards.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-4 rounded-2xl bg-card px-4 py-6 text-center text-sm leading-7 text-muted shadow-card",
						children: [
							quote,
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
							"هنوز نگرانی فعالی نیست. وقتی آماده بودی، بسپار."
						]
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "-mx-5 mt-4 flex gap-3 overflow-x-auto px-5 pb-2",
						children: dollCards.map((d) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							onClick: () => navigate({
								to: "/worry/$id",
								params: { id: d.worryId }
							}),
							className: "tap w-28 shrink-0 rounded-2xl bg-card p-2 shadow-card",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "aspect-square overflow-hidden rounded-xl",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DollPortrait, { dollId: d.dollId })
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-2 text-center text-xs font-medium",
								children: d.label
							})]
						}, d.dollId))
					}),
					active.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-3 text-center text-xs text-muted",
						children: [toFaDigits(active.length), " نگرانی الان پیش عروسک‌هاست"]
					})
				]
			})
		]
	});
}
//#endregion
export { Home as component };

import { i as __toESM } from "../_runtime.mjs";
import { S as require_jsx_runtime, V as require_react, b as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { o as Send } from "../_libs/lucide-react.mjs";
import { C as toFaDigits, T as useSaboo, a as DollTile, d as DOLLS, r as Route$3, s as Button, u as CATEGORIES } from "./router-D2tNBkkj.mjs";
import { t as SubHeader } from "./sub-header-Dg1UscL7.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/new-CnzYGIfq.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function NewWorry() {
	const { q } = Route$3.useSearch();
	const navigate = useNavigate();
	const addWorry = useSaboo((s) => s.addWorry);
	const openRitual = useSaboo((s) => s.openRitual);
	const [text, setText] = (0, import_react.useState)(q ?? "");
	const [category, setCategory] = (0, import_react.useState)();
	const [dollId, setDollId] = (0, import_react.useState)("setare");
	const remaining = 500 - text.length;
	const canSubmit = text.trim().length > 1;
	const suggested = (0, import_react.useMemo)(() => CATEGORIES.find((c) => c.id === category)?.dollId, [category]);
	function pickCategory(id) {
		setCategory(id);
		const d = CATEGORIES.find((c) => c.id === id)?.dollId;
		if (d) setDollId(d);
	}
	function submit() {
		if (!canSubmit) return;
		const id = addWorry({
			text: text.trim(),
			dollId,
			category
		});
		openRitual({
			kind: "hand",
			worryId: id
		});
		navigate({
			to: "/worry/$id",
			params: { id }
		});
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex min-h-full flex-col pb-8",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SubHeader, {
			title: "نگرانی جدید",
			subtitle: "با خیال راحت بنویس. اینجا قضاوتی وجود نداره."
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-1 flex-col px-5",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "relative rounded-2xl bg-card shadow-card",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
						value: text,
						onChange: (e) => setText(e.target.value.slice(0, 500)),
						rows: 5,
						autoFocus: true,
						placeholder: "می‌ترسم ارائه‌ام خوب پیش نره.",
						className: "w-full resize-none rounded-2xl bg-transparent px-4 py-4 text-sm leading-7 outline-none placeholder:text-muted"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "absolute bottom-3 left-3 text-[11px] text-muted",
						children: [
							toFaDigits(text.length),
							"/",
							toFaDigits(500)
						]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-6 text-sm font-medium",
					children: "موضوع"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-2 flex flex-wrap gap-2",
					children: CATEGORIES.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: () => pickCategory(c.id),
						className: category === c.id ? "h-9 rounded-full bg-primary px-3 text-xs text-primary-fg" : "h-9 rounded-full bg-card px-3 text-xs text-ink-soft shadow-card",
						children: c.label
					}, c.id))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-6 flex items-center justify-between",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm font-medium",
						children: "یک عروسک انتخاب کن"
					}), suggested && dollId !== suggested && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: "text-xs text-primary",
						onClick: () => setDollId(suggested),
						children: "پیشنهاد سبو"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-3 grid grid-cols-2 gap-3",
					children: DOLLS.map((d) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DollTile, {
						dollId: d.id,
						selected: dollId === d.id,
						onSelect: () => setDollId(d.id)
					}, d.id))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					className: "mt-6",
					disabled: !canSubmit,
					onClick: submit,
					children: ["این نگرانی رو می‌سپارم", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Send, { className: "size-4" })]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-3 text-center text-xs leading-5 text-muted",
					children: "هر وقت خواستی می‌تونی دوباره بهش چیزی بگی."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "sr-only",
					children: remaining
				})
			]
		})]
	});
}
//#endregion
export { NewWorry as component };

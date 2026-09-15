import { i as __toESM } from "../_runtime.mjs";
import { S as require_jsx_runtime, V as require_react, b as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { T as useSaboo, l as Switch, s as Button } from "./router-D2tNBkkj.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/settings-M5bOyPq_.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function Settings() {
	const navigate = useNavigate();
	const settings = useSaboo((s) => s.settings);
	const updateSettings = useSaboo((s) => s.updateSettings);
	const resetAll = useSaboo((s) => s.resetAll);
	const loadDemo = useSaboo((s) => s.loadDemo);
	const worries = useSaboo((s) => s.worries);
	const openRitual = useSaboo((s) => s.openRitual);
	const [name, setName] = (0, import_react.useState)(settings.displayName);
	function exportData() {
		const blob = new Blob([JSON.stringify({
			worries,
			settings,
			exportedAt: (/* @__PURE__ */ new Date()).toISOString()
		}, null, 2)], { type: "application/json" });
		const url = URL.createObjectURL(blob);
		const a = document.createElement("a");
		a.href = url;
		a.download = "saboo.json";
		a.click();
		URL.revokeObjectURL(url);
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "px-5 pb-8 pt-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "text-center text-xl font-semibold",
				children: "تنظیمات"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				className: "mt-6 overflow-hidden rounded-3xl bg-card shadow-card",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-4 px-4 py-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: "/scenes/vessel.jpg",
						alt: "",
						className: "size-16 rounded-full object-cover"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex-1",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs text-muted",
							children: "نام تو در سبو"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							value: name,
							onChange: (e) => setName(e.target.value),
							onBlur: () => updateSettings({ displayName: name.trim() }),
							placeholder: "اختیاری",
							className: "mt-1 w-full bg-transparent text-base font-medium outline-none placeholder:text-muted"
						})]
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "mt-4 overflow-hidden rounded-3xl bg-card shadow-card",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
						title: "صدای نرم",
						body: "زنگ کوتاه وقتی نگرانی سپرده می‌شود",
						checked: settings.sound,
						onChange: (v) => updateSettings({ sound: v })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
						title: "لرزش آرام",
						body: "بازخورد لمسی روی دکمه‌های اصلی",
						checked: settings.haptics,
						onChange: (v) => updateSettings({ haptics: v })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
						title: "آیین شب",
						body: "بعد از نه شب، سبوها را زیر بالش می‌گذاریم",
						checked: settings.nightRitual,
						onChange: (v) => updateSettings({ nightRitual: v }),
						last: true
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "mt-4 overflow-hidden rounded-3xl bg-card shadow-card",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: () => openRitual({ kind: "night" }),
						className: "flex w-full items-center justify-between px-4 py-4 text-right",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "block text-sm font-medium",
							children: "خواباندن سبوها"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-xs text-muted",
							children: "آیین شب را همین حالا اجرا کن"
						})] })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: () => openRitual({ kind: "mood" }),
						className: "flex w-full items-center justify-between border-t border-line px-4 py-4 text-right",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "block text-sm font-medium",
							children: "ثبت حال امروز"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-xs text-muted",
							children: "پنج درجه، بدون توضیح"
						})] })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: () => navigate({ to: "/new" }),
						className: "flex w-full items-center justify-between border-t border-line px-4 py-4 text-right",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "block text-sm font-medium",
							children: "نگرانی تازه"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-xs text-muted",
							children: "بسپار و خالی شو"
						})] })
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "mt-6 rounded-3xl bg-card px-5 py-5 shadow-card",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "text-sm font-semibold",
						children: "درباره سبو"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-sm leading-7 text-ink-soft",
						children: "سبو ظرف قدیمی ایرانی‌ست. اینجا استعاره است از ظرفی بیرون از ذهن برای نگهداری فکرها و نگرانی‌ها. داده‌هایت فقط روی همین دستگاه می‌ماند؛ نه حساب کاربری، نه ابر، نه تبلیغ."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-3 text-sm leading-7 text-ink-soft",
						children: "این برنامه جایگزین درمان نیست. اگر نگرانی از کنترل خارج شد، با آدم مورد اعتماد یا متخصص حرف بزن."
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-5 space-y-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "secondary",
						className: "w-full",
						onClick: exportData,
						children: "خروجی داده‌ها"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "secondary",
						className: "w-full",
						onClick: loadDemo,
						children: "بارگذاری نمونه"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "ghost",
						className: "w-full text-danger",
						onClick: () => {
							if (confirm("همه نگرانی‌ها پاک شود؟ این کار برگشت ندارد.")) resetAll();
						},
						children: "پاک کردن همه چیز"
					})
				]
			})
		]
	});
}
function Row({ title, body, checked, onChange, last }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: last ? "flex items-center justify-between gap-4 px-4 py-4" : "flex items-center justify-between gap-4 border-b border-line px-4 py-4",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-sm font-medium",
			children: title
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-0.5 text-xs leading-5 text-muted",
			children: body
		})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Switch, {
			checked,
			onCheckedChange: onChange,
			label: title
		})]
	});
}
//#endregion
export { Settings as component };

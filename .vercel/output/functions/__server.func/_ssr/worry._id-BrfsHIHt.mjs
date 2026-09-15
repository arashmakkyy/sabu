import { i as __toESM } from "../_runtime.mjs";
import { S as require_jsx_runtime, V as require_react, b as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { h as Check, l as Mic, r as Type, s as Plus, u as ImagePlus } from "../_libs/lucide-react.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { T as useSaboo, _ as formatRelative, f as categoryLabel, i as DollPortrait, m as cn, n as Route, s as Button, v as getDoll } from "./router-D2tNBkkj.mjs";
import { t as SubHeader } from "./sub-header-Dg1UscL7.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/worry._id-BrfsHIHt.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
async function fileToDataUrl(file, max = 720) {
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
	return canvas.toDataURL("image/jpeg", .82);
}
function startSpeech(onResult) {
	const SR = typeof window !== "undefined" ? window : void 0;
	const Ctor = SR?.SpeechRecognition || SR?.webkitSpeechRecognition;
	if (!Ctor) throw new Error("speech-unsupported");
	const rec = new Ctor();
	rec.lang = "fa-IR";
	rec.interimResults = true;
	rec.continuous = false;
	rec.onresult = (ev) => {
		let text = "";
		for (let i = 0; i < ev.results.length; i++) text += ev.results[i]?.[0]?.transcript ?? "";
		onResult(text.trim());
	};
	rec.start();
	return () => {
		try {
			rec.stop();
		} catch {}
	};
}
function WorryDetail() {
	const { id } = Route.useParams();
	const navigate = useNavigate();
	const worry = useSaboo((s) => s.worries.find((w) => w.id === id));
	const addNote = useSaboo((s) => s.addNote);
	const deleteWorry = useSaboo((s) => s.deleteWorry);
	const openRitual = useSaboo((s) => s.openRitual);
	const reopenWorry = useSaboo((s) => s.reopenWorry);
	const [draft, setDraft] = (0, import_react.useState)("");
	const [listening, setListening] = (0, import_react.useState)(false);
	const stopRef = (0, import_react.useRef)(null);
	const fileRef = (0, import_react.useRef)(null);
	if (!worry) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex min-h-full flex-col items-center justify-center px-8 text-center",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-sm text-muted",
			children: "این نگرانی پیدا نشد."
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
			className: "mt-4 max-w-xs",
			onClick: () => navigate({ to: "/" }),
			children: "خانه"
		})]
	});
	const doll = getDoll(worry.dollId);
	const events = [{
		id: "origin",
		at: worry.createdAt,
		text: worry.text,
		photo: void 0
	}, ...worry.notes.map((n) => ({
		id: n.id,
		at: n.createdAt,
		text: n.content,
		photo: n.photoDataUrl
	}))].sort((a, b) => a.at - b.at);
	function saveNote(type, content, photo) {
		if (!content.trim() && !photo) return;
		addNote(worry.id, {
			type,
			content: content.trim() || "عکس",
			photoDataUrl: photo
		});
		setDraft("");
	}
	async function onPhoto(file) {
		if (!file) return;
		try {
			saveNote("photo", "یک تصویر سپرده شد", await fileToDataUrl(file));
		} catch {
			toast("نتوانستم عکس را بخوانم.");
		}
	}
	function toggleMic() {
		if (listening) {
			stopRef.current?.();
			setListening(false);
			return;
		}
		try {
			stopRef.current = startSpeech((t) => setDraft(t));
			setListening(true);
		} catch {
			toast("روی این دستگاه تشخیص صدا در دسترس نیست. بنویس.");
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex min-h-full flex-col pb-8",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SubHeader, {
			title: doll.name,
			onMore: () => {
				if (confirm("این نگرانی حذف شود؟")) {
					deleteWorry(worry.id);
					navigate({ to: "/" });
				}
			}
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "px-5",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "overflow-hidden rounded-3xl bg-card shadow-card",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "relative h-72",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DollPortrait, {
							dollId: doll.id,
							className: "object-top"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "absolute inset-x-0 bottom-0 bg-linear-to-t from-bg via-bg/40 to-transparent px-4 pb-4 pt-16",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center justify-between",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
									className: "text-lg font-semibold",
									children: categoryLabel(worry.category) ? `نگرانی ${categoryLabel(worry.category)}` : worry.text.slice(0, 22)
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: cn("rounded-full px-3 py-1 text-[11px] font-medium", worry.status === "active" ? "bg-mint text-primary" : "bg-sun text-ink"),
									children: worry.status === "active" ? "فعال" : "حل‌شده"
								})]
							})
						})]
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ol", {
					className: "relative mt-6 space-y-4 pr-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "absolute top-2 bottom-2 right-[5px] w-px bg-mint" }), events.map((e, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "relative pr-6",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: cn("absolute top-3 right-0 size-2.5 rounded-full", i === events.length - 1 ? "bg-primary" : "bg-leaf/50") }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-[11px] text-muted",
								children: formatRelative(e.at)
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-1 rounded-2xl bg-card px-4 py-3 text-sm leading-7 shadow-card",
								children: [e.text, e.photo && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
									src: e.photo,
									alt: "",
									className: "mt-2 max-h-40 w-full rounded-xl object-cover"
								})]
							})
						]
					}, e.id))]
				}),
				worry.status === "resolved" && worry.reflectionNote && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-4 rounded-2xl bg-mint px-4 py-3 text-sm leading-7",
					children: worry.reflectionNote
				}),
				worry.status === "active" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-6 rounded-2xl bg-card px-3 py-2 shadow-card",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "size-4 text-muted" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								value: draft,
								onChange: (e) => setDraft(e.target.value),
								placeholder: "یادداشت تازه",
								className: "h-11 flex-1 bg-transparent text-sm outline-none placeholder:text-muted",
								onKeyDown: (e) => {
									if (e.key === "Enter") saveNote("text", draft);
								}
							})]
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-3 grid grid-cols-3 gap-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ToolBtn, {
								label: "متن",
								icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Type, { className: "size-4" }),
								onClick: () => {
									if (draft.trim()) saveNote("text", draft);
								}
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ToolBtn, {
								label: listening ? "می‌شنوم" : "صدا",
								icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mic, { className: "size-4" }),
								active: listening,
								onClick: toggleMic
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ToolBtn, {
								label: "عکس",
								icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ImagePlus, { className: "size-4" }),
								onClick: () => fileRef.current?.click()
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						ref: fileRef,
						type: "file",
						accept: "image/*",
						className: "hidden",
						onChange: (e) => onPhoto(e.target.files?.[0])
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						className: "mt-6",
						onClick: () => openRitual({
							kind: "resolve",
							worryId: worry.id
						}),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "size-4" }), "این نگرانی تموم شد"]
					})
				] }),
				worry.status === "resolved" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					variant: "secondary",
					className: "mt-6 w-full",
					onClick: () => reopenWorry(worry.id),
					children: "دوباره فعالش کن"
				})
			]
		})]
	});
}
function ToolBtn({ label, icon, onClick, active }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
		type: "button",
		onClick,
		className: cn("tap flex h-16 flex-col items-center justify-center gap-1 rounded-2xl text-xs shadow-card", active ? "bg-mint text-primary" : "bg-card text-ink-soft"),
		children: [icon, label]
	});
}
//#endregion
export { WorryDetail as component };

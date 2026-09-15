import { S as require_jsx_runtime, b as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { f as Ellipsis, m as ChevronLeft } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/sub-header-Dg1UscL7.js
var import_jsx_runtime = require_jsx_runtime();
function SubHeader({ title, subtitle, onMore, end }) {
	const navigate = useNavigate();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("header", {
		className: "relative px-4 pt-4 pb-2",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex h-12 items-center justify-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					"aria-label": "بازگشت",
					onClick: () => navigate({ to: "/" }),
					className: "tap absolute top-4 left-3 grid size-11 place-items-center rounded-full text-ink",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronLeft, {
						className: "size-6",
						strokeWidth: 1.8
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "text-center",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "text-lg font-semibold tracking-tight",
						children: title
					}), subtitle && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-0.5 max-w-56 text-xs leading-5 text-muted",
						children: subtitle
					})]
				}),
				(onMore || end) && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "absolute top-4 right-3",
					children: end ?? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						"aria-label": "گزینه‌ها",
						onClick: onMore,
						className: "tap grid size-11 place-items-center rounded-full text-ink",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Ellipsis, { className: "size-5" })
					})
				})
			]
		})
	});
}
//#endregion
export { SubHeader as t };

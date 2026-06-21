import { o as __toESM } from "../_runtime.mjs";
import { r as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { t as cn } from "./utils-C_uf36nf.mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/Field-6JthDHSW.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var Field = import_react.forwardRef(({ label, hint, error, prefix, className, id, ...props }, ref) => {
	const inputId = id || import_react.useId();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-col gap-1.5",
		children: [
			label && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
				htmlFor: inputId,
				className: "text-xs font-medium text-muted-foreground",
				children: label
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: cn("group flex items-center gap-2 rounded-xl border border-border/70 bg-surface-1/60 px-3 h-10 transition-all", "focus-within:border-primary/60 focus-within:shadow-[0_0_0_4px_rgba(59,130,246,0.12)]", error && "border-destructive/60 focus-within:border-destructive/60 focus-within:shadow-[0_0_0_4px_rgba(220,38,38,0.12)]"),
				children: [prefix && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "text-muted-foreground/80 text-sm",
					children: prefix
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					id: inputId,
					ref,
					className: cn("w-full bg-transparent text-sm text-foreground placeholder:text-muted-foreground/50 outline-none", className),
					...props
				})]
			}),
			error ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "text-[11px] text-destructive",
				children: error
			}) : hint ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "text-[11px] text-muted-foreground/70",
				children: hint
			}) : null
		]
	});
});
Field.displayName = "Field";
var Area = import_react.forwardRef(({ label, error, className, id, ...props }, ref) => {
	const inputId = id || import_react.useId();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-col gap-1.5",
		children: [
			label && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
				htmlFor: inputId,
				className: "text-xs font-medium text-muted-foreground",
				children: label
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
				id: inputId,
				ref,
				className: cn("min-h-[80px] rounded-xl border border-border/70 bg-surface-1/60 px-3 py-2 text-sm outline-none transition-all", "focus:border-primary/60 focus:shadow-[0_0_0_4px_rgba(59,130,246,0.12)]", error && "border-destructive/60", className),
				...props
			}),
			error && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "text-[11px] text-destructive",
				children: error
			})
		]
	});
});
Area.displayName = "Area";
//#endregion
export { Field as n, Area as t };

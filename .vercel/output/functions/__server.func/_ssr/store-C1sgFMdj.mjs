import { o as __toESM } from "../_runtime.mjs";
import { r as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/store-C1sgFMdj.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var INV_KEY = "invoxa.invoices";
var SETTINGS_KEY = "invoxa.settings";
var LEGACY_INV_KEY = "invoiceflow.invoices";
var LEGACY_SETTINGS_KEY = "invoiceflow.settings";
var defaultSettings = {
	business: {
		name: "",
		gstin: "",
		address: "",
		phone: "",
		email: "",
		stateCode: ""
	},
	defaults: {
		gst: 18,
		currency: "INR",
		prefix: "INV-",
		template: "modern",
		terms: "Payment due within 14 days. Late payments subject to 1.5% monthly interest.",
		upiId: "",
		upiName: ""
	}
};
var listeners = /* @__PURE__ */ new Map();
function emit(key) {
	listeners.get(key)?.forEach((l) => l());
}
function subscribe(key, l) {
	if (!listeners.has(key)) listeners.set(key, /* @__PURE__ */ new Set());
	listeners.get(key).add(l);
	return () => listeners.get(key).delete(l);
}
function read(key, fallback, legacyKey) {
	if (typeof window === "undefined") return fallback;
	try {
		let raw = window.localStorage.getItem(key);
		if (!raw && legacyKey) {
			raw = window.localStorage.getItem(legacyKey);
			if (raw) {
				window.localStorage.setItem(key, raw);
				window.localStorage.removeItem(legacyKey);
			}
		}
		return raw ? JSON.parse(raw) : fallback;
	} catch {
		return fallback;
	}
}
function write(key, value) {
	if (typeof window === "undefined") return;
	window.localStorage.setItem(key, JSON.stringify(value));
	emit(key);
}
function useLocalState(key, fallback) {
	return [(0, import_react.useSyncExternalStore)((0, import_react.useCallback)((l) => subscribe(key, l), [key]), (0, import_react.useCallback)(() => read(key, fallback, key === INV_KEY ? LEGACY_INV_KEY : key === SETTINGS_KEY ? LEGACY_SETTINGS_KEY : void 0), [key, fallback]), () => fallback), (0, import_react.useCallback)((v) => {
		write(key, typeof v === "function" ? v(read(key, fallback)) : v);
	}, [key, fallback])];
}
function useInvoices() {
	return useLocalState(INV_KEY, []);
}
function useSettings() {
	return useLocalState(SETTINGS_KEY, defaultSettings);
}
function useHydrated() {
	const [h, setH] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => setH(true), []);
	return h;
}
//#endregion
export { useSettings as i, useHydrated as n, useInvoices as r, defaultSettings as t };

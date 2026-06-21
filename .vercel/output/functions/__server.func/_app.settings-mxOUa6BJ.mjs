import { i as useSettings, t as defaultSettings } from "./_ssr/store-C1sgFMdj.mjs";
import { n as require_jsx_runtime } from "./_libs/radix-ui__react-context+react.mjs";
import { H as ChevronDown, O as Image, W as Building2, l as SlidersVertical, m as Save } from "./_libs/lucide-react.mjs";
import { a as isValidGSTIN, t as INDIAN_STATES } from "./_ssr/format-zwtZovmO.mjs";
import { n as Field, t as Area } from "./_ssr/Field-6JthDHSW.mjs";
import { n as toast } from "./_libs/sonner.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_app.settings-mxOUa6BJ.js
var import_jsx_runtime = require_jsx_runtime();
function SettingsPage() {
	const [s, setS] = useSettings();
	const upload = (k) => (file) => {
		const r = new FileReader();
		r.onload = () => setS((p) => ({
			...p,
			business: {
				...p.business,
				[k]: String(r.result)
			}
		}));
		r.readAsDataURL(file);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-end justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-3xl font-semibold tracking-tight text-grad",
					children: "Settings"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 text-sm text-muted-foreground",
					children: "Defaults used when creating new invoices."
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					onClick: () => {
						toast.success("Settings saved");
					},
					className: "inline-flex h-10 items-center gap-1.5 rounded-xl bg-gradient-to-br from-blue-500 to-violet-500 px-4 text-sm font-medium text-white shadow-glow",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Save, { className: "h-4 w-4" }), " Saved automatically"]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Section, {
				icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Building2, { className: "h-4 w-4" }),
				title: "Business profile",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid gap-3 sm:grid-cols-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Business Name",
							value: s.business.name,
							onChange: (e) => setS({
								...s,
								business: {
									...s.business,
									name: e.target.value
								}
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "GSTIN",
							value: s.business.gstin,
							error: s.business.gstin && !isValidGSTIN(s.business.gstin) ? "Invalid GSTIN" : void 0,
							onChange: (e) => setS({
								...s,
								business: {
									...s.business,
									gstin: e.target.value.toUpperCase()
								}
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Phone",
							value: s.business.phone,
							onChange: (e) => setS({
								...s,
								business: {
									...s.business,
									phone: e.target.value
								}
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Email",
							type: "email",
							value: s.business.email,
							onChange: (e) => setS({
								...s,
								business: {
									...s.business,
									email: e.target.value
								}
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "sm:col-span-2",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Area, {
								label: "Address",
								value: s.business.address,
								onChange: (e) => setS({
									...s,
									business: {
										...s.business,
										address: e.target.value
									}
								})
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Selector, {
							label: "State",
							value: s.business.stateCode,
							onChange: (v) => setS({
								...s,
								business: {
									...s.business,
									stateCode: v
								}
							}),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "",
								children: "Select state…"
							}), INDIAN_STATES.map((x) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("option", {
								value: x.code,
								children: [
									x.code,
									" — ",
									x.name
								]
							}, x.code))]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid grid-cols-2 gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(UploadField, {
								label: "Logo",
								value: s.business.logo,
								onChange: upload("logo"),
								onClear: () => setS({
									...s,
									business: {
										...s.business,
										logo: void 0
									}
								})
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(UploadField, {
								label: "Signature",
								value: s.business.signature,
								onChange: upload("signature"),
								onClear: () => setS({
									...s,
									business: {
										...s.business,
										signature: void 0
									}
								})
							})]
						})
					]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Section, {
				icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SlidersVertical, { className: "h-4 w-4" }),
				title: "Invoice defaults",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid gap-3 sm:grid-cols-2 lg:grid-cols-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Default GST %",
							type: "number",
							value: s.defaults.gst,
							onChange: (e) => setS({
								...s,
								defaults: {
									...s.defaults,
									gst: Number(e.target.value)
								}
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Selector, {
							label: "Default Currency",
							value: s.defaults.currency,
							onChange: (v) => setS({
								...s,
								defaults: {
									...s.defaults,
									currency: v
								}
							}),
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "INR",
									children: "₹ INR"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "USD",
									children: "$ USD"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "EUR",
									children: "€ EUR"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "GBP",
									children: "£ GBP"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "AED",
									children: "AED"
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Invoice Prefix",
							value: s.defaults.prefix,
							onChange: (e) => setS({
								...s,
								defaults: {
									...s.defaults,
									prefix: e.target.value
								}
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Selector, {
							label: "Default Template",
							value: s.defaults.template,
							onChange: (v) => setS({
								...s,
								defaults: {
									...s.defaults,
									template: v
								}
							}),
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "modern",
									children: "Modern"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "minimal",
									children: "Minimal"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "corporate",
									children: "Corporate"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "gradient",
									children: "Gradient"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "classic",
									children: "Classic"
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "UPI ID",
							value: s.defaults.upiId,
							onChange: (e) => setS({
								...s,
								defaults: {
									...s.defaults,
									upiId: e.target.value
								}
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "UPI Receiver Name",
							value: s.defaults.upiName,
							onChange: (e) => setS({
								...s,
								defaults: {
									...s.defaults,
									upiName: e.target.value
								}
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "sm:col-span-2 lg:col-span-3",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Area, {
								label: "Default Terms & Conditions",
								value: s.defaults.terms,
								onChange: (e) => setS({
									...s,
									defaults: {
										...s.defaults,
										terms: e.target.value
									}
								})
							})
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-4 flex justify-end",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: () => {
							setS(defaultSettings);
							toast.success("Reset to defaults");
						},
						className: "text-xs text-muted-foreground hover:text-foreground",
						children: "Reset to defaults"
					})
				})]
			})
		]
	});
}
function Section({ icon, title, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-2xl border border-border/70 bg-card/60 p-5 backdrop-blur-xl shadow-card",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mb-4 flex items-center gap-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500/20 to-violet-500/20 text-blue-300 ring-1 ring-white/10",
				children: icon
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "text-sm font-semibold",
				children: title
			})]
		}), children]
	});
}
function Selector({ label, value, onChange, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-col gap-1.5",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
			className: "text-xs font-medium text-muted-foreground",
			children: label
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "relative",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
				value,
				onChange: (e) => onChange(e.target.value),
				className: "h-10 w-full appearance-none rounded-xl border border-border/70 bg-surface-1/60 px-3 pr-8 text-sm outline-none focus:border-primary/60",
				children
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronDown, { className: "pointer-events-none absolute right-2 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" })]
		})]
	});
}
function UploadField({ label, value, onChange, onClear }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-col gap-1.5",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
				className: "text-xs font-medium text-muted-foreground",
				children: label
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
				className: "flex h-10 cursor-pointer items-center gap-2 rounded-xl border border-dashed border-border/70 bg-surface-1/40 px-3 text-xs text-muted-foreground hover:border-white/20 hover:text-foreground",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Image, { className: "h-4 w-4" }),
					value ? "Replace" : "Upload",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						type: "file",
						accept: "image/*",
						className: "hidden",
						onChange: (e) => e.target.files?.[0] && onChange(e.target.files[0])
					})
				]
			}),
			value && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-1 flex items-center gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					src: value,
					alt: label,
					className: "h-10 w-10 rounded-lg object-cover ring-1 ring-white/10"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					onClick: onClear,
					className: "text-[11px] text-muted-foreground hover:text-rose-300",
					children: "Remove"
				})]
			})
		]
	});
}
//#endregion
export { SettingsPage as component };

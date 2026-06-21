import { o as __toESM } from "./_runtime.mjs";
import { r as require_react } from "./_libs/@radix-ui/react-compose-refs+[...].mjs";
import { n as require_jsx_runtime } from "./_libs/radix-ui__react-context+react.mjs";
import { U as Calculator } from "./_libs/lucide-react.mjs";
import { o as motion } from "./_libs/framer-motion.mjs";
import { o as roundMoney } from "./_ssr/invoice--AQg1XG7.mjs";
import { o as numberToWordsIN, r as formatINR } from "./_ssr/format-zwtZovmO.mjs";
import { n as Field } from "./_ssr/Field-6JthDHSW.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_app.gst-calculator-zHKaWgsA.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var presets = [
	5,
	12,
	18,
	28
];
function GSTCalculator() {
	const [amount, setAmount] = (0, import_react.useState)(1e4);
	const [rate, setRate] = (0, import_react.useState)(18);
	const [mode, setMode] = (0, import_react.useState)("exclusive");
	const [tax, setTax] = (0, import_react.useState)("intra");
	const result = (0, import_react.useMemo)(() => {
		const amt = isFinite(amount) ? amount : 0;
		const r = isFinite(rate) ? rate : 0;
		let net = 0, total = 0, gst = 0;
		if (mode === "exclusive") {
			net = roundMoney(amt);
			gst = roundMoney(amt * (r / 100));
			total = roundMoney(net + gst);
		} else {
			total = roundMoney(amt);
			net = roundMoney(amt / (1 + r / 100));
			gst = roundMoney(total - net);
		}
		const cgst = tax === "intra" ? roundMoney(gst / 2) : 0;
		const sgst = tax === "intra" ? roundMoney(gst - cgst) : 0;
		return {
			net,
			total,
			gst,
			cgst,
			sgst,
			igst: tax === "intra" ? 0 : gst
		};
	}, [
		amount,
		rate,
		mode,
		tax
	]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-8",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
			className: "text-3xl font-semibold tracking-tight text-grad",
			children: "GST Calculator"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-1 text-sm text-muted-foreground",
			children: "Instant CGST, SGST and IGST calculations."
		})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)]",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "rounded-2xl border border-border/70 bg-card/60 p-6 backdrop-blur-xl shadow-card",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500/20 to-violet-500/20 text-blue-300 ring-1 ring-white/10",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Calculator, { className: "h-4 w-4" })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "text-sm font-semibold",
						children: "Inputs"
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-6 space-y-5",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Amount (₹)",
							type: "number",
							value: amount,
							onChange: (e) => setAmount(Number(e.target.value)),
							prefix: "₹"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "text-xs font-medium text-muted-foreground",
							children: "GST Rate"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-2 flex flex-wrap gap-2",
							children: [presets.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								onClick: () => setRate(p),
								className: `inline-flex h-9 items-center rounded-lg border px-3 text-sm transition ${rate === p ? "border-blue-400/60 bg-blue-500/15 text-foreground" : "border-border/70 bg-surface-1/60 text-muted-foreground hover:text-foreground"}`,
								children: [p, "%"]
							}, p)), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex h-9 items-center gap-1 rounded-lg border border-border/70 bg-surface-1/60 px-2 text-sm",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									type: "number",
									value: rate,
									onChange: (e) => setRate(Number(e.target.value)),
									className: "w-16 bg-transparent text-foreground outline-none"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-muted-foreground",
									children: "%"
								})]
							})]
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toggle, {
							label: "GST Type",
							value: mode,
							onChange: (v) => setMode(v),
							options: [["exclusive", "Exclusive"], ["inclusive", "Inclusive"]]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toggle, {
							label: "Tax Mode",
							value: tax,
							onChange: (v) => setTax(v),
							options: [["intra", "CGST + SGST"], ["inter", "IGST"]]
						})
					]
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
				layout: true,
				className: "rounded-2xl border border-border/70 bg-gradient-to-br from-blue-500/5 to-violet-500/5 p-6 backdrop-blur-xl shadow-card",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "text-xs uppercase tracking-widest text-muted-foreground",
						children: "Total payable"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-2 text-5xl font-semibold tracking-tight text-grad-brand",
						children: formatINR(result.total)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-2 text-xs text-muted-foreground",
						children: numberToWordsIN(result.total)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-8 grid grid-cols-2 gap-3 text-sm",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResultRow, {
								label: "Net amount",
								value: formatINR(result.net)
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResultRow, {
								label: "Total GST",
								value: formatINR(result.gst),
								accent: true
							}),
							tax === "intra" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResultRow, {
								label: `CGST (${(rate / 2).toFixed(2)}%)`,
								value: formatINR(result.cgst)
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResultRow, {
								label: `SGST (${(rate / 2).toFixed(2)}%)`,
								value: formatINR(result.sgst)
							})] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResultRow, {
								label: `IGST (${rate}%)`,
								value: formatINR(result.igst)
							})
						]
					})
				]
			})]
		})]
	});
}
function Toggle({ label, value, onChange, options }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "text-xs font-medium text-muted-foreground",
		children: label
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "mt-2 inline-flex rounded-xl border border-border/70 bg-surface-1/60 p-1",
		children: options.map(([v, l]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
			onClick: () => onChange(v),
			className: `relative inline-flex h-8 items-center px-4 text-xs transition ${value === v ? "text-foreground" : "text-muted-foreground hover:text-foreground"}`,
			children: [value === v && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.span, {
				layoutId: `tg-${label}`,
				className: "absolute inset-0 rounded-lg bg-white/8 ring-1 ring-white/10",
				transition: {
					type: "spring",
					stiffness: 300,
					damping: 26
				}
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "relative",
				children: l
			})]
		}, v))
	})] });
}
function ResultRow({ label, value, accent }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: `flex items-center justify-between rounded-xl border border-border/60 px-3 py-3 ${accent ? "bg-blue-500/10" : "bg-surface-1/40"}`,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "text-xs text-muted-foreground",
			children: label
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "font-semibold tabular-nums",
			children: value
		})]
	});
}
//#endregion
export { GSTCalculator as component };

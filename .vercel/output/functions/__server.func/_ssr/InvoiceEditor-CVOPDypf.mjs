import { o as __toESM } from "../_runtime.mjs";
import { r as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { r as useInvoices } from "./store-C1sgFMdj.mjs";
import { t as cn } from "./utils-C_uf36nf.mjs";
import { n as BRAND } from "./constants-BSR6ATQU.mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { A as GripVertical, H as ChevronDown, L as Download, N as FileText, O as Image, R as Copy, S as Palette, V as CircleAlert, W as Building2, _ as Receipt, a as Trash2, b as Plus, d as Share2, g as RotateCcw, h as RotateCw, m as Save, n as WandSparkles, r as User, v as QrCode, y as Printer } from "../_libs/lucide-react.mjs";
import { n as ReorderGroup, o as motion, s as AnimatePresence, t as ReorderItem } from "../_libs/framer-motion.mjs";
import { a as nextInvoiceNumber, i as createEmptyItem, n as computeTotals, t as computeLine } from "./invoice--AQg1XG7.mjs";
import { a as isValidGSTIN, i as gstinStateCode, o as numberToWordsIN, r as formatINR, t as INDIAN_STATES } from "./format-zwtZovmO.mjs";
import { n as Field, t as Area } from "./Field-6JthDHSW.mjs";
import { n as toast } from "../_libs/sonner.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/InvoiceEditor-CVOPDypf.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function buildDemoInvoice(existing = []) {
	return {
		number: nextInvoiceNumber("INV-", existing),
		placeOfSupply: "29",
		taxMode: "exclusive",
		business: {
			name: "Patel Tech Solutions",
			gstin: "27AABCP2835F1Z8",
			address: "402, Andheri Kurla Road, Andheri East\nMumbai, Maharashtra — 400069",
			phone: "+91 98765 43210",
			email: "billing@pateltech.in",
			stateCode: "27"
		},
		customer: {
			name: "Sharma Digital Services Pvt Ltd",
			gstin: "29AABCS5678G1Z3",
			address: "88, MG Road, Indiranagar\nBengaluru, Karnataka — 560038",
			phone: "+91 91234 56789",
			email: "accounts@sharmadigital.com",
			stateCode: "29"
		},
		items: [
			{
				...createEmptyItem(),
				name: "Web Application Development",
				description: "Full-stack React + Node.js build",
				hsn: "998314",
				qty: 1,
				rate: 45e3,
				discount: 0,
				tax: 18
			},
			{
				...createEmptyItem(),
				name: "UI/UX Design Package",
				description: "Wireframes, prototypes & design system",
				hsn: "998314",
				qty: 1,
				rate: 18e3,
				discount: 5,
				tax: 18
			},
			{
				...createEmptyItem(),
				name: "Annual Maintenance (AMC)",
				description: "12-month support & updates",
				hsn: "998315",
				qty: 1,
				rate: 12e3,
				discount: 0,
				tax: 18
			}
		],
		notes: "Thank you for your business. Payment via UPI or bank transfer within 14 days.",
		terms: "Payment due within 14 days. Late payments subject to 1.5% monthly interest.",
		upi: {
			id: "pateltech@okicici",
			name: "Patel Tech Solutions"
		},
		status: "pending"
	};
}
async function exportInvoicePDF(node, invoice) {
	const [{ default: html2canvas }, jspdfMod] = await Promise.all([import("../_libs/html2canvas.mjs").then((n) => (n.n(), n.t)), import("../_libs/jspdf.mjs").then((n) => /* @__PURE__ */ __toESM(n.t()))]);
	const jsPDF = jspdfMod.jsPDF;
	const canvas = await html2canvas(node, {
		scale: 2,
		backgroundColor: "#ffffff",
		useCORS: true,
		logging: false
	});
	const imgData = canvas.toDataURL("image/png");
	const pdf = new jsPDF({
		orientation: "p",
		unit: "pt",
		format: "a4"
	});
	const pageW = pdf.internal.pageSize.getWidth();
	const pageH = pdf.internal.pageSize.getHeight();
	const imgW = pageW;
	const imgH = canvas.height * pageW / canvas.width;
	let heightLeft = imgH;
	let position = 0;
	pdf.addImage(imgData, "PNG", 0, position, imgW, imgH);
	heightLeft -= pageH;
	while (heightLeft > 0) {
		position = heightLeft - imgH;
		pdf.addPage();
		pdf.addImage(imgData, "PNG", 0, position, imgW, imgH);
		heightLeft -= pageH;
	}
	pdf.save(`${invoice.number || "invoice"}.pdf`);
}
async function exportInvoicePNG(node, invoice) {
	const { default: html2canvas } = await import("../_libs/html2canvas.mjs").then((n) => (n.n(), n.t));
	const url = (await html2canvas(node, {
		scale: 2,
		backgroundColor: "#ffffff"
	})).toDataURL("image/png");
	const a = document.createElement("a");
	a.href = url;
	a.download = `${invoice.number || "invoice"}.png`;
	a.click();
}
async function generateUPIQR(opts) {
	const QR = await import("../_libs/qrcode.mjs").then((n) => /* @__PURE__ */ __toESM(n.t()));
	const url = `upi://pay?pa=${encodeURIComponent(opts.upiId)}&pn=${encodeURIComponent(opts.name)}&am=${opts.amount.toFixed(2)}&cu=INR${opts.note ? `&tn=${encodeURIComponent(opts.note)}` : ""}`;
	return QR.toDataURL(url, {
		margin: 1,
		width: 240,
		color: {
			dark: "#0F172A",
			light: "#FFFFFF"
		}
	});
}
async function fireConfetti() {
	if (typeof window === "undefined") return;
	const { default: confetti } = await import("../_libs/canvas-confetti.mjs").then((n) => n.t);
	const end = Date.now() + 600;
	const colors = [
		"#3B82F6",
		"#06B6D4",
		"#7C3AED"
	];
	(function frame() {
		confetti({
			particleCount: 4,
			angle: 60,
			spread: 60,
			origin: { x: 0 },
			colors
		});
		confetti({
			particleCount: 4,
			angle: 120,
			spread: 60,
			origin: { x: 1 },
			colors
		});
		if (Date.now() < end) requestAnimationFrame(frame);
	})();
}
var stateName = (code) => INDIAN_STATES.find((s) => s.code === code)?.name ?? "";
var InvoicePreview = (0, import_react.forwardRef)(function InvoicePreview({ invoice }, ref) {
	const totals = computeTotals(invoice);
	const t = invoice.template;
	const [qr, setQr] = (0, import_react.useState)(null);
	(0, import_react.useEffect)(() => {
		let cancel = false;
		if (invoice.upi?.id && totals.total > 0) generateUPIQR({
			upiId: invoice.upi.id,
			name: invoice.upi.name || invoice.business.name || "Payee",
			amount: totals.total,
			note: invoice.number
		}).then((d) => {
			if (!cancel) setQr(d);
		}).catch(() => {});
		else setQr(null);
		return () => {
			cancel = true;
		};
	}, [
		invoice.upi?.id,
		invoice.upi?.name,
		totals.total,
		invoice.number
	]);
	const themes = {
		modern: {
			accent: "from-blue-600 to-violet-600",
			text: "text-slate-900",
			header: "bg-gradient-to-br"
		},
		minimal: {
			accent: "from-slate-900 to-slate-700",
			text: "text-slate-900",
			header: "bg-gradient-to-br"
		},
		corporate: {
			accent: "from-slate-800 to-slate-900",
			text: "text-slate-900",
			header: "bg-gradient-to-r"
		},
		gradient: {
			accent: "from-fuchsia-600 via-violet-600 to-blue-600",
			text: "text-slate-900",
			header: "bg-gradient-to-tr"
		},
		classic: {
			accent: "from-amber-700 to-amber-900",
			text: "text-slate-900",
			header: "bg-gradient-to-br"
		}
	}[t];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		ref,
		className: cn("w-[794px] max-w-full overflow-hidden bg-white", themes.text),
		style: { fontFamily: "Inter, sans-serif" },
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: cn("relative px-10 pt-10 pb-8", themes.header, themes.accent, "text-white"),
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "absolute inset-0 opacity-20",
					style: { backgroundImage: "radial-gradient(600px 200px at 20% 0%, rgba(255,255,255,0.5), transparent), radial-gradient(400px 200px at 90% 100%, rgba(255,255,255,0.3), transparent)" }
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "relative flex items-start justify-between gap-6",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-3",
						children: [invoice.business.logo ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: invoice.business.logo,
							alt: "Logo",
							className: "h-14 w-14 rounded-xl object-cover bg-white/15 p-1"
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex h-14 w-14 items-center justify-center rounded-xl bg-white/15 text-2xl font-semibold",
							children: invoice.business.name?.charAt(0) || "B"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "text-xl font-semibold tracking-tight",
								children: invoice.business.name || "Your Business"
							}),
							invoice.business.gstin && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "text-xs opacity-80",
								children: ["GSTIN: ", invoice.business.gstin]
							}),
							invoice.business.address && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "text-xs opacity-80 mt-0.5 max-w-xs",
								children: invoice.business.address
							})
						] })]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "text-right",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "text-3xl font-bold tracking-tight",
								style: { fontFamily: "Space Grotesk, sans-serif" },
								children: "INVOICE"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-2 text-xs uppercase tracking-wider opacity-80",
								children: ["#", invoice.number]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-1 text-xs opacity-80",
								children: ["Date: ", invoice.date]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "text-xs opacity-80",
								children: ["Due: ", invoice.dueDate]
							})
						]
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid grid-cols-2 gap-6 px-10 py-8",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "text-[10px] font-semibold uppercase tracking-widest text-slate-500",
						children: "Bill To"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-2 text-base font-semibold",
						children: invoice.customer.name || "Customer Name"
					}),
					invoice.customer.gstin && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "text-xs text-slate-600",
						children: ["GSTIN: ", invoice.customer.gstin]
					}),
					invoice.customer.address && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-1 text-xs text-slate-600 whitespace-pre-line",
						children: invoice.customer.address
					}),
					invoice.customer.phone && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "text-xs text-slate-600",
						children: ["📞 ", invoice.customer.phone]
					}),
					invoice.customer.email && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "text-xs text-slate-600",
						children: ["✉ ", invoice.customer.email]
					})
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "text-right",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "text-[10px] font-semibold uppercase tracking-widest text-slate-500",
							children: "Place of Supply"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-2 text-sm font-medium",
							children: stateName(invoice.placeOfSupply) || "—"
						}),
						invoice.reverseCharge && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "text-xs text-slate-600",
							children: "Reverse charge applicable"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-3 text-[10px] font-semibold uppercase tracking-widest text-slate-500",
							children: "Currency"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "text-sm font-medium",
							children: invoice.currency
						})
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "px-10",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
					className: "w-full text-sm",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
						className: "border-y border-slate-200 text-[10px] uppercase tracking-wider text-slate-500",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "py-2.5 text-left font-medium",
								children: "#"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "py-2.5 text-left font-medium",
								children: "Item & Description"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "py-2.5 text-left font-medium",
								children: "HSN/SAC"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "py-2.5 text-right font-medium",
								children: "Qty"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "py-2.5 text-right font-medium",
								children: "Rate"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "py-2.5 text-right font-medium",
								children: "Tax%"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "py-2.5 text-right font-medium",
								children: "Amount"
							})
						]
					}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: invoice.items.map((it, idx) => {
						const line = computeLine(it, totals.intraState, invoice.taxMode ?? "exclusive");
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
							className: "border-b border-slate-100 align-top",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "py-3 text-slate-500",
									children: idx + 1
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
									className: "py-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "font-medium",
										children: it.name || "—"
									}), it.description && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "text-xs text-slate-500 max-w-xs",
										children: it.description
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "py-3 text-slate-600",
									children: it.hsn || "—"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
									className: "py-3 text-right",
									children: [
										it.qty,
										" ",
										it.unit
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "py-3 text-right",
									children: formatINR(it.rate, invoice.currency)
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
									className: "py-3 text-right",
									children: [it.tax, "%"]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "py-3 text-right font-medium",
									children: formatINR(line.taxable, invoice.currency)
								})
							]
						}, it.id);
					}) })]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid grid-cols-2 gap-8 px-10 py-8",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-4",
					children: [qr && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-start gap-3 rounded-xl border border-slate-200 p-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: qr,
							alt: "UPI QR",
							className: "h-24 w-24"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "text-xs",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "font-semibold",
									children: "Pay via UPI"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "text-slate-500",
									children: invoice.upi?.id
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "text-slate-500",
									children: invoice.upi?.name
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "mt-1 text-slate-500",
									children: ["Scan to pay ", formatINR(totals.total, invoice.currency)]
								})
							]
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "text-[10px] font-semibold uppercase tracking-widest text-slate-500",
						children: "Amount in Words"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-1 text-sm italic text-slate-700",
						children: numberToWordsIN(totals.total)
					})] })]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "ml-auto w-full max-w-sm space-y-1.5 text-sm",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
							label: "Subtotal",
							value: formatINR(totals.subtotal, invoice.currency)
						}),
						totals.discount > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
							label: "Discount",
							value: `− ${formatINR(totals.discount, invoice.currency)}`
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
							label: "Taxable",
							value: formatINR(totals.taxable, invoice.currency)
						}),
						totals.intraState ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
							label: "CGST",
							value: formatINR(totals.cgst, invoice.currency)
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
							label: "SGST",
							value: formatINR(totals.sgst, invoice.currency)
						})] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
							label: "IGST",
							value: formatINR(totals.igst, invoice.currency)
						}),
						Math.abs(totals.roundOff) > .001 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
							label: "Round Off",
							value: (totals.roundOff >= 0 ? "+ " : "− ") + formatINR(Math.abs(totals.roundOff), invoice.currency)
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: cn("mt-2 flex items-center justify-between rounded-xl bg-gradient-to-r p-3 text-white", themes.accent),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "text-xs uppercase tracking-wider opacity-90",
								children: "Grand Total"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "text-lg font-semibold",
								children: formatINR(totals.total, invoice.currency)
							})]
						})
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid grid-cols-2 gap-6 px-10",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [invoice.notes && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "text-[10px] font-semibold uppercase tracking-widest text-slate-500",
					children: "Notes"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-1 text-xs text-slate-600 whitespace-pre-line",
					children: invoice.notes
				})] }), invoice.terms && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "text-[10px] font-semibold uppercase tracking-widest text-slate-500",
						children: "Terms & Conditions"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-1 text-xs text-slate-600 whitespace-pre-line",
						children: invoice.terms
					})]
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "text-right",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "ml-auto inline-block",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-14 w-44 border-b border-slate-300" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-1 text-[10px] uppercase tracking-widest text-slate-500",
							children: "Authorised Signatory"
						})]
					})
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-8 border-t border-slate-100 px-10 py-5 text-center text-[10px] text-slate-400",
				children: [
					BRAND.name,
					" · ",
					invoice.business.email || invoice.business.phone || "Thank you for your business"
				]
			})
		]
	});
});
function Row({ label, value }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex justify-between text-slate-700",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "text-slate-500",
			children: label
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "font-medium",
			children: value
		})]
	});
}
var templates = [
	{
		id: "modern",
		label: "Modern"
	},
	{
		id: "minimal",
		label: "Minimal"
	},
	{
		id: "corporate",
		label: "Corporate"
	},
	{
		id: "gradient",
		label: "Gradient"
	},
	{
		id: "classic",
		label: "Classic"
	}
];
var statuses = [
	"draft",
	"pending",
	"paid",
	"overdue",
	"cancelled"
];
function InvoiceEditor({ initial, onSave, mode }) {
	const [inv, setInv] = (0, import_react.useState)({
		...initial,
		taxMode: initial.taxMode ?? "exclusive"
	});
	const [invoices] = useInvoices();
	const previewRef = (0, import_react.useRef)(null);
	const past = (0, import_react.useRef)([]);
	const future = (0, import_react.useRef)([]);
	const skip = (0, import_react.useRef)(false);
	(0, import_react.useEffect)(() => {
		if (skip.current) {
			skip.current = false;
			return;
		}
		past.current.push(structuredClone(inv));
		if (past.current.length > 50) past.current.shift();
		future.current = [];
	}, [inv]);
	(0, import_react.useEffect)(() => {
		if (mode !== "edit") return;
		const t = setTimeout(() => onSave(inv), 500);
		return () => clearTimeout(t);
	}, [inv]);
	(0, import_react.useEffect)(() => {
		const onKey = (e) => {
			const mod = e.ctrlKey || e.metaKey;
			if (mod && e.key.toLowerCase() === "s") {
				e.preventDefault();
				onSave(inv);
				toast.success("Saved");
			}
			if (mod && e.key.toLowerCase() === "z" && !e.shiftKey) {
				e.preventDefault();
				undo();
			}
			if (mod && (e.key.toLowerCase() === "y" || e.shiftKey && e.key.toLowerCase() === "z")) {
				e.preventDefault();
				redo();
			}
		};
		window.addEventListener("keydown", onKey);
		return () => window.removeEventListener("keydown", onKey);
	}, [inv]);
	const undo = () => {
		if (past.current.length < 2) return;
		const current = past.current.pop();
		future.current.push(current);
		const prev = past.current[past.current.length - 1];
		skip.current = true;
		setInv(structuredClone(prev));
	};
	const redo = () => {
		const next = future.current.pop();
		if (!next) return;
		past.current.push(structuredClone(next));
		skip.current = true;
		setInv(structuredClone(next));
	};
	const totals = computeTotals(inv);
	const setItem = (id, patch) => setInv((p) => ({
		...p,
		items: p.items.map((i) => i.id === id ? {
			...i,
			...patch
		} : i)
	}));
	const addItem = () => setInv((p) => ({
		...p,
		items: [...p.items, createEmptyItem()]
	}));
	const removeItem = (id) => setInv((p) => ({
		...p,
		items: p.items.filter((i) => i.id !== id)
	}));
	const errors = {
		business: !inv.business.name ? "Required" : inv.business.gstin && !isValidGSTIN(inv.business.gstin) ? "Invalid GSTIN" : "",
		customer: !inv.customer.name ? "Required" : inv.customer.gstin && !isValidGSTIN(inv.customer.gstin) ? "Invalid GSTIN" : "",
		items: inv.items.length === 0 || inv.items.some((i) => !i.name || i.qty <= 0) ? "Add at least one item" : ""
	};
	const hasErrors = Object.values(errors).some(Boolean);
	const uploadLogo = (file) => {
		const reader = new FileReader();
		reader.onload = () => setInv((p) => ({
			...p,
			business: {
				...p.business,
				logo: String(reader.result)
			}
		}));
		reader.readAsDataURL(file);
	};
	const downloadPDF = async () => {
		if (!previewRef.current) return;
		if (hasErrors) {
			toast.error("Fix validation errors first");
			return;
		}
		toast.promise(exportInvoicePDF(previewRef.current, inv), {
			loading: "Generating PDF…",
			success: "PDF downloaded",
			error: "Export failed"
		});
	};
	const downloadPNG = async () => {
		if (!previewRef.current) return;
		toast.promise(exportInvoicePNG(previewRef.current, inv), {
			loading: "Generating PNG…",
			success: "PNG downloaded",
			error: "Export failed"
		});
	};
	const printInvoice = () => window.print();
	const copyInv = async () => {
		const text = `Invoice ${inv.number}\n${inv.customer.name}\n${formatINR(totals.total, inv.currency)}\nDue: ${inv.dueDate}`;
		await navigator.clipboard.writeText(text);
		toast.success("Copied to clipboard");
	};
	const shareInv = async () => {
		const text = `Invoice ${inv.number} from ${inv.business.name || "Invoxa"} — ${formatINR(totals.total, inv.currency)} due ${inv.dueDate}`;
		if (navigator.share) try {
			await navigator.share({
				title: `Invoice ${inv.number}`,
				text
			});
			return;
		} catch {}
		await navigator.clipboard.writeText(text);
		toast.success("Invoice details copied — paste to share");
	};
	const fillDemo = () => {
		const demo = buildDemoInvoice(invoices);
		setInv((p) => ({
			...p,
			...demo,
			id: p.id,
			date: p.date,
			dueDate: p.dueDate,
			createdAt: p.createdAt,
			updatedAt: Date.now(),
			template: p.template,
			currency: p.currency
		}));
		toast.success("Demo company loaded");
	};
	(0, import_react.useEffect)(() => {
		const sc = gstinStateCode(inv.business.gstin || "");
		if (sc && INDIAN_STATES.find((s) => s.code === sc) && sc !== inv.business.stateCode) setInv((p) => ({
			...p,
			business: {
				...p.business,
				stateCode: sc
			},
			placeOfSupply: p.placeOfSupply || sc
		}));
	}, [inv.business.gstin]);
	(0, import_react.useEffect)(() => {
		const sc = gstinStateCode(inv.customer.gstin || "");
		if (sc && INDIAN_STATES.find((s) => s.code === sc) && sc !== inv.customer.stateCode) setInv((p) => ({
			...p,
			customer: {
				...p.customer,
				stateCode: sc
			},
			placeOfSupply: sc
		}));
	}, [inv.customer.gstin]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap items-center justify-between gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "text-xs uppercase tracking-widest text-muted-foreground",
					children: mode === "create" ? "New invoice" : "Editing"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-2xl font-semibold tracking-tight text-grad",
					children: inv.number || "Untitled"
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-wrap items-center gap-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ToolbarBtn, {
							onClick: fillDemo,
							"aria-label": "Load demo company",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(WandSparkles, { className: "h-4 w-4" }), " Demo"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ToolbarBtn, {
							onClick: undo,
							"aria-label": "Undo",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RotateCcw, { className: "h-4 w-4" }), " Undo"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ToolbarBtn, {
							onClick: redo,
							"aria-label": "Redo",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RotateCw, { className: "h-4 w-4" }), " Redo"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TemplatePicker, {
							value: inv.template,
							onChange: (t) => setInv((p) => ({
								...p,
								template: t
							}))
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusPicker, {
							value: inv.status,
							onChange: (s) => setInv((p) => ({
								...p,
								status: s
							}))
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ToolbarBtn, {
							onClick: copyInv,
							"aria-label": "Copy invoice",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Copy, { className: "h-4 w-4" }), " Copy"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ToolbarBtn, {
							onClick: shareInv,
							"aria-label": "Share invoice",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Share2, { className: "h-4 w-4" }), " Share"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ToolbarBtn, {
							onClick: printInvoice,
							"aria-label": "Print invoice",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Printer, { className: "h-4 w-4" }), " Print"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ToolbarBtn, {
							onClick: downloadPNG,
							"aria-label": "Download PNG",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Image, { className: "h-4 w-4" }), " PNG"]
						}),
						mode === "edit" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ToolbarBtn, {
							onClick: downloadPDF,
							"aria-label": "Download PDF",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Download, { className: "h-4 w-4" }), " PDF"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: mode === "create" ? () => !hasErrors ? onSave(inv) : toast.error("Fix validation errors") : downloadPDF,
							"aria-label": mode === "create" ? "Save invoice" : "Download PDF",
							className: "inline-flex h-10 items-center gap-1.5 rounded-xl bg-gradient-to-br from-blue-500 to-violet-500 px-4 text-sm font-medium text-white shadow-glow hover:opacity-90",
							children: mode === "create" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Save, { className: "h-4 w-4" }), " Save invoice"] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Download, { className: "h-4 w-4" }), " Download PDF"] })
						})
					]
				})]
			}),
			hasErrors && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-2 rounded-xl border border-amber-500/30 bg-amber-500/10 px-4 py-2 text-xs text-amber-200",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleAlert, { className: "h-4 w-4" }), " Some fields need attention before you can download the PDF."]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-6 xl:grid-cols-[minmax(0,1.05fr)_minmax(0,1fr)]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-5",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Section, {
							icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Building2, { className: "h-4 w-4" }),
							title: "Your business",
							error: errors.business,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "grid gap-3 sm:grid-cols-2",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
										label: "Business Name *",
										value: inv.business.name,
										onChange: (e) => setInv((p) => ({
											...p,
											business: {
												...p.business,
												name: e.target.value
											}
										}))
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
										label: "GSTIN",
										value: inv.business.gstin ?? "",
										onChange: (e) => setInv((p) => ({
											...p,
											business: {
												...p.business,
												gstin: e.target.value.toUpperCase()
											}
										})),
										error: inv.business.gstin && !isValidGSTIN(inv.business.gstin) ? "Invalid GSTIN" : void 0
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
										label: "Phone",
										value: inv.business.phone ?? "",
										onChange: (e) => setInv((p) => ({
											...p,
											business: {
												...p.business,
												phone: e.target.value
											}
										}))
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
										label: "Email",
										type: "email",
										value: inv.business.email ?? "",
										onChange: (e) => setInv((p) => ({
											...p,
											business: {
												...p.business,
												email: e.target.value
											}
										}))
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "sm:col-span-2",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Area, {
											label: "Address",
											value: inv.business.address ?? "",
											onChange: (e) => setInv((p) => ({
												...p,
												business: {
													...p.business,
													address: e.target.value
												}
											}))
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StateSelect, {
										label: "State",
										value: inv.business.stateCode ?? "",
										onChange: (v) => setInv((p) => ({
											...p,
											business: {
												...p.business,
												stateCode: v
											}
										}))
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
										className: "text-xs font-medium text-muted-foreground",
										children: "Logo"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
										className: "mt-1.5 flex h-10 cursor-pointer items-center gap-2 rounded-xl border border-dashed border-border/70 bg-surface-1/40 px-3 text-xs text-muted-foreground hover:border-white/20 hover:text-foreground",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Image, { className: "h-4 w-4" }),
											inv.business.logo ? "Replace logo" : "Upload logo",
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
												type: "file",
												accept: "image/*",
												className: "hidden",
												onChange: (e) => e.target.files?.[0] && uploadLogo(e.target.files[0])
											})
										]
									})] })
								]
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Section, {
							icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(User, { className: "h-4 w-4" }),
							title: "Customer",
							error: errors.customer,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "grid gap-3 sm:grid-cols-2",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
										label: "Customer Name *",
										value: inv.customer.name,
										onChange: (e) => setInv((p) => ({
											...p,
											customer: {
												...p.customer,
												name: e.target.value
											}
										}))
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
										label: "GSTIN",
										value: inv.customer.gstin ?? "",
										onChange: (e) => setInv((p) => ({
											...p,
											customer: {
												...p.customer,
												gstin: e.target.value.toUpperCase()
											}
										})),
										error: inv.customer.gstin && !isValidGSTIN(inv.customer.gstin) ? "Invalid GSTIN" : void 0
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
										label: "Phone",
										value: inv.customer.phone ?? "",
										onChange: (e) => setInv((p) => ({
											...p,
											customer: {
												...p.customer,
												phone: e.target.value
											}
										}))
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
										label: "Email",
										type: "email",
										value: inv.customer.email ?? "",
										onChange: (e) => setInv((p) => ({
											...p,
											customer: {
												...p.customer,
												email: e.target.value
											}
										}))
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "sm:col-span-2",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Area, {
											label: "Address",
											value: inv.customer.address ?? "",
											onChange: (e) => setInv((p) => ({
												...p,
												customer: {
													...p.customer,
													address: e.target.value
												}
											}))
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StateSelect, {
										label: "State",
										value: inv.customer.stateCode ?? "",
										onChange: (v) => setInv((p) => ({
											...p,
											customer: {
												...p.customer,
												stateCode: v
											}
										}))
									})
								]
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Section, {
							icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileText, { className: "h-4 w-4" }),
							title: "Invoice details",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "grid gap-3 sm:grid-cols-2 lg:grid-cols-3",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
										label: "Invoice Number",
										value: inv.number,
										onChange: (e) => setInv((p) => ({
											...p,
											number: e.target.value
										}))
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
										label: "Invoice Date",
										type: "date",
										value: inv.date,
										onChange: (e) => setInv((p) => ({
											...p,
											date: e.target.value
										}))
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
										label: "Due Date",
										type: "date",
										value: inv.dueDate,
										onChange: (e) => setInv((p) => ({
											...p,
											dueDate: e.target.value
										}))
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StateSelect, {
										label: "Place of Supply",
										value: inv.placeOfSupply,
										onChange: (v) => setInv((p) => ({
											...p,
											placeOfSupply: v
										}))
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectField, {
										label: "Currency",
										value: inv.currency,
										onChange: (v) => setInv((p) => ({
											...p,
											currency: v
										})),
										options: [
											["INR", "₹ INR"],
											["USD", "$ USD"],
											["EUR", "€ EUR"],
											["GBP", "£ GBP"],
											["AED", "AED"]
										]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "flex items-end",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
											className: "inline-flex h-10 w-full cursor-pointer items-center gap-2 rounded-xl border border-border/70 bg-surface-1/60 px-3 text-sm",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
												type: "checkbox",
												checked: inv.reverseCharge,
												onChange: (e) => setInv((p) => ({
													...p,
													reverseCharge: e.target.checked
												}))
											}), "Reverse Charge"]
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TaxModeSelect, {
										value: inv.taxMode ?? "exclusive",
										onChange: (v) => setInv((p) => ({
											...p,
											taxMode: v
										}))
									})
								]
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Section, {
							icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Receipt, { className: "h-4 w-4" }),
							title: "Items",
							error: errors.items,
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "grid grid-cols-[24px_2fr_0.9fr_0.7fr_0.9fr_0.7fr_0.7fr_1fr_28px] gap-2 px-1 text-[10px] uppercase tracking-widest text-muted-foreground",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: "Item" }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: "HSN/SAC" }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: "Qty" }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: "Rate" }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: "Disc%" }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: "Tax%" }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "text-right",
											children: "Amount"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {})
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ReorderGroup, {
									axis: "y",
									values: inv.items,
									onReorder: (items) => setInv((p) => ({
										...p,
										items
									})),
									className: "mt-2 space-y-2",
									children: inv.items.map((item) => {
										const line = computeLine(item, totals.intraState, inv.taxMode ?? "exclusive").total;
										return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ReorderItem, {
											value: item,
											className: "rounded-xl border border-border/60 bg-surface-1/60 p-2",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "grid grid-cols-[24px_2fr_0.9fr_0.7fr_0.9fr_0.7fr_0.7fr_1fr_28px] items-center gap-2",
												children: [
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
														className: "flex h-8 cursor-grab items-center justify-center text-muted-foreground",
														"aria-label": "Drag to reorder",
														title: "Drag to reorder",
														children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GripVertical, { className: "h-4 w-4" })
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
														className: "space-y-1",
														children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CellInput, {
															value: item.name,
															onChange: (v) => setItem(item.id, { name: v }),
															placeholder: "Item name"
														}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CellInput, {
															value: item.description ?? "",
															onChange: (v) => setItem(item.id, { description: v }),
															placeholder: "Description (optional)",
															muted: true
														})]
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CellInput, {
														value: item.hsn ?? "",
														onChange: (v) => setItem(item.id, { hsn: v }),
														placeholder: "HSN"
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CellInput, {
														value: String(item.qty),
														onChange: (v) => setItem(item.id, { qty: Number(v) || 0 }),
														type: "number"
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CellInput, {
														value: String(item.rate),
														onChange: (v) => setItem(item.id, { rate: Number(v) || 0 }),
														type: "number"
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CellInput, {
														value: String(item.discount),
														onChange: (v) => setItem(item.id, { discount: Number(v) || 0 }),
														type: "number"
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CellInput, {
														value: String(item.tax),
														onChange: (v) => setItem(item.id, { tax: Number(v) || 0 }),
														type: "number"
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
														className: "text-right text-sm font-medium tabular-nums",
														children: formatINR(line, inv.currency)
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
														onClick: () => removeItem(item.id),
														"aria-label": "Remove item",
														className: "flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground hover:text-rose-300",
														title: "Delete",
														children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "h-3.5 w-3.5" })
													})
												]
											})
										}, item.id);
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									onClick: addItem,
									"aria-label": "Add line item",
									className: "mt-3 inline-flex h-9 items-center gap-1.5 rounded-xl border border-dashed border-border/70 bg-surface-1/40 px-3 text-xs text-muted-foreground hover:border-white/20 hover:text-foreground",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "h-4 w-4" }), " Add row"]
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Section, {
							icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(QrCode, { className: "h-4 w-4" }),
							title: "UPI QR (optional)",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "grid gap-3 sm:grid-cols-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
									label: "UPI ID",
									placeholder: "yourname@upi",
									value: inv.upi?.id ?? "",
									onChange: (e) => setInv((p) => ({
										...p,
										upi: {
											...p.upi,
											id: e.target.value
										}
									}))
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
									label: "Receiver Name",
									value: inv.upi?.name ?? "",
									onChange: (e) => setInv((p) => ({
										...p,
										upi: {
											...p.upi,
											name: e.target.value
										}
									}))
								})]
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Section, {
							icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Palette, { className: "h-4 w-4" }),
							title: "Notes & Terms",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "grid gap-3 sm:grid-cols-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Area, {
									label: "Notes",
									value: inv.notes ?? "",
									onChange: (e) => setInv((p) => ({
										...p,
										notes: e.target.value
									}))
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Area, {
									label: "Terms & Conditions",
									value: inv.terms ?? "",
									onChange: (e) => setInv((p) => ({
										...p,
										terms: e.target.value
									}))
								})]
							})
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "space-y-4",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "sticky top-20",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mb-3 flex items-center justify-between",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "text-xs uppercase tracking-widest text-muted-foreground",
									children: "Live Preview"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "text-xs text-muted-foreground",
									children: templates.find((t) => t.id === inv.template)?.label
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "overflow-hidden rounded-2xl border border-border/70 bg-card/40 p-3 backdrop-blur-xl shadow-card",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "overflow-auto rounded-xl bg-white",
									style: { maxHeight: "calc(100dvh - 200px)" },
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										style: {
											width: 794 * .62,
											height: 1123 * .62,
											position: "relative"
										},
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											style: {
												position: "absolute",
												top: 0,
												left: 0,
												transform: "scale(0.62)",
												transformOrigin: "top left",
												width: 794
											},
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(InvoicePreview, {
												ref: previewRef,
												invoice: inv
											})
										})
									})
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TotalsBar, {
								totals,
								currency: inv.currency
							})
						]
					})
				})]
			})
		]
	});
}
function TaxModeSelect({ value, onChange }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-col gap-1.5",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
			className: "text-xs font-medium text-muted-foreground",
			children: "GST on rates"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "relative",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
				value,
				onChange: (e) => onChange(e.target.value),
				className: "h-10 w-full appearance-none rounded-xl border border-border/70 bg-surface-1/60 px-3 pr-8 text-sm outline-none focus:border-primary/60",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
					value: "exclusive",
					children: "Exclusive (GST added)"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
					value: "inclusive",
					children: "Inclusive (GST included)"
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronDown, { className: "pointer-events-none absolute right-2 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" })]
		})]
	});
}
function ToolbarBtn({ children, onClick, ...rest }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
		onClick,
		...rest,
		className: "inline-flex h-10 items-center gap-1.5 rounded-xl border border-border/70 bg-surface-1/60 px-3 text-xs text-muted-foreground hover:text-foreground hover:border-white/15",
		children
	});
}
function Section({ icon, title, error, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-2xl border border-border/70 bg-card/60 p-5 backdrop-blur-xl shadow-card",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mb-4 flex items-center justify-between",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500/20 to-violet-500/20 text-blue-300 ring-1 ring-white/10",
					children: icon
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "text-sm font-semibold",
					children: title
				})]
			}), error && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "text-[11px] text-amber-300",
				children: error
			})]
		}), children]
	});
}
function CellInput({ value, onChange, placeholder, type, muted }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
		value,
		type,
		placeholder,
		onChange: (e) => onChange(e.target.value),
		className: cn("h-8 w-full rounded-lg border border-transparent bg-transparent px-2 text-sm text-foreground placeholder:text-muted-foreground/40 outline-none focus:border-white/15 focus:bg-surface-2/60", muted && "text-xs text-muted-foreground")
	});
}
function StateSelect({ label, value, onChange }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-col gap-1.5",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
			className: "text-xs font-medium text-muted-foreground",
			children: label
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "relative",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
				value,
				onChange: (e) => onChange(e.target.value),
				className: "h-10 w-full appearance-none rounded-xl border border-border/70 bg-surface-1/60 px-3 pr-8 text-sm outline-none focus:border-primary/60",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
					value: "",
					children: "Select state…"
				}), INDIAN_STATES.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("option", {
					value: s.code,
					children: [
						s.code,
						" — ",
						s.name
					]
				}, s.code))]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronDown, { className: "pointer-events-none absolute right-2 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" })]
		})]
	});
}
function SelectField({ label, value, onChange, options }) {
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
				children: options.map(([v, l]) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
					value: v,
					children: l
				}, v))
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronDown, { className: "pointer-events-none absolute right-2 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" })]
		})]
	});
}
function TemplatePicker({ value, onChange }) {
	const [open, setOpen] = (0, import_react.useState)(false);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "relative",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
			onClick: () => setOpen((v) => !v),
			className: "inline-flex h-10 items-center gap-1.5 rounded-xl border border-border/70 bg-surface-1/60 px-3 text-xs text-muted-foreground hover:text-foreground",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Palette, { className: "h-4 w-4" }),
				" ",
				templates.find((t) => t.id === value)?.label,
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronDown, { className: "h-3 w-3" })
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatePresence, { children: open && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
			initial: {
				opacity: 0,
				y: -4
			},
			animate: {
				opacity: 1,
				y: 0
			},
			exit: {
				opacity: 0,
				y: -4
			},
			className: "absolute right-0 top-12 z-30 w-44 overflow-hidden rounded-xl border border-border/70 bg-card/95 p-1 shadow-2xl backdrop-blur-xl",
			children: templates.map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				onClick: () => {
					onChange(t.id);
					setOpen(false);
				},
				className: cn("flex w-full items-center justify-between rounded-lg px-3 py-2 text-sm hover:bg-white/5", value === t.id && "text-blue-300"),
				children: [
					t.label,
					" ",
					value === t.id && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "✓" })
				]
			}, t.id))
		}) })]
	});
}
function StatusPicker({ value, onChange }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "relative",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
			value,
			onChange: (e) => onChange(e.target.value),
			className: "h-10 appearance-none rounded-xl border border-border/70 bg-surface-1/60 pl-3 pr-7 text-xs uppercase tracking-wider text-muted-foreground outline-none hover:text-foreground",
			children: statuses.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
				value: s,
				children: s
			}, s))
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronDown, { className: "pointer-events-none absolute right-2 top-1/2 h-3 w-3 -translate-y-1/2 text-muted-foreground" })]
	});
}
function TotalsBar({ totals, currency }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "mt-4 rounded-2xl border border-border/70 bg-card/60 p-4 backdrop-blur-xl shadow-card",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid grid-cols-3 gap-3 text-center text-xs",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "text-muted-foreground",
					children: "Taxable"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-0.5 font-semibold text-foreground tabular-nums",
					children: formatINR(totals.taxable, currency)
				})] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "text-muted-foreground",
					children: totals.intraState ? "CGST+SGST" : "IGST"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-0.5 font-semibold text-foreground tabular-nums",
					children: formatINR(totals.tax, currency)
				})] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "text-muted-foreground",
					children: "Grand Total"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-0.5 font-semibold text-grad-brand tabular-nums",
					children: formatINR(totals.total, currency)
				})] })
			]
		})
	});
}
//#endregion
export { fireConfetti as n, InvoiceEditor as t };

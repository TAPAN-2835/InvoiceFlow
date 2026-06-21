import { o as __toESM } from "./_runtime.mjs";
import { r as require_react } from "./_libs/@radix-ui/react-compose-refs+[...].mjs";
import { i as useSettings, n as useHydrated, r as useInvoices } from "./_ssr/store-C1sgFMdj.mjs";
import { _ as useNavigate, g as Link } from "./_libs/@tanstack/react-router+[...].mjs";
import { n as require_jsx_runtime } from "./_libs/radix-ui__react-context+react.mjs";
import { M as Funnel, N as FileText, R as Copy, a as Trash2, b as Plus, p as Search, x as Pencil } from "./_libs/lucide-react.mjs";
import { o as motion, s as AnimatePresence } from "./_libs/framer-motion.mjs";
import { a as nextInvoiceNumber, n as computeTotals } from "./_ssr/invoice--AQg1XG7.mjs";
import { r as formatINR } from "./_ssr/format-zwtZovmO.mjs";
import { n as Field } from "./_ssr/Field-6JthDHSW.mjs";
import { n as toast } from "./_libs/sonner.mjs";
import { n as StatusBadge } from "./_app.dashboard-CmD9vKGD.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_app.invoices.index-B7lvWW8y.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var statuses = [
	"draft",
	"pending",
	"paid",
	"overdue",
	"cancelled"
];
function InvoicesList() {
	const [invoices, setInvoices] = useInvoices();
	const [settings] = useSettings();
	const hydrated = useHydrated();
	const navigate = useNavigate();
	const [q, setQ] = (0, import_react.useState)("");
	const [statusFilter, setStatusFilter] = (0, import_react.useState)("all");
	const [sort, setSort] = (0, import_react.useState)("new");
	const filtered = (0, import_react.useMemo)(() => {
		let list = invoices.filter((i) => {
			if (statusFilter !== "all" && i.status !== statusFilter) return false;
			if (!q) return true;
			const s = q.toLowerCase();
			return i.number.toLowerCase().includes(s) || (i.customer.name || "").toLowerCase().includes(s) || (i.customer.gstin || "").toLowerCase().includes(s);
		});
		if (sort === "new") list.sort((a, b) => b.updatedAt - a.updatedAt);
		if (sort === "old") list.sort((a, b) => a.updatedAt - b.updatedAt);
		if (sort === "amount") list.sort((a, b) => computeTotals(b).total - computeTotals(a).total);
		return list;
	}, [
		invoices,
		q,
		statusFilter,
		sort
	]);
	const duplicate = (inv) => {
		const prefix = settings.defaults.prefix || "INV-";
		const copy = {
			...inv,
			id: crypto.randomUUID(),
			number: nextInvoiceNumber(prefix, invoices),
			status: "draft",
			createdAt: Date.now(),
			updatedAt: Date.now()
		};
		setInvoices((prev) => [copy, ...prev]);
		toast.success("Invoice duplicated");
		navigate({
			to: "/invoices/$id",
			params: { id: copy.id }
		});
	};
	const remove = (id) => {
		setInvoices((prev) => prev.filter((x) => x.id !== id));
		toast.success("Invoice deleted");
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap items-end justify-between gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-3xl font-semibold tracking-tight text-grad",
					children: "Invoices"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 text-sm text-muted-foreground",
					children: "Search, filter, and manage every invoice."
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/invoices/new",
					className: "inline-flex h-10 items-center gap-1.5 rounded-xl bg-gradient-to-br from-blue-500 to-violet-500 px-4 text-sm font-medium text-white shadow-glow hover:opacity-90",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "h-4 w-4" }), " New invoice"]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-3 sm:grid-cols-[1fr_auto_auto]",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						prefix: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "h-4 w-4" }),
						placeholder: "Search by number, customer, GSTIN…",
						value: q,
						onChange: (e) => setQ(e.target.value)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
						value: statusFilter,
						onChange: setStatusFilter,
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Funnel, { className: "h-4 w-4" }),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: "all",
							children: "All status"
						}), statuses.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: s,
							children: s[0].toUpperCase() + s.slice(1)
						}, s))]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
						value: sort,
						onChange: (v) => setSort(v),
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "new",
								children: "Newest first"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "old",
								children: "Oldest first"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "amount",
								children: "Highest amount"
							})
						]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "overflow-hidden rounded-2xl border border-border/70 bg-card/60 backdrop-blur-xl shadow-card",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid grid-cols-[1.4fr_2fr_1fr_1.2fr_1.2fr_auto] gap-3 border-b border-border/70 px-4 py-3 text-[10px] uppercase tracking-widest text-muted-foreground",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: "Invoice" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: "Customer" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: "Date" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: "Status" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "text-right",
								children: "Amount"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {})
						]
					}),
					hydrated && filtered.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "px-4 py-16 text-center",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500/15 to-violet-500/15 ring-1 ring-white/10",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileText, { className: "h-6 w-6 text-blue-300" })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-3 text-sm font-medium",
								children: "No invoices match"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-1 text-xs text-muted-foreground",
								children: "Try a different search or create one."
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatePresence, {
						initial: false,
						children: filtered.map((inv, i) => {
							const t = computeTotals(inv);
							return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
								layout: true,
								initial: {
									opacity: 0,
									y: 4
								},
								animate: {
									opacity: 1,
									y: 0
								},
								exit: {
									opacity: 0,
									scale: .98
								},
								transition: { delay: Math.min(i * .02, .2) },
								className: "grid grid-cols-[1.4fr_2fr_1fr_1.2fr_1.2fr_auto] items-center gap-3 border-b border-border/60 px-4 py-3 text-sm last:border-b-0 hover:bg-white/[0.03]",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
										to: "/invoices/$id",
										params: { id: inv.id },
										className: "font-medium hover:text-blue-300",
										children: inv.number
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "truncate text-muted-foreground",
										children: inv.customer.name || /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "italic",
											children: "Untitled"
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "text-muted-foreground",
										children: inv.date
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusBadge, { status: inv.status }) }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "text-right font-semibold tabular-nums",
										children: formatINR(t.total, inv.currency)
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex justify-end gap-1",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(IconBtn, {
												onClick: () => navigate({
													to: "/invoices/$id",
													params: { id: inv.id }
												}),
												title: "Edit",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pencil, { className: "h-3.5 w-3.5" })
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(IconBtn, {
												onClick: () => duplicate(inv),
												title: "Duplicate",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Copy, { className: "h-3.5 w-3.5" })
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(IconBtn, {
												onClick: () => remove(inv.id),
												title: "Delete",
												danger: true,
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "h-3.5 w-3.5" })
											})
										]
									})
								]
							}, inv.id);
						})
					})
				]
			})
		]
	});
}
function IconBtn({ children, onClick, title, danger }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
		onClick,
		title,
		className: `inline-flex h-8 w-8 items-center justify-center rounded-lg border border-border/70 bg-surface-1/60 text-muted-foreground transition hover:text-foreground hover:border-white/15 ${danger ? "hover:text-rose-300" : ""}`,
		children
	});
}
function Select({ value, onChange, children, icon }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex h-10 items-center gap-2 rounded-xl border border-border/70 bg-surface-1/60 px-3 text-sm",
		children: [icon && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "text-muted-foreground",
			children: icon
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
			value,
			onChange: (e) => onChange(e.target.value),
			className: "appearance-none bg-transparent pr-2 text-foreground outline-none",
			children
		})]
	});
}
//#endregion
export { Select, InvoicesList as component };

import { o as __toESM } from "./_runtime.mjs";
import { r as require_react } from "./_libs/@radix-ui/react-compose-refs+[...].mjs";
import { n as useHydrated, r as useInvoices } from "./_ssr/store-C1sgFMdj.mjs";
import { t as cn } from "./_ssr/utils-C_uf36nf.mjs";
import { g as Link } from "./_libs/@tanstack/react-router+[...].mjs";
import { n as require_jsx_runtime } from "./_libs/radix-ui__react-context+react.mjs";
import { D as IndianRupee, N as FileText, _ as Receipt, b as Plus, i as TrendingUp, q as ArrowUpRight } from "./_libs/lucide-react.mjs";
import { o as motion } from "./_libs/framer-motion.mjs";
import { n as computeTotals } from "./_ssr/invoice--AQg1XG7.mjs";
import { n as formatCompactINR, r as formatINR } from "./_ssr/format-zwtZovmO.mjs";
import { a as Area, c as ResponsiveContainer, i as Bar, n as BarChart, o as CartesianGrid, r as XAxis, s as Tooltip, t as AreaChart } from "./_libs/recharts+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_app.dashboard-CFJLDoj8.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function StatCard({ label, value, sub, icon, accent = "blue" }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "group relative overflow-hidden rounded-2xl border border-border/70 bg-card/60 p-5 shadow-card backdrop-blur-xl transition hover:-translate-y-0.5",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: cn("pointer-events-none absolute -top-20 -right-20 h-56 w-56 rounded-full bg-gradient-to-br opacity-30 blur-3xl", {
				blue: "from-blue-500/40 to-blue-500/0",
				violet: "from-violet-500/40 to-violet-500/0",
				cyan: "from-cyan-500/40 to-cyan-500/0",
				green: "from-emerald-500/40 to-emerald-500/0"
			}[accent]) }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-start justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "text-xs text-muted-foreground",
					children: label
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-2 text-2xl font-semibold tracking-tight text-grad",
					children: value
				})] }), icon && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "rounded-xl border border-border/60 bg-surface-1/70 p-2 text-muted-foreground",
					children: icon
				})]
			}),
			sub && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-3 text-xs text-muted-foreground",
				children: sub
			})
		]
	});
}
function Dashboard() {
	const [invoices] = useInvoices();
	const hydrated = useHydrated();
	const metrics = (0, import_react.useMemo)(() => {
		let revenue = 0, gst = 0, today = 0;
		const now = /* @__PURE__ */ new Date();
		const todayStr = now.toISOString().slice(0, 10);
		const monthly = {};
		for (let i = 5; i >= 0; i--) {
			const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
			const k = d.toISOString().slice(0, 7);
			monthly[k] = {
				revenue: 0,
				gst: 0,
				count: 0,
				label: d.toLocaleString("en-IN", { month: "short" })
			};
		}
		for (const inv of invoices) {
			const t = computeTotals(inv);
			revenue += t.total;
			gst += t.tax;
			if (inv.date === todayStr) today += t.total;
			const k = inv.date?.slice(0, 7);
			if (k && monthly[k]) {
				monthly[k].revenue += t.total;
				monthly[k].gst += t.tax;
				monthly[k].count += 1;
			}
		}
		return {
			revenue,
			gst,
			today,
			count: invoices.length,
			monthly: Object.values(monthly)
		};
	}, [invoices]);
	const recent = [...invoices].sort((a, b) => b.updatedAt - a.updatedAt).slice(0, 6);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-8",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap items-end justify-between gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-3xl font-semibold tracking-tight text-grad",
					children: "Dashboard"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 text-sm text-muted-foreground",
					children: "A calm overview of your invoicing."
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/invoices/new",
					className: "inline-flex h-10 items-center gap-1.5 rounded-xl bg-gradient-to-br from-blue-500 to-violet-500 px-4 text-sm font-medium text-white shadow-glow hover:opacity-90",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "h-4 w-4" }), " New invoice"]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-4 sm:grid-cols-2 lg:grid-cols-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
						label: "Total Invoices",
						value: hydrated ? metrics.count.toLocaleString("en-IN") : "—",
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileText, { className: "h-4 w-4" }),
						accent: "blue"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
						label: "Total Revenue",
						value: hydrated ? formatCompactINR(metrics.revenue) : "—",
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(IndianRupee, { className: "h-4 w-4" }),
						accent: "violet"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
						label: "Today's Revenue",
						value: hydrated ? formatINR(metrics.today) : "—",
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TrendingUp, { className: "h-4 w-4" }),
						accent: "cyan"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
						label: "GST Collected",
						value: hydrated ? formatCompactINR(metrics.gst) : "—",
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Receipt, { className: "h-4 w-4" }),
						accent: "green"
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-4 lg:grid-cols-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChartCard, {
						title: "Invoice trend",
						subtitle: "Last 6 months",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResponsiveContainer, {
							width: "100%",
							height: 220,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AreaChart, {
								data: metrics.monthly,
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("defs", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("linearGradient", {
										id: "g1",
										x1: "0",
										x2: "0",
										y1: "0",
										y2: "1",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
											offset: "0%",
											stopColor: "#3B82F6",
											stopOpacity: .6
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
											offset: "100%",
											stopColor: "#3B82F6",
											stopOpacity: 0
										})]
									}) }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(XAxis, {
										dataKey: "label",
										stroke: "#64748B",
										fontSize: 11,
										tickLine: false,
										axisLine: false
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, {
										contentStyle: tooltip,
										cursor: { stroke: "rgba(255,255,255,0.1)" },
										formatter: (v) => formatCompactINR(Number(v))
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Area, {
										type: "monotone",
										dataKey: "revenue",
										stroke: "#3B82F6",
										strokeWidth: 2,
										fill: "url(#g1)"
									})
								]
							})
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChartCard, {
						title: "GST collected",
						subtitle: "Last 6 months",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResponsiveContainer, {
							width: "100%",
							height: 220,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(BarChart, {
								data: metrics.monthly,
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CartesianGrid, {
										stroke: "rgba(255,255,255,0.05)",
										vertical: false
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(XAxis, {
										dataKey: "label",
										stroke: "#64748B",
										fontSize: 11,
										tickLine: false,
										axisLine: false
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, {
										contentStyle: tooltip,
										cursor: { fill: "rgba(255,255,255,0.04)" },
										formatter: (v) => formatCompactINR(Number(v))
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bar, {
										dataKey: "gst",
										fill: "#06B6D4",
										radius: [
											6,
											6,
											0,
											0
										]
									})
								]
							})
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChartCard, {
						title: "Invoices created",
						subtitle: "Last 6 months",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResponsiveContainer, {
							width: "100%",
							height: 220,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(BarChart, {
								data: metrics.monthly,
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CartesianGrid, {
										stroke: "rgba(255,255,255,0.05)",
										vertical: false
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(XAxis, {
										dataKey: "label",
										stroke: "#64748B",
										fontSize: 11,
										tickLine: false,
										axisLine: false
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, {
										contentStyle: tooltip,
										cursor: { fill: "rgba(255,255,255,0.04)" }
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bar, {
										dataKey: "count",
										fill: "#7C3AED",
										radius: [
											6,
											6,
											0,
											0
										]
									})
								]
							})
						})
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "rounded-2xl border border-border/70 bg-card/60 p-5 backdrop-blur-xl shadow-card",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center justify-between",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "text-base font-semibold",
						children: "Recent invoices"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs text-muted-foreground",
						children: "Your latest activity"
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/invoices",
						className: "inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground",
						children: ["View all ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowUpRight, { className: "h-3 w-3" })]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-4 divide-y divide-border/60",
					children: [hydrated && recent.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {}), recent.map((inv, i) => {
						const t = computeTotals(inv);
						return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
							initial: {
								opacity: 0,
								y: 6
							},
							animate: {
								opacity: 1,
								y: 0
							},
							transition: { delay: i * .03 },
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
								to: "/invoices/$id",
								params: { id: inv.id },
								className: "flex items-center gap-4 py-3 hover:bg-white/[0.03] rounded-lg px-2 transition",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500/20 to-violet-500/20 text-blue-300 ring-1 ring-white/10",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileText, { className: "h-4 w-4" })
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "min-w-0 flex-1",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "truncate text-sm font-medium",
											children: inv.number
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "truncate text-xs text-muted-foreground",
											children: [
												inv.customer.name || "Untitled customer",
												" · ",
												inv.date
											]
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusBadge, { status: inv.status }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "text-sm font-semibold tabular-nums",
										children: formatINR(t.total, inv.currency)
									})
								]
							})
						}, inv.id);
					})]
				})]
			})
		]
	});
}
var tooltip = {
	background: "rgba(15,23,42,0.95)",
	border: "1px solid rgba(255,255,255,0.08)",
	borderRadius: 12,
	fontSize: 12,
	color: "#e2e8f0"
};
function ChartCard({ title, subtitle, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-2xl border border-border/70 bg-card/60 p-5 backdrop-blur-xl shadow-card",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mb-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "text-sm font-semibold",
				children: title
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "text-xs text-muted-foreground",
				children: subtitle
			})]
		}), children]
	});
}
function StatusBadge({ status }) {
	const map = {
		paid: "bg-emerald-500/15 text-emerald-300 ring-emerald-500/30",
		pending: "bg-amber-500/15 text-amber-300 ring-amber-500/30",
		overdue: "bg-rose-500/15 text-rose-300 ring-rose-500/30",
		cancelled: "bg-slate-500/15 text-slate-300 ring-slate-500/30",
		draft: "bg-blue-500/15 text-blue-300 ring-blue-500/30"
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: `inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider ring-1 ${map[status] ?? map.draft}`,
		children: status
	});
}
function EmptyState() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "py-12 text-center",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500/15 to-violet-500/15 ring-1 ring-white/10",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileText, { className: "h-6 w-6 text-blue-300" })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-4 text-sm font-medium",
				children: "No invoices yet"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-1 text-xs text-muted-foreground",
				children: "Create your first invoice to see activity here."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
				to: "/invoices/new",
				className: "mt-5 inline-flex h-9 items-center gap-1.5 rounded-xl bg-gradient-to-br from-blue-500 to-violet-500 px-4 text-sm font-medium text-white shadow-glow",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "h-4 w-4" }), " New invoice"]
			})
		]
	});
}
//#endregion
export { StatusBadge, Dashboard as component };

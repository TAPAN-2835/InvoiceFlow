import { o as __toESM } from "./_runtime.mjs";
import { r as require_react } from "./_libs/@radix-ui/react-compose-refs+[...].mjs";
import { r as useInvoices } from "./_ssr/store-C1sgFMdj.mjs";
import { t as cn } from "./_ssr/utils-C_uf36nf.mjs";
import { _ as useNavigate, f as Outlet, g as Link, l as useRouterState } from "./_libs/@tanstack/react-router+[...].mjs";
import { n as require_jsx_runtime } from "./_libs/radix-ui__react-context+react.mjs";
import { N as FileText, P as FileSearch, T as LayoutDashboard, U as Calculator, b as Plus, f as Settings, p as Search, z as Command } from "./_libs/lucide-react.mjs";
import { o as motion, s as AnimatePresence } from "./_libs/framer-motion.mjs";
import { n as SiteFooter, t as Logo } from "./_ssr/SiteFooter-wGyjErjB.mjs";
import { t as _e } from "./_libs/cmdk.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_app-CUtDasEx.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function CommandPalette({ open, setOpen }) {
	const navigate = useNavigate();
	const [invoices] = useInvoices();
	(0, import_react.useEffect)(() => {
		if (!open) return;
		const onEsc = (e) => e.key === "Escape" && setOpen(false);
		window.addEventListener("keydown", onEsc);
		return () => window.removeEventListener("keydown", onEsc);
	}, [open, setOpen]);
	const go = (to) => {
		setOpen(false);
		navigate({ to });
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatePresence, { children: open && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
		initial: { opacity: 0 },
		animate: { opacity: 1 },
		exit: { opacity: 0 },
		className: "fixed inset-0 z-50 flex items-start justify-center bg-black/60 backdrop-blur-md pt-24 px-4",
		onClick: () => setOpen(false),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
			initial: {
				y: -10,
				opacity: 0,
				scale: .98
			},
			animate: {
				y: 0,
				opacity: 1,
				scale: 1
			},
			exit: {
				y: -10,
				opacity: 0,
				scale: .98
			},
			transition: {
				type: "spring",
				stiffness: 300,
				damping: 26
			},
			onClick: (e) => e.stopPropagation(),
			className: "w-full max-w-xl overflow-hidden rounded-2xl border border-border/70 bg-card/90 shadow-2xl backdrop-blur-2xl",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(_e, {
				label: "Command palette",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "border-b border-border/60 px-4",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(_e.Input, {
						autoFocus: true,
						placeholder: "Search invoices, pages, actions…",
						className: "h-14 w-full bg-transparent text-sm text-foreground placeholder:text-muted-foreground/60 outline-none"
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(_e.List, {
					className: "max-h-[60vh] overflow-y-auto p-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(_e.Empty, {
							className: "px-3 py-6 text-center text-sm text-muted-foreground",
							children: "Nothing found."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(_e.Group, {
							heading: "Navigate",
							className: "text-[11px] font-medium uppercase tracking-wider text-muted-foreground/60",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Item, {
									onSelect: () => go("/dashboard"),
									icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LayoutDashboard, { className: "h-4 w-4" }),
									label: "Dashboard"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Item, {
									onSelect: () => go("/invoices"),
									icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileText, { className: "h-4 w-4" }),
									label: "Invoices"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Item, {
									onSelect: () => go("/gst-calculator"),
									icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Calculator, { className: "h-4 w-4" }),
									label: "GST Calculator"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Item, {
									onSelect: () => go("/settings"),
									icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Settings, { className: "h-4 w-4" }),
									label: "Settings"
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(_e.Group, {
							heading: "Actions",
							className: "text-[11px] font-medium uppercase tracking-wider text-muted-foreground/60",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Item, {
								onSelect: () => go("/invoices/new"),
								icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "h-4 w-4" }),
								label: "Create new invoice",
								shortcut: "N"
							})
						}),
						invoices.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(_e.Group, {
							heading: "Recent invoices",
							className: "text-[11px] font-medium uppercase tracking-wider text-muted-foreground/60",
							children: invoices.slice(0, 6).map((inv) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Item, {
								onSelect: () => go(`/invoices/${inv.id}`),
								icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileSearch, { className: "h-4 w-4" }),
								label: `${inv.number} — ${inv.customer.name || "Untitled"}`
							}, inv.id))
						})
					]
				})]
			})
		})
	}) });
}
function Item({ onSelect, icon, label, shortcut }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(_e.Item, {
		onSelect,
		className: "flex cursor-pointer items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-foreground/90 aria-selected:bg-white/8 aria-selected:text-foreground data-[selected=true]:bg-white/8",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "text-muted-foreground",
				children: icon
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "flex-1",
				children: label
			}),
			shortcut && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("kbd", {
				className: "rounded border border-border/60 bg-surface-2 px-1.5 py-0.5 text-[10px] text-muted-foreground",
				children: shortcut
			})
		]
	});
}
var nav = [
	{
		to: "/dashboard",
		label: "Dashboard",
		icon: LayoutDashboard
	},
	{
		to: "/invoices",
		label: "Invoices",
		icon: FileText
	},
	{
		to: "/gst-calculator",
		label: "GST Calculator",
		icon: Calculator
	},
	{
		to: "/settings",
		label: "Settings",
		icon: Settings
	}
];
function AppShell() {
	const pathname = useRouterState({ select: (s) => s.location.pathname });
	const [openPalette, setOpenPalette] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		const h = (e) => {
			if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
				e.preventDefault();
				setOpenPalette((v) => !v);
			}
		};
		window.addEventListener("keydown", h);
		return () => window.removeEventListener("keydown", h);
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-dvh",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "pointer-events-none fixed inset-0 -z-10 bg-aurora opacity-60" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "pointer-events-none fixed inset-0 -z-10 bg-grid opacity-[0.15] mask-fade-b" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "sticky top-0 z-40 border-b border-border/60 bg-background/60 backdrop-blur-xl",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mx-auto flex h-16 max-w-[1400px] items-center gap-3 px-4 sm:px-6",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/",
							className: "shrink-0",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Logo, {})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
							className: "ml-6 hidden items-center gap-1 md:flex",
							children: nav.map((n) => {
								const active = pathname.startsWith(n.to);
								return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
									to: n.to,
									className: cn("relative inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm transition", active ? "text-foreground" : "text-muted-foreground hover:text-foreground"),
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(n.icon, { className: "h-4 w-4" }),
										n.label,
										active && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.span, {
											layoutId: "nav-pill",
											className: "absolute inset-0 -z-10 rounded-lg bg-white/5 ring-1 ring-white/10",
											transition: {
												type: "spring",
												bounce: .2,
												duration: .5
											}
										})
									]
								}, n.to);
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "ml-auto flex items-center gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								onClick: () => setOpenPalette(true),
								className: "hidden h-9 items-center gap-2 rounded-xl border border-border/70 bg-surface-1/70 px-3 text-xs text-muted-foreground transition hover:text-foreground sm:inline-flex",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "h-3.5 w-3.5" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Search…" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("kbd", {
										className: "ml-3 inline-flex items-center gap-0.5 rounded border border-border/70 bg-surface-2 px-1.5 py-0.5 text-[10px] text-muted-foreground",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Command, { className: "h-2.5 w-2.5" }), "K"]
									})
								]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
								to: "/invoices/new",
								className: "inline-flex h-9 items-center gap-1.5 rounded-xl bg-gradient-to-br from-blue-500 to-violet-500 px-3.5 text-sm font-medium text-white shadow-glow transition hover:opacity-90",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "h-4 w-4" }), " New Invoice"]
							})]
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex gap-1 overflow-x-auto px-4 pb-2 md:hidden no-scrollbar",
					children: nav.map((n) => {
						const active = pathname.startsWith(n.to);
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: n.to,
							className: cn("inline-flex shrink-0 items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs", active ? "bg-white/10 text-foreground" : "text-muted-foreground"),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(n.icon, { className: "h-3.5 w-3.5" }), n.label]
						}, n.to);
					})
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
				className: "mx-auto max-w-[1400px] px-4 py-8 sm:px-6",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
					initial: {
						opacity: 0,
						y: 8
					},
					animate: {
						opacity: 1,
						y: 0
					},
					transition: {
						duration: .35,
						ease: "easeOut"
					},
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {})
				}, pathname)
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mx-auto max-w-[1400px] px-4 sm:px-6",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteFooter, { compact: true })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CommandPalette, {
				open: openPalette,
				setOpen: setOpenPalette
			})
		]
	});
}
var SplitComponent = AppShell;
//#endregion
export { SplitComponent as component };

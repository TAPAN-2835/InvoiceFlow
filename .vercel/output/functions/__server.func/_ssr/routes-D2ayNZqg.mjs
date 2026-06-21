import { o as __toESM } from "../_runtime.mjs";
import { r as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { n as useHydrated, r as useInvoices } from "./store-C1sgFMdj.mjs";
import { n as BRAND } from "./constants-BSR6ATQU.mjs";
import { g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { B as CircleCheck, E as KeyRound, F as FileCheckCorner, G as Bolt, J as ArrowRight, K as BadgeCheck, _ as Receipt, c as Smartphone, n as WandSparkles, o as Star, s as Sparkles, t as WifiOff, u as Shield } from "../_libs/lucide-react.mjs";
import { a as useMotionValue, i as useTransform, o as motion, r as useSpring } from "../_libs/framer-motion.mjs";
import { n as SiteFooter, t as Logo } from "./SiteFooter-wGyjErjB.mjs";
import { n as computeTotals } from "./invoice--AQg1XG7.mjs";
import { n as formatCompactINR } from "./format-zwtZovmO.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-D2ayNZqg.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function Landing() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "relative overflow-hidden",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BackgroundFX, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Nav, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Hero, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Logos, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Features, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stats, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Showcase, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Testimonials, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pricing, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FAQ, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Footer, {})
		]
	});
}
function BackgroundFX() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "pointer-events-none absolute inset-0 -z-10 bg-aurora opacity-70" }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "pointer-events-none absolute inset-0 -z-10 bg-grid opacity-[0.18] mask-fade-b" }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "pointer-events-none absolute -top-40 left-1/2 -z-10 h-[700px] w-[1100px] -translate-x-1/2 rounded-full bg-blue-500/25 blur-[160px]" }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "pointer-events-none absolute top-40 right-0 -z-10 h-[500px] w-[500px] rounded-full bg-violet-500/20 blur-[140px]" })
	] });
}
function Nav() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("header", {
		className: "sticky top-0 z-40 border-b border-border/40 bg-background/40 backdrop-blur-xl",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto flex h-16 max-w-6xl items-center px-6",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Logo, {})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
					className: "ml-10 hidden gap-7 text-sm text-muted-foreground md:flex",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							href: "#features",
							className: "hover:text-foreground",
							children: "Features"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							href: "#showcase",
							className: "hover:text-foreground",
							children: "Templates"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							href: "#pricing",
							className: "hover:text-foreground",
							children: "Pricing"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							href: "#faq",
							className: "hover:text-foreground",
							children: "FAQ"
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "ml-auto flex items-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/dashboard",
						className: "hidden sm:inline-flex h-9 items-center rounded-xl px-3 text-sm text-muted-foreground hover:text-foreground",
						children: "Open app"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/invoices/new",
						className: "inline-flex h-9 items-center gap-1.5 rounded-xl bg-gradient-to-br from-blue-500 to-violet-500 px-3.5 text-sm font-medium text-white shadow-glow hover:opacity-90",
						children: ["Start Free ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "h-4 w-4" })]
					})]
				})
			]
		})
	});
}
function Hero() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "relative mx-auto max-w-6xl px-6 pt-20 pb-24 sm:pt-28",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
				initial: {
					opacity: 0,
					y: 12
				},
				animate: {
					opacity: 1,
					y: 0
				},
				transition: { duration: .5 },
				className: "mx-auto flex max-w-xl items-center justify-center gap-2 rounded-full border border-border/70 bg-white/5 px-3.5 py-1.5 text-xs text-muted-foreground backdrop-blur",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "h-3.5 w-3.5 text-blue-400" }), "New • UPI QR code, 5 templates, instant PDF"]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.h1, {
				initial: {
					opacity: 0,
					y: 16
				},
				animate: {
					opacity: 1,
					y: 0
				},
				transition: {
					duration: .6,
					delay: .05
				},
				className: "mx-auto mt-6 max-w-3xl text-center text-5xl font-semibold tracking-tight sm:text-6xl md:text-7xl",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-grad",
						children: "GST invoices,"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-grad-brand",
						children: "in seconds."
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.p, {
				initial: {
					opacity: 0,
					y: 16
				},
				animate: {
					opacity: 1,
					y: 0
				},
				transition: {
					duration: .6,
					delay: .12
				},
				className: "mx-auto mt-6 max-w-2xl text-center text-base text-muted-foreground sm:text-lg",
				children: "Built for Indian freelancers, agencies and startups. Pixel-perfect PDFs, CGST/SGST/IGST done right, UPI QR codes — all in one calm, beautiful workspace. No signup."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
				initial: {
					opacity: 0,
					y: 16
				},
				animate: {
					opacity: 1,
					y: 0
				},
				transition: {
					duration: .6,
					delay: .18
				},
				className: "mt-8 flex flex-wrap items-center justify-center gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/invoices/new",
					className: "group inline-flex h-12 items-center gap-2 rounded-xl bg-gradient-to-br from-blue-500 to-violet-500 px-5 text-sm font-medium text-white shadow-glow transition hover:scale-[1.02]",
					children: ["Create your first invoice", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "h-4 w-4 transition group-hover:translate-x-0.5" })]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
					href: "#showcase",
					className: "inline-flex h-12 items-center gap-2 rounded-xl border border-border/70 bg-white/5 px-5 text-sm text-foreground hover:bg-white/10",
					children: "Watch demo"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-16",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FloatingInvoiceScene, {})
			})
		]
	});
}
function FloatingInvoiceScene() {
	const mx = useMotionValue(0);
	const my = useMotionValue(0);
	const rx = useSpring(useTransform(my, [-200, 200], [6, -6]), {
		stiffness: 100,
		damping: 14
	});
	const ry = useSpring(useTransform(mx, [-200, 200], [-6, 6]), {
		stiffness: 100,
		damping: 14
	});
	const [total, setTotal] = (0, import_react.useState)(0);
	(0, import_react.useEffect)(() => {
		let v = 0;
		const target = 28675;
		const id = setInterval(() => {
			v = Math.min(target, v + 350 + Math.random() * 700);
			setTotal(v);
			if (v >= target) clearInterval(id);
		}, 30);
		return () => clearInterval(id);
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "relative mx-auto h-[480px] max-w-4xl",
		onMouseMove: (e) => {
			const r = e.currentTarget.getBoundingClientRect();
			mx.set(e.clientX - r.left - r.width / 2);
			my.set(e.clientY - r.top - r.height / 2);
		},
		onMouseLeave: () => {
			mx.set(0);
			my.set(0);
		},
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-x-12 top-10 -z-0 h-72 rounded-full bg-gradient-to-r from-blue-500/30 via-cyan-400/20 to-violet-500/30 blur-3xl" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
				animate: { y: [
					0,
					-10,
					0
				] },
				transition: {
					duration: 6,
					repeat: Infinity,
					ease: "easeInOut"
				},
				className: "absolute left-0 top-12 hidden w-56 -rotate-6 rounded-2xl border border-border/70 bg-card/80 p-4 shadow-glow backdrop-blur-xl sm:block",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "text-[10px] uppercase tracking-widest text-muted-foreground",
						children: "CGST + SGST"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-1 text-lg font-semibold text-grad",
						children: "9% + 9%"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-3 h-1 w-full rounded-full bg-white/10",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
							className: "h-1 rounded-full bg-gradient-to-r from-blue-500 to-violet-500",
							initial: { width: 0 },
							animate: { width: "78%" },
							transition: {
								duration: 1.4,
								ease: "easeOut"
							}
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-3 flex items-center gap-2 text-xs text-muted-foreground",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "h-3.5 w-3.5 text-emerald-400" }), " Intra-state detected"]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
				animate: { y: [
					0,
					10,
					0
				] },
				transition: {
					duration: 7,
					repeat: Infinity,
					ease: "easeInOut"
				},
				className: "absolute right-0 top-32 hidden w-60 rotate-6 rounded-2xl border border-border/70 bg-card/80 p-4 shadow-glow backdrop-blur-xl sm:block",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "text-[10px] uppercase tracking-widest text-muted-foreground",
						children: "Grand Total"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-1 text-2xl font-semibold text-grad-brand",
						children: ["₹", Math.round(total).toLocaleString("en-IN")]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-3 grid grid-cols-3 gap-2 text-[10px]",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "rounded-md bg-white/5 p-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "text-muted-foreground",
									children: "Sub"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: "₹24.3K" })]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "rounded-md bg-white/5 p-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "text-muted-foreground",
									children: "Tax"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: "₹4.37K" })]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "rounded-md bg-white/5 p-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "text-muted-foreground",
									children: "Items"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: "5" })]
							})
						]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
				style: {
					rotateX: rx,
					rotateY: ry,
					transformPerspective: 1200
				},
				className: "relative mx-auto mt-10 w-full max-w-2xl overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.06] to-white/[0.02] p-8 shadow-2xl backdrop-blur-2xl",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-white/40 to-transparent" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-start justify-between",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "text-[10px] uppercase tracking-widest text-muted-foreground",
								children: "Invoice"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-1 text-2xl font-semibold tracking-tight",
								children: "INV-2026-0142"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-1 text-xs text-muted-foreground",
								children: "Issued · 21 Jun 2026"
							})
						] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "rounded-xl bg-gradient-to-br from-blue-500 to-violet-500 p-2.5",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Receipt, { className: "h-5 w-5 text-white" })
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-6 grid grid-cols-2 gap-4 text-xs",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "rounded-xl border border-white/10 bg-white/5 p-3",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "text-muted-foreground",
									children: "Bill To"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "mt-1 text-sm text-foreground",
									children: "Aurora Studio Pvt Ltd"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "text-muted-foreground",
									children: "29ABCDE1234F1Z5"
								})
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "rounded-xl border border-white/10 bg-white/5 p-3",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "text-muted-foreground",
									children: "From"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "mt-1 text-sm text-foreground",
									children: "Northwind Labs"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "text-muted-foreground",
									children: "27AAACN1234A1Z2"
								})
							]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-5 overflow-hidden rounded-xl border border-white/10",
						children: [{
							name: "UI/UX design retainer",
							qty: 1,
							rate: 18e3
						}, {
							name: "Landing page revamp",
							qty: 1,
							rate: 6300
						}].map((r, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
							initial: {
								opacity: 0,
								x: -8
							},
							animate: {
								opacity: 1,
								x: 0
							},
							transition: { delay: .3 + i * .1 },
							className: "flex items-center justify-between border-b border-white/5 px-4 py-3 text-sm last:border-b-0",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: r.name }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "text-muted-foreground",
								children: [
									r.qty,
									" × ₹",
									r.rate.toLocaleString("en-IN")
								]
							})]
						}, i))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-5 flex items-center justify-between rounded-xl bg-gradient-to-r from-blue-500 to-violet-500 p-4 text-white",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-xs uppercase tracking-widest opacity-90",
							children: "Total due"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "text-xl font-semibold",
							children: ["₹", Math.round(total).toLocaleString("en-IN")]
						})]
					})
				]
			})
		]
	});
}
function Logos() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		className: "border-y border-border/40 bg-background/40 py-8",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto max-w-6xl px-6",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "text-center text-xs uppercase tracking-widest text-muted-foreground/70",
				children: "GST-compliant · Built for Indian businesses"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-5 grid grid-cols-3 items-center gap-6 text-center text-sm text-muted-foreground/60 sm:grid-cols-7",
				children: [
					"Razorpay",
					"Stripe",
					"Tally",
					"Zoho",
					"Paytm",
					"GST Council",
					"MCA"
				].map((i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "font-semibold tracking-tight",
					children: i
				}, i))
			})]
		})
	});
}
function Features() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		id: "features",
		className: "mx-auto max-w-6xl px-6 py-24",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-2xl",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "text-xs uppercase tracking-widest text-blue-400",
					children: "Features"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mt-3 text-4xl font-semibold tracking-tight sm:text-5xl text-grad",
					children: "Everything you need to invoice — and nothing you don't."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-4 text-muted-foreground",
					children: "Crafted for Indian businesses. Calm, fast, and uncompromising on detail."
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4",
			children: [
				{
					icon: Bolt,
					title: "Lightning Fast",
					desc: "Generate a perfect invoice in under 30 seconds with smart defaults."
				},
				{
					icon: BadgeCheck,
					title: "GST Ready",
					desc: "CGST, SGST, IGST auto-applied based on place of supply."
				},
				{
					icon: FileCheckCorner,
					title: "Professional PDFs",
					desc: "Print-quality, vector-clean PDF exports at 2× resolution."
				},
				{
					icon: WifiOff,
					title: "Works Offline",
					desc: "Local-first. Your invoices never leave your device."
				},
				{
					icon: KeyRound,
					title: "No Login Required",
					desc: "Open the app, start invoicing. Zero friction."
				},
				{
					icon: Shield,
					title: "Secure by Design",
					desc: "Browser storage only. No servers, no tracking."
				},
				{
					icon: Smartphone,
					title: "Responsive",
					desc: "Designed for desktop, tuned for mobile and tablet."
				},
				{
					icon: WandSparkles,
					title: "5 Beautiful Templates",
					desc: "Switch instantly between Modern, Minimal, Corporate, Gradient, Classic."
				}
			].map((item, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
				initial: {
					opacity: 0,
					y: 12
				},
				whileInView: {
					opacity: 1,
					y: 0
				},
				viewport: {
					once: true,
					margin: "-80px"
				},
				transition: {
					duration: .4,
					delay: i * .04
				},
				className: "group relative overflow-hidden rounded-2xl border border-border/70 bg-card/60 p-5 backdrop-blur-xl transition hover:-translate-y-0.5 hover:border-white/15",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute -top-12 -right-12 h-32 w-32 rounded-full bg-blue-500/15 opacity-0 blur-2xl transition group-hover:opacity-100" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "inline-flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500/20 to-violet-500/20 text-blue-400 ring-1 ring-white/10",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(item.icon, { className: "h-5 w-5" })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-4 text-base font-semibold",
						children: item.title
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-1 text-sm text-muted-foreground",
						children: item.desc
					})
				]
			}, item.title))
		})]
	});
}
function Stats() {
	const [invoices] = useInvoices();
	const hydrated = useHydrated();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		className: "relative border-y border-border/40 bg-background/30 py-16",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mx-auto grid max-w-6xl grid-cols-2 gap-8 px-6 md:grid-cols-4",
			children: (0, import_react.useMemo)(() => {
				if (!hydrated) return [
					{
						v: "—",
						l: "Your Invoices"
					},
					{
						v: "—",
						l: "Total Value"
					},
					{
						v: "100%",
						l: "Local & Private"
					},
					{
						v: "<30s",
						l: "To First Invoice"
					}
				];
				let value = 0;
				for (const inv of invoices) value += computeTotals(inv).total;
				return [
					{
						v: invoices.length.toLocaleString("en-IN"),
						l: "Your Invoices"
					},
					{
						v: value > 0 ? formatCompactINR(value) : "₹0",
						l: "Total Value"
					},
					{
						v: "100%",
						l: "Local & Private"
					},
					{
						v: "<30s",
						l: "To First Invoice"
					}
				];
			}, [invoices, hydrated]).map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "text-center",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "text-4xl font-semibold tracking-tight text-grad-brand sm:text-5xl",
					style: { fontFamily: "Space Grotesk, sans-serif" },
					children: s.v
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-2 text-xs uppercase tracking-widest text-muted-foreground",
					children: s.l
				})]
			}, s.l))
		})
	});
}
function Showcase() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		id: "showcase",
		className: "mx-auto max-w-6xl px-6 py-24",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-2xl",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "text-xs uppercase tracking-widest text-blue-400",
					children: "Templates"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mt-3 text-4xl font-semibold tracking-tight sm:text-5xl text-grad",
					children: "Five templates. One click apart."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-4 text-muted-foreground",
					children: "Switch between handcrafted templates without losing a thing."
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5",
			children: [
				{
					id: "modern",
					name: "Modern",
					c: "from-blue-500 to-violet-500"
				},
				{
					id: "minimal",
					name: "Minimal",
					c: "from-slate-700 to-slate-900"
				},
				{
					id: "corporate",
					name: "Corporate",
					c: "from-slate-800 to-slate-900"
				},
				{
					id: "gradient",
					name: "Gradient",
					c: "from-fuchsia-500 via-violet-500 to-blue-500"
				},
				{
					id: "classic",
					name: "Classic",
					c: "from-amber-600 to-amber-800"
				}
			].map((t, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
				initial: {
					opacity: 0,
					y: 10
				},
				whileInView: {
					opacity: 1,
					y: 0
				},
				viewport: { once: true },
				transition: { delay: i * .05 },
				className: "group relative overflow-hidden rounded-2xl border border-border/70 bg-card/60 p-2 backdrop-blur-xl",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: `relative aspect-[3/4] overflow-hidden rounded-xl bg-gradient-to-br ${t.c}`,
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-x-3 top-3 h-3 rounded bg-white/30" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute left-3 top-9 h-2 w-1/2 rounded bg-white/25" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-x-3 top-16 h-px bg-white/30" }),
						Array.from({ length: 5 }).map((_, k) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "absolute left-3 right-3 h-1.5 rounded bg-white/20",
							style: { top: 76 + k * 14 }
						}, k)),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "absolute bottom-3 left-3 right-3 rounded-lg bg-white/25 p-2",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-2 w-1/3 rounded bg-white/60" })
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "px-2 pt-3 pb-2 text-sm font-medium",
					children: t.name
				})]
			}, t.id))
		})]
	});
}
function Testimonials() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "mx-auto max-w-6xl px-6 py-24",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-2xl",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "text-xs uppercase tracking-widest text-blue-400",
				children: "Loved by founders"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "mt-3 text-4xl font-semibold tracking-tight sm:text-5xl text-grad",
				children: "Built for how India bills."
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-12 grid gap-4 sm:grid-cols-3",
			children: [
				{
					name: "Priya M.",
					role: "Designer, Bengaluru",
					q: "Cleanest invoice tool I've used. PDFs look like they came from a studio."
				},
				{
					name: "Rohit S.",
					role: "Founder, SaaS startup",
					q: "GST handled flawlessly. We dropped Zoho for this."
				},
				{
					name: "Anjali K.",
					role: "Freelancer, Mumbai",
					q: "Created my first invoice in literally 40 seconds."
				}
			].map((x) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "glass rounded-2xl p-6",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex gap-0.5 text-amber-400",
						children: Array.from({ length: 5 }).map((_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Star, { className: "h-3.5 w-3.5 fill-current" }, i))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-4 text-sm leading-relaxed text-foreground/90",
						children: [
							"\"",
							x.q,
							"\""
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-5 text-xs text-muted-foreground",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "font-medium text-foreground",
							children: x.name
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: x.role })]
					})
				]
			}, x.name))
		})]
	});
}
function Pricing() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		id: "pricing",
		className: "mx-auto max-w-6xl px-6 py-24",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto max-w-2xl text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "text-xs uppercase tracking-widest text-blue-400",
					children: "Pricing"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mt-3 text-4xl font-semibold tracking-tight sm:text-5xl text-grad",
					children: "Free. Forever."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-4 text-muted-foreground",
					children: "No paywalls, no upsells, no account. Every feature, every template — free."
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mx-auto mt-12 max-w-md",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grad-border rounded-3xl p-8 text-center shadow-glow",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "text-sm uppercase tracking-widest text-muted-foreground",
						children: "Free"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-2 text-6xl font-semibold tracking-tight text-grad-brand",
						children: "₹0"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-1 text-sm text-muted-foreground",
						children: "Everything included"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "mt-6 space-y-2 text-left text-sm",
						children: [
							"Unlimited GST invoices",
							"5 premium templates",
							"PDF + PNG export",
							"UPI QR codes",
							"Works offline",
							"No signup required"
						].map((x) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
							className: "flex items-center gap-2 text-foreground/90",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "h-4 w-4 text-emerald-400" }),
								" ",
								x
							]
						}, x))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/invoices/new",
						className: "mt-8 inline-flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-br from-blue-500 to-violet-500 text-sm font-medium text-white shadow-glow hover:opacity-90",
						children: ["Get started ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "h-4 w-4" })]
					})
				]
			})
		})]
	});
}
function FAQ() {
	const items = [
		{
			q: "Do I need to sign up?",
			a: `No. ${BRAND.name} is local-first. Open the app and start invoicing immediately.`
		},
		{
			q: "Is this GST compliant?",
			a: "Yes. We support CGST, SGST, IGST, place-of-supply detection, HSN/SAC codes, reverse charge and round-off."
		},
		{
			q: "Where is my data stored?",
			a: "Entirely in your browser's local storage. Nothing is ever sent to a server."
		},
		{
			q: "Can I export to PDF?",
			a: "Yes. Pixel-perfect, 2× resolution PDFs and PNGs are one click away."
		},
		{
			q: "Does it work offline?",
			a: "Once loaded, the entire app works without an internet connection."
		}
	];
	const [open, setOpen] = (0, import_react.useState)(0);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		id: "faq",
		className: "mx-auto max-w-3xl px-6 py-24",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "text-center",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "text-xs uppercase tracking-widest text-blue-400",
				children: "FAQ"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "mt-3 text-4xl font-semibold tracking-tight text-grad",
				children: "Questions, answered."
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-10 space-y-3",
			children: items.map((it, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "overflow-hidden rounded-2xl border border-border/70 bg-card/60 backdrop-blur-xl",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					onClick: () => setOpen(open === i ? null : i),
					className: "flex w-full items-center justify-between px-5 py-4 text-left text-sm font-medium",
					children: [it.q, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: `transition ${open === i ? "rotate-45" : ""}`,
						children: "+"
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
					initial: false,
					animate: {
						height: open === i ? "auto" : 0,
						opacity: open === i ? 1 : 0
					},
					className: "overflow-hidden",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "px-5 pb-5 text-sm text-muted-foreground",
						children: it.a
					})
				})]
			}, it.q))
		})]
	});
}
function Footer() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteFooter, {});
}
//#endregion
export { Landing as component };

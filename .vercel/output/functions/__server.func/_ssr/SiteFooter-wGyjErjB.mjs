import { n as BRAND, r as DIGITAL_HEROES_URL, t as AUTHOR } from "./constants-BSR6ATQU.mjs";
import { g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { C as Mail, I as ExternalLink, j as Github, w as Linkedin } from "../_libs/lucide-react.mjs";
import { o as motion } from "../_libs/framer-motion.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/SiteFooter-wGyjErjB.js
var import_jsx_runtime = require_jsx_runtime();
function Logo({ size = 28, withText = true }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex items-center gap-2.5",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
			initial: {
				rotate: -8,
				scale: .9
			},
			animate: {
				rotate: 0,
				scale: 1
			},
			transition: {
				type: "spring",
				stiffness: 200,
				damping: 14
			},
			className: "relative",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
				width: size,
				height: size,
				viewBox: "0 0 40 40",
				fill: "none",
				xmlns: "http://www.w3.org/2000/svg",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("defs", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("linearGradient", {
						id: "lf1",
						x1: "0",
						y1: "0",
						x2: "40",
						y2: "40",
						gradientUnits: "userSpaceOnUse",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
								offset: "0",
								stopColor: "#3B82F6"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
								offset: "0.55",
								stopColor: "#06B6D4"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
								offset: "1",
								stopColor: "#7C3AED"
							})
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("linearGradient", {
						id: "lf2",
						x1: "0",
						y1: "0",
						x2: "0",
						y2: "40",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
							offset: "0",
							stopColor: "#ffffff",
							stopOpacity: "0.9"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
							offset: "1",
							stopColor: "#ffffff",
							stopOpacity: "0.6"
						})]
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
						x: "2",
						y: "2",
						width: "36",
						height: "36",
						rx: "11",
						fill: "url(#lf1)"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
						d: "M14 9h10.5L29 13.2V27a3 3 0 0 1-3 3h-12a3 3 0 0 1-3-3V12a3 3 0 0 1 3-3Z",
						fill: "url(#lf2)",
						opacity: "0.95"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
						d: "M21.6 14.4l-5.2 8.1h3.6l-1.4 5.1 5.2-8.1h-3.6l1.4-5.1Z",
						fill: "#1E293B"
					})
				]
			})
		}), withText && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "leading-none",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "text-[15px] font-semibold tracking-tight text-foreground",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-grad-brand",
					children: "Invoxa"
				})
			})
		})]
	});
}
function SiteFooter({ compact = false }) {
	if (compact) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("footer", {
		className: "mt-12 border-t border-border/50 pt-6 text-center text-sm text-muted-foreground",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: ["Built by ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
				className: "text-foreground",
				children: AUTHOR.name
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
					href: `mailto:${AUTHOR.email}`,
					className: "inline-flex items-center gap-1 text-blue-400 hover:underline",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mail, {
						className: "h-3.5 w-3.5",
						"aria-hidden": true
					}), AUTHOR.email]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-3 flex flex-wrap items-center justify-center gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
					href: AUTHOR.github,
					target: "_blank",
					rel: "noopener noreferrer",
					"aria-label": "GitHub profile",
					className: "inline-flex items-center gap-1 text-muted-foreground hover:text-foreground",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Github, {
						className: "h-4 w-4",
						"aria-hidden": true
					}), " GitHub"]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
					href: AUTHOR.linkedin,
					target: "_blank",
					rel: "noopener noreferrer",
					"aria-label": "LinkedIn profile",
					className: "inline-flex items-center gap-1 text-muted-foreground hover:text-foreground",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Linkedin, {
						className: "h-4 w-4",
						"aria-hidden": true
					}), " LinkedIn"]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
				href: DIGITAL_HEROES_URL,
				target: "_blank",
				rel: "noopener noreferrer",
				className: "mt-4 inline-flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-700",
				children: ["Built for Digital Heroes", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExternalLink, {
					className: "h-3.5 w-3.5",
					"aria-hidden": true
				})]
			})
		]
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("footer", {
		className: "border-t border-border/40 bg-background/40",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto max-w-6xl px-6 py-12",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap items-start justify-between gap-8",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "text-lg font-semibold tracking-tight",
						children: BRAND.name
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 max-w-sm text-sm text-muted-foreground",
						children: "Beautiful GST invoices for India's makers. Free, secure, local-first."
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-1 text-sm",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "text-xs uppercase tracking-widest text-muted-foreground/70",
								children: "Built by"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "font-medium text-foreground",
								children: AUTHOR.name
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
								href: `mailto:${AUTHOR.email}`,
								className: "inline-flex items-center gap-1 text-blue-400 hover:underline",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mail, {
									className: "h-3.5 w-3.5",
									"aria-hidden": true
								}), AUTHOR.email]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-2 flex gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
									href: AUTHOR.github,
									target: "_blank",
									rel: "noopener noreferrer",
									"aria-label": "GitHub",
									className: "text-muted-foreground hover:text-foreground",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Github, { className: "h-4 w-4" })
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
									href: AUTHOR.linkedin,
									target: "_blank",
									rel: "noopener noreferrer",
									"aria-label": "LinkedIn",
									className: "text-muted-foreground hover:text-foreground",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Linkedin, { className: "h-4 w-4" })
								})]
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-wrap gap-8 text-sm",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FootCol, {
							title: "Product",
							links: [
								["Dashboard", "/dashboard"],
								["Invoices", "/invoices"],
								["GST Calculator", "/gst-calculator"],
								["Settings", "/settings"]
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FootCol, {
							title: "Resources",
							links: [
								["Features", "#features"],
								["Templates", "#showcase"],
								["Pricing", "#pricing"],
								["FAQ", "#faq"]
							]
						})]
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-10 flex flex-wrap items-center justify-between gap-4 border-t border-border/40 pt-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "text-xs text-muted-foreground",
					children: [
						"© ",
						(/* @__PURE__ */ new Date()).getFullYear(),
						" ",
						BRAND.name,
						" · ",
						AUTHOR.name
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
					href: DIGITAL_HEROES_URL,
					target: "_blank",
					rel: "noopener noreferrer",
					className: "inline-flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-700",
					children: ["Built for Digital Heroes", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExternalLink, {
						className: "h-3.5 w-3.5",
						"aria-hidden": true
					})]
				})]
			})]
		})
	});
}
function FootCol({ title, links }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "text-xs uppercase tracking-widest text-muted-foreground/70",
		children: title
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "mt-3 flex flex-col gap-2",
		children: links.map(([label, to]) => to.startsWith("#") ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
			href: to,
			className: "text-muted-foreground hover:text-foreground",
			children: label
		}, label) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
			to,
			className: "text-muted-foreground hover:text-foreground",
			children: label
		}, label))
	})] });
}
//#endregion
export { SiteFooter as n, Logo as t };

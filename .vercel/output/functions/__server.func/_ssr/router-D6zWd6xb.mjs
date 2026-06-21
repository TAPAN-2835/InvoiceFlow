import { o as __toESM } from "../_runtime.mjs";
import { r as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { n as BRAND } from "./constants-BSR6ATQU.mjs";
import { c as HeadContent, d as createRouter, f as Outlet, g as Link, h as createRootRouteWithContext, m as createFileRoute, p as lazyRouteComponent, s as Scripts, y as useRouter } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { N as FileText, k as House } from "../_libs/lucide-react.mjs";
import { t as Route$7 } from "../_app.invoices._id-CsJM1Rm0.mjs";
import { t as Toaster } from "../_libs/sonner.mjs";
import { t as Route$8 } from "../_app.dashboard-CmD9vKGD.mjs";
import { t as QueryClient } from "../_libs/tanstack__query-core.mjs";
import { t as QueryClientProvider } from "../_libs/tanstack__react-query.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/router-D6zWd6xb.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var styles_default = "/assets/styles-Z_oxULWd.css";
function NotFoundComponent() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "relative flex min-h-dvh flex-col items-center justify-center overflow-hidden bg-background px-4",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "pointer-events-none absolute inset-0 -z-10 bg-aurora opacity-50" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-md text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500/20 to-violet-500/20 ring-1 ring-white/10",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileText, { className: "h-7 w-7 text-blue-300" })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "mt-6 text-7xl font-bold text-grad",
					children: "404"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: [
						"This page doesn't exist. Head back to ",
						BRAND.name,
						" and keep invoicing."
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-8 flex flex-wrap justify-center gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/",
						className: "inline-flex h-10 items-center gap-2 rounded-xl bg-gradient-to-br from-blue-500 to-violet-500 px-5 text-sm font-medium text-white shadow-glow hover:opacity-90",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(House, { className: "h-4 w-4" }), " Go home"]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/dashboard",
						className: "inline-flex h-10 items-center gap-2 rounded-xl border border-border/70 bg-surface-1/60 px-5 text-sm text-foreground hover:border-white/15",
						children: "Open dashboard"
					})]
				})
			]
		})]
	});
}
function ErrorComponent({ error, reset }) {
	const router = useRouter();
	(0, import_react.useEffect)(() => {
		console.error(error);
	}, [error]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-dvh items-center justify-center bg-background px-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-md text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-xl font-semibold tracking-tight text-foreground",
					children: "Something went wrong"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: "Try again or head back home."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-6 flex flex-wrap justify-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: () => {
							router.invalidate();
							reset();
						},
						className: "inline-flex h-10 items-center rounded-xl bg-primary px-5 text-sm font-medium text-primary-foreground hover:opacity-90",
						children: "Try again"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: "/",
						className: "inline-flex h-10 items-center rounded-xl border border-border bg-card px-5 text-sm",
						children: "Go home"
					})]
				})
			]
		})
	});
}
var Route$6 = createRootRouteWithContext()({
	head: () => ({
		meta: [
			{ charSet: "utf-8" },
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1"
			},
			{ title: `${BRAND.name} — ${BRAND.tagline}` },
			{
				name: "description",
				content: BRAND.description
			},
			{
				name: "author",
				content: BRAND.name
			},
			{
				property: "og:title",
				content: `${BRAND.name} — ${BRAND.tagline}`
			},
			{
				property: "og:description",
				content: BRAND.description
			},
			{
				property: "og:type",
				content: "website"
			},
			{
				name: "twitter:card",
				content: "summary_large_image"
			},
			{
				name: "twitter:title",
				content: `${BRAND.name} — ${BRAND.tagline}`
			},
			{
				name: "twitter:description",
				content: BRAND.description
			},
			{
				name: "theme-color",
				content: "#070B14"
			}
		],
		links: [
			{
				rel: "stylesheet",
				href: styles_default
			},
			{
				rel: "icon",
				href: "/favicon.svg",
				type: "image/svg+xml"
			},
			{
				rel: "manifest",
				href: "/manifest.webmanifest"
			},
			{
				rel: "preconnect",
				href: "https://fonts.googleapis.com"
			},
			{
				rel: "preconnect",
				href: "https://fonts.gstatic.com",
				crossOrigin: "anonymous"
			},
			{
				rel: "stylesheet",
				href: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Space+Grotesk:wght@500;600;700&display=swap"
			}
		]
	}),
	shellComponent: RootShell,
	component: RootComponent,
	notFoundComponent: NotFoundComponent,
	errorComponent: ErrorComponent
});
function RootShell({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("html", {
		lang: "en",
		className: "dark",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("head", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeadContent, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("body", { children: [children, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scripts, {})] })]
	});
}
function RootComponent() {
	const { queryClient } = Route$6.useRouteContext();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(QueryClientProvider, {
		client: queryClient,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toaster, {
			theme: "dark",
			position: "bottom-right",
			richColors: true,
			closeButton: true
		})]
	});
}
var $$splitComponentImporter$5 = () => import("../_app-CUtDasEx.mjs");
var Route$5 = createFileRoute("/_app")({ component: lazyRouteComponent($$splitComponentImporter$5, "component") });
var $$splitComponentImporter$4 = () => import("./routes-D2ayNZqg.mjs");
var Route$4 = createFileRoute("/")({
	head: () => ({ meta: [
		{ title: `${BRAND.name} — ${BRAND.tagline}` },
		{
			name: "description",
			content: BRAND.description
		},
		{
			property: "og:title",
			content: `${BRAND.name} — ${BRAND.tagline}`
		},
		{
			property: "og:description",
			content: BRAND.description
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$4, "component")
});
var $$splitComponentImporter$3 = () => import("../_app.settings-mxOUa6BJ.mjs");
var Route$3 = createFileRoute("/_app/settings")({
	head: () => ({ meta: [{ title: `Settings — ${BRAND.name}` }] }),
	component: lazyRouteComponent($$splitComponentImporter$3, "component")
});
var $$splitComponentImporter$2 = () => import("../_app.gst-calculator-zHKaWgsA.mjs");
var Route$2 = createFileRoute("/_app/gst-calculator")({
	head: () => ({ meta: [{ title: `GST Calculator — ${BRAND.name}` }] }),
	component: lazyRouteComponent($$splitComponentImporter$2, "component")
});
var $$splitComponentImporter$1 = () => import("../_app.invoices.index-B7lvWW8y.mjs");
var Route$1 = createFileRoute("/_app/invoices/")({
	head: () => ({ meta: [{ title: `Invoices — ${BRAND.name}` }] }),
	component: lazyRouteComponent($$splitComponentImporter$1, "component")
});
var $$splitComponentImporter = () => import("../_app.invoices.new-ow7zxZHB.mjs");
var Route = createFileRoute("/_app/invoices/new")({
	head: () => ({ meta: [{ title: `New Invoice — ${BRAND.name}` }] }),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
var AppRoute = Route$5.update({
	id: "/_app",
	getParentRoute: () => Route$6
});
var IndexRoute = Route$4.update({
	id: "/",
	path: "/",
	getParentRoute: () => Route$6
});
var AppSettingsRoute = Route$3.update({
	id: "/settings",
	path: "/settings",
	getParentRoute: () => AppRoute
});
var AppGstCalculatorRoute = Route$2.update({
	id: "/gst-calculator",
	path: "/gst-calculator",
	getParentRoute: () => AppRoute
});
var AppDashboardRoute = Route$8.update({
	id: "/dashboard",
	path: "/dashboard",
	getParentRoute: () => AppRoute
});
var AppInvoicesIndexRoute = Route$1.update({
	id: "/invoices/",
	path: "/invoices/",
	getParentRoute: () => AppRoute
});
var AppInvoicesNewRoute = Route.update({
	id: "/invoices/new",
	path: "/invoices/new",
	getParentRoute: () => AppRoute
});
var AppRouteChildren = {
	AppDashboardRoute,
	AppGstCalculatorRoute,
	AppSettingsRoute,
	AppInvoicesIdRoute: Route$7.update({
		id: "/invoices/$id",
		path: "/invoices/$id",
		getParentRoute: () => AppRoute
	}),
	AppInvoicesNewRoute,
	AppInvoicesIndexRoute
};
var rootRouteChildren = {
	IndexRoute,
	AppRoute: AppRoute._addFileChildren(AppRouteChildren)
};
var routeTree = Route$6._addFileChildren(rootRouteChildren)._addFileTypes();
var getRouter = () => {
	return createRouter({
		routeTree,
		context: { queryClient: new QueryClient() },
		scrollRestoration: true,
		defaultPreloadStaleTime: 0
	});
};
//#endregion
export { getRouter };

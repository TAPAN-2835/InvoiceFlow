import { n as BRAND } from "./_ssr/constants-BSR6ATQU.mjs";
import { m as createFileRoute, p as lazyRouteComponent } from "./_libs/@tanstack/react-router+[...].mjs";
import { n as require_jsx_runtime } from "./_libs/radix-ui__react-context+react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_app.dashboard-CmD9vKGD.js
var import_jsx_runtime = require_jsx_runtime();
var $$splitComponentImporter = () => import("./_app.dashboard-CFJLDoj8.mjs");
var Route = createFileRoute("/_app/dashboard")({
	head: () => ({ meta: [{ title: `Dashboard — ${BRAND.name}` }] }),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
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
//#endregion
export { StatusBadge as n, Route as t };

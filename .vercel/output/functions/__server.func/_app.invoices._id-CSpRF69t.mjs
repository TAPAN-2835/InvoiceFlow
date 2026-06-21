import { n as useHydrated, r as useInvoices } from "./_ssr/store-C1sgFMdj.mjs";
import { _ as useNavigate } from "./_libs/@tanstack/react-router+[...].mjs";
import { n as require_jsx_runtime } from "./_libs/radix-ui__react-context+react.mjs";
import { t as Route } from "./_app.invoices._id-CsJM1Rm0.mjs";
import { n as toast } from "./_libs/sonner.mjs";
import { t as InvoiceEditor } from "./_ssr/InvoiceEditor-CVOPDypf.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_app.invoices._id-CSpRF69t.js
var import_jsx_runtime = require_jsx_runtime();
function EditInvoice() {
	const { id } = Route.useParams();
	const [invoices, setInvoices] = useInvoices();
	const hydrated = useHydrated();
	const navigate = useNavigate();
	if (!hydrated) return null;
	const inv = invoices.find((x) => x.id === id);
	if (!inv) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-md py-20 text-center",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "text-xl font-semibold",
				children: "Invoice not found"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 text-sm text-muted-foreground",
				children: "It may have been deleted from this device."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				onClick: () => navigate({ to: "/invoices" }),
				className: "mt-6 inline-flex h-10 items-center rounded-xl bg-primary px-5 text-sm text-primary-foreground",
				children: "Back to invoices"
			})
		]
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(InvoiceEditor, {
		initial: inv,
		mode: "edit",
		onSave: (updated) => {
			setInvoices((prev) => prev.map((x) => x.id === updated.id ? {
				...updated,
				updatedAt: Date.now()
			} : x));
			toast.success("Saved");
		}
	});
}
//#endregion
export { EditInvoice as component };

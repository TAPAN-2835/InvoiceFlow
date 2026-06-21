import { o as __toESM } from "./_runtime.mjs";
import { r as require_react } from "./_libs/@radix-ui/react-compose-refs+[...].mjs";
import { i as useSettings, n as useHydrated, r as useInvoices } from "./_ssr/store-C1sgFMdj.mjs";
import { _ as useNavigate } from "./_libs/@tanstack/react-router+[...].mjs";
import { n as require_jsx_runtime } from "./_libs/radix-ui__react-context+react.mjs";
import { a as nextInvoiceNumber, r as createEmptyInvoice } from "./_ssr/invoice--AQg1XG7.mjs";
import { n as toast } from "./_libs/sonner.mjs";
import { n as fireConfetti, t as InvoiceEditor } from "./_ssr/InvoiceEditor-CVOPDypf.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_app.invoices.new-ow7zxZHB.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function NewInvoice() {
	const [invoices, setInvoices] = useInvoices();
	const [settings] = useSettings();
	const hydrated = useHydrated();
	const navigate = useNavigate();
	const draft = (0, import_react.useMemo)(() => {
		if (!hydrated) return createEmptyInvoice("INV-", []);
		const base = createEmptyInvoice(settings.defaults.prefix || "INV-", invoices);
		base.business = {
			...base.business,
			...settings.business
		};
		base.template = settings.defaults.template;
		base.currency = settings.defaults.currency;
		base.terms = settings.defaults.terms;
		base.upi = {
			id: settings.defaults.upiId,
			name: settings.defaults.upiName
		};
		if (base.items[0]) base.items[0].tax = settings.defaults.gst;
		if (base.business.stateCode) base.placeOfSupply = base.business.stateCode;
		return base;
	}, [hydrated]);
	(0, import_react.useEffect)(() => {
		if (!hydrated) return;
		draft.number = nextInvoiceNumber(settings.defaults.prefix || "INV-", invoices);
	}, [hydrated]);
	const onSave = (inv) => {
		setInvoices((prev) => [{
			...inv,
			updatedAt: Date.now()
		}, ...prev]);
		fireConfetti();
		toast.success("Invoice created");
		navigate({
			to: "/invoices/$id",
			params: { id: inv.id }
		});
	};
	if (!hydrated) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(InvoiceEditor, {
		initial: draft,
		onSave,
		mode: "create"
	});
}
//#endregion
export { NewInvoice as component };

//#region node_modules/.nitro/vite/services/ssr/assets/invoice--AQg1XG7.js
function roundMoney(n) {
	return Math.round(n * 100) / 100;
}
function computeLine(item, intraState, taxMode = "exclusive") {
	const qty = item.qty || 0;
	const rate = item.rate || 0;
	const discountPct = item.discount || 0;
	const taxPct = item.tax || 0;
	const base = roundMoney(qty * rate);
	const discount = roundMoney(base * (discountPct / 100));
	const afterDiscount = roundMoney(base - discount);
	let taxable;
	let tax;
	let total;
	if (taxMode === "inclusive") {
		total = afterDiscount;
		tax = roundMoney(total * taxPct / (100 + taxPct));
		taxable = roundMoney(total - tax);
	} else {
		taxable = afterDiscount;
		tax = roundMoney(taxable * taxPct / 100);
		total = roundMoney(taxable + tax);
	}
	const cgst = intraState ? roundMoney(tax / 2) : 0;
	const sgst = intraState ? roundMoney(tax - cgst) : 0;
	return {
		base,
		discount,
		taxable,
		cgst,
		sgst,
		igst: intraState ? 0 : tax,
		tax,
		total
	};
}
function computeTotals(inv) {
	const bizState = inv.business.stateCode || "";
	const intraState = !!bizState && !!inv.placeOfSupply && bizState === inv.placeOfSupply;
	const taxMode = inv.taxMode ?? "exclusive";
	let subtotal = 0;
	let discount = 0;
	let taxable = 0;
	let cgst = 0;
	let sgst = 0;
	let igst = 0;
	for (const item of inv.items) {
		const l = computeLine(item, intraState, taxMode);
		subtotal = roundMoney(subtotal + l.base);
		discount = roundMoney(discount + l.discount);
		taxable = roundMoney(taxable + l.taxable);
		cgst = roundMoney(cgst + l.cgst);
		sgst = roundMoney(sgst + l.sgst);
		igst = roundMoney(igst + l.igst);
	}
	const tax = roundMoney(cgst + sgst + igst);
	const grand = roundMoney(taxable + tax);
	const rounded = Math.round(grand);
	const roundOff = roundMoney(rounded - grand);
	return {
		subtotal,
		discount,
		taxable,
		cgst,
		sgst,
		igst,
		tax,
		roundOff,
		total: rounded,
		intraState
	};
}
function createEmptyItem() {
	return {
		id: crypto.randomUUID(),
		name: "",
		description: "",
		hsn: "",
		qty: 1,
		unit: "Nos",
		rate: 0,
		discount: 0,
		tax: 18
	};
}
function nextInvoiceNumber(prefix, existing) {
	const re = new RegExp(`^${prefix.replace(/[-/\\^$*+?.()|[\]{}]/g, "\\$&")}(\\d+)$`);
	let max = 0;
	for (const i of existing) {
		const m = re.exec(i.number);
		if (m) max = Math.max(max, parseInt(m[1], 10));
	}
	return `${prefix}${String(max + 1).padStart(4, "0")}`;
}
function createEmptyInvoice(prefix = "INV-", existing = []) {
	const now = Date.now();
	const today = /* @__PURE__ */ new Date();
	const due = new Date(today.getTime() + 14 * 864e5);
	return {
		id: crypto.randomUUID(),
		number: nextInvoiceNumber(prefix, existing),
		date: today.toISOString().slice(0, 10),
		dueDate: due.toISOString().slice(0, 10),
		placeOfSupply: "",
		reverseCharge: false,
		taxMode: "exclusive",
		currency: "INR",
		business: {
			name: "",
			gstin: "",
			address: "",
			phone: "",
			email: "",
			stateCode: ""
		},
		customer: {
			name: "",
			gstin: "",
			address: "",
			phone: "",
			email: "",
			stateCode: ""
		},
		items: [createEmptyItem()],
		notes: "",
		terms: "Payment due within 14 days. Late payments subject to 1.5% monthly interest.",
		template: "modern",
		status: "draft",
		upi: {
			id: "",
			name: ""
		},
		createdAt: now,
		updatedAt: now
	};
}
//#endregion
export { nextInvoiceNumber as a, createEmptyItem as i, computeTotals as n, roundMoney as o, createEmptyInvoice as r, computeLine as t };

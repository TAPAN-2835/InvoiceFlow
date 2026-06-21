//#region node_modules/.nitro/vite/services/ssr/assets/format-zwtZovmO.js
var ones = [
	"",
	"One",
	"Two",
	"Three",
	"Four",
	"Five",
	"Six",
	"Seven",
	"Eight",
	"Nine",
	"Ten",
	"Eleven",
	"Twelve",
	"Thirteen",
	"Fourteen",
	"Fifteen",
	"Sixteen",
	"Seventeen",
	"Eighteen",
	"Nineteen"
];
var tens = [
	"",
	"",
	"Twenty",
	"Thirty",
	"Forty",
	"Fifty",
	"Sixty",
	"Seventy",
	"Eighty",
	"Ninety"
];
function twoDigits(n) {
	if (n < 20) return ones[n];
	return tens[Math.floor(n / 10)] + (n % 10 ? " " + ones[n % 10] : "");
}
function threeDigits(n) {
	const h = Math.floor(n / 100);
	const r = n % 100;
	return (h ? ones[h] + " Hundred" + (r ? " " : "") : "") + (r ? twoDigits(r) : "");
}
function numberToWordsIN(num) {
	if (!isFinite(num)) return "";
	const rupees = Math.floor(Math.abs(num));
	const paise = Math.round((Math.abs(num) - rupees) * 100);
	if (rupees === 0 && paise === 0) return "Zero Rupees Only";
	const crore = Math.floor(rupees / 1e7);
	const lakh = Math.floor(rupees % 1e7 / 1e5);
	const thousand = Math.floor(rupees % 1e5 / 1e3);
	const rest = rupees % 1e3;
	const parts = [];
	if (crore) parts.push(twoDigits(crore) + " Crore");
	if (lakh) parts.push(twoDigits(lakh) + " Lakh");
	if (thousand) parts.push(twoDigits(thousand) + " Thousand");
	if (rest) parts.push(threeDigits(rest));
	let words = parts.join(" ").trim() + " Rupees";
	if (paise) words += " and " + twoDigits(paise) + " Paise";
	return ((num < 0 ? "Minus " : "") + words + " Only").toUpperCase();
}
function formatINR(n, currency = "INR") {
	if (!isFinite(n)) n = 0;
	return ({
		INR: "₹",
		USD: "$",
		EUR: "€",
		GBP: "£",
		AED: "د.إ"
	}[currency] ?? "₹") + n.toLocaleString("en-IN", {
		minimumFractionDigits: 2,
		maximumFractionDigits: 2
	});
}
function formatCompactINR(n) {
	if (n >= 1e7) return "₹" + (n / 1e7).toFixed(2) + "Cr";
	if (n >= 1e5) return "₹" + (n / 1e5).toFixed(2) + "L";
	if (n >= 1e3) return "₹" + (n / 1e3).toFixed(1) + "K";
	return "₹" + n.toFixed(0);
}
function isValidGSTIN(g) {
	if (!g) return false;
	return /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/.test(g.toUpperCase().trim());
}
function gstinStateCode(g) {
	return (g || "").slice(0, 2);
}
var INDIAN_STATES = [
	{
		code: "01",
		name: "Jammu & Kashmir"
	},
	{
		code: "02",
		name: "Himachal Pradesh"
	},
	{
		code: "03",
		name: "Punjab"
	},
	{
		code: "04",
		name: "Chandigarh"
	},
	{
		code: "05",
		name: "Uttarakhand"
	},
	{
		code: "06",
		name: "Haryana"
	},
	{
		code: "07",
		name: "Delhi"
	},
	{
		code: "08",
		name: "Rajasthan"
	},
	{
		code: "09",
		name: "Uttar Pradesh"
	},
	{
		code: "10",
		name: "Bihar"
	},
	{
		code: "11",
		name: "Sikkim"
	},
	{
		code: "12",
		name: "Arunachal Pradesh"
	},
	{
		code: "13",
		name: "Nagaland"
	},
	{
		code: "14",
		name: "Manipur"
	},
	{
		code: "15",
		name: "Mizoram"
	},
	{
		code: "16",
		name: "Tripura"
	},
	{
		code: "17",
		name: "Meghalaya"
	},
	{
		code: "18",
		name: "Assam"
	},
	{
		code: "19",
		name: "West Bengal"
	},
	{
		code: "20",
		name: "Jharkhand"
	},
	{
		code: "21",
		name: "Odisha"
	},
	{
		code: "22",
		name: "Chhattisgarh"
	},
	{
		code: "23",
		name: "Madhya Pradesh"
	},
	{
		code: "24",
		name: "Gujarat"
	},
	{
		code: "27",
		name: "Maharashtra"
	},
	{
		code: "29",
		name: "Karnataka"
	},
	{
		code: "30",
		name: "Goa"
	},
	{
		code: "32",
		name: "Kerala"
	},
	{
		code: "33",
		name: "Tamil Nadu"
	},
	{
		code: "34",
		name: "Puducherry"
	},
	{
		code: "36",
		name: "Telangana"
	},
	{
		code: "37",
		name: "Andhra Pradesh"
	}
];
//#endregion
export { isValidGSTIN as a, gstinStateCode as i, formatCompactINR as n, numberToWordsIN as o, formatINR as r, INDIAN_STATES as t };

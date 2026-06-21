import { forwardRef, useEffect, useState } from "react";
import type { Invoice } from "@/lib/invoice";
import { computeTotals, computeLine } from "@/lib/invoice";
import { formatINR, numberToWordsIN, INDIAN_STATES } from "@/lib/format";
import { generateUPIQR } from "@/lib/exporters";
import { BRAND } from "@/lib/constants";
import { cn } from "@/lib/utils";

const stateName = (code: string) => INDIAN_STATES.find((s) => s.code === code)?.name ?? "";

interface Props { invoice: Invoice; }

export const InvoicePreview = forwardRef<HTMLDivElement, Props>(function InvoicePreview({ invoice }, ref) {
  const totals = computeTotals(invoice);
  const t = invoice.template;
  const [qr, setQr] = useState<string | null>(null);

  useEffect(() => {
    let cancel = false;
    if (invoice.upi?.id && totals.total > 0) {
      generateUPIQR({
        upiId: invoice.upi.id,
        name: invoice.upi.name || invoice.business.name || "Payee",
        amount: totals.total,
        note: invoice.number,
      }).then((d) => { if (!cancel) setQr(d); }).catch(() => {});
    } else {
      setQr(null);
    }
    return () => { cancel = true; };
  }, [invoice.upi?.id, invoice.upi?.name, totals.total, invoice.number]);

  // Per-template tokens
  const themes = {
    modern:   { accent: "from-blue-600 to-violet-600", text: "text-slate-900", header: "bg-gradient-to-br" },
    minimal:  { accent: "from-slate-900 to-slate-700", text: "text-slate-900", header: "bg-gradient-to-br" },
    corporate:{ accent: "from-slate-800 to-slate-900", text: "text-slate-900", header: "bg-gradient-to-r" },
    gradient: { accent: "from-fuchsia-600 via-violet-600 to-blue-600", text: "text-slate-900", header: "bg-gradient-to-tr" },
    classic:  { accent: "from-amber-700 to-amber-900", text: "text-slate-900", header: "bg-gradient-to-br" },
  }[t];

  return (
    <div ref={ref} className={cn("w-[794px] max-w-full overflow-hidden bg-white", themes.text)} style={{ fontFamily: "Inter, sans-serif" }}>
      {/* Header */}
      <div className={cn("relative px-10 pt-10 pb-8", themes.header, themes.accent, "text-white")}>
        <div className="absolute inset-0 opacity-20" style={{
          backgroundImage: "radial-gradient(600px 200px at 20% 0%, rgba(255,255,255,0.5), transparent), radial-gradient(400px 200px at 90% 100%, rgba(255,255,255,0.3), transparent)"
        }} />
        <div className="relative flex items-start justify-between gap-6">
          <div className="flex items-center gap-3">
            {invoice.business.logo ? (
              <img src={invoice.business.logo} alt="Logo" className="h-14 w-14 rounded-xl object-cover bg-white/15 p-1" />
            ) : (
              <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-white/15 text-2xl font-semibold">
                {invoice.business.name?.charAt(0) || "B"}
              </div>
            )}
            <div>
              <div className="text-xl font-semibold tracking-tight">{invoice.business.name || "Your Business"}</div>
              {invoice.business.gstin && <div className="text-xs opacity-80">GSTIN: {invoice.business.gstin}</div>}
              {invoice.business.address && <div className="text-xs opacity-80 mt-0.5 max-w-xs">{invoice.business.address}</div>}
            </div>
          </div>
          <div className="text-right">
            <div className="text-3xl font-bold tracking-tight" style={{ fontFamily: "Space Grotesk, sans-serif" }}>INVOICE</div>
            <div className="mt-2 text-xs uppercase tracking-wider opacity-80">#{invoice.number}</div>
            <div className="mt-1 text-xs opacity-80">Date: {invoice.date}</div>
            <div className="text-xs opacity-80">Due: {invoice.dueDate}</div>
          </div>
        </div>
      </div>

      {/* Parties */}
      <div className="grid grid-cols-2 gap-6 px-10 py-8">
        <div>
          <div className="text-[10px] font-semibold uppercase tracking-widest text-slate-500">Bill To</div>
          <div className="mt-2 text-base font-semibold">{invoice.customer.name || "Customer Name"}</div>
          {invoice.customer.gstin && <div className="text-xs text-slate-600">GSTIN: {invoice.customer.gstin}</div>}
          {invoice.customer.address && <div className="mt-1 text-xs text-slate-600 whitespace-pre-line">{invoice.customer.address}</div>}
          {invoice.customer.phone && <div className="text-xs text-slate-600">📞 {invoice.customer.phone}</div>}
          {invoice.customer.email && <div className="text-xs text-slate-600">✉ {invoice.customer.email}</div>}
        </div>
        <div className="text-right">
          <div className="text-[10px] font-semibold uppercase tracking-widest text-slate-500">Place of Supply</div>
          <div className="mt-2 text-sm font-medium">{stateName(invoice.placeOfSupply) || "—"}</div>
          {invoice.reverseCharge && <div className="text-xs text-slate-600">Reverse charge applicable</div>}
          <div className="mt-3 text-[10px] font-semibold uppercase tracking-widest text-slate-500">Currency</div>
          <div className="text-sm font-medium">{invoice.currency}</div>
        </div>
      </div>

      {/* Items */}
      <div className="px-10">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-y border-slate-200 text-[10px] uppercase tracking-wider text-slate-500">
              <th className="py-2.5 text-left font-medium">#</th>
              <th className="py-2.5 text-left font-medium">Item & Description</th>
              <th className="py-2.5 text-left font-medium">HSN/SAC</th>
              <th className="py-2.5 text-right font-medium">Qty</th>
              <th className="py-2.5 text-right font-medium">Rate</th>
              <th className="py-2.5 text-right font-medium">Tax%</th>
              <th className="py-2.5 text-right font-medium">Amount</th>
            </tr>
          </thead>
          <tbody>
            {invoice.items.map((it, idx) => {
              const line = computeLine(it, totals.intraState, invoice.taxMode ?? "exclusive");
              return (
                <tr key={it.id} className="border-b border-slate-100 align-top">
                  <td className="py-3 text-slate-500">{idx + 1}</td>
                  <td className="py-3">
                    <div className="font-medium">{it.name || "—"}</div>
                    {it.description && <div className="text-xs text-slate-500 max-w-xs">{it.description}</div>}
                  </td>
                  <td className="py-3 text-slate-600">{it.hsn || "—"}</td>
                  <td className="py-3 text-right">{it.qty} {it.unit}</td>
                  <td className="py-3 text-right">{formatINR(it.rate, invoice.currency)}</td>
                  <td className="py-3 text-right">{it.tax}%</td>
                  <td className="py-3 text-right font-medium">{formatINR(line.taxable, invoice.currency)}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Totals */}
      <div className="grid grid-cols-2 gap-8 px-10 py-8">
        <div className="space-y-4">
          {qr && (
            <div className="flex items-start gap-3 rounded-xl border border-slate-200 p-3">
              <img src={qr} alt="UPI QR" className="h-24 w-24" />
              <div className="text-xs">
                <div className="font-semibold">Pay via UPI</div>
                <div className="text-slate-500">{invoice.upi?.id}</div>
                <div className="text-slate-500">{invoice.upi?.name}</div>
                <div className="mt-1 text-slate-500">Scan to pay {formatINR(totals.total, invoice.currency)}</div>
              </div>
            </div>
          )}
          <div>
            <div className="text-[10px] font-semibold uppercase tracking-widest text-slate-500">Amount in Words</div>
            <div className="mt-1 text-sm italic text-slate-700">{numberToWordsIN(totals.total)}</div>
          </div>
        </div>
        <div className="ml-auto w-full max-w-sm space-y-1.5 text-sm">
          <Row label="Subtotal" value={formatINR(totals.subtotal, invoice.currency)} />
          {totals.discount > 0 && <Row label="Discount" value={`− ${formatINR(totals.discount, invoice.currency)}`} />}
          <Row label="Taxable" value={formatINR(totals.taxable, invoice.currency)} />
          {totals.intraState ? (
            <>
              <Row label="CGST" value={formatINR(totals.cgst, invoice.currency)} />
              <Row label="SGST" value={formatINR(totals.sgst, invoice.currency)} />
            </>
          ) : (
            <Row label="IGST" value={formatINR(totals.igst, invoice.currency)} />
          )}
          {Math.abs(totals.roundOff) > 0.001 && (
            <Row label="Round Off" value={(totals.roundOff >= 0 ? "+ " : "− ") + formatINR(Math.abs(totals.roundOff), invoice.currency)} />
          )}
          <div className={cn("mt-2 flex items-center justify-between rounded-xl bg-gradient-to-r p-3 text-white", themes.accent)}>
            <div className="text-xs uppercase tracking-wider opacity-90">Grand Total</div>
            <div className="text-lg font-semibold">{formatINR(totals.total, invoice.currency)}</div>
          </div>
        </div>
      </div>

      {/* Notes & terms */}
      <div className="grid grid-cols-2 gap-6 px-10">
        <div>
          {invoice.notes && (
            <>
              <div className="text-[10px] font-semibold uppercase tracking-widest text-slate-500">Notes</div>
              <div className="mt-1 text-xs text-slate-600 whitespace-pre-line">{invoice.notes}</div>
            </>
          )}
          {invoice.terms && (
            <div className="mt-4">
              <div className="text-[10px] font-semibold uppercase tracking-widest text-slate-500">Terms & Conditions</div>
              <div className="mt-1 text-xs text-slate-600 whitespace-pre-line">{invoice.terms}</div>
            </div>
          )}
        </div>
        <div className="text-right">
          <div className="ml-auto inline-block">
            <div className="h-14 w-44 border-b border-slate-300" />
            <div className="mt-1 text-[10px] uppercase tracking-widest text-slate-500">Authorised Signatory</div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-8 border-t border-slate-100 px-10 py-5 text-center text-[10px] text-slate-400">
        {BRAND.name} · {invoice.business.email || invoice.business.phone || "Thank you for your business"}
      </div>
    </div>
  );
});

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between text-slate-700">
      <span className="text-slate-500">{label}</span>
      <span className="font-medium">{value}</span>
    </div>
  );
}

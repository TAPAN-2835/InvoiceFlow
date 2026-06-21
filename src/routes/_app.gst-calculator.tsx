import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Field } from "@/components/Field";
import { formatINR, numberToWordsIN } from "@/lib/format";
import { roundMoney } from "@/lib/invoice";
import { BRAND } from "@/lib/constants";
import { Calculator, ChevronDown } from "lucide-react";

export const Route = createFileRoute("/_app/gst-calculator")({
  head: () => ({ meta: [{ title: `GST Calculator — ${BRAND.name}` }] }),
  component: GSTCalculator,
});

const presets = [5, 12, 18, 28];

function GSTCalculator() {
  const [amount, setAmount] = useState(10000);
  const [rate, setRate] = useState(18);
  const [mode, setMode] = useState<"exclusive" | "inclusive">("exclusive");
  const [tax, setTax] = useState<"intra" | "inter">("intra");

  const result = useMemo(() => {
    const amt = isFinite(amount) ? amount : 0;
    const r = isFinite(rate) ? rate : 0;
    let net = 0, total = 0, gst = 0;
    if (mode === "exclusive") {
      net = roundMoney(amt);
      gst = roundMoney(amt * (r / 100));
      total = roundMoney(net + gst);
    } else {
      total = roundMoney(amt);
      net = roundMoney(amt / (1 + r / 100));
      gst = roundMoney(total - net);
    }
    const cgst = tax === "intra" ? roundMoney(gst / 2) : 0;
    const sgst = tax === "intra" ? roundMoney(gst - cgst) : 0;
    const igst = tax === "intra" ? 0 : gst;
    return { net, total, gst, cgst, sgst, igst };
  }, [amount, rate, mode, tax]);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-semibold tracking-tight text-grad">GST Calculator</h1>
        <p className="mt-1 text-sm text-muted-foreground">Instant CGST, SGST and IGST calculations.</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)]">
        <div className="rounded-2xl border border-border/70 bg-card/60 p-6 backdrop-blur-xl shadow-card">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500/20 to-violet-500/20 text-blue-300 ring-1 ring-white/10">
              <Calculator className="h-4 w-4" />
            </div>
            <div className="text-sm font-semibold">Inputs</div>
          </div>

          <div className="mt-6 space-y-5">
            <Field label="Amount (₹)" type="number" value={amount} onChange={(e) => setAmount(Number(e.target.value))} prefix="₹" />

            <div>
              <div className="text-xs font-medium text-muted-foreground">GST Rate</div>
              <div className="mt-2 flex flex-wrap gap-2">
                {presets.map((p) => (
                  <button
                    key={p}
                    onClick={() => setRate(p)}
                    className={`inline-flex h-9 items-center rounded-lg border px-3 text-sm transition ${
                      rate === p
                        ? "border-blue-400/60 bg-blue-500/15 text-foreground"
                        : "border-border/70 bg-surface-1/60 text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {p}%
                  </button>
                ))}
                <div className="flex h-9 items-center gap-1 rounded-lg border border-border/70 bg-surface-1/60 px-2 text-sm">
                  <input
                    type="number"
                    value={rate}
                    onChange={(e) => setRate(Number(e.target.value))}
                    className="w-16 bg-transparent text-foreground outline-none"
                  />
                  <span className="text-muted-foreground">%</span>
                </div>
              </div>
            </div>

            <Toggle
              label="GST Type"
              value={mode}
              onChange={(v) => setMode(v as any)}
              options={[["exclusive", "Exclusive"], ["inclusive", "Inclusive"]]}
            />
            <Toggle
              label="Tax Mode"
              value={tax}
              onChange={(v) => setTax(v as any)}
              options={[["intra", "CGST + SGST"], ["inter", "IGST"]]}
            />
          </div>
        </div>

        <motion.div
          layout
          className="rounded-2xl border border-border/70 bg-gradient-to-br from-blue-500/5 to-violet-500/5 p-6 backdrop-blur-xl shadow-card"
        >
          <div className="text-xs uppercase tracking-widest text-muted-foreground">Total payable</div>
          <div className="mt-2 text-5xl font-semibold tracking-tight text-grad-brand">
            {formatINR(result.total)}
          </div>
          <div className="mt-2 text-xs text-muted-foreground">{numberToWordsIN(result.total)}</div>

          <div className="mt-8 grid grid-cols-2 gap-3 text-sm">
            <ResultRow label="Net amount" value={formatINR(result.net)} />
            <ResultRow label="Total GST" value={formatINR(result.gst)} accent />
            {tax === "intra" ? (
              <>
                <ResultRow label={`CGST (${(rate / 2).toFixed(2)}%)`} value={formatINR(result.cgst)} />
                <ResultRow label={`SGST (${(rate / 2).toFixed(2)}%)`} value={formatINR(result.sgst)} />
              </>
            ) : (
              <ResultRow label={`IGST (${rate}%)`} value={formatINR(result.igst)} />
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
}

function Toggle({ label, value, onChange, options }: { label: string; value: string; onChange: (v: string) => void; options: Array<[string, string]> }) {
  return (
    <div>
      <div className="text-xs font-medium text-muted-foreground">{label}</div>
      <div className="mt-2 inline-flex rounded-xl border border-border/70 bg-surface-1/60 p-1">
        {options.map(([v, l]) => (
          <button
            key={v}
            onClick={() => onChange(v)}
            className={`relative inline-flex h-8 items-center px-4 text-xs transition ${
              value === v ? "text-foreground" : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {value === v && (
              <motion.span layoutId={`tg-${label}`} className="absolute inset-0 rounded-lg bg-white/8 ring-1 ring-white/10" transition={{ type: "spring", stiffness: 300, damping: 26 }} />
            )}
            <span className="relative">{l}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

function ResultRow({ label, value, accent }: { label: string; value: string; accent?: boolean }) {
  return (
    <div className={`flex items-center justify-between rounded-xl border border-border/60 px-3 py-3 ${accent ? "bg-blue-500/10" : "bg-surface-1/40"}`}>
      <div className="text-xs text-muted-foreground">{label}</div>
      <div className="font-semibold tabular-nums">{value}</div>
    </div>
  );
}

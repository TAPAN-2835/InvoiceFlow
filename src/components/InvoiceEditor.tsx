import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, Reorder } from "framer-motion";
import {
  Building2, User, FileText as FileIcon, Receipt, Plus, Trash2, Save,
  Download, Image as ImageIcon, Printer, Copy, GripVertical, QrCode,
  Palette, ChevronDown, AlertCircle, RotateCcw, RotateCw, Wand2, Share2,
} from "lucide-react";
import { toast } from "sonner";
import {
  computeTotals, computeLine, createEmptyItem, type Invoice, type InvoiceItem, type TemplateId, type InvoiceStatus, type TaxMode,
} from "@/lib/invoice";
import { buildDemoInvoice } from "@/lib/demo-data";
import { useInvoices } from "@/lib/store";
import { Field, Area } from "@/components/Field";
import { InvoicePreview } from "@/components/InvoicePreview";
import { exportInvoicePDF, exportInvoicePNG } from "@/lib/exporters";
import { formatINR, INDIAN_STATES, isValidGSTIN, gstinStateCode } from "@/lib/format";
import { cn } from "@/lib/utils";

const templates: { id: TemplateId; label: string }[] = [
  { id: "modern", label: "Modern" }, { id: "minimal", label: "Minimal" },
  { id: "corporate", label: "Corporate" }, { id: "gradient", label: "Gradient" },
  { id: "classic", label: "Classic" },
];

const statuses: InvoiceStatus[] = ["draft", "pending", "paid", "overdue", "cancelled"];

interface Props {
  initial: Invoice;
  onSave: (inv: Invoice) => void;
  mode: "create" | "edit";
}

export function InvoiceEditor({ initial, onSave, mode }: Props) {
  const [inv, setInv] = useState<Invoice>({ ...initial, taxMode: initial.taxMode ?? "exclusive" });
  const [invoices] = useInvoices();
  const previewRef = useRef<HTMLDivElement>(null);

  // Undo/redo stacks
  const past = useRef<Invoice[]>([]);
  const future = useRef<Invoice[]>([]);
  const skip = useRef(false);

  useEffect(() => {
    if (skip.current) { skip.current = false; return; }
    past.current.push(structuredClone(inv));
    if (past.current.length > 50) past.current.shift();
    future.current = [];
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inv]);

  // autosave on edit (debounced) — only for edit mode
  useEffect(() => {
    if (mode !== "edit") return;
    const t = setTimeout(() => onSave(inv), 500);
    return () => clearTimeout(t);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inv]);

  // Keyboard shortcuts
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const mod = e.ctrlKey || e.metaKey;
      if (mod && e.key.toLowerCase() === "s") { e.preventDefault(); onSave(inv); toast.success("Saved"); }
      if (mod && e.key.toLowerCase() === "z" && !e.shiftKey) { e.preventDefault(); undo(); }
      if (mod && (e.key.toLowerCase() === "y" || (e.shiftKey && e.key.toLowerCase() === "z"))) { e.preventDefault(); redo(); }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inv]);

  const undo = () => {
    if (past.current.length < 2) return;
    const current = past.current.pop()!;
    future.current.push(current);
    const prev = past.current[past.current.length - 1];
    skip.current = true;
    setInv(structuredClone(prev));
  };
  const redo = () => {
    const next = future.current.pop();
    if (!next) return;
    past.current.push(structuredClone(next));
    skip.current = true;
    setInv(structuredClone(next));
  };

  const totals = computeTotals(inv);

  const setItem = (id: string, patch: Partial<InvoiceItem>) =>
    setInv((p) => ({ ...p, items: p.items.map((i) => (i.id === id ? { ...i, ...patch } : i)) }));
  const addItem = () => setInv((p) => ({ ...p, items: [...p.items, createEmptyItem()] }));
  const removeItem = (id: string) => setInv((p) => ({ ...p, items: p.items.filter((i) => i.id !== id) }));

  // Validation
  const errors = {
    business: !inv.business.name ? "Required" : (inv.business.gstin && !isValidGSTIN(inv.business.gstin) ? "Invalid GSTIN" : ""),
    customer: !inv.customer.name ? "Required" : (inv.customer.gstin && !isValidGSTIN(inv.customer.gstin) ? "Invalid GSTIN" : ""),
    items: inv.items.length === 0 || inv.items.some((i) => !i.name || i.qty <= 0) ? "Add at least one item" : "",
  };
  const hasErrors = Object.values(errors).some(Boolean);

  const uploadLogo = (file: File) => {
    const reader = new FileReader();
    reader.onload = () => setInv((p) => ({ ...p, business: { ...p.business, logo: String(reader.result) } }));
    reader.readAsDataURL(file);
  };

  const downloadPDF = async () => {
    if (!previewRef.current) return;
    if (hasErrors) { toast.error("Fix validation errors first"); return; }
    toast.promise(exportInvoicePDF(previewRef.current, inv), {
      loading: "Generating PDF…", success: "PDF downloaded", error: "Export failed",
    });
  };
  const downloadPNG = async () => {
    if (!previewRef.current) return;
    toast.promise(exportInvoicePNG(previewRef.current, inv), {
      loading: "Generating PNG…", success: "PNG downloaded", error: "Export failed",
    });
  };
  const printInvoice = () => window.print();
  const copyInv = async () => {
    const text = `Invoice ${inv.number}\n${inv.customer.name}\n${formatINR(totals.total, inv.currency)}\nDue: ${inv.dueDate}`;
    await navigator.clipboard.writeText(text);
    toast.success("Copied to clipboard");
  };

  const shareInv = async () => {
    const text = `Invoice ${inv.number} from ${inv.business.name || "Invoxa"} — ${formatINR(totals.total, inv.currency)} due ${inv.dueDate}`;
    if (navigator.share) {
      try {
        await navigator.share({ title: `Invoice ${inv.number}`, text });
        return;
      } catch { /* fall through */ }
    }
    await navigator.clipboard.writeText(text);
    toast.success("Invoice details copied — paste to share");
  };

  const fillDemo = () => {
    const demo = buildDemoInvoice(invoices);
    setInv((p) => ({
      ...p,
      ...demo,
      id: p.id,
      date: p.date,
      dueDate: p.dueDate,
      createdAt: p.createdAt,
      updatedAt: Date.now(),
      template: p.template,
      currency: p.currency,
    }));
    toast.success("Demo company loaded");
  };

  // Auto-sync GSTIN -> state
  useEffect(() => {
    const sc = gstinStateCode(inv.business.gstin || "");
    if (sc && INDIAN_STATES.find((s) => s.code === sc) && sc !== inv.business.stateCode) {
      setInv((p) => ({ ...p, business: { ...p.business, stateCode: sc }, placeOfSupply: p.placeOfSupply || sc }));
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inv.business.gstin]);
  useEffect(() => {
    const sc = gstinStateCode(inv.customer.gstin || "");
    if (sc && INDIAN_STATES.find((s) => s.code === sc) && sc !== inv.customer.stateCode) {
      setInv((p) => ({ ...p, customer: { ...p.customer, stateCode: sc }, placeOfSupply: sc }));
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inv.customer.gstin]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <div className="text-xs uppercase tracking-widest text-muted-foreground">{mode === "create" ? "New invoice" : "Editing"}</div>
          <h1 className="text-2xl font-semibold tracking-tight text-grad">{inv.number || "Untitled"}</h1>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <ToolbarBtn onClick={fillDemo} aria-label="Load demo company"><Wand2 className="h-4 w-4" /> Demo</ToolbarBtn>
          <ToolbarBtn onClick={undo} aria-label="Undo"><RotateCcw className="h-4 w-4" /> Undo</ToolbarBtn>
          <ToolbarBtn onClick={redo} aria-label="Redo"><RotateCw className="h-4 w-4" /> Redo</ToolbarBtn>
          <TemplatePicker value={inv.template} onChange={(t) => setInv((p) => ({ ...p, template: t }))} />
          <StatusPicker value={inv.status} onChange={(s) => setInv((p) => ({ ...p, status: s }))} />
          <ToolbarBtn onClick={copyInv} aria-label="Copy invoice"><Copy className="h-4 w-4" /> Copy</ToolbarBtn>
          <ToolbarBtn onClick={shareInv} aria-label="Share invoice"><Share2 className="h-4 w-4" /> Share</ToolbarBtn>
          <ToolbarBtn onClick={printInvoice} aria-label="Print invoice"><Printer className="h-4 w-4" /> Print</ToolbarBtn>
          <ToolbarBtn onClick={downloadPNG} aria-label="Download PNG"><ImageIcon className="h-4 w-4" /> PNG</ToolbarBtn>
          {mode === "edit" && (
            <ToolbarBtn onClick={downloadPDF} aria-label="Download PDF"><Download className="h-4 w-4" /> PDF</ToolbarBtn>
          )}
          <button
            onClick={mode === "create" ? () => !hasErrors ? onSave(inv) : toast.error("Fix validation errors") : downloadPDF}
            aria-label={mode === "create" ? "Save invoice" : "Download PDF"}
            className="inline-flex h-10 items-center gap-1.5 rounded-xl bg-gradient-to-br from-blue-500 to-violet-500 px-4 text-sm font-medium text-white shadow-glow hover:opacity-90"
          >
            {mode === "create" ? <><Save className="h-4 w-4" /> Save invoice</> : <><Download className="h-4 w-4" /> Download PDF</>}
          </button>
        </div>
      </div>

      {hasErrors && (
        <div className="flex items-center gap-2 rounded-xl border border-amber-500/30 bg-amber-500/10 px-4 py-2 text-xs text-amber-200">
          <AlertCircle className="h-4 w-4" /> Some fields need attention before you can download the PDF.
        </div>
      )}

      <div className="grid gap-6 xl:grid-cols-[minmax(0,1.05fr)_minmax(0,1fr)]">
        {/* Form */}
        <div className="space-y-5">
          <Section icon={<Building2 className="h-4 w-4" />} title="Your business" error={errors.business}>
            <div className="grid gap-3 sm:grid-cols-2">
              <Field label="Business Name *" value={inv.business.name} onChange={(e) => setInv((p) => ({ ...p, business: { ...p.business, name: e.target.value } }))} />
              <Field label="GSTIN" value={inv.business.gstin ?? ""} onChange={(e) => setInv((p) => ({ ...p, business: { ...p.business, gstin: e.target.value.toUpperCase() } }))}
                error={inv.business.gstin && !isValidGSTIN(inv.business.gstin) ? "Invalid GSTIN" : undefined}
              />
              <Field label="Phone" value={inv.business.phone ?? ""} onChange={(e) => setInv((p) => ({ ...p, business: { ...p.business, phone: e.target.value } }))} />
              <Field label="Email" type="email" value={inv.business.email ?? ""} onChange={(e) => setInv((p) => ({ ...p, business: { ...p.business, email: e.target.value } }))} />
              <div className="sm:col-span-2">
                <Area label="Address" value={inv.business.address ?? ""} onChange={(e) => setInv((p) => ({ ...p, business: { ...p.business, address: e.target.value } }))} />
              </div>
              <StateSelect label="State" value={inv.business.stateCode ?? ""} onChange={(v) => setInv((p) => ({ ...p, business: { ...p.business, stateCode: v } }))} />
              <div>
                <label className="text-xs font-medium text-muted-foreground">Logo</label>
                <label className="mt-1.5 flex h-10 cursor-pointer items-center gap-2 rounded-xl border border-dashed border-border/70 bg-surface-1/40 px-3 text-xs text-muted-foreground hover:border-white/20 hover:text-foreground">
                  <ImageIcon className="h-4 w-4" />
                  {inv.business.logo ? "Replace logo" : "Upload logo"}
                  <input type="file" accept="image/*" className="hidden" onChange={(e) => e.target.files?.[0] && uploadLogo(e.target.files[0])} />
                </label>
              </div>
            </div>
          </Section>

          <Section icon={<User className="h-4 w-4" />} title="Customer" error={errors.customer}>
            <div className="grid gap-3 sm:grid-cols-2">
              <Field label="Customer Name *" value={inv.customer.name} onChange={(e) => setInv((p) => ({ ...p, customer: { ...p.customer, name: e.target.value } }))} />
              <Field label="GSTIN" value={inv.customer.gstin ?? ""} onChange={(e) => setInv((p) => ({ ...p, customer: { ...p.customer, gstin: e.target.value.toUpperCase() } }))}
                error={inv.customer.gstin && !isValidGSTIN(inv.customer.gstin) ? "Invalid GSTIN" : undefined}
              />
              <Field label="Phone" value={inv.customer.phone ?? ""} onChange={(e) => setInv((p) => ({ ...p, customer: { ...p.customer, phone: e.target.value } }))} />
              <Field label="Email" type="email" value={inv.customer.email ?? ""} onChange={(e) => setInv((p) => ({ ...p, customer: { ...p.customer, email: e.target.value } }))} />
              <div className="sm:col-span-2">
                <Area label="Address" value={inv.customer.address ?? ""} onChange={(e) => setInv((p) => ({ ...p, customer: { ...p.customer, address: e.target.value } }))} />
              </div>
              <StateSelect label="State" value={inv.customer.stateCode ?? ""} onChange={(v) => setInv((p) => ({ ...p, customer: { ...p.customer, stateCode: v } }))} />
            </div>
          </Section>

          <Section icon={<FileIcon className="h-4 w-4" />} title="Invoice details">
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              <Field label="Invoice Number" value={inv.number} onChange={(e) => setInv((p) => ({ ...p, number: e.target.value }))} />
              <Field label="Invoice Date" type="date" value={inv.date} onChange={(e) => setInv((p) => ({ ...p, date: e.target.value }))} />
              <Field label="Due Date" type="date" value={inv.dueDate} onChange={(e) => setInv((p) => ({ ...p, dueDate: e.target.value }))} />
              <StateSelect label="Place of Supply" value={inv.placeOfSupply} onChange={(v) => setInv((p) => ({ ...p, placeOfSupply: v }))} />
              <SelectField label="Currency" value={inv.currency} onChange={(v) => setInv((p) => ({ ...p, currency: v }))} options={[["INR", "₹ INR"], ["USD", "$ USD"], ["EUR", "€ EUR"], ["GBP", "£ GBP"], ["AED", "AED"]]} />
              <div className="flex items-end">
                <label className="inline-flex h-10 w-full cursor-pointer items-center gap-2 rounded-xl border border-border/70 bg-surface-1/60 px-3 text-sm">
                  <input type="checkbox" checked={inv.reverseCharge} onChange={(e) => setInv((p) => ({ ...p, reverseCharge: e.target.checked }))} />
                  Reverse Charge
                </label>
              </div>
              <TaxModeSelect value={inv.taxMode ?? "exclusive"} onChange={(v) => setInv((p) => ({ ...p, taxMode: v }))} />
            </div>
          </Section>

          <Section icon={<Receipt className="h-4 w-4" />} title="Items" error={errors.items}>
            <div className="grid grid-cols-[24px_2fr_0.9fr_0.7fr_0.9fr_0.7fr_0.7fr_1fr_28px] gap-2 px-1 text-[10px] uppercase tracking-widest text-muted-foreground">
              <div></div><div>Item</div><div>HSN/SAC</div><div>Qty</div><div>Rate</div><div>Disc%</div><div>Tax%</div><div className="text-right">Amount</div><div></div>
            </div>
            <Reorder.Group axis="y" values={inv.items} onReorder={(items) => setInv((p) => ({ ...p, items }))} className="mt-2 space-y-2">
              {inv.items.map((item) => {
                const line = computeLine(item, totals.intraState, inv.taxMode ?? "exclusive").total;
                return (
                  <Reorder.Item key={item.id} value={item} className="rounded-xl border border-border/60 bg-surface-1/60 p-2">
                    <div className="grid grid-cols-[24px_2fr_0.9fr_0.7fr_0.9fr_0.7fr_0.7fr_1fr_28px] items-center gap-2">
                      <button className="flex h-8 cursor-grab items-center justify-center text-muted-foreground" aria-label="Drag to reorder" title="Drag to reorder"><GripVertical className="h-4 w-4" /></button>
                      <div className="space-y-1">
                        <CellInput value={item.name} onChange={(v) => setItem(item.id, { name: v })} placeholder="Item name" />
                        <CellInput value={item.description ?? ""} onChange={(v) => setItem(item.id, { description: v })} placeholder="Description (optional)" muted />
                      </div>
                      <CellInput value={item.hsn ?? ""} onChange={(v) => setItem(item.id, { hsn: v })} placeholder="HSN" />
                      <CellInput value={String(item.qty)} onChange={(v) => setItem(item.id, { qty: Number(v) || 0 })} type="number" />
                      <CellInput value={String(item.rate)} onChange={(v) => setItem(item.id, { rate: Number(v) || 0 })} type="number" />
                      <CellInput value={String(item.discount)} onChange={(v) => setItem(item.id, { discount: Number(v) || 0 })} type="number" />
                      <CellInput value={String(item.tax)} onChange={(v) => setItem(item.id, { tax: Number(v) || 0 })} type="number" />
                      <div className="text-right text-sm font-medium tabular-nums">{formatINR(line, inv.currency)}</div>
                      <button onClick={() => removeItem(item.id)} aria-label="Remove item" className="flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground hover:text-rose-300" title="Delete">
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </Reorder.Item>
                );
              })}
            </Reorder.Group>
            <button onClick={addItem} aria-label="Add line item" className="mt-3 inline-flex h-9 items-center gap-1.5 rounded-xl border border-dashed border-border/70 bg-surface-1/40 px-3 text-xs text-muted-foreground hover:border-white/20 hover:text-foreground">
              <Plus className="h-4 w-4" /> Add row
            </button>
          </Section>

          <Section icon={<QrCode className="h-4 w-4" />} title="UPI QR (optional)">
            <div className="grid gap-3 sm:grid-cols-2">
              <Field label="UPI ID" placeholder="yourname@upi" value={inv.upi?.id ?? ""} onChange={(e) => setInv((p) => ({ ...p, upi: { ...p.upi, id: e.target.value } }))} />
              <Field label="Receiver Name" value={inv.upi?.name ?? ""} onChange={(e) => setInv((p) => ({ ...p, upi: { ...p.upi, name: e.target.value } }))} />
            </div>
          </Section>

          <Section icon={<Palette className="h-4 w-4" />} title="Notes & Terms">
            <div className="grid gap-3 sm:grid-cols-2">
              <Area label="Notes" value={inv.notes ?? ""} onChange={(e) => setInv((p) => ({ ...p, notes: e.target.value }))} />
              <Area label="Terms & Conditions" value={inv.terms ?? ""} onChange={(e) => setInv((p) => ({ ...p, terms: e.target.value }))} />
            </div>
          </Section>
        </div>

        {/* Preview */}
        <div className="space-y-4">
          <div className="sticky top-20">
            <div className="mb-3 flex items-center justify-between">
              <div className="text-xs uppercase tracking-widest text-muted-foreground">Live Preview</div>
              <div className="text-xs text-muted-foreground">{templates.find((t) => t.id === inv.template)?.label}</div>
            </div>
            <div className="overflow-hidden rounded-2xl border border-border/70 bg-card/40 p-3 backdrop-blur-xl shadow-card">
              <div className="overflow-auto rounded-xl bg-white" style={{ maxHeight: "calc(100dvh - 200px)" }}>
                <div style={{ width: 794 * 0.62, height: 1123 * 0.62, position: "relative" }}>
                  <div style={{ position: "absolute", top: 0, left: 0, transform: "scale(0.62)", transformOrigin: "top left", width: 794 }}>
                    <InvoicePreview ref={previewRef} invoice={inv} />
                  </div>
                </div>
              </div>
            </div>
            <TotalsBar totals={totals} currency={inv.currency} />
          </div>
        </div>
      </div>
    </div>
  );
}

function TaxModeSelect({ value, onChange }: { value: TaxMode; onChange: (v: TaxMode) => void }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-xs font-medium text-muted-foreground">GST on rates</label>
      <div className="relative">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value as TaxMode)}
          className="h-10 w-full appearance-none rounded-xl border border-border/70 bg-surface-1/60 px-3 pr-8 text-sm outline-none focus:border-primary/60"
        >
          <option value="exclusive">Exclusive (GST added)</option>
          <option value="inclusive">Inclusive (GST included)</option>
        </select>
        <ChevronDown className="pointer-events-none absolute right-2 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
      </div>
    </div>
  );
}

function ToolbarBtn({ children, onClick, ...rest }: { children: React.ReactNode; onClick?: () => void } & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button onClick={onClick} {...rest} className="inline-flex h-10 items-center gap-1.5 rounded-xl border border-border/70 bg-surface-1/60 px-3 text-xs text-muted-foreground hover:text-foreground hover:border-white/15">
      {children}
    </button>
  );
}

function Section({ icon, title, error, children }: { icon: React.ReactNode; title: string; error?: string; children: React.ReactNode }) {
  return (
    <div className="rounded-2xl border border-border/70 bg-card/60 p-5 backdrop-blur-xl shadow-card">
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500/20 to-violet-500/20 text-blue-300 ring-1 ring-white/10">{icon}</div>
          <div className="text-sm font-semibold">{title}</div>
        </div>
        {error && <span className="text-[11px] text-amber-300">{error}</span>}
      </div>
      {children}
    </div>
  );
}

function CellInput({ value, onChange, placeholder, type, muted }: { value: string; onChange: (v: string) => void; placeholder?: string; type?: string; muted?: boolean }) {
  return (
    <input
      value={value}
      type={type}
      placeholder={placeholder}
      onChange={(e) => onChange(e.target.value)}
      className={cn(
        "h-8 w-full rounded-lg border border-transparent bg-transparent px-2 text-sm text-foreground placeholder:text-muted-foreground/40 outline-none focus:border-white/15 focus:bg-surface-2/60",
        muted && "text-xs text-muted-foreground"
      )}
    />
  );
}

function StateSelect({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-xs font-medium text-muted-foreground">{label}</label>
      <div className="relative">
        <select value={value} onChange={(e) => onChange(e.target.value)} className="h-10 w-full appearance-none rounded-xl border border-border/70 bg-surface-1/60 px-3 pr-8 text-sm outline-none focus:border-primary/60">
          <option value="">Select state…</option>
          {INDIAN_STATES.map((s) => <option key={s.code} value={s.code}>{s.code} — {s.name}</option>)}
        </select>
        <ChevronDown className="pointer-events-none absolute right-2 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
      </div>
    </div>
  );
}
function SelectField({ label, value, onChange, options }: { label: string; value: string; onChange: (v: string) => void; options: Array<[string, string]> }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-xs font-medium text-muted-foreground">{label}</label>
      <div className="relative">
        <select value={value} onChange={(e) => onChange(e.target.value)} className="h-10 w-full appearance-none rounded-xl border border-border/70 bg-surface-1/60 px-3 pr-8 text-sm outline-none focus:border-primary/60">
          {options.map(([v, l]) => <option key={v} value={v}>{l}</option>)}
        </select>
        <ChevronDown className="pointer-events-none absolute right-2 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
      </div>
    </div>
  );
}

function TemplatePicker({ value, onChange }: { value: TemplateId; onChange: (v: TemplateId) => void }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="relative">
      <button onClick={() => setOpen((v) => !v)} className="inline-flex h-10 items-center gap-1.5 rounded-xl border border-border/70 bg-surface-1/60 px-3 text-xs text-muted-foreground hover:text-foreground">
        <Palette className="h-4 w-4" /> {templates.find((t) => t.id === value)?.label}
        <ChevronDown className="h-3 w-3" />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -4 }}
            className="absolute right-0 top-12 z-30 w-44 overflow-hidden rounded-xl border border-border/70 bg-card/95 p-1 shadow-2xl backdrop-blur-xl"
          >
            {templates.map((t) => (
              <button key={t.id} onClick={() => { onChange(t.id); setOpen(false); }} className={cn("flex w-full items-center justify-between rounded-lg px-3 py-2 text-sm hover:bg-white/5", value === t.id && "text-blue-300")}>
                {t.label} {value === t.id && <span>✓</span>}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function StatusPicker({ value, onChange }: { value: InvoiceStatus; onChange: (v: InvoiceStatus) => void }) {
  return (
    <div className="relative">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value as InvoiceStatus)}
        className="h-10 appearance-none rounded-xl border border-border/70 bg-surface-1/60 pl-3 pr-7 text-xs uppercase tracking-wider text-muted-foreground outline-none hover:text-foreground"
      >
        {statuses.map((s) => <option key={s} value={s}>{s}</option>)}
      </select>
      <ChevronDown className="pointer-events-none absolute right-2 top-1/2 h-3 w-3 -translate-y-1/2 text-muted-foreground" />
    </div>
  );
}

function TotalsBar({ totals, currency }: { totals: ReturnType<typeof computeTotals>; currency: string }) {
  return (
    <div className="mt-4 rounded-2xl border border-border/70 bg-card/60 p-4 backdrop-blur-xl shadow-card">
      <div className="grid grid-cols-3 gap-3 text-center text-xs">
        <div>
          <div className="text-muted-foreground">Taxable</div>
          <div className="mt-0.5 font-semibold text-foreground tabular-nums">{formatINR(totals.taxable, currency)}</div>
        </div>
        <div>
          <div className="text-muted-foreground">{totals.intraState ? "CGST+SGST" : "IGST"}</div>
          <div className="mt-0.5 font-semibold text-foreground tabular-nums">{formatINR(totals.tax, currency)}</div>
        </div>
        <div>
          <div className="text-muted-foreground">Grand Total</div>
          <div className="mt-0.5 font-semibold text-grad-brand tabular-nums">{formatINR(totals.total, currency)}</div>
        </div>
      </div>
    </div>
  );
}

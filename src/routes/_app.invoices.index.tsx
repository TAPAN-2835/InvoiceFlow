import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { useInvoices, useSettings, useHydrated } from "@/lib/store";
import { computeTotals, nextInvoiceNumber, type Invoice, type InvoiceStatus } from "@/lib/invoice";
import { formatINR } from "@/lib/format";
import { Field } from "@/components/Field";
import { StatusBadge } from "./_app.dashboard";
import { Copy, Download, Plus, Search, Trash2, Pencil, Filter, FileText } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";

import { BRAND } from "@/lib/constants";

export const Route = createFileRoute("/_app/invoices/")({
  head: () => ({ meta: [{ title: `Invoices — ${BRAND.name}` }] }),
  component: InvoicesList,
});

const statuses: InvoiceStatus[] = ["draft", "pending", "paid", "overdue", "cancelled"];

function InvoicesList() {
  const [invoices, setInvoices] = useInvoices();
  const [settings] = useSettings();
  const hydrated = useHydrated();
  const navigate = useNavigate();
  const [q, setQ] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [sort, setSort] = useState<"new" | "old" | "amount">("new");

  const filtered = useMemo(() => {
    let list = invoices.filter((i) => {
      if (statusFilter !== "all" && i.status !== statusFilter) return false;
      if (!q) return true;
      const s = q.toLowerCase();
      return (
        i.number.toLowerCase().includes(s) ||
        (i.customer.name || "").toLowerCase().includes(s) ||
        (i.customer.gstin || "").toLowerCase().includes(s)
      );
    });
    if (sort === "new") list.sort((a, b) => b.updatedAt - a.updatedAt);
    if (sort === "old") list.sort((a, b) => a.updatedAt - b.updatedAt);
    if (sort === "amount") list.sort((a, b) => computeTotals(b).total - computeTotals(a).total);
    return list;
  }, [invoices, q, statusFilter, sort]);

  const duplicate = (inv: Invoice) => {
    const prefix = settings.defaults.prefix || "INV-";
    const copy: Invoice = {
      ...inv,
      id: crypto.randomUUID(),
      number: nextInvoiceNumber(prefix, invoices),
      status: "draft",
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };
    setInvoices((prev) => [copy, ...prev]);
    toast.success("Invoice duplicated");
    navigate({ to: "/invoices/$id", params: { id: copy.id } });
  };

  const remove = (id: string) => {
    setInvoices((prev) => prev.filter((x) => x.id !== id));
    toast.success("Invoice deleted");
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight text-grad">Invoices</h1>
          <p className="mt-1 text-sm text-muted-foreground">Search, filter, and manage every invoice.</p>
        </div>
        <Link to="/invoices/new" className="inline-flex h-10 items-center gap-1.5 rounded-xl bg-gradient-to-br from-blue-500 to-violet-500 px-4 text-sm font-medium text-white shadow-glow hover:opacity-90">
          <Plus className="h-4 w-4" /> New invoice
        </Link>
      </div>

      <div className="grid gap-3 sm:grid-cols-[1fr_auto_auto]">
        <Field
          prefix={<Search className="h-4 w-4" />}
          placeholder="Search by number, customer, GSTIN…"
          value={q}
          onChange={(e) => setQ(e.target.value)}
        />
        <Select value={statusFilter} onChange={setStatusFilter} icon={<Filter className="h-4 w-4" />}>
          <option value="all">All status</option>
          {statuses.map((s) => <option key={s} value={s}>{s[0].toUpperCase() + s.slice(1)}</option>)}
        </Select>
        <Select value={sort} onChange={(v) => setSort(v as any)}>
          <option value="new">Newest first</option>
          <option value="old">Oldest first</option>
          <option value="amount">Highest amount</option>
        </Select>
      </div>

      <div className="overflow-hidden rounded-2xl border border-border/70 bg-card/60 backdrop-blur-xl shadow-card">
        <div className="grid grid-cols-[1.4fr_2fr_1fr_1.2fr_1.2fr_auto] gap-3 border-b border-border/70 px-4 py-3 text-[10px] uppercase tracking-widest text-muted-foreground">
          <div>Invoice</div><div>Customer</div><div>Date</div><div>Status</div><div className="text-right">Amount</div><div></div>
        </div>
        {hydrated && filtered.length === 0 && (
          <div className="px-4 py-16 text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500/15 to-violet-500/15 ring-1 ring-white/10">
              <FileText className="h-6 w-6 text-blue-300" />
            </div>
            <div className="mt-3 text-sm font-medium">No invoices match</div>
            <div className="mt-1 text-xs text-muted-foreground">Try a different search or create one.</div>
          </div>
        )}
        <AnimatePresence initial={false}>
          {filtered.map((inv, i) => {
            const t = computeTotals(inv);
            return (
              <motion.div
                key={inv.id}
                layout
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ delay: Math.min(i * 0.02, 0.2) }}
                className="grid grid-cols-[1.4fr_2fr_1fr_1.2fr_1.2fr_auto] items-center gap-3 border-b border-border/60 px-4 py-3 text-sm last:border-b-0 hover:bg-white/[0.03]"
              >
                <Link to="/invoices/$id" params={{ id: inv.id }} className="font-medium hover:text-blue-300">{inv.number}</Link>
                <div className="truncate text-muted-foreground">{inv.customer.name || <span className="italic">Untitled</span>}</div>
                <div className="text-muted-foreground">{inv.date}</div>
                <div><StatusBadge status={inv.status} /></div>
                <div className="text-right font-semibold tabular-nums">{formatINR(t.total, inv.currency)}</div>
                <div className="flex justify-end gap-1">
                  <IconBtn onClick={() => navigate({ to: "/invoices/$id", params: { id: inv.id } })} title="Edit"><Pencil className="h-3.5 w-3.5" /></IconBtn>
                  <IconBtn onClick={() => duplicate(inv)} title="Duplicate"><Copy className="h-3.5 w-3.5" /></IconBtn>
                  <IconBtn onClick={() => remove(inv.id)} title="Delete" danger><Trash2 className="h-3.5 w-3.5" /></IconBtn>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </div>
  );
}

function IconBtn({ children, onClick, title, danger }: { children: React.ReactNode; onClick?: () => void; title?: string; danger?: boolean }) {
  return (
    <button
      onClick={onClick}
      title={title}
      className={`inline-flex h-8 w-8 items-center justify-center rounded-lg border border-border/70 bg-surface-1/60 text-muted-foreground transition hover:text-foreground hover:border-white/15 ${danger ? "hover:text-rose-300" : ""}`}
    >
      {children}
    </button>
  );
}

function Select({ value, onChange, children, icon }: { value: string; onChange: (v: string) => void; children: React.ReactNode; icon?: React.ReactNode }) {
  return (
    <div className="flex h-10 items-center gap-2 rounded-xl border border-border/70 bg-surface-1/60 px-3 text-sm">
      {icon && <span className="text-muted-foreground">{icon}</span>}
      <select value={value} onChange={(e) => onChange(e.target.value)} className="appearance-none bg-transparent pr-2 text-foreground outline-none">
        {children}
      </select>
    </div>
  );
}
export { Select };

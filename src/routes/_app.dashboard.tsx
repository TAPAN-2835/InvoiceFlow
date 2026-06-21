import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo } from "react";
import { useInvoices, useHydrated } from "@/lib/store";
import { computeTotals } from "@/lib/invoice";
import { formatCompactINR, formatINR } from "@/lib/format";
import { StatCard } from "@/components/Card";
import { FileText, IndianRupee, Receipt, TrendingUp, Plus, ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";
import { AreaChart, Area, ResponsiveContainer, XAxis, Tooltip, BarChart, Bar, CartesianGrid } from "recharts";

import { BRAND } from "@/lib/constants";

export const Route = createFileRoute("/_app/dashboard")({
  head: () => ({ meta: [{ title: `Dashboard — ${BRAND.name}` }] }),
  component: Dashboard,
});

function Dashboard() {
  const [invoices] = useInvoices();
  const hydrated = useHydrated();

  const metrics = useMemo(() => {
    let revenue = 0, gst = 0, today = 0;
    const now = new Date();
    const todayStr = now.toISOString().slice(0, 10);
    const monthly: Record<string, { revenue: number; gst: number; count: number; label: string }> = {};
    for (let i = 5; i >= 0; i--) {
      const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
      const k = d.toISOString().slice(0, 7);
      monthly[k] = { revenue: 0, gst: 0, count: 0, label: d.toLocaleString("en-IN", { month: "short" }) };
    }
    for (const inv of invoices) {
      const t = computeTotals(inv);
      revenue += t.total; gst += t.tax;
      if (inv.date === todayStr) today += t.total;
      const k = inv.date?.slice(0, 7);
      if (k && monthly[k]) { monthly[k].revenue += t.total; monthly[k].gst += t.tax; monthly[k].count += 1; }
    }
    return { revenue, gst, today, count: invoices.length, monthly: Object.values(monthly) };
  }, [invoices]);

  const recent = [...invoices].sort((a, b) => b.updatedAt - a.updatedAt).slice(0, 6);

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight text-grad">Dashboard</h1>
          <p className="mt-1 text-sm text-muted-foreground">A calm overview of your invoicing.</p>
        </div>
        <Link to="/invoices/new" className="inline-flex h-10 items-center gap-1.5 rounded-xl bg-gradient-to-br from-blue-500 to-violet-500 px-4 text-sm font-medium text-white shadow-glow hover:opacity-90">
          <Plus className="h-4 w-4" /> New invoice
        </Link>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Total Invoices" value={hydrated ? metrics.count.toLocaleString("en-IN") : "—"} icon={<FileText className="h-4 w-4" />} accent="blue" />
        <StatCard label="Total Revenue" value={hydrated ? formatCompactINR(metrics.revenue) : "—"} icon={<IndianRupee className="h-4 w-4" />} accent="violet" />
        <StatCard label="Today's Revenue" value={hydrated ? formatINR(metrics.today) : "—"} icon={<TrendingUp className="h-4 w-4" />} accent="cyan" />
        <StatCard label="GST Collected" value={hydrated ? formatCompactINR(metrics.gst) : "—"} icon={<Receipt className="h-4 w-4" />} accent="green" />
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <ChartCard title="Invoice trend" subtitle="Last 6 months">
          <ResponsiveContainer width="100%" height={220}>
            <AreaChart data={metrics.monthly}>
              <defs>
                <linearGradient id="g1" x1="0" x2="0" y1="0" y2="1">
                  <stop offset="0%" stopColor="#3B82F6" stopOpacity={0.6} />
                  <stop offset="100%" stopColor="#3B82F6" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis dataKey="label" stroke="#64748B" fontSize={11} tickLine={false} axisLine={false} />
              <Tooltip contentStyle={tooltip} cursor={{ stroke: "rgba(255,255,255,0.1)" }} formatter={(v: any) => formatCompactINR(Number(v))} />
              <Area type="monotone" dataKey="revenue" stroke="#3B82F6" strokeWidth={2} fill="url(#g1)" />
            </AreaChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="GST collected" subtitle="Last 6 months">
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={metrics.monthly}>
              <CartesianGrid stroke="rgba(255,255,255,0.05)" vertical={false} />
              <XAxis dataKey="label" stroke="#64748B" fontSize={11} tickLine={false} axisLine={false} />
              <Tooltip contentStyle={tooltip} cursor={{ fill: "rgba(255,255,255,0.04)" }} formatter={(v: any) => formatCompactINR(Number(v))} />
              <Bar dataKey="gst" fill="#06B6D4" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Invoices created" subtitle="Last 6 months">
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={metrics.monthly}>
              <CartesianGrid stroke="rgba(255,255,255,0.05)" vertical={false} />
              <XAxis dataKey="label" stroke="#64748B" fontSize={11} tickLine={false} axisLine={false} />
              <Tooltip contentStyle={tooltip} cursor={{ fill: "rgba(255,255,255,0.04)" }} />
              <Bar dataKey="count" fill="#7C3AED" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>

      <div className="rounded-2xl border border-border/70 bg-card/60 p-5 backdrop-blur-xl shadow-card">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-base font-semibold">Recent invoices</h2>
            <p className="text-xs text-muted-foreground">Your latest activity</p>
          </div>
          <Link to="/invoices" className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground">
            View all <ArrowUpRight className="h-3 w-3" />
          </Link>
        </div>
        <div className="mt-4 divide-y divide-border/60">
          {hydrated && recent.length === 0 && (
            <EmptyState />
          )}
          {recent.map((inv, i) => {
            const t = computeTotals(inv);
            return (
              <motion.div
                key={inv.id}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.03 }}
              >
                <Link to="/invoices/$id" params={{ id: inv.id }} className="flex items-center gap-4 py-3 hover:bg-white/[0.03] rounded-lg px-2 transition">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500/20 to-violet-500/20 text-blue-300 ring-1 ring-white/10">
                    <FileText className="h-4 w-4" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="truncate text-sm font-medium">{inv.number}</div>
                    <div className="truncate text-xs text-muted-foreground">{inv.customer.name || "Untitled customer"} · {inv.date}</div>
                  </div>
                  <StatusBadge status={inv.status} />
                  <div className="text-sm font-semibold tabular-nums">{formatINR(t.total, inv.currency)}</div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

const tooltip = {
  background: "rgba(15,23,42,0.95)",
  border: "1px solid rgba(255,255,255,0.08)",
  borderRadius: 12,
  fontSize: 12,
  color: "#e2e8f0",
} as const;

function ChartCard({ title, subtitle, children }: { title: string; subtitle: string; children: React.ReactNode }) {
  return (
    <div className="rounded-2xl border border-border/70 bg-card/60 p-5 backdrop-blur-xl shadow-card">
      <div className="mb-3">
        <div className="text-sm font-semibold">{title}</div>
        <div className="text-xs text-muted-foreground">{subtitle}</div>
      </div>
      {children}
    </div>
  );
}

export function StatusBadge({ status }: { status: string }) {
  const map: Record<string, string> = {
    paid: "bg-emerald-500/15 text-emerald-300 ring-emerald-500/30",
    pending: "bg-amber-500/15 text-amber-300 ring-amber-500/30",
    overdue: "bg-rose-500/15 text-rose-300 ring-rose-500/30",
    cancelled: "bg-slate-500/15 text-slate-300 ring-slate-500/30",
    draft: "bg-blue-500/15 text-blue-300 ring-blue-500/30",
  };
  return (
    <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider ring-1 ${map[status] ?? map.draft}`}>
      {status}
    </span>
  );
}

function EmptyState() {
  return (
    <div className="py-12 text-center">
      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500/15 to-violet-500/15 ring-1 ring-white/10">
        <FileText className="h-6 w-6 text-blue-300" />
      </div>
      <div className="mt-4 text-sm font-medium">No invoices yet</div>
      <div className="mt-1 text-xs text-muted-foreground">Create your first invoice to see activity here.</div>
      <Link to="/invoices/new" className="mt-5 inline-flex h-9 items-center gap-1.5 rounded-xl bg-gradient-to-br from-blue-500 to-violet-500 px-4 text-sm font-medium text-white shadow-glow">
        <Plus className="h-4 w-4" /> New invoice
      </Link>
    </div>
  );
}

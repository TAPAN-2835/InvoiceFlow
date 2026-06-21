import { cn } from "@/lib/utils";

export function Card({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-border/70 bg-card/60 backdrop-blur-xl shadow-card",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export function StatCard({
  label, value, sub, icon, accent = "blue",
}: {
  label: string; value: React.ReactNode; sub?: React.ReactNode; icon?: React.ReactNode;
  accent?: "blue" | "violet" | "cyan" | "green";
}) {
  const accents: Record<string, string> = {
    blue: "from-blue-500/40 to-blue-500/0",
    violet: "from-violet-500/40 to-violet-500/0",
    cyan: "from-cyan-500/40 to-cyan-500/0",
    green: "from-emerald-500/40 to-emerald-500/0",
  };
  return (
    <div className="group relative overflow-hidden rounded-2xl border border-border/70 bg-card/60 p-5 shadow-card backdrop-blur-xl transition hover:-translate-y-0.5">
      <div className={cn("pointer-events-none absolute -top-20 -right-20 h-56 w-56 rounded-full bg-gradient-to-br opacity-30 blur-3xl", accents[accent])} />
      <div className="flex items-start justify-between">
        <div>
          <div className="text-xs text-muted-foreground">{label}</div>
          <div className="mt-2 text-2xl font-semibold tracking-tight text-grad">{value}</div>
        </div>
        {icon && <div className="rounded-xl border border-border/60 bg-surface-1/70 p-2 text-muted-foreground">{icon}</div>}
      </div>
      {sub && <div className="mt-3 text-xs text-muted-foreground">{sub}</div>}
    </div>
  );
}

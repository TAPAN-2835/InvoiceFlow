import { Link, Outlet, useRouterState } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { LayoutDashboard, FileText, Calculator, Settings, Plus, Search, Command } from "lucide-react";
import { Logo } from "./Logo";
import { useEffect, useState } from "react";
import { CommandPalette } from "./CommandPalette";
import { cn } from "@/lib/utils";
import { SiteFooter } from "./SiteFooter";

const nav = [
  { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { to: "/invoices", label: "Invoices", icon: FileText },
  { to: "/gst-calculator", label: "GST Calculator", icon: Calculator },
  { to: "/settings", label: "Settings", icon: Settings },
] as const;

export function AppShell() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const [openPalette, setOpenPalette] = useState(false);

  useEffect(() => {
    const h = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpenPalette((v) => !v);
      }
    };
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, []);

  return (
    <div className="min-h-dvh">
      {/* Background aurora */}
      <div className="pointer-events-none fixed inset-0 -z-10 bg-aurora opacity-60" />
      <div className="pointer-events-none fixed inset-0 -z-10 bg-grid opacity-[0.15] mask-fade-b" />

      <header className="sticky top-0 z-40 border-b border-border/60 bg-background/60 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-[1400px] items-center gap-3 px-4 sm:px-6">
          <Link to="/" className="shrink-0"><Logo /></Link>
          <nav className="ml-6 hidden items-center gap-1 md:flex">
            {nav.map((n) => {
              const active = pathname.startsWith(n.to);
              return (
                <Link
                  key={n.to}
                  to={n.to}
                  className={cn(
                    "relative inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm transition",
                    active ? "text-foreground" : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  <n.icon className="h-4 w-4" />
                  {n.label}
                  {active && (
                    <motion.span
                      layoutId="nav-pill"
                      className="absolute inset-0 -z-10 rounded-lg bg-white/5 ring-1 ring-white/10"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.5 }}
                    />
                  )}
                </Link>
              );
            })}
          </nav>
          <div className="ml-auto flex items-center gap-2">
            <button
              onClick={() => setOpenPalette(true)}
              className="hidden h-9 items-center gap-2 rounded-xl border border-border/70 bg-surface-1/70 px-3 text-xs text-muted-foreground transition hover:text-foreground sm:inline-flex"
            >
              <Search className="h-3.5 w-3.5" />
              <span>Search…</span>
              <kbd className="ml-3 inline-flex items-center gap-0.5 rounded border border-border/70 bg-surface-2 px-1.5 py-0.5 text-[10px] text-muted-foreground">
                <Command className="h-2.5 w-2.5" />K
              </kbd>
            </button>
            <Link
              to="/invoices/new"
              className="inline-flex h-9 items-center gap-1.5 rounded-xl bg-gradient-to-br from-blue-500 to-violet-500 px-3.5 text-sm font-medium text-white shadow-glow transition hover:opacity-90"
            >
              <Plus className="h-4 w-4" /> New Invoice
            </Link>
          </div>
        </div>
        {/* Mobile nav */}
        <div className="flex gap-1 overflow-x-auto px-4 pb-2 md:hidden no-scrollbar">
          {nav.map((n) => {
            const active = pathname.startsWith(n.to);
            return (
              <Link key={n.to} to={n.to} className={cn(
                "inline-flex shrink-0 items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs",
                active ? "bg-white/10 text-foreground" : "text-muted-foreground"
              )}>
                <n.icon className="h-3.5 w-3.5" />{n.label}
              </Link>
            );
          })}
        </div>
      </header>

      <main className="mx-auto max-w-[1400px] px-4 py-8 sm:px-6">
        <motion.div
          key={pathname}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
        >
          <Outlet />
        </motion.div>
      </main>

      <div className="mx-auto max-w-[1400px] px-4 sm:px-6">
        <SiteFooter compact />
      </div>

      <CommandPalette open={openPalette} setOpen={setOpenPalette} />
    </div>
  );
}

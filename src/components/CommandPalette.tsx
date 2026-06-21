import { Command } from "cmdk";
import { useNavigate } from "@tanstack/react-router";
import { useInvoices } from "@/lib/store";
import {
  LayoutDashboard, FileText, Calculator, Settings, Plus, FileSearch,
} from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect } from "react";

export function CommandPalette({ open, setOpen }: { open: boolean; setOpen: (v: boolean) => void }) {
  const navigate = useNavigate();
  const [invoices] = useInvoices();

  useEffect(() => {
    if (!open) return;
    const onEsc = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onEsc);
    return () => window.removeEventListener("keydown", onEsc);
  }, [open, setOpen]);

  const go = (to: string) => { setOpen(false); navigate({ to }); };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-start justify-center bg-black/60 backdrop-blur-md pt-24 px-4"
          onClick={() => setOpen(false)}
        >
          <motion.div
            initial={{ y: -10, opacity: 0, scale: 0.98 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: -10, opacity: 0, scale: 0.98 }}
            transition={{ type: "spring", stiffness: 300, damping: 26 }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-xl overflow-hidden rounded-2xl border border-border/70 bg-card/90 shadow-2xl backdrop-blur-2xl"
          >
            <Command label="Command palette">
              <div className="border-b border-border/60 px-4">
                <Command.Input
                  autoFocus
                  placeholder="Search invoices, pages, actions…"
                  className="h-14 w-full bg-transparent text-sm text-foreground placeholder:text-muted-foreground/60 outline-none"
                />
              </div>
              <Command.List className="max-h-[60vh] overflow-y-auto p-2">
                <Command.Empty className="px-3 py-6 text-center text-sm text-muted-foreground">
                  Nothing found.
                </Command.Empty>
                <Command.Group heading="Navigate" className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground/60">
                  <Item onSelect={() => go("/dashboard")} icon={<LayoutDashboard className="h-4 w-4" />} label="Dashboard" />
                  <Item onSelect={() => go("/invoices")} icon={<FileText className="h-4 w-4" />} label="Invoices" />
                  <Item onSelect={() => go("/gst-calculator")} icon={<Calculator className="h-4 w-4" />} label="GST Calculator" />
                  <Item onSelect={() => go("/settings")} icon={<Settings className="h-4 w-4" />} label="Settings" />
                </Command.Group>
                <Command.Group heading="Actions" className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground/60">
                  <Item onSelect={() => go("/invoices/new")} icon={<Plus className="h-4 w-4" />} label="Create new invoice" shortcut="N" />
                </Command.Group>
                {invoices.length > 0 && (
                  <Command.Group heading="Recent invoices" className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground/60">
                    {invoices.slice(0, 6).map((inv) => (
                      <Item
                        key={inv.id}
                        onSelect={() => go(`/invoices/${inv.id}`)}
                        icon={<FileSearch className="h-4 w-4" />}
                        label={`${inv.number} — ${inv.customer.name || "Untitled"}`}
                      />
                    ))}
                  </Command.Group>
                )}
              </Command.List>
            </Command>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function Item({ onSelect, icon, label, shortcut }: { onSelect: () => void; icon: React.ReactNode; label: string; shortcut?: string }) {
  return (
    <Command.Item
      onSelect={onSelect}
      className="flex cursor-pointer items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-foreground/90 aria-selected:bg-white/8 aria-selected:text-foreground data-[selected=true]:bg-white/8"
    >
      <span className="text-muted-foreground">{icon}</span>
      <span className="flex-1">{label}</span>
      {shortcut && <kbd className="rounded border border-border/60 bg-surface-2 px-1.5 py-0.5 text-[10px] text-muted-foreground">{shortcut}</kbd>}
    </Command.Item>
  );
}

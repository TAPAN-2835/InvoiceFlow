import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useMemo } from "react";
import { useInvoices, useSettings, useHydrated } from "@/lib/store";
import { createEmptyInvoice, nextInvoiceNumber, type Invoice } from "@/lib/invoice";
import { InvoiceEditor } from "@/components/InvoiceEditor";
import { fireConfetti } from "@/lib/exporters";
import { toast } from "sonner";

import { BRAND } from "@/lib/constants";

export const Route = createFileRoute("/_app/invoices/new")({
  head: () => ({ meta: [{ title: `New Invoice — ${BRAND.name}` }] }),
  component: NewInvoice,
});

function NewInvoice() {
  const [invoices, setInvoices] = useInvoices();
  const [settings] = useSettings();
  const hydrated = useHydrated();
  const navigate = useNavigate();

  const draft = useMemo<Invoice>(() => {
    if (!hydrated) return createEmptyInvoice("INV-", []);
    const base = createEmptyInvoice(settings.defaults.prefix || "INV-", invoices);
    base.business = { ...base.business, ...settings.business };
    base.template = settings.defaults.template;
    base.currency = settings.defaults.currency;
    base.terms = settings.defaults.terms;
    base.upi = { id: settings.defaults.upiId, name: settings.defaults.upiName };
    if (base.items[0]) base.items[0].tax = settings.defaults.gst;
    if (base.business.stateCode) base.placeOfSupply = base.business.stateCode;
    return base;
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hydrated]);

  // ensure number stays unique with prefix
  useEffect(() => {
    if (!hydrated) return;
    draft.number = nextInvoiceNumber(settings.defaults.prefix || "INV-", invoices);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hydrated]);

  const onSave = (inv: Invoice) => {
    setInvoices((prev) => [{ ...inv, updatedAt: Date.now() }, ...prev]);
    fireConfetti();
    toast.success("Invoice created");
    navigate({ to: "/invoices/$id", params: { id: inv.id } });
  };

  if (!hydrated) return null;
  return <InvoiceEditor initial={draft} onSave={onSave} mode="create" />;
}

import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useInvoices, useHydrated } from "@/lib/store";
import { InvoiceEditor } from "@/components/InvoiceEditor";
import { toast } from "sonner";

import { BRAND } from "@/lib/constants";

export const Route = createFileRoute("/_app/invoices/$id")({
  head: () => ({ meta: [{ title: `Edit Invoice — ${BRAND.name}` }] }),
  component: EditInvoice,
});

function EditInvoice() {
  const { id } = Route.useParams();
  const [invoices, setInvoices] = useInvoices();
  const hydrated = useHydrated();
  const navigate = useNavigate();
  if (!hydrated) return null;
  const inv = invoices.find((x) => x.id === id);
  if (!inv) {
    return (
      <div className="mx-auto max-w-md py-20 text-center">
        <h1 className="text-xl font-semibold">Invoice not found</h1>
        <p className="mt-2 text-sm text-muted-foreground">It may have been deleted from this device.</p>
        <button
          onClick={() => navigate({ to: "/invoices" })}
          className="mt-6 inline-flex h-10 items-center rounded-xl bg-primary px-5 text-sm text-primary-foreground"
        >
          Back to invoices
        </button>
      </div>
    );
  }
  return (
    <InvoiceEditor
      initial={inv}
      mode="edit"
      onSave={(updated) => {
        setInvoices((prev) => prev.map((x) => (x.id === updated.id ? { ...updated, updatedAt: Date.now() } : x)));
        toast.success("Saved");
      }}
    />
  );
}

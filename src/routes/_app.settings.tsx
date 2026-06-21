import { createFileRoute } from "@tanstack/react-router";
import { useSettings, defaultSettings } from "@/lib/store";
import { Field, Area } from "@/components/Field";
import { INDIAN_STATES, isValidGSTIN } from "@/lib/format";
import { Building2, Sliders, Image as ImageIcon, ChevronDown, Save } from "lucide-react";
import { toast } from "sonner";

import { BRAND } from "@/lib/constants";

export const Route = createFileRoute("/_app/settings")({
  head: () => ({ meta: [{ title: `Settings — ${BRAND.name}` }] }),
  component: SettingsPage,
});

function SettingsPage() {
  const [s, setS] = useSettings();

  const upload = (k: "logo" | "signature") => (file: File) => {
    const r = new FileReader();
    r.onload = () => setS((p) => ({ ...p, business: { ...p.business, [k]: String(r.result) } }));
    r.readAsDataURL(file);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-end justify-between">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight text-grad">Settings</h1>
          <p className="mt-1 text-sm text-muted-foreground">Defaults used when creating new invoices.</p>
        </div>
        <button onClick={() => { toast.success("Settings saved"); }} className="inline-flex h-10 items-center gap-1.5 rounded-xl bg-gradient-to-br from-blue-500 to-violet-500 px-4 text-sm font-medium text-white shadow-glow">
          <Save className="h-4 w-4" /> Saved automatically
        </button>
      </div>

      <Section icon={<Building2 className="h-4 w-4" />} title="Business profile">
        <div className="grid gap-3 sm:grid-cols-2">
          <Field label="Business Name" value={s.business.name} onChange={(e) => setS({ ...s, business: { ...s.business, name: e.target.value } })} />
          <Field label="GSTIN" value={s.business.gstin}
            error={s.business.gstin && !isValidGSTIN(s.business.gstin) ? "Invalid GSTIN" : undefined}
            onChange={(e) => setS({ ...s, business: { ...s.business, gstin: e.target.value.toUpperCase() } })} />
          <Field label="Phone" value={s.business.phone} onChange={(e) => setS({ ...s, business: { ...s.business, phone: e.target.value } })} />
          <Field label="Email" type="email" value={s.business.email} onChange={(e) => setS({ ...s, business: { ...s.business, email: e.target.value } })} />
          <div className="sm:col-span-2">
            <Area label="Address" value={s.business.address} onChange={(e) => setS({ ...s, business: { ...s.business, address: e.target.value } })} />
          </div>
          <Selector label="State" value={s.business.stateCode} onChange={(v) => setS({ ...s, business: { ...s.business, stateCode: v } })}>
            <option value="">Select state…</option>
            {INDIAN_STATES.map((x) => <option key={x.code} value={x.code}>{x.code} — {x.name}</option>)}
          </Selector>
          <div className="grid grid-cols-2 gap-3">
            <UploadField label="Logo" value={s.business.logo} onChange={upload("logo")} onClear={() => setS({ ...s, business: { ...s.business, logo: undefined } })} />
            <UploadField label="Signature" value={s.business.signature} onChange={upload("signature")} onClear={() => setS({ ...s, business: { ...s.business, signature: undefined } })} />
          </div>
        </div>
      </Section>

      <Section icon={<Sliders className="h-4 w-4" />} title="Invoice defaults">
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          <Field label="Default GST %" type="number" value={s.defaults.gst} onChange={(e) => setS({ ...s, defaults: { ...s.defaults, gst: Number(e.target.value) } })} />
          <Selector label="Default Currency" value={s.defaults.currency} onChange={(v) => setS({ ...s, defaults: { ...s.defaults, currency: v } })}>
            <option value="INR">₹ INR</option><option value="USD">$ USD</option>
            <option value="EUR">€ EUR</option><option value="GBP">£ GBP</option><option value="AED">AED</option>
          </Selector>
          <Field label="Invoice Prefix" value={s.defaults.prefix} onChange={(e) => setS({ ...s, defaults: { ...s.defaults, prefix: e.target.value } })} />
          <Selector label="Default Template" value={s.defaults.template} onChange={(v) => setS({ ...s, defaults: { ...s.defaults, template: v as any } })}>
            <option value="modern">Modern</option><option value="minimal">Minimal</option>
            <option value="corporate">Corporate</option><option value="gradient">Gradient</option><option value="classic">Classic</option>
          </Selector>
          <Field label="UPI ID" value={s.defaults.upiId} onChange={(e) => setS({ ...s, defaults: { ...s.defaults, upiId: e.target.value } })} />
          <Field label="UPI Receiver Name" value={s.defaults.upiName} onChange={(e) => setS({ ...s, defaults: { ...s.defaults, upiName: e.target.value } })} />
          <div className="sm:col-span-2 lg:col-span-3">
            <Area label="Default Terms & Conditions" value={s.defaults.terms} onChange={(e) => setS({ ...s, defaults: { ...s.defaults, terms: e.target.value } })} />
          </div>
        </div>
        <div className="mt-4 flex justify-end">
          <button onClick={() => { setS(defaultSettings); toast.success("Reset to defaults"); }} className="text-xs text-muted-foreground hover:text-foreground">
            Reset to defaults
          </button>
        </div>
      </Section>
    </div>
  );
}

function Section({ icon, title, children }: { icon: React.ReactNode; title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-2xl border border-border/70 bg-card/60 p-5 backdrop-blur-xl shadow-card">
      <div className="mb-4 flex items-center gap-2">
        <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500/20 to-violet-500/20 text-blue-300 ring-1 ring-white/10">{icon}</div>
        <div className="text-sm font-semibold">{title}</div>
      </div>
      {children}
    </div>
  );
}

function Selector({ label, value, onChange, children }: { label: string; value: string; onChange: (v: string) => void; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-xs font-medium text-muted-foreground">{label}</label>
      <div className="relative">
        <select value={value} onChange={(e) => onChange(e.target.value)} className="h-10 w-full appearance-none rounded-xl border border-border/70 bg-surface-1/60 px-3 pr-8 text-sm outline-none focus:border-primary/60">
          {children}
        </select>
        <ChevronDown className="pointer-events-none absolute right-2 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
      </div>
    </div>
  );
}

function UploadField({ label, value, onChange, onClear }: { label: string; value?: string; onChange: (f: File) => void; onClear: () => void }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-xs font-medium text-muted-foreground">{label}</label>
      <label className="flex h-10 cursor-pointer items-center gap-2 rounded-xl border border-dashed border-border/70 bg-surface-1/40 px-3 text-xs text-muted-foreground hover:border-white/20 hover:text-foreground">
        <ImageIcon className="h-4 w-4" />
        {value ? "Replace" : "Upload"}
        <input type="file" accept="image/*" className="hidden" onChange={(e) => e.target.files?.[0] && onChange(e.target.files[0])} />
      </label>
      {value && (
        <div className="mt-1 flex items-center gap-2">
          <img src={value} alt={label} className="h-10 w-10 rounded-lg object-cover ring-1 ring-white/10" />
          <button onClick={onClear} className="text-[11px] text-muted-foreground hover:text-rose-300">Remove</button>
        </div>
      )}
    </div>
  );
}

import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";
import { useEffect, useState, useMemo } from "react";
import {
  ArrowRight, Bolt, Shield, FileCheck2, WifiOff, Sparkles, Smartphone,
  KeyRound, CheckCircle2, Star, Receipt, BadgeCheck, Wand2,
} from "lucide-react";
import { Logo } from "@/components/Logo";
import { SiteFooter } from "@/components/SiteFooter";
import { useInvoices, useHydrated, useSettings } from "@/lib/store";
import { computeTotals } from "@/lib/invoice";
import { formatCompactINR } from "@/lib/format";
import { BRAND } from "@/lib/constants";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: `${BRAND.name} — ${BRAND.tagline}` },
      { name: "description", content: BRAND.description },
      { property: "og:title", content: `${BRAND.name} — ${BRAND.tagline}` },
      { property: "og:description", content: BRAND.description },
    ],
  }),
  component: Landing,
});

function Landing() {
  return (
    <div className="relative overflow-hidden">
      <BackgroundFX />
      <Nav />
      <Hero />
      <Logos />
      <Features />
      <Stats />
      <Showcase />
      <Testimonials />
      <Pricing />
      <FAQ />
      <Footer />
    </div>
  );
}

function BackgroundFX() {
  return (
    <>
      <div className="pointer-events-none absolute inset-0 -z-10 bg-aurora opacity-70" />
      <div className="pointer-events-none absolute inset-0 -z-10 bg-grid opacity-[0.18] mask-fade-b" />
      <div className="pointer-events-none absolute -top-40 left-1/2 -z-10 h-[700px] w-[1100px] -translate-x-1/2 rounded-full bg-blue-500/25 blur-[160px]" />
      <div className="pointer-events-none absolute top-40 right-0 -z-10 h-[500px] w-[500px] rounded-full bg-violet-500/20 blur-[140px]" />
    </>
  );
}

function Nav() {
  return (
    <header className="sticky top-0 z-40 border-b border-border/40 bg-background/40 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-6xl items-center px-6">
        <Link to="/"><Logo /></Link>
        <nav className="ml-10 hidden gap-7 text-sm text-muted-foreground md:flex">
          <a href="#features" className="hover:text-foreground">Features</a>
          <a href="#showcase" className="hover:text-foreground">Templates</a>
          <a href="#pricing" className="hover:text-foreground">Pricing</a>
          <a href="#faq" className="hover:text-foreground">FAQ</a>
        </nav>
        <div className="ml-auto flex items-center gap-2">
          <Link to="/dashboard" className="hidden sm:inline-flex h-9 items-center rounded-xl px-3 text-sm text-muted-foreground hover:text-foreground">
            Open app
          </Link>
          <Link
            to="/invoices/new"
            className="inline-flex h-9 items-center gap-1.5 rounded-xl bg-gradient-to-br from-blue-500 to-violet-500 px-3.5 text-sm font-medium text-white shadow-glow hover:opacity-90"
          >
            Start Free <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section className="relative mx-auto max-w-6xl px-6 pt-20 pb-24 sm:pt-28">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mx-auto flex max-w-xl items-center justify-center gap-2 rounded-full border border-border/70 bg-white/5 px-3.5 py-1.5 text-xs text-muted-foreground backdrop-blur"
      >
        <Sparkles className="h-3.5 w-3.5 text-blue-400" />
        New • UPI QR code, 5 templates, instant PDF
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.05 }}
        className="mx-auto mt-6 max-w-3xl text-center text-5xl font-semibold tracking-tight sm:text-6xl md:text-7xl"
      >
        <span className="text-grad">GST invoices,</span>
        <br />
        <span className="text-grad-brand">in seconds.</span>
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.12 }}
        className="mx-auto mt-6 max-w-2xl text-center text-base text-muted-foreground sm:text-lg"
      >
        Built for Indian freelancers, agencies and startups. Pixel-perfect PDFs, CGST/SGST/IGST done right,
        UPI QR codes — all in one calm, beautiful workspace. No signup.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.18 }}
        className="mt-8 flex flex-wrap items-center justify-center gap-3"
      >
        <Link
          to="/invoices/new"
          className="group inline-flex h-12 items-center gap-2 rounded-xl bg-gradient-to-br from-blue-500 to-violet-500 px-5 text-sm font-medium text-white shadow-glow transition hover:scale-[1.02]"
        >
          Create your first invoice
          <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
        </Link>
        <a
          href="#showcase"
          className="inline-flex h-12 items-center gap-2 rounded-xl border border-border/70 bg-white/5 px-5 text-sm text-foreground hover:bg-white/10"
        >
          Watch demo
        </a>
      </motion.div>

      <div className="mt-16">
        <FloatingInvoiceScene />
      </div>
    </section>
  );
}

function FloatingInvoiceScene() {
  const mx = useMotionValue(0); const my = useMotionValue(0);
  const rx = useSpring(useTransform(my, [-200, 200], [6, -6]), { stiffness: 100, damping: 14 });
  const ry = useSpring(useTransform(mx, [-200, 200], [-6, 6]), { stiffness: 100, damping: 14 });
  const [total, setTotal] = useState(0);
  useEffect(() => {
    let v = 0; const target = 28675;
    const id = setInterval(() => {
      v = Math.min(target, v + 350 + Math.random() * 700);
      setTotal(v);
      if (v >= target) clearInterval(id);
    }, 30);
    return () => clearInterval(id);
  }, []);

  return (
    <div
      className="relative mx-auto h-[480px] max-w-4xl"
      onMouseMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        mx.set(e.clientX - r.left - r.width / 2);
        my.set(e.clientY - r.top - r.height / 2);
      }}
      onMouseLeave={() => { mx.set(0); my.set(0); }}
    >
      {/* Glow */}
      <div className="absolute inset-x-12 top-10 -z-0 h-72 rounded-full bg-gradient-to-r from-blue-500/30 via-cyan-400/20 to-violet-500/30 blur-3xl" />

      {/* Floating side cards */}
      <motion.div
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="absolute left-0 top-12 hidden w-56 -rotate-6 rounded-2xl border border-border/70 bg-card/80 p-4 shadow-glow backdrop-blur-xl sm:block"
      >
        <div className="text-[10px] uppercase tracking-widest text-muted-foreground">CGST + SGST</div>
        <div className="mt-1 text-lg font-semibold text-grad">9% + 9%</div>
        <div className="mt-3 h-1 w-full rounded-full bg-white/10">
          <motion.div className="h-1 rounded-full bg-gradient-to-r from-blue-500 to-violet-500"
            initial={{ width: 0 }} animate={{ width: "78%" }} transition={{ duration: 1.4, ease: "easeOut" }} />
        </div>
        <div className="mt-3 flex items-center gap-2 text-xs text-muted-foreground">
          <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" /> Intra-state detected
        </div>
      </motion.div>

      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        className="absolute right-0 top-32 hidden w-60 rotate-6 rounded-2xl border border-border/70 bg-card/80 p-4 shadow-glow backdrop-blur-xl sm:block"
      >
        <div className="text-[10px] uppercase tracking-widest text-muted-foreground">Grand Total</div>
        <div className="mt-1 text-2xl font-semibold text-grad-brand">
          ₹{Math.round(total).toLocaleString("en-IN")}
        </div>
        <div className="mt-3 grid grid-cols-3 gap-2 text-[10px]">
          <div className="rounded-md bg-white/5 p-2"><div className="text-muted-foreground">Sub</div><div>₹24.3K</div></div>
          <div className="rounded-md bg-white/5 p-2"><div className="text-muted-foreground">Tax</div><div>₹4.37K</div></div>
          <div className="rounded-md bg-white/5 p-2"><div className="text-muted-foreground">Items</div><div>5</div></div>
        </div>
      </motion.div>

      {/* Main invoice card */}
      <motion.div
        style={{ rotateX: rx, rotateY: ry, transformPerspective: 1200 }}
        className="relative mx-auto mt-10 w-full max-w-2xl overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.06] to-white/[0.02] p-8 shadow-2xl backdrop-blur-2xl"
      >
        <div className="absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-white/40 to-transparent" />
        <div className="flex items-start justify-between">
          <div>
            <div className="text-[10px] uppercase tracking-widest text-muted-foreground">Invoice</div>
            <div className="mt-1 text-2xl font-semibold tracking-tight">INV-2026-0142</div>
            <div className="mt-1 text-xs text-muted-foreground">Issued · 21 Jun 2026</div>
          </div>
          <div className="rounded-xl bg-gradient-to-br from-blue-500 to-violet-500 p-2.5">
            <Receipt className="h-5 w-5 text-white" />
          </div>
        </div>

        <div className="mt-6 grid grid-cols-2 gap-4 text-xs">
          <div className="rounded-xl border border-white/10 bg-white/5 p-3">
            <div className="text-muted-foreground">Bill To</div>
            <div className="mt-1 text-sm text-foreground">Aurora Studio Pvt Ltd</div>
            <div className="text-muted-foreground">29ABCDE1234F1Z5</div>
          </div>
          <div className="rounded-xl border border-white/10 bg-white/5 p-3">
            <div className="text-muted-foreground">From</div>
            <div className="mt-1 text-sm text-foreground">Northwind Labs</div>
            <div className="text-muted-foreground">27AAACN1234A1Z2</div>
          </div>
        </div>

        <div className="mt-5 overflow-hidden rounded-xl border border-white/10">
          {[
            { name: "UI/UX design retainer", qty: 1, rate: 18000 },
            { name: "Landing page revamp", qty: 1, rate: 6300 },
          ].map((r, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 + i * 0.1 }}
              className="flex items-center justify-between border-b border-white/5 px-4 py-3 text-sm last:border-b-0"
            >
              <span>{r.name}</span>
              <span className="text-muted-foreground">{r.qty} × ₹{r.rate.toLocaleString("en-IN")}</span>
            </motion.div>
          ))}
        </div>

        <div className="mt-5 flex items-center justify-between rounded-xl bg-gradient-to-r from-blue-500 to-violet-500 p-4 text-white">
          <span className="text-xs uppercase tracking-widest opacity-90">Total due</span>
          <span className="text-xl font-semibold">₹{Math.round(total).toLocaleString("en-IN")}</span>
        </div>
      </motion.div>
    </div>
  );
}

function Logos() {
  const items = ["Razorpay", "Stripe", "Tally", "Zoho", "Paytm", "GST Council", "MCA"];
  return (
    <section className="border-y border-border/40 bg-background/40 py-8">
      <div className="mx-auto max-w-6xl px-6">
        <div className="text-center text-xs uppercase tracking-widest text-muted-foreground/70">
          GST-compliant · Built for Indian businesses
        </div>
        <div className="mt-5 grid grid-cols-3 items-center gap-6 text-center text-sm text-muted-foreground/60 sm:grid-cols-7">
          {items.map((i) => (<div key={i} className="font-semibold tracking-tight">{i}</div>))}
        </div>
      </div>
    </section>
  );
}

function Features() {
  const f = [
    { icon: Bolt, title: "Lightning Fast", desc: "Generate a perfect invoice in under 30 seconds with smart defaults." },
    { icon: BadgeCheck, title: "GST Ready", desc: "CGST, SGST, IGST auto-applied based on place of supply." },
    { icon: FileCheck2, title: "Professional PDFs", desc: "Print-quality, vector-clean PDF exports at 2× resolution." },
    { icon: WifiOff, title: "Works Offline", desc: "Local-first. Your invoices never leave your device." },
    { icon: KeyRound, title: "No Login Required", desc: "Open the app, start invoicing. Zero friction." },
    { icon: Shield, title: "Secure by Design", desc: "Browser storage only. No servers, no tracking." },
    { icon: Smartphone, title: "Responsive", desc: "Designed for desktop, tuned for mobile and tablet." },
    { icon: Wand2, title: "5 Beautiful Templates", desc: "Switch instantly between Modern, Minimal, Corporate, Gradient, Classic." },
  ];
  return (
    <section id="features" className="mx-auto max-w-6xl px-6 py-24">
      <div className="max-w-2xl">
        <div className="text-xs uppercase tracking-widest text-blue-400">Features</div>
        <h2 className="mt-3 text-4xl font-semibold tracking-tight sm:text-5xl text-grad">
          Everything you need to invoice — and nothing you don't.
        </h2>
        <p className="mt-4 text-muted-foreground">
          Crafted for Indian businesses. Calm, fast, and uncompromising on detail.
        </p>
      </div>
      <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {f.map((item, i) => (
          <motion.div
            key={item.title}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.4, delay: i * 0.04 }}
            className="group relative overflow-hidden rounded-2xl border border-border/70 bg-card/60 p-5 backdrop-blur-xl transition hover:-translate-y-0.5 hover:border-white/15"
          >
            <div className="absolute -top-12 -right-12 h-32 w-32 rounded-full bg-blue-500/15 opacity-0 blur-2xl transition group-hover:opacity-100" />
            <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500/20 to-violet-500/20 text-blue-400 ring-1 ring-white/10">
              <item.icon className="h-5 w-5" />
            </div>
            <div className="mt-4 text-base font-semibold">{item.title}</div>
            <div className="mt-1 text-sm text-muted-foreground">{item.desc}</div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

function Stats() {
  const [invoices] = useInvoices();
  const hydrated = useHydrated();

  const stats = useMemo(() => {
    if (!hydrated) {
      return [
        { v: "—", l: "Your Invoices" },
        { v: "—", l: "Total Value" },
        { v: "100%", l: "Local & Private" },
        { v: "<30s", l: "To First Invoice" },
      ];
    }
    let value = 0;
    for (const inv of invoices) value += computeTotals(inv).total;
    return [
      { v: invoices.length.toLocaleString("en-IN"), l: "Your Invoices" },
      { v: value > 0 ? formatCompactINR(value) : "₹0", l: "Total Value" },
      { v: "100%", l: "Local & Private" },
      { v: "<30s", l: "To First Invoice" },
    ];
  }, [invoices, hydrated]);

  return (
    <section className="relative border-y border-border/40 bg-background/30 py-16">
      <div className="mx-auto grid max-w-6xl grid-cols-2 gap-8 px-6 md:grid-cols-4">
        {stats.map((s) => (
          <div key={s.l} className="text-center">
            <div className="text-4xl font-semibold tracking-tight text-grad-brand sm:text-5xl" style={{ fontFamily: "Space Grotesk, sans-serif" }}>{s.v}</div>
            <div className="mt-2 text-xs uppercase tracking-widest text-muted-foreground">{s.l}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

function Showcase() {
  const navigate = useNavigate();
  const [settings, setSettings] = useSettings();

  const handleTemplateClick = (id: string) => {
    setSettings((s) => ({
      ...s,
      defaults: { ...s.defaults, template: id as any },
    }));
    navigate({ to: "/invoices/new" });
  };

  const templates = [
    { id: "modern", name: "Modern", c: "from-blue-500 to-violet-500" },
    { id: "minimal", name: "Minimal", c: "from-slate-700 to-slate-900" },
    { id: "corporate", name: "Corporate", c: "from-slate-800 to-slate-900" },
    { id: "gradient", name: "Gradient", c: "from-fuchsia-500 via-violet-500 to-blue-500" },
    { id: "classic", name: "Classic", c: "from-amber-600 to-amber-800" },
  ];
  return (
    <section id="showcase" className="mx-auto max-w-6xl px-6 py-24">
      <div className="max-w-2xl">
        <div className="text-xs uppercase tracking-widest text-blue-400">Templates</div>
        <h2 className="mt-3 text-4xl font-semibold tracking-tight sm:text-5xl text-grad">Five templates. One click apart.</h2>
        <p className="mt-4 text-muted-foreground">Switch between handcrafted templates without losing a thing.</p>
      </div>
      <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
        {templates.map((t, i) => (
          <motion.button
            key={t.id}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.05 }}
            onClick={() => handleTemplateClick(t.id)}
            className="group relative overflow-hidden rounded-2xl border border-border/70 bg-card/60 p-2 backdrop-blur-xl text-left hover:border-white/20 transition-all cursor-pointer"
          >
            <div className={`relative aspect-[3/4] overflow-hidden rounded-xl bg-gradient-to-br ${t.c} transition-transform group-hover:scale-105`}>
              <div className="absolute inset-x-3 top-3 h-3 rounded bg-white/30" />
              <div className="absolute left-3 top-9 h-2 w-1/2 rounded bg-white/25" />
              <div className="absolute inset-x-3 top-16 h-px bg-white/30" />
              {Array.from({ length: 5 }).map((_, k) => (
                <div key={k} className="absolute left-3 right-3 h-1.5 rounded bg-white/20" style={{ top: 76 + k * 14 }} />
              ))}
              <div className="absolute bottom-3 left-3 right-3 rounded-lg bg-white/25 p-2">
                <div className="h-2 w-1/3 rounded bg-white/60" />
              </div>
            </div>
            <div className="px-2 pt-3 pb-2 text-sm font-medium">{t.name}</div>
          </motion.button>
        ))}
      </div>
    </section>
  );
}

function Testimonials() {
  const t = [
    { name: "Priya M.", role: "Designer, Bengaluru", q: "Cleanest invoice tool I've used. PDFs look like they came from a studio." },
    { name: "Rohit S.", role: "Founder, SaaS startup", q: "GST handled flawlessly. We dropped Zoho for this." },
    { name: "Anjali K.", role: "Freelancer, Mumbai", q: "Created my first invoice in literally 40 seconds." },
  ];
  return (
    <section className="mx-auto max-w-6xl px-6 py-24">
      <div className="max-w-2xl">
        <div className="text-xs uppercase tracking-widest text-blue-400">Loved by founders</div>
        <h2 className="mt-3 text-4xl font-semibold tracking-tight sm:text-5xl text-grad">Built for how India bills.</h2>
      </div>
      <div className="mt-12 grid gap-4 sm:grid-cols-3">
        {t.map((x) => (
          <div key={x.name} className="glass rounded-2xl p-6">
            <div className="flex gap-0.5 text-amber-400">
              {Array.from({ length: 5 }).map((_, i) => <Star key={i} className="h-3.5 w-3.5 fill-current" />)}
            </div>
            <p className="mt-4 text-sm leading-relaxed text-foreground/90">"{x.q}"</p>
            <div className="mt-5 text-xs text-muted-foreground">
              <div className="font-medium text-foreground">{x.name}</div>
              <div>{x.role}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function Pricing() {
  return (
    <section id="pricing" className="mx-auto max-w-6xl px-6 py-24">
      <div className="mx-auto max-w-2xl text-center">
        <div className="text-xs uppercase tracking-widest text-blue-400">Pricing</div>
        <h2 className="mt-3 text-4xl font-semibold tracking-tight sm:text-5xl text-grad">Free. Forever.</h2>
        <p className="mt-4 text-muted-foreground">No paywalls, no upsells, no account. Every feature, every template — free.</p>
      </div>
      <div className="mx-auto mt-12 max-w-md">
        <div className="grad-border rounded-3xl p-8 text-center shadow-glow">
          <div className="text-sm uppercase tracking-widest text-muted-foreground">Free</div>
          <div className="mt-2 text-6xl font-semibold tracking-tight text-grad-brand">₹0</div>
          <div className="mt-1 text-sm text-muted-foreground">Everything included</div>
          <ul className="mt-6 space-y-2 text-left text-sm">
            {[
              "Unlimited GST invoices",
              "5 premium templates",
              "PDF + PNG export",
              "UPI QR codes",
              "Works offline",
              "No signup required",
            ].map((x) => (
              <li key={x} className="flex items-center gap-2 text-foreground/90">
                <CheckCircle2 className="h-4 w-4 text-emerald-400" /> {x}
              </li>
            ))}
          </ul>
          <Link
            to="/invoices/new"
            className="mt-8 inline-flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-br from-blue-500 to-violet-500 text-sm font-medium text-white shadow-glow hover:opacity-90"
          >
            Get started <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}

function FAQ() {
  const items = [
    { q: "Do I need to sign up?", a: `No. ${BRAND.name} is local-first. Open the app and start invoicing immediately.` },
    { q: "Is this GST compliant?", a: "Yes. We support CGST, SGST, IGST, place-of-supply detection, HSN/SAC codes, reverse charge and round-off." },
    { q: "Where is my data stored?", a: "Entirely in your browser's local storage. Nothing is ever sent to a server." },
    { q: "Can I export to PDF?", a: "Yes. Pixel-perfect, 2× resolution PDFs and PNGs are one click away." },
    { q: "Does it work offline?", a: "Once loaded, the entire app works without an internet connection." },
  ];
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section id="faq" className="mx-auto max-w-3xl px-6 py-24">
      <div className="text-center">
        <div className="text-xs uppercase tracking-widest text-blue-400">FAQ</div>
        <h2 className="mt-3 text-4xl font-semibold tracking-tight text-grad">Questions, answered.</h2>
      </div>
      <div className="mt-10 space-y-3">
        {items.map((it, i) => (
          <div key={it.q} className="overflow-hidden rounded-2xl border border-border/70 bg-card/60 backdrop-blur-xl">
            <button
              onClick={() => setOpen(open === i ? null : i)}
              className="flex w-full items-center justify-between px-5 py-4 text-left text-sm font-medium"
            >
              {it.q}
              <span className={`transition ${open === i ? "rotate-45" : ""}`}>+</span>
            </button>
            <motion.div
              initial={false}
              animate={{ height: open === i ? "auto" : 0, opacity: open === i ? 1 : 0 }}
              className="overflow-hidden"
            >
              <div className="px-5 pb-5 text-sm text-muted-foreground">{it.a}</div>
            </motion.div>
          </div>
        ))}
      </div>
    </section>
  );
}

function Footer() {
  return <SiteFooter />;
}

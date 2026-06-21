import { Link } from "@tanstack/react-router";
import { ExternalLink, Github, Linkedin, Mail } from "lucide-react";
import { AUTHOR, BRAND, DIGITAL_HEROES_URL } from "@/lib/constants";

export function SiteFooter({ compact = false }: { compact?: boolean }) {
  if (compact) {
    return (
      <footer className="mt-12 border-t border-border/50 pt-6 text-center text-sm text-muted-foreground">
        <p>
          Built by <strong className="text-foreground">{AUTHOR.name}</strong>
        </p>
        <p className="mt-1">
          <a href={`mailto:${AUTHOR.email}`} className="inline-flex items-center gap-1 text-blue-400 hover:underline">
            <Mail className="h-3.5 w-3.5" aria-hidden />
            {AUTHOR.email}
          </a>
        </p>
        <div className="mt-3 flex flex-wrap items-center justify-center gap-3">
          <a href={AUTHOR.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub profile" className="inline-flex items-center gap-1 text-muted-foreground hover:text-foreground">
            <Github className="h-4 w-4" aria-hidden /> GitHub
          </a>
          <a href={AUTHOR.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn profile" className="inline-flex items-center gap-1 text-muted-foreground hover:text-foreground">
            <Linkedin className="h-4 w-4" aria-hidden /> LinkedIn
          </a>
        </div>
        <a
          href={DIGITAL_HEROES_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 inline-flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-700"
        >
          Built for Digital Heroes
          <ExternalLink className="h-3.5 w-3.5" aria-hidden />
        </a>
      </footer>
    );
  }

  return (
    <footer className="border-t border-border/40 bg-background/40">
      <div className="mx-auto max-w-6xl px-6 py-12">
        <div className="flex flex-wrap items-start justify-between gap-8">
          <div>
            <div className="text-lg font-semibold tracking-tight">{BRAND.name}</div>
            <p className="mt-2 max-w-sm text-sm text-muted-foreground">
              Beautiful GST invoices for India&apos;s makers. Free, secure, local-first.
            </p>
          </div>
          <div className="space-y-1 text-sm">
            <div className="text-xs uppercase tracking-widest text-muted-foreground/70">Built by</div>
            <div className="font-medium text-foreground">{AUTHOR.name}</div>
            <a href={`mailto:${AUTHOR.email}`} className="inline-flex items-center gap-1 text-blue-400 hover:underline">
              <Mail className="h-3.5 w-3.5" aria-hidden />
              {AUTHOR.email}
            </a>
            <div className="mt-2 flex gap-3">
              <a href={AUTHOR.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="text-muted-foreground hover:text-foreground">
                <Github className="h-4 w-4" />
              </a>
              <a href={AUTHOR.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="text-muted-foreground hover:text-foreground">
                <Linkedin className="h-4 w-4" />
              </a>
            </div>
          </div>
          <div className="flex flex-wrap gap-8 text-sm">
            <FootCol title="Product" links={[["Dashboard", "/dashboard"], ["Invoices", "/invoices"], ["GST Calculator", "/gst-calculator"], ["Settings", "/settings"]]} />
            <FootCol title="Resources" links={[["Features", "#features"], ["Templates", "#showcase"], ["Pricing", "#pricing"], ["FAQ", "#faq"]]} />
          </div>
        </div>
        <div className="mt-10 flex flex-wrap items-center justify-between gap-4 border-t border-border/40 pt-6">
          <div className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} {BRAND.name} · {AUTHOR.name}
          </div>
          <a
            href={DIGITAL_HEROES_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-700"
          >
            Built for Digital Heroes
            <ExternalLink className="h-3.5 w-3.5" aria-hidden />
          </a>
        </div>
      </div>
    </footer>
  );
}

function FootCol({ title, links }: { title: string; links: Array<[string, string]> }) {
  return (
    <div>
      <div className="text-xs uppercase tracking-widest text-muted-foreground/70">{title}</div>
      <div className="mt-3 flex flex-col gap-2">
        {links.map(([label, to]) =>
          to.startsWith("#") ? (
            <a key={label} href={to} className="text-muted-foreground hover:text-foreground">{label}</a>
          ) : (
            <Link key={label} to={to} className="text-muted-foreground hover:text-foreground">{label}</Link>
          ),
        )}
      </div>
    </div>
  );
}

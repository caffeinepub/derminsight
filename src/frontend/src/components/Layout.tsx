import { Button } from "@/components/ui/button";
import { Link, useLocation } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import { useState } from "react";

const navLinks = [
  { href: "/how-it-works", label: "How It Works" },
  { href: "/services", label: "Services" },
  { href: "/skin-concerns", label: "Skin Concerns" },
  { href: "/about", label: "About" },
  { href: "/legal", label: "Legal" },
];

function NavLink({
  href,
  label,
  onClick,
}: {
  href: string;
  label: string;
  onClick?: () => void;
}) {
  const location = useLocation();
  const isActive = location.pathname === href;
  return (
    <Link
      to={href}
      onClick={onClick}
      className={`nav-link ${isActive ? "nav-link-active" : ""}`}
    >
      {label}
    </Link>
  );
}

export default function Layout({ children }: { children: React.ReactNode }) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col">
      {/* Top Nav */}
      <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
        <div className="container mx-auto max-w-6xl px-4 sm:px-6">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link
              to="/"
              className="flex items-center gap-2.5 no-underline group"
            >
              <div
                className="w-7 h-7 rounded-sm flex items-center justify-center flex-shrink-0"
                style={{
                  background:
                    "linear-gradient(135deg, oklch(0.58 0.1 195), oklch(0.52 0.18 280))",
                }}
              >
                <svg
                  viewBox="0 0 20 20"
                  fill="none"
                  className="w-4 h-4"
                  aria-hidden="true"
                >
                  <circle cx="10" cy="10" r="4" fill="white" opacity="0.9" />
                  <circle
                    cx="10"
                    cy="10"
                    r="7.5"
                    stroke="white"
                    strokeWidth="1.2"
                    opacity="0.5"
                  />
                  <circle
                    cx="10"
                    cy="10"
                    r="3"
                    stroke="white"
                    strokeWidth="0.8"
                    opacity="0.3"
                  />
                </svg>
              </div>
              <span className="font-display font-bold text-lg tracking-tight text-foreground">
                DermInsight
              </span>
            </Link>

            {/* Desktop Nav */}
            <nav
              className="hidden md:flex items-center gap-7"
              aria-label="Main navigation"
            >
              {navLinks.map((l) => (
                <NavLink key={l.href} href={l.href} label={l.label} />
              ))}
            </nav>

            {/* CTA + Mobile toggle */}
            <div className="flex items-center gap-3">
              <Link to="/start" className="hidden sm:block">
                <Button
                  size="sm"
                  className="bg-teal hover:bg-teal-dark text-white font-medium text-sm px-4 ring-1 ring-teal/30"
                >
                  Begin Analysis
                </Button>
              </Link>
              <button
                type="button"
                className="md:hidden p-2 rounded-md hover:bg-muted transition-colors"
                onClick={() => setMobileOpen(!mobileOpen)}
                aria-label={mobileOpen ? "Close menu" : "Open menu"}
                aria-expanded={mobileOpen}
              >
                {mobileOpen ? (
                  <X className="w-5 h-5" />
                ) : (
                  <Menu className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>

          {/* Mobile Nav */}
          {mobileOpen && (
            <nav
              className="md:hidden border-t border-border py-4 flex flex-col gap-1"
              aria-label="Mobile navigation"
            >
              {navLinks.map((l) => (
                <NavLink
                  key={l.href}
                  href={l.href}
                  label={l.label}
                  onClick={() => setMobileOpen(false)}
                />
              ))}
              <Link to="/start" onClick={() => setMobileOpen(false)}>
                <Button
                  size="sm"
                  className="mt-3 w-full bg-teal hover:bg-teal-dark text-white font-medium"
                >
                  Begin Analysis
                </Button>
              </Link>
            </nav>
          )}
        </div>
      </header>

      {/* Main content */}
      <main className="flex-1">{children}</main>

      {/* Footer */}
      <footer className="border-t border-border bg-secondary/50 mt-auto">
        <div className="container mx-auto max-w-6xl px-4 sm:px-6 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
            {/* Brand */}
            <div className="md:col-span-2">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-6 h-6 rounded-sm bg-teal flex items-center justify-center">
                  <svg
                    viewBox="0 0 20 20"
                    fill="none"
                    className="w-3.5 h-3.5"
                    aria-hidden="true"
                  >
                    <circle cx="10" cy="10" r="4" fill="white" opacity="0.9" />
                    <circle
                      cx="10"
                      cy="10"
                      r="7.5"
                      stroke="white"
                      strokeWidth="1.2"
                      opacity="0.5"
                    />
                  </svg>
                </div>
                <span className="font-display font-bold text-base tracking-tight">
                  DermInsight
                </span>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed max-w-xs">
                Educational skincare consulting. Evidence-informed guidance for
                long-term skin health.
              </p>
              <p className="text-xs text-muted-foreground mt-4 leading-relaxed max-w-sm border-l-2 border-teal pl-3">
                <strong className="font-medium text-foreground/70">
                  Medical Disclaimer:
                </strong>{" "}
                DermInsight is not a medical service. We do not provide medical
                advice, diagnosis, or treatment.
              </p>
            </div>

            {/* Pages */}
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-4">
                Pages
              </h4>
              <ul className="space-y-2.5">
                {[
                  { href: "/", label: "Home" },
                  { href: "/how-it-works", label: "How It Works" },
                  { href: "/services", label: "Services & Pricing" },
                  { href: "/skin-concerns", label: "Skin Concerns" },
                  { href: "/about", label: "About" },
                ].map((l) => (
                  <li key={l.href}>
                    <Link
                      to={l.href}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Legal */}
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-4">
                Legal
              </h4>
              <ul className="space-y-2.5">
                <li>
                  <Link
                    to="/legal"
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Legal & Disclaimers
                  </Link>
                </li>
                <li>
                  <Link
                    to="/legal"
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link
                    to="/legal"
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Consent Terms
                  </Link>
                </li>
                <li>
                  <Link
                    to="/start"
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Start Analysis
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="section-divider pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-muted-foreground">
            <p>
              &copy; {new Date().getFullYear()} DermInsight. Not a medical
              service.
            </p>
            <p>
              Built with{" "}
              <span aria-label="love" role="img">
                ♥
              </span>{" "}
              using{" "}
              <a
                href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(typeof window !== "undefined" ? window.location.hostname : "")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-foreground transition-colors underline underline-offset-2"
              >
                caffeine.ai
              </a>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

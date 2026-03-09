"use client";

import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import { useI18n } from "@/lib/i18n/context";

export function Footer() {
  const { t } = useI18n();

  const footerLinks = [
    { href: "#home", label: t.nav.home },
    { href: "#wine", label: t.nav.wine },
    { href: "#gallery", label: t.nav.gallery },
    { href: "#contact", label: t.nav.contact },
  ];

  return (
    <footer className="bg-card border-t border-border">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col items-center gap-8">
          {/* Logo */}
          <Link href="#home" className="flex items-center gap-3">
            <span className="text-2xl font-bold text-accent tracking-wider">
              {t.nav.brand}
            </span>
            <span className="text-sm text-muted-foreground tracking-widest uppercase">
              {t.nav.brandSub}
            </span>
          </Link>

          {/* Navigation */}
          <nav className="flex flex-wrap justify-center gap-6">
            {footerLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm text-muted-foreground hover:text-accent transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Divider */}
          <Separator className="w-full max-w-xs bg-border" />

          {/* Copyright */}
          <div className="text-center">
            <p className="text-sm text-muted-foreground">
              &copy; {new Date().getFullYear()} {t.footer.copyright}
            </p>
            <p className="text-xs text-muted-foreground/60 mt-2">
              {t.footer.tagline}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

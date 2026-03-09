"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useI18n } from "@/lib/i18n/context";

export function Hero() {
  const { t } = useI18n();

  return (
    <section id="home" className="relative min-h-screen flex items-center">
      {/* Background Images */}
      <div className="absolute inset-0 z-0">
        <div className="relative w-full h-full">
          <Image
            src="/images/hero-wine.jpg"
            alt="Elegant red wine pour"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background/50" />
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-32">
        <div className="max-w-2xl">
          <p className="text-accent font-medium tracking-[0.3em] uppercase mb-4">
            {t.hero.subtitle}
          </p>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground leading-tight mb-6 text-balance">
            <span className="block">{t.hero.title1}</span>
            <span className="block text-accent">{t.hero.title2}</span>
          </h1>
          <p className="text-lg text-muted-foreground mb-8 leading-relaxed max-w-xl">
            {t.hero.description}
          </p>
          <div className="flex flex-wrap gap-4">
            <Button asChild size="lg" className="px-8 bg-primary text-primary-foreground hover:bg-primary/90">
              <Link href="#wine">{t.hero.exploreWine}</Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10">
        <div className="flex flex-col items-center gap-2 text-muted-foreground">
          <span className="text-xs tracking-widest uppercase">
            {t.hero.scrollDown}
          </span>
          <div className="w-px h-12 bg-gradient-to-b from-accent to-transparent" />
        </div>
      </div>
    </section>
  );
}

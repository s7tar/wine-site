"use client";

import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { useI18n } from "@/lib/i18n/context";

export function WineSection() {
  const { t } = useI18n();

  const wineTypes = [
    {
      name: t.wine.redWine,
      description: t.wine.redWineDesc,
      color: "bg-red-900",
    },
    {
      name: t.wine.whiteWine,
      description: t.wine.whiteWineDesc,
      color: "bg-amber-200",
    },
    {
      name: t.wine.roseWine,
      description: t.wine.roseWineDesc,
      color: "bg-pink-400",
    },
  ];

  const wineGlasses = [
    { name: t.wine.bordeauxGlass, description: t.wine.bordeauxDesc },
    { name: t.wine.burgundyGlass, description: t.wine.burgundyDesc },
    { name: t.wine.whiteGlass, description: t.wine.whiteGlassDesc },
    { name: t.wine.champagneGlass, description: t.wine.champagneDesc },
  ];

  const tastingSteps = [
    { step: t.wine.look, title: t.wine.lookTitle, description: t.wine.lookDesc },
    { step: t.wine.smell, title: t.wine.smellTitle, description: t.wine.smellDesc },
    { step: t.wine.taste, title: t.wine.tasteTitle, description: t.wine.tasteDesc },
    { step: t.wine.share, title: t.wine.shareTitle, description: t.wine.shareDesc },
  ];

  return (
    <section id="wine" className="py-24 bg-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <p className="text-accent font-medium tracking-[0.3em] uppercase mb-4">
            {t.wine.subtitle}
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6 text-balance">
            {t.wine.title}
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            {t.wine.intro}
          </p>
        </div>

        {/* Hero Image */}
        <div className="relative aspect-[21/9] rounded-sm overflow-hidden mb-20">
          <Image
            src="/images/hero-wine.jpg"
            alt="Elegant red wine pour"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/40 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-8 sm:p-12">
            <p className="text-foreground/90 text-lg sm:text-xl max-w-xl leading-relaxed">
              {t.wine.heroDesc}
            </p>
          </div>
        </div>

        {/* Wine Types */}
        <div className="mb-20">
          <h3 className="text-2xl font-bold text-foreground mb-8 text-center">
            {t.wine.typeTitle}
          </h3>
          <div className="grid md:grid-cols-3 gap-6">
            {wineTypes.map((type) => (
              <Card key={type.name} className="bg-card border-border">
                <CardContent className="p-6 text-center">
                  <div
                    className={`w-16 h-16 ${type.color} rounded-full mb-6 mx-auto`}
                  />
                  <h4 className="text-lg font-bold text-foreground mb-3">
                    {type.name}
                  </h4>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {type.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Wine Content Grid */}
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-foreground">
              {t.wine.classificationTitle}
            </h3>
            <div className="space-y-4">
              <div className="border-l-2 border-accent pl-4">
                <h4 className="font-semibold text-foreground mb-2">
                  {t.wine.sugarTitle}
                </h4>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {t.wine.sugarDesc}
                </p>
              </div>
              <div className="border-l-2 border-accent pl-4">
                <h4 className="font-semibold text-foreground mb-2">
                  {t.wine.co2Title}
                </h4>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {t.wine.co2Desc}
                </p>
              </div>
              <div className="border-l-2 border-accent pl-4">
                <h4 className="font-semibold text-foreground mb-2">
                  {t.wine.bodyTitle}
                </h4>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {t.wine.bodyDesc}
                </p>
              </div>
            </div>
          </div>
          <div className="relative aspect-[4/3] rounded-sm overflow-hidden">
            <Image
              src="/images/wine-cellar.jpg"
              alt="Wine cellar"
              fill
              className="object-cover"
            />
          </div>
        </div>

        {/* Wine Glasses */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h3 className="text-2xl font-bold text-foreground mb-4">
              {t.wine.glassTitle}
            </h3>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              {t.wine.glassIntro}
            </p>
          </div>
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div className="relative aspect-[4/3] rounded-sm overflow-hidden">
              <Image
                src="/images/wine-glasses.jpg"
                alt="Wine glasses"
                fill
                className="object-cover"
              />
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              {wineGlasses.map((glass) => (
                <Card key={glass.name} className="bg-card border-border">
                  <CardContent className="p-5">
                    <h4 className="font-semibold text-foreground mb-2 text-sm">
                      {glass.name}
                    </h4>
                    <p className="text-muted-foreground text-xs leading-relaxed">
                      {glass.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>

        {/* Tasting Steps */}
        <Card className="bg-card border-border">
          <CardContent className="p-8 sm:p-12">
            <h3 className="text-2xl font-bold text-foreground mb-8 text-center">
              {t.wine.tastingTitle}
            </h3>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {tastingSteps.map((item) => (
                <div key={item.step} className="text-center">
                  <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl font-bold text-primary-foreground">
                      {item.step}
                    </span>
                  </div>
                  <h4 className="font-semibold text-foreground mb-2">
                    {item.title}
                  </h4>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}

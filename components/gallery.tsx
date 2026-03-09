"use client";

import { useState } from "react";
import Image from "next/image";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";
import { useI18n } from "@/lib/i18n/context";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";

export function Gallery() {
  const { t } = useI18n();
  const [selectedImage, setSelectedImage] = useState<{
    src: string;
    alt: string;
    title: string;
    category: string;
  } | null>(null);

  const galleryImages = [
    {
      src: "/images/gallery-1.jpg",
      alt: "Vineyard estate landscape",
      title: t.gallery.vineyard,
      category: t.gallery.wine,
    },
    {
      src: "/images/gallery-2.jpg",
      alt: "Private wine cellar",
      title: t.gallery.cellar,
      category: t.gallery.wine,
    },
    {
      src: "/images/gallery-3.jpg",
      alt: "Wine tasting ritual",
      title: t.gallery.ritual,
      category: t.gallery.wine,
    },
    {
      src: "/images/gallery-4.jpg",
      alt: "Oak wine barrels",
      title: t.gallery.barrels,
      category: t.gallery.wine,
    },
    {
      src: "/images/gallery-5.jpg",
      alt: "Art of decanting wine",
      title: t.gallery.decanting,
      category: t.gallery.wine,
    },
    {
      src: "/images/gallery-6.jpg",
      alt: "Wine grapes on vine",
      title: t.gallery.grapes,
      category: t.gallery.wine,
    },
  ];

  return (
    <section id="gallery" className="py-24 bg-card">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <p className="text-accent font-medium tracking-[0.3em] uppercase mb-4">
            {t.gallery.subtitle}
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6 text-balance">
            {t.gallery.title}
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            {t.gallery.description}
          </p>
        </div>

        {/* Gallery Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {galleryImages.map((image) => (
            <button
              type="button"
              key={image.src}
              onClick={() => setSelectedImage(image)}
              className="group relative aspect-[4/3] rounded-sm overflow-hidden cursor-pointer text-left"
            >
              <Image
                src={image.src || "/placeholder.svg"}
                alt={image.alt}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <span className="text-accent text-xs tracking-widest uppercase mb-2 block">
                  {image.category}
                </span>
                <h3 className="text-lg font-semibold text-foreground">
                  {image.title}
                </h3>
              </div>
            </button>
          ))}
        </div>

        {/* Lightbox Dialog */}
        <Dialog
          open={!!selectedImage}
          onOpenChange={() => setSelectedImage(null)}
        >
          <DialogContent className="max-w-4xl w-full bg-background/95 backdrop-blur-sm border-border p-0">
            <VisuallyHidden>
              <DialogTitle>{selectedImage?.title}</DialogTitle>
            </VisuallyHidden>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setSelectedImage(null)}
              className="absolute top-4 right-4 z-10 text-foreground hover:text-accent"
              aria-label={t.gallery.closeLightbox}
            >
              <X size={24} />
            </Button>
            {selectedImage && (
              <div className="relative aspect-[4/3] w-full">
                <Image
                  src={selectedImage.src || "/placeholder.svg"}
                  alt={selectedImage.alt}
                  fill
                  className="object-cover rounded-lg"
                />
                <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-background to-transparent rounded-b-lg">
                  <span className="text-accent text-xs tracking-widest uppercase mb-2 block">
                    {selectedImage.category}
                  </span>
                  <h3 className="text-xl font-semibold text-foreground">
                    {selectedImage.title}
                  </h3>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </section>
  );
}

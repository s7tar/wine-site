"use client";

import React from "react"

import { useState } from "react";
import Image from "next/image";
import { MapPin, Phone, Mail, Clock, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useI18n } from "@/lib/i18n/context";

export function Contact() {
  const { t } = useI18n();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const contactInfo = [
    {
      icon: MapPin,
      label: t.contact.address,
      value: t.contact.addressValue,
    },
    {
      icon: Phone,
      label: t.contact.phone,
      value: t.contact.phoneValue,
    },
    {
      icon: Mail,
      label: t.contact.email,
      value: t.contact.emailValue,
    },
    {
      icon: Clock,
      label: t.contact.hours,
      value: t.contact.hoursValue,
    },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsSubmitting(false);
    setIsSubmitted(true);
    setFormData({ name: "", email: "", phone: "", message: "" });
    setTimeout(() => setIsSubmitted(false), 3000);
  };

  return (
    <section id="contact" className="py-24 bg-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <p className="text-accent font-medium tracking-[0.3em] uppercase mb-4">
            {t.contact.subtitle}
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6 text-balance">
            {t.contact.title}
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            {t.contact.description}
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Info & Map */}
          <div className="space-y-8">
            {/* Contact Cards */}
            <div className="grid sm:grid-cols-2 gap-4">
              {contactInfo.map((item) => (
                <Card key={item.label} className="bg-card border-border">
                  <CardContent className="p-5">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center flex-shrink-0">
                        <item.icon size={18} className="text-accent" />
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">
                          {item.label}
                        </p>
                        <p className="text-sm text-foreground">{item.value}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Map */}
            <div className="relative aspect-[16/9] rounded-sm overflow-hidden border border-border">
              <Image
                src="/images/wine-tasting.jpg"
                alt="Location preview"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-primary/40" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <MapPin size={48} className="text-accent mx-auto mb-4" />
                  <p className="text-foreground font-semibold text-lg">
                    {t.contact.mapTitle}
                  </p>
                  <p className="text-foreground/80 text-sm">
                    {t.contact.mapSubtitle}
                  </p>
                  <a
                    href="https://maps.google.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 mt-4 text-accent text-sm hover:underline"
                  >
                    {t.contact.viewOnMap}
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <Card className="bg-card border-border">
            <CardContent className="p-8 sm:p-10">
              <h3 className="text-xl font-bold text-foreground mb-6">
                {t.contact.formTitle}
              </h3>
              {isSubmitted ? (
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-accent/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Send size={24} className="text-accent" />
                  </div>
                  <h4 className="text-lg font-semibold text-foreground mb-2">
                    {t.contact.submitSuccess}
                  </h4>
                  <p className="text-muted-foreground">
                    {t.contact.submitSuccessDesc}
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-foreground">
                      {t.contact.nameLabel}{" "}
                      <span className="text-accent">{t.contact.required}</span>
                    </Label>
                    <Input
                      type="text"
                      id="name"
                      required
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      className="bg-secondary border-border text-foreground"
                      placeholder={t.contact.namePlaceholder}
                    />
                  </div>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-foreground">
                        {t.contact.emailLabel}{" "}
                        <span className="text-accent">{t.contact.required}</span>
                      </Label>
                      <Input
                        type="email"
                        id="email"
                        required
                        value={formData.email}
                        onChange={(e) =>
                          setFormData({ ...formData, email: e.target.value })
                        }
                        className="bg-secondary border-border text-foreground"
                        placeholder={t.contact.emailPlaceholder}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone" className="text-foreground">
                        {t.contact.phoneLabel}
                      </Label>
                      <Input
                        type="tel"
                        id="phone"
                        value={formData.phone}
                        onChange={(e) =>
                          setFormData({ ...formData, phone: e.target.value })
                        }
                        className="bg-secondary border-border text-foreground"
                        placeholder={t.contact.phonePlaceholder}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="message" className="text-foreground">
                      {t.contact.messageLabel}{" "}
                      <span className="text-accent">{t.contact.required}</span>
                    </Label>
                    <Textarea
                      id="message"
                      required
                      rows={5}
                      value={formData.message}
                      onChange={(e) =>
                        setFormData({ ...formData, message: e.target.value })
                      }
                      className="bg-secondary border-border text-foreground resize-none"
                      placeholder={t.contact.messagePlaceholder}
                    />
                  </div>
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
                    size="lg"
                  >
                    {isSubmitting ? (
                      <>
                        <span className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin mr-2" />
                        {t.contact.submitting}
                      </>
                    ) : (
                      <>
                        <Send size={18} className="mr-2" />
                        {t.contact.submit}
                      </>
                    )}
                  </Button>
                </form>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}

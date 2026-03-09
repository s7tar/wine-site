"use client";

import React, { createContext, useContext, useState, useCallback } from "react";
import { zhCN } from "./locales/zh-CN";
import { en } from "./locales/en";
import { ja } from "./locales/ja";

export type Locale = "zh-CN" | "en" | "ja";

export type Translations = typeof zhCN;

const locales: Record<Locale, Translations> = {
  "zh-CN": zhCN,
  en: en,
  ja: ja,
};

export const localeNames: Record<Locale, string> = {
  "zh-CN": "中文",
  en: "English",
  ja: "日本語",
};

interface I18nContextType {
  locale: Locale;
  t: Translations;
  setLocale: (locale: Locale) => void;
}

const I18nContext = createContext<I18nContextType | undefined>(undefined);

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("zh-CN");

  const setLocale = useCallback((newLocale: Locale) => {
    setLocaleState(newLocale);
  }, []);

  const t = locales[locale];

  return (
    <I18nContext.Provider value={{ locale, t, setLocale }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  const context = useContext(I18nContext);
  if (context === undefined) {
    throw new Error("useI18n must be used within an I18nProvider");
  }
  return context;
}

"use client"

import en from '../locales/en.json';
import pt from '../locales/pt.json';
import { useLanguage } from "../context/LanguageContext";

const translations = {
  en,
  pt,
};

type Lang = "en" | "pt";

export function useTranslation(langOverride?: Lang) {
  const ctx = useLanguage();
  const lang: Lang = langOverride ?? ctx.lang;

  function t(key: string): string {
    const parts = key.split(".");
    let obj: any = translations[lang];
    for (const p of parts) {
      if (obj == null) return key;
      obj = obj[p];
    }
    return typeof obj === "string" ? obj : key;
  }

  return { t };
}
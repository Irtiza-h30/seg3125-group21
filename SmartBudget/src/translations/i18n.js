import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

import { TRANSLATIONS_FR } from "./fr";
import { TRANSLATIONS_EN } from "./en";

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    lng: window.localStorage.getItem("i18nextLng") ?? "en",
    resources: {
      en: {
        translation: TRANSLATIONS_EN,
      },
      fr: {
        translation: TRANSLATIONS_FR,
      },
    },
  });

export default i18n;

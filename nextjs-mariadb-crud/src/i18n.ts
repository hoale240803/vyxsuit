import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
// import HttpBackend from "i18next-http-backend";

import enTranslation from "../src/locales/en.json";

i18n
  // .use(HttpBackend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: enTranslation },
    },
    fallbackLng: "en",
    debug: true,
    interpolation: {
      escapeValue: false,
    },
    // backend: {
    //   loadPath: "/locales/{{lng}}.json",
    // },
    // detection: {
    //   order: ["querystring", "cookie", "localStorage", "navigator"],
    //   caches: ["cookie"],
    // },
  });

export default i18n;
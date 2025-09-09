import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import es from "./locales/es.json";
import fr from "./locales/fr.json";

i18next
  .use(initReactI18next)
  .init({
    resources: {
        fr: { translation: fr },
        es: { translation: es },
    },
    lng: "es",
    fallbackLng: "es",
    interpolation: {
      escapeValue: false,
    },
  });

export default i18next;
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import translationAr from "./locales/ar/translation.json";

const resources = {
    ar: { translation: translationAr },
};

i18n.use(initReactI18next).init({
    resources,
    lng: "en", // اللغة الافتراضية
    fallbackLng: "en",
    interpolation: {
        escapeValue: false, // React بيهاندل الـ XSS لوحده
    },
});

export default i18n;
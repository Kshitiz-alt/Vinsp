import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector'
import { initReactI18next } from 'react-i18next';
i18n.use(LanguageDetector)
    .use(initReactI18next)
    .init({
        debug:true,
        resources: {
            en: { translation: { newTracks: "New Tracks", showall:"show all" } },
            fr: { translation: { newTracks: "nouvelles pistes", showall:"afficher tout" } },
            Ru: { translation: { newTracks: "новые треки", showall:"показать все" } },
            zh: { translation: { newTracks: "新曲目" , showall:"显示所有"}}

        },
        lng: "en", // Default language
        fallbackLng: "en",
        interpolation: { escapeValue: false },
    });

export default i18n;
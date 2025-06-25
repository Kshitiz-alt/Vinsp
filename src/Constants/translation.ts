import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector'
import { initReactI18next } from 'react-i18next';
i18n.use(LanguageDetector)
    .use(initReactI18next)
    .init({
        debug: true,
        resources: {
            en: {
                translation:
                {
                    newTracks: "New Tracks",
                    showall: "show all",
                    artistTrack:"Best of Artists",
                    hitAlbums: "Hit Albums",
                    library:"Your Library",
                    search: "Search albums , songs and podcasts",
                    searchquery:"Your Search Query :"
                },
            },
            fr: {
                translation:
                {
                    newTracks: "nouvelles pistes",
                    showall: "afficher tout",
                    artistTrack:"Meilleur des artistes",
                    hitAlbums: "albums à succès",
                    library:"votre bibliothèque",
                    search: "Rechercher des albums, des chansons et des podcasts",
                    searchquery:"Votre requête de recherche :"
                }
            },
            Ru: {
                translation:
                {
                    newTracks: "новые треки",
                    showall: "показать все",
                    artistTrack:"Лучшие художники",
                    hitAlbums: "хитовые альбомы",
                    library:"ваша библиотека",
                    search: "Ищите альбомы, песни и подкасты",
                    searchquery:"ваш поисковый запрос :"
                }
            },
            zh: {
                translation:
                {
                    newTracks: "新曲目",
                    showall: "显示所有",
                    artistTrack:"艺术家的最佳作品",
                    hitAlbums: "热门专辑",
                    library:"你的图书馆",
                    search: "搜索专辑、歌曲和播客",
                    searchquery:"你的搜索查询 :"
                }
            }

        },
        lng: "en", // Default language
        fallbackLng: "en",
        interpolation: { escapeValue: false },
    });

export default i18n;
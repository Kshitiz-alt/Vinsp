import { motion } from 'framer-motion';
import { useTranslation } from "react-i18next";
import { LuEarth } from "react-icons/lu";


const Languages = [
    { id: "en", lang: "English" },
    { id: "fr", lang: "French" },
    { id: "Ru", lang: "Russian" },
    { id: "zh", lang: "mandarin" }
]

const Langbtn = () => {
    const { i18n } = useTranslation()
    const currentIndex = Languages.findIndex(l => l.id === i18n.language);
    const nextLang = Languages[(currentIndex + 1) % Languages.length];

    const toggleLang = () => {
        i18n.changeLanguage(nextLang.id)
        localStorage.setItem('lang', nextLang.id)
    }

    return (
        <motion.div
            key="git-icon"
            whileTap={{ rotate: 90 }}
            whileHover={{ scale: 1.05 }}
            className="flex items-center gap-2 p-3 px-3 bg-gradient-to-r from-white to-white/70 border-2 focus-within:border-purple-500 rounded-full" onClick={toggleLang}>
            <LuEarth className="cursor-pointer" size={23} />
        </motion.div>
    )
};

export default Langbtn;
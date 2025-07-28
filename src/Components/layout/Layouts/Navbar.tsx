import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { BiHomeSmile, BiLogoGithub, BiSearch } from "react-icons/bi";
import Langbtn from "../../subComponents/Langbtn";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const Navbar = () => {
    const navigate = useNavigate();
    const ref = useRef(null);

    const { t } = useTranslation();

    const [extend, setExtend] = useState(false);
    const [query, setQuery] = useState("");



    const handle = () => {
        const value = query.trim();

        if (value) {
            navigate(`/search?query=${encodeURIComponent(query)}`);
        } else {
            navigate('/')
        }
    }
    useEffect(() => {
        if (extend && ref.current) {
            (ref.current as HTMLInputElement).focus()
        }
    }, [extend])


    return (
        <>
            <nav className="w-full fixed flex p-4 z-40 bg-gradient-to-b from-white/20 to-transparent max-sm:h-16  max-sm:bg-cream/40  md:h-16 xl:h-20">
                <Link to="/" className="text-transparent bg-clip-text bg-gradient-to-r from-white to-cream backdrop-blur-2xl xl:text-4xl text-nowrap p-1.5 rounded-xl tracking-wider max-sm:hidden md:text-lg" style={{ textShadow: "0px 1px 1px rgba(0,0,0,0.5)" }}>Vinsp</Link>
                <header className="flex gap-4 justify-end w-full">
                    {/*Search bar */}
                    <AnimatePresence>
                        <motion.div
                            key="git-icon"
                            whileTap={{ rotate: 90 }}
                            whileHover={{ scale: 1.05 }}
                            className="flex items-center gap-2 p-3 px-3 bg-gradient-to-r from-white to-white/70 border-2 focus-within:border-purple-500 rounded-full cursor-pointer">
                            <Link to="https://github.com/Kshitiz-alt/M2-remastered">
                                <BiLogoGithub size={23} />
                            </Link>
                        </motion.div>
                    </AnimatePresence>
                    <motion.div
                        key="Home-Icon"
                        whileTap={{ rotate: 90 }}
                        whileHover={{ scale: 1.05 }}
                        className="flex items-center gap-2 p-3 px-3 bg-gradient-to-r from-white to-white/70 border-2 focus-within:border-purple-500 rounded-full cursor-pointer max-sm:hidden md:hidden xl:block">
                        <Link to="/">
                            <BiHomeSmile size={23} />
                        </Link>
                    </motion.div>
                    <motion.div
                        key="search-icon"
                        className={`flex items-center gap-2 p-3 px-3 bg-gradient-to-r from-white to-white/70 border-2 focus-within:border-purple-500 transition-all duration-200 ease-in-out rounded-full ${extend ? "w-96" : "w-13"}`}>
                            
                        <motion.aside
                            whileTap={{ rotate: 90 }}>
                            <BiSearch className="cursor-pointer transition-all duration-300 ease-in-out" size={23} color="black" onClick={() => setExtend(!extend)} />
                        </motion.aside>
                        <AnimatePresence>
                            {extend && (
                                <motion.input
                                    ref={ref}
                                    value={query}
                                    onChange={(e) => setQuery(e.target.value)}
                                    onKeyDown={(e) => e.key === "Enter" && handle()}
                                    key="searchbar"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ type: "spring", stiffness: 100, duration: 10 }}
                                    className=" outline-none placeholder:text-[15px] overflow-hidden w-full max-sm:placeholder:text-[10px] max-sm:mb-1"
                                    type="text"
                                    placeholder={t("search")}
                                />)}
                        </AnimatePresence>
                    </motion.div>

                    <Langbtn />
                </header>
            </nav>
        </>
    )
}

export default Navbar;
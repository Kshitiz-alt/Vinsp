import { AnimatePresence, motion } from "framer-motion"
import { useEffect, useRef, useState } from "react"
import { BiLogoGithub, BiSearch } from "react-icons/bi"
import Langbtn from "../../subComponents/Langbtn"
import { Link, useNavigate } from "react-router-dom"
import { useTranslation } from "react-i18next"

const Navbar = () => {
    const navigate = useNavigate()
    const ref = useRef(null)

    const { t } = useTranslation()

    const [extend, setExtend] = useState(false)
    const [query,setQuery] = useState("")



    const handle = () => {
        const value = query.trim();

        if ( value) {
            navigate(`/search?query=${encodeURIComponent(query)}`);
        }else{
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
            <nav className="w-full fixed flex p-4 z-40 max-sm:bg-cream/40 max-sm:backdrop-blur-sm">
                <Link to="/" className="text-white bg-black/10 backdrop-blur-2xl text-4xl text-nowrap p-1.5 rounded-xl tracking-wider max-sm:hidden">M2 CONNECT</Link>
                <header className="flex gap-4 justify-end w-full">
                    {/*Search bar */}
                    <AnimatePresence>
                        <motion.div key="git-icon" whileTap={{ rotate: 90 }} className="flex items-center gap-2 p-3 px-3 bg-gradient-to-r from-white to-white/70 border-2 focus-within:border-purple-500 rounded-full cursor-pointer">
                            <BiLogoGithub size={23} />
                        </motion.div>
                        <motion.div
                            key="search-icon"
                            className="flex items-center gap-2 p-3 px-3 bg-gradient-to-r from-white to-white/70 border-2 focus-within:border-purple-500 rounded-full">
                            <motion.aside

                                whileTap={{ rotate: 90 }}
                            >
                                <BiSearch className="cursor-pointer transition-opacity duration-300 ease-in-out" size={23} color="black" onClick={() => setExtend(!extend)} />
                            </motion.aside>
                            {extend && (
                                <motion.input
                                    ref={ref}
                                    value={query}
                                    onChange={(e) => setQuery(e.target.value)}
                                    onKeyDown={(e)=> e.key === "Enter" && handle()}
                                    key="searchbar"
                                    initial={{ opacity: 0, width: 0 }}
                                    animate={{ opacity: 1, width: '360px' }}
                                    exit={{ opacity: 0, width: 0 }}
                                    transition={{ type: "spring", stiffness: 100, duration: 0.6 }}
                                    className=" outline-none placeholder:text-[15px] overflow-hidden min-w-0 max-sm:hidden"
                                    type="text"
                                    placeholder={t("search")}
                                />)}
                        </motion.div>
                        <Langbtn />

                    </AnimatePresence>
                </header>
            </nav>
        </>
    )
}

export default Navbar
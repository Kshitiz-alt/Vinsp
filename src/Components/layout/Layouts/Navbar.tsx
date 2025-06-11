import { AnimatePresence, motion } from "framer-motion"
import { useState } from "react"
import { BiLogoGithub, BiSearch } from "react-icons/bi"
import Langbtn from "../../subComponents/Langbtn"
import { Link } from "react-router-dom"

const Navbar = () => {
    const [extend, setExtend] = useState(false)



    const handle = () => {

    }
    return (
        <>
            <nav className="fixed w-full flex p-4 max-sm:bottom-0">
                <Link to="/" className="text-white text-4xl text-nowrap p-1 tracking-wider max-sm:hidden">M2 CONNECT</Link>
                <header className="flex gap-4 justify-end w-full">
                    {/*Search bar */}
                    <AnimatePresence>
                        <motion.div key="git-icon" whileTap={{ rotate: 90 }} className="flex items-center gap-2 p-3 px-3 bg-gradient-to-r from-white to-white/70 border-2 focus-within:border-purple-500 rounded-full">
                            <BiLogoGithub size={23} />
                        </motion.div>
                        <motion.div
                            key="search-icon"
                            className="flex items-center gap-2 p-3 px-3 bg-gradient-to-r from-white to-white/70 border-2 focus-within:border-purple-500 rounded-full">
                            <motion.aside

                                whileTap={{ rotate: 90 }}
                            >

                                <BiSearch className="cursor-pointer  transition-opacity duration-300 ease-in-out" size={23} color="black" onSubmit={handle} onClick={() => setExtend(!extend)} />
                            </motion.aside>
                            {extend && (
                                <motion.input
                                    key="searchbar"
                                    initial={{ opacity: 0, width: 0 }}
                                    animate={{ opacity: 1, width: '360px' }}
                                    exit={{ opacity: 0, width: 0 }}
                                    transition={{ type: "spring", stiffness: 100, duration: 0.6 }}
                                    className=" outline-none placeholder:text-[15px] overflow-hidden min-w-0 max-sm:hidden"
                                    type="text"
                                    placeholder="Search albums , songs and podcasts"
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
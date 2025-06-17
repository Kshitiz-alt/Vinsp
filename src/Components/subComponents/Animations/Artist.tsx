import { AnimatePresence, motion } from "framer-motion"
import { useEffect, useState } from "react"

const Artist = ({ artists }: { artists: string[] }) => {

    const [index, setIndex] = useState(0)

    useEffect(()=>{
        const interval = setInterval(()=>{
            setIndex((prev)=>(prev + 1) % artists.length)
        },4000)

        return () => clearInterval(interval) 

    },[artists.length])

    return (
        <>
            <AnimatePresence mode="wait">
                <motion.div
                key={artists[index]}
                initial={{opacity:0,y:20}}
                animate={{opacity:1,y:0}}
                transition={{duration:2,type:"spring",stiffness:100}}
                exit={{opacity:0,y:-20}}
                className="text-white w-58"
                >
                    {artists[index]}
                </motion.div>
            </AnimatePresence>
        </>
    )
}

export default Artist
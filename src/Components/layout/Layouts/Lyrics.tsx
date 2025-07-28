import { motion } from 'framer-motion'
import type { lyricProps } from '../../../types'
import { ProperLyrics } from '../../../Constants/Fetch'
import { LuX } from 'react-icons/lu'

const Lyrics = ({ currentSong, showDetails, setDetails }: lyricProps) => {
    console.log(currentSong?.title)
    console.log(currentSong?.lyrics)

    return (
        <motion.section
            initial={{ opacity: 0, x: 200 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 200 }}
            transition={{duration:.5,stiffness:100,type:"tween"}}
            className='fixed right-0 w-96 h-full bg-gradient-to-r from-black/5 from-1% to-cream/40 text-white py-20 px-5 max-sm:hidden md:hidden xl:block'
        >
            <div className='flex flex-col gap-10 overflow-y-scroll overflow-x-hidden h-[calc(100%-5px)]'>
                <figure className='flex justify-between'>

                    <span className='text-2xl line-clamp-3'>{currentSong?.title}</span>
                    <div onClick={()=>setDetails(!showDetails)} className='hover:text-cream cursor-pointer'>
                        <LuX size={35}/>
                    </div>
                </figure>

                <pre>{ProperLyrics(currentSong?.lyrics ?? "")}</pre>
            </div>

        </motion.section>
    )
}

export default Lyrics
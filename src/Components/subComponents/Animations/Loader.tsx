import { AnimatePresence, motion } from "framer-motion"

const Loader = () => {
    const styles = {
        width: 20,
        height: 20,
        opacity: 1,
        margin: 8,
        borderRadius: 0,
        display: "inline-block",
        background: "#c81c60",
    };
    const variants = {
        start: {
            scale: 0.2,
            rotate: 0,
        },
        end: {
            scale: 1,
            rotate: 360,
        },
    };
    return (
        <AnimatePresence>
            {Array.from({ length: 5 }).map((_, index) => {
                return (
                    <motion.div
                        key={index}
                        style={styles}
                        variants={variants}
                        initial={"start"}
                        animate={"end"}
                        transition={{
                            repeat: Infinity,
                            repeatType: "reverse",
                            ease: "anticipate",
                            duration: 1,
                            delay: index * 0.1
                        }}

                    >

                    </motion.div>
                )

            })}
        </AnimatePresence>


    )
}

export default Loader
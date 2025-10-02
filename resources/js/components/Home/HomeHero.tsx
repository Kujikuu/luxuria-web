import { motion } from "motion/react";
import { Text } from "../Typography";
import Button from "../Buttons/Button";

const fadeInUp = {
    initial: { opacity: 0, y: 10, filter: 'blur(10px)' },
    whileInView: { opacity: 1, y: 0, filter: 'blur(0px)' },
    viewport: { once: true, amount: 0.3 },
    transition: {
        type: "spring",
        stiffness: 400,
        damping: 80,
        mass: 1,
    }
};

export default function HomeHero() {
    return (
        <section id="hero" className="flex flex-col relative pt-36 md:pt-52 -mt-20 bg-gradient-to-b from-primary from-55% to-primary/0 overflow-hidden w-full items-center justify-center">
            <div className="flex flex-col w-full relative gap-10 justify-center items-center">
                {/* Text */}
                <div className="flex flex-col relative items-center justify-center gap-6 px-10 w-full text-center">
                    <motion.div {...fadeInUp} transition={{ ...fadeInUp.transition, delay: 0.4 }}>
                        <Text variant="heading1" className="text-ui-1 max-w-[700px]" >Crafting Luxury Life</Text>
                    </motion.div>
                    <motion.div {...fadeInUp} transition={{ ...fadeInUp.transition, delay: 0.6 }}>
                        <Text variant='bodyMedium' className="text-ui-2 max-w-[440px]">Redefining real estate through excellence, innovation, and trust.</Text>
                    </motion.div>
                    <motion.div {...fadeInUp} transition={{ ...fadeInUp.transition, delay: 0.8 }}>
                        <Button text="Explore more" onClick={() => window.scrollTo({ top: document.getElementById("nav").offsetTop, behavior: 'smooth' })} />
                    </motion.div>
                </div>

                {/* Image */}
                <div className="w-full h-[460px] relative content-center items-center" >
                    <div className="absolute bottom-0 left-0 right-0 w-full h-full bg-gradient-to-b from-ui-1/0 from-85% to-ui-1"></div>
                    <img src="/assets/images/hero-img.png" alt="Hero" className="max-w-6xl object-cover justify-self-center" />
                </div>

            </div>
            {/* Clouds */}
            <img src="/assets/images/hero-cloud.png" alt="Clouds" className="absolute top-[567px] -left-[120px] w-full h-auto bg-blend-screen opacity-70 select-none" />
            <img src="/assets/images/hero-cloud.png" alt="Clouds" className="absolute top-[509px] -right-[170px] w-full h-auto bg-blend-screen opacity-70 select-none" />
            <img src="/assets/images/hero-cloud.png" alt="Clouds" className="absolute top-[658px] -right-[170px] w-full h-auto bg-blend-screen opacity-70 select-none" />
            <img src="/assets/images/hero-cloud.png" alt="Clouds" className="absolute top-[658px] -left-[390px] w-full h-auto bg-blend-screen opacity-70 select-none" />
            <img src="/assets/images/hero-cloud.png" alt="Clouds" className="absolute top-[609px] w-full h-auto bg-blend-screen opacity-70 select-none" />

        </section >
    );
}
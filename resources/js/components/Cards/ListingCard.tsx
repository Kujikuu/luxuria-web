import { BathtubIcon, BedIcon, RulerIcon } from "@phosphor-icons/react";
import { motion } from "motion/react";
import { useState } from "react";
import { Text } from "../Typography";
import { Link } from "@inertiajs/react";

const Divider = () => <div className="w-[1px] h-5 bg-ui-3"></div>

export default function ListingCard({ href, img, name, price, bed, bath, livingSpce }: { href: string, img: string, name: string, price: number, bed: number, bath: number, livingSpce: number }) {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <Link href={href}>
            <motion.div
                className="bg-ui-2 w-[434px] rounded-2xl border border-ui-3 overflow-hidden"
                onHoverStart={() => setIsHovered(true)}
                onHoverEnd={() => setIsHovered(false)}
            >
                <div className="w-full h-80 rounded-2xl overflow-hidden">
                    <motion.img
                        className="w-full h-full object-cover shadow-md"
                        src={img}
                        alt="Listing"
                        animate={{
                            scale: isHovered ? 1.05 : 1
                        }}
                        transition={{
                            type: 'spring',
                            stiffness: 400,
                            damping: 80,
                            mass: 1,
                        }}
                    />
                </div>
                <motion.div
                    className="flex flex-col gap-3"
                    animate={{
                        padding: isHovered ? "24px 24px 24px 24px" : "18px 18px 24px 18px"
                    }}
                    transition={{
                        type: "spring",
                        stiffness: 400,
                        damping: 80,
                        mass: 1,
                    }}
                >
                    <Text variant='bodyLarge' className="text-text-secondary">{name}</Text>
                    <Text variant='heading4' className="text-text-primary">{price.toLocaleString()} SAR</Text>
                    <div className="flex items-center gap-6">
                        <div className="flex gap-1.5 items-center text-text-secondary">
                            <BedIcon size={15} />
                            <Text variant='bodyMedium'>{bed}</Text>
                        </div>
                        <Divider />
                        <div className="flex gap-1.5 items-center text-text-secondary">
                            <BathtubIcon size={15} />
                            <Text variant='bodyMedium'>{bath}</Text>
                        </div>
                        <Divider />
                        <div className="flex gap-1.5 items-center text-text-secondary">
                            <RulerIcon size={15} />
                            <Text variant='bodyMedium'>{livingSpce} sqft</Text>
                        </div>
                    </div>
                </motion.div>
            </motion.div>
        </Link>
    );
}
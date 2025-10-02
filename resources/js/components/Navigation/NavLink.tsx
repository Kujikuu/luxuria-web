import { ReactNode, useState } from "react";
import { Text } from "../Typography";
import { Link } from "@inertiajs/react";
import { motion } from "framer-motion";

export const NavLink = ({
    children,
    color = "primary",
    ...linkProps
}: {
    children: ReactNode;
    color?: string;
} & Omit<React.ComponentProps<typeof Link>, 'children'>) => {

    const [isHovered, setIsHovered] = useState(false);

    const getDefaultStyling = () => {
        switch (color) {
            case "primary":
                return "text-primary";
            case "white":
                return "text-white";
            case "dark":
                return "text-white";
            default:
                return "text-white";
        }
    };

    const getDefaultBg = () => {
        switch (color) {
            case "primary":
                return "bg-primary";
            case "white":
                return "bg-white";
            case "dark":
                return "bg-white";
            default:
                return "bg-white";
        }
    };


    return (
        <Link 
            className='group flex flex-col w-max overflow-visible' 
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            {...linkProps}
        >
            <Text variant="bodyMedium" color={getDefaultStyling()}>{children}</Text>
            <motion.div className={`h-[1px] ${getDefaultBg()} origin-left`}
                initial={{ scaleX: 0, opacity: 0 }}
                animate={{ scaleX: isHovered ? 1 : 0, opacity: isHovered ? 1 : 0 }}
                transition={{ type: "spring", stiffness: 400, damping: 80, mass: 1 }}
            ></motion.div>
        </Link>
    );
}
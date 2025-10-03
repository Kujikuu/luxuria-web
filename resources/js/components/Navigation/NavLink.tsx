import { ReactNode, useState } from "react";
import { Text } from "../Typography";
import { Link } from "@inertiajs/react";
import { motion } from "framer-motion";
import { ArrowLeftIcon, ArrowRightIcon } from "@phosphor-icons/react";
import { useTranslations } from "@/hooks/useLocalization";

export const NavLink = ({
    children,
    color = "primary",
    arrow = false,
    ...linkProps
}: {
    children: ReactNode;
    color?: string;
    arrow?: boolean;
} & Omit<React.ComponentProps<typeof Link>, 'children'>) => {

    const [isHovered, setIsHovered] = useState(false);
    const { isRtl } = useTranslations();
    const ArrowIcon = isRtl ? ArrowRightIcon : ArrowLeftIcon;

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
            <div className="flex gap-1 items-center">
                {arrow && <ArrowIcon className={getDefaultStyling()} size={18} weight='bold' />}
                <Text variant="bodyMedium" className={getDefaultStyling()}>{children}</Text>
            </div>
            <motion.div className={`h-[1px] ${getDefaultBg()} ${isRtl ? 'origin-right' : 'origin-left'}`}
                initial={{ scaleX: 0, opacity: 0 }}
                animate={{ scaleX: isHovered ? 1 : 0, opacity: isHovered ? 1 : 0 }}
                transition={{ type: "spring", stiffness: 400, damping: 80, mass: 1 }}
            />
        </Link>
    );
}
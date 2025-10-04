import { Link } from "@inertiajs/react";
import { motion, type Transition } from "motion/react";
import { useState, type ReactElement } from "react";
import { Text } from "../Typography";
import { ArrowRightIcon, ArrowLeftIcon } from "@phosphor-icons/react";
import { cn } from "../../lib/utils";
import { useTranslations } from "@/hooks/useLocalization";

const ARROW_TRANSITION: Transition = {
    type: "spring",
    stiffness: 400,
    damping: 80,
    mass: 1,
};

const BUTTON_VARIANTS = {
    primary: {
        container: "bg-ui-1",
        text: "text-text-primary",
        icon: "text-text-primary",
    },
    secondary: {
        container: "bg-text-primary",
        text: "text-ui-1",
        icon: "text-ui-1",
    },
    form: {
        container: "bg-primary",
        text: "text-ui-1",
        icon: "text-ui-1",
    }
} as const;

type ButtonVariant = keyof typeof BUTTON_VARIANTS;

interface ButtonProps {
    href?: string;
    download?: string;
    text: string;
    variant?: ButtonVariant;
    icon?: boolean | ReactElement;
    iconSize?: number;
    onClick?: () => void;
}

export default function Button({ href, text, variant = "primary", icon = true, iconSize = 18, onClick, download }: ButtonProps) {
    const [isHovered, setIsHovered] = useState(false);
    const { isRtl } = useTranslations();
    const styles = BUTTON_VARIANTS[variant];
    const ArrowIcon = isRtl ? ArrowLeftIcon : ArrowRightIcon;

    // Determine if we should show an icon and what type
    const showIcon = icon !== false;
    const isCustomIcon = typeof icon === 'object' && icon !== null;
    const useArrowAnimation = !isCustomIcon && showIcon;

    const commonProps = {
        className: cn(
            "flex items-center w-max justify-center transition-all duration-400 px-3 md:px-6 py-2 md:py-3 rounded-xl cursor-pointer",
            showIcon ? (useArrowAnimation ? "gap-2 hover:gap-3" : "gap-2") : "",
            isRtl ? "flex-row-reverse" : "",
            styles.container
        ),
        onMouseEnter: () => setIsHovered(true),
        onMouseLeave: () => setIsHovered(false),
    };

    const renderIcon = () => {
        if (!showIcon) return null;

        if (isCustomIcon) {
            // For custom icons, just render them without animation
            return (
                <div className={cn("flex items-center justify-center gap-2.5 px-1 md:px-1.5 overflow-hidden relative", styles.icon)}>
                <motion.div
                    animate={{
                        x: isHovered ? (isRtl ? 24 : -24) : 0,
                    }}
                    transition={ARROW_TRANSITION}
                >
                    {icon}
                </motion.div>
                <motion.div
                    className="absolute"
                    animate={{
                        x: isHovered ? 0 : (isRtl ? -24 : 24),
                    }}
                    transition={ARROW_TRANSITION}
                >
                    {icon}
                </motion.div>
            </div>
            );
        }

        // For default arrow icons, use the animated behavior
        return (
            <div className={cn("flex items-center justify-center gap-2.5 px-1 md:px-1.5 overflow-hidden relative", styles.icon)}>
                <motion.div
                    animate={{
                        x: isHovered ? (isRtl ? 24 : -24) : 0,
                    }}
                    transition={ARROW_TRANSITION}
                >
                    <ArrowIcon size={iconSize} />
                </motion.div>
                <motion.div
                    className="absolute"
                    animate={{
                        x: isHovered ? 0 : (isRtl ? -24 : 24),
                    }}
                    transition={ARROW_TRANSITION}
                >
                    <ArrowIcon size={iconSize} />
                </motion.div>
            </div>
        );
    };

    const content = (
        <>
            {isRtl && renderIcon()}
            <Text variant='bodyMedium' className={styles.text}>{text}</Text>
            {!isRtl && renderIcon()}
        </>
    );

    if (onClick) {
        return (
            <button
                {...commonProps}
                onClick={onClick}
            >
                {content}
            </button>
        );
    }

    if (href) {
        return (
            <a
                href={href} download={download}
                {...commonProps}
            >
                {content}
            </a>
        );
    }

    // Fallback to button if neither href nor onClick is provided
    return (
        <button {...commonProps}>
            {content}
        </button>
    );
}
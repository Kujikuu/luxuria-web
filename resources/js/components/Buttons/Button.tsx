import { Link } from "@inertiajs/react";
import { motion, type Transition } from "motion/react";
import { useState } from "react";
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
    text: string;
    variant?: ButtonVariant;
    icon?: boolean;
    onClick?: () => void;
}

export default function Button({ href, text, variant = "primary", icon = true, onClick }: ButtonProps) {
    const [isHovered, setIsHovered] = useState(false);
    const { isRtl } = useTranslations();
    const styles = BUTTON_VARIANTS[variant];
    const ArrowIcon = isRtl ? ArrowLeftIcon : ArrowRightIcon;

    const commonProps = {
        className: cn(
            "flex items-center w-max justify-center transition-all duration-400 px-6 py-3 rounded-xl cursor-pointer",
            icon ? "gap-2 hover:gap-3" : "",
            isRtl ? "flex-row-reverse" : "",
            styles.container
        ),
        onMouseEnter: () => setIsHovered(true),
        onMouseLeave: () => setIsHovered(false),
    };

    const content = (
        <>
            {isRtl && icon && (
                <div className={cn("flex items-center justify-center gap-2.5 px-1.5 overflow-hidden relative", styles.icon)}>
                    <motion.div
                        animate={{
                            x: isHovered ? 24 : 0,
                        }}
                        transition={ARROW_TRANSITION}
                    >
                        <ArrowIcon size={18} />
                    </motion.div>
                    <motion.div
                        className="absolute"
                        animate={{
                            x: isHovered ? 0 : -24,
                        }}
                        transition={ARROW_TRANSITION}
                    >
                        <ArrowIcon size={18} />
                    </motion.div>
                </div>
            )}
            <Text variant='bodyMedium' className={styles.text}>{text}</Text>
            {!isRtl && icon && (
                <div className={cn("flex items-center justify-center gap-2.5 px-1.5 overflow-hidden relative", styles.icon)}>
                    <motion.div
                        animate={{
                            x: isHovered ? -24 : 0,
                        }}
                        transition={ARROW_TRANSITION}
                    >
                        <ArrowIcon size={18} />
                    </motion.div>
                    <motion.div
                        className="absolute"
                        animate={{
                            x: isHovered ? 0 : 24,
                        }}
                        transition={ARROW_TRANSITION}
                    >
                        <ArrowIcon size={18} />
                    </motion.div>
                </div>
            )}
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
            <Link
                href={href}
                {...commonProps}
            >
                {content}
            </Link>
        );
    }

    // Fallback to button if neither href nor onClick is provided
    return (
        <button {...commonProps}>
            {content}
        </button>
    );
}
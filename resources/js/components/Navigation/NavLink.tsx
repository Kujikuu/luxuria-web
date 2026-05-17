import { useTranslations } from '@/hooks/useLocalization';
import { Link } from '@inertiajs/react';
import { ArrowLeftIcon, ArrowRightIcon } from '@phosphor-icons/react';
import { motion } from 'framer-motion';
import { ReactNode, useState } from 'react';
import { Text } from '../Typography';

export const NavLink = ({
    children,
    color = 'primary',
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
            case 'primary':
                return 'text-primary-deep group-hover:text-secondary';
            case 'white':
                return 'text-white group-hover:text-primary-soft';
            case 'dark':
                return 'text-secondary group-hover:text-primary-deep';
            default:
                return 'text-white';
        }
    };

    const getDefaultBg = () => {
        switch (color) {
            case 'primary':
                return 'bg-primary';
            case 'white':
                return 'bg-white';
            case 'dark':
                return 'bg-primary';
            default:
                return 'bg-white';
        }
    };

    return (
        <Link
            className="group flex w-max flex-col overflow-visible rounded-sm focus-visible:outline-none"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            {...linkProps}
        >
            <div className="flex items-center gap-1 transition-colors duration-300 group-hover:text-primary-deep">
                {arrow && <ArrowIcon className={getDefaultStyling()} size={18} weight="bold" />}
                <Text variant="bodyMedium" className={getDefaultStyling()}>
                    {children}
                </Text>
            </div>
            <motion.div
                className={`h-[1px] ${getDefaultBg()} ${isRtl ? 'origin-right' : 'origin-left'}`}
                initial={{ scaleX: 0, opacity: 0 }}
                animate={{ scaleX: isHovered ? 1 : 0, opacity: isHovered ? 1 : 0 }}
                transition={{ type: 'spring', stiffness: 400, damping: 80, mass: 1 }}
            />
        </Link>
    );
};

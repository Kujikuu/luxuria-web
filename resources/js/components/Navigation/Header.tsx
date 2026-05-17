import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import LanguageSwitcher from '../LanguageSwitcher';
import { LuxuriaLogo } from './LuxuriaLogo';
import { NavLink } from './NavLink';

import { useLocale, useTranslations } from '@/hooks/useLocalization';
import { Link } from '@inertiajs/react';
import PhoneMenu from './PhoneMenu';

const appearEffect = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.3 },
    transition: {
        type: 'spring' as const,
        stiffness: 400,
        damping: 80,
        mass: 1,
    },
};

interface HeaderProps {
    section?: string;
    color?: string;
}

export default function Header({ section = 'hero', color = 'white' }: HeaderProps) {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const { t } = useTranslations();
    const { getLocalizedPath } = useLocale();

    const navigationItems = [
        { href: '/properties', label: t('properties') },
        { href: '/ventra', label: t('ventra') },
        { href: '/blog', label: t('blog') },
        { href: '/about', label: t('about') },
        { href: '/contact', label: t('contact') },
    ];

    useEffect(() => {
        const handleScroll = () => {
            if (section) {
                const sectionElement = document.getElementById(section);
                if (sectionElement) {
                    const sectionRect = sectionElement.getBoundingClientRect();
                    // Header is scrolled when the section is no longer visible at the top
                    setIsScrolled(sectionRect.bottom <= 100);
                } else {
                    // Fallback to scroll position if section not found
                    const scrollTop = window.scrollY;
                    setIsScrolled(scrollTop > 50);
                }
            } else {
                // Default behavior when no section is specified
                const scrollTop = window.scrollY;
                setIsScrolled(scrollTop > 50);
            }
        };

        const handleResize = () => {
            setIsMobile(window.innerWidth < 768);
        };

        window.addEventListener('scroll', handleScroll);
        window.addEventListener('resize', handleResize);

        // Check initial scroll position and screen size
        handleScroll();
        handleResize();

        return () => {
            window.removeEventListener('scroll', handleScroll);
            window.removeEventListener('resize', handleResize);
        };
    }, [section]);

    // Mobile menu toggle handler
    const handleMobileMenuToggle = (isOpen: boolean) => {
        setIsMobileMenuOpen(isOpen);
    };

    // Default state styling based on color prop
    const getDefaultStyling = () => {
        switch (color) {
            case 'white':
                return 'bg-ui-1 text-secondary';
            case 'transparent':
                return 'bg-transparent text-white';
            case 'dark':
                return 'bg-secondary text-ui-1';
            default:
                return 'bg-transparent text-white';
        }
    };

    // Logo color management
    const getLogoColorClass = () => {
        if (isScrolled) {
            return 'fill-secondary';
        }

        switch (color) {
            case 'white':
                return 'fill-secondary';
            case 'transparent':
                return 'fill-white';
            case 'dark':
                return 'fill-white';
            default:
                return 'fill-white';
        }
    };

    // Scroll variant always uses white background with primary text
    const scrollStyling = 'bg-ui-1/95 backdrop-blur-xl shadow-xs';
    const scrollNavLinkColor = 'dark';
    const defaultNavLinkColor = color === 'white' ? 'dark' : 'white';

    return (
        <div
            className={`sticky top-0 right-0 left-0 z-50 order-first h-auto w-full transition-all duration-300 ${
                isScrolled ? scrollStyling : getDefaultStyling()
            }`}
        >
            <nav
                className={`relative mx-auto flex max-w-7xl items-center justify-between overflow-visible transition-all duration-300 ${
                    isScrolled ? 'px-4 py-3 md:px-11 md:py-5' : 'px-4 py-4 md:px-11 md:py-6'
                }`}
            >
                <div className="relative flex items-center">
                    <Link href="/">
                        <LuxuriaLogo
                            width={isScrolled ? (isMobile ? 120 : 140) : isMobile ? 135 : 159}
                            height={isScrolled ? (isMobile ? 20 : 23) : isMobile ? 22 : 26}
                            className={getLogoColorClass()}
                        />
                    </Link>
                </div>
                <div className="md:hidden">
                    <PhoneMenu color={isScrolled ? 'primary' : color === 'white' ? 'primary' : 'white'} onToggle={handleMobileMenuToggle} />
                </div>
                <div className="hidden items-center gap-6 md:flex">
                    {navigationItems.map((item) => (
                        <NavLink key={item.href} href={getLocalizedPath(item.href)} color={isScrolled ? scrollNavLinkColor : defaultNavLinkColor}>
                            {item.label}
                        </NavLink>
                    ))}
                    <div className="ms-2">
                        <LanguageSwitcher
                            className={` ${
                                isScrolled
                                    ? 'border-ui-3 text-secondary hover:border-primary/35 hover:bg-primary-soft dark:border-ui-3/20 dark:bg-secondary dark:text-ui-1 dark:hover:bg-secondary-soft/10'
                                    : color === 'white'
                                      ? 'border-ui-3 text-secondary hover:border-primary/35 hover:bg-primary-soft dark:border-ui-3/20 dark:bg-secondary dark:text-ui-1 dark:hover:bg-secondary-soft/10'
                                      : 'border-white/20 bg-transparent text-white hover:bg-white/10'
                            } `}
                        />
                    </div>
                </div>
            </nav>

            {/* Mobile Menu Overlay */}
            {isMobileMenuOpen && (
                <motion.div
                    {...appearEffect}
                    transition={appearEffect.transition}
                    className="absolute top-20 right-5 z-50 flex w-max flex-col items-end gap-8 rounded-2xl bg-ui-1 p-8 md:hidden"
                >
                    {navigationItems.map((item) => (
                        <NavLink key={item.href} href={getLocalizedPath(item.href)} color="primary">
                            {item.label}
                        </NavLink>
                    ))}
                    <div className="mt-4 border-t border-ui-3 pt-4">
                        <LanguageSwitcher className="border-ui-3 text-secondary hover:bg-primary-soft" />
                    </div>
                </motion.div>
            )}
        </div>
    );
}

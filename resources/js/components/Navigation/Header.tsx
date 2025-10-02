import { NavLink } from "./NavLink";
import { useState, useEffect } from "react";
import { LuxuriaLogo } from "./LuxuriaLogo";
import { motion } from 'framer-motion';

import { Link } from "@inertiajs/react";
import PhoneMenu from "./PhoneMenu";

const appearEffect = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.3 },
    transition: {
        type: "spring",
        stiffness: 400,
        damping: 80,
        mass: 1,
    }
}

const navigationItems = [
    { href: '/properties', label: 'Properties' },
    { href: '/brokers', label: 'Brokers' },
    { href: '/about', label: 'About' },
    { href: '/contact', label: 'Contact' },
];

interface HeaderProps {
    section?: string;
    color?: string;
}

export default function Header({ section = "hero", color = "white" }: HeaderProps) {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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
            case "white":
                return "bg-white text-primary";
            case "transparent":
                return "bg-transparent text-white";
            case "dark":
                return "bg-gray-900 text-white";
            default:
                return "bg-transparent text-white";
        }
    };

    // Logo color management
    const getLogoColorClass = () => {
        if (isScrolled) {
            return "fill-primary"; // Always primary color when scrolled
        }

        switch (color) {
            case "white":
                return "fill-primary";
            case "transparent":
                return "fill-white";
            case "dark":
                return "fill-white";
            default:
                return "fill-white";
        }
    };

    // Scroll variant always uses white background with primary text
    const scrollStyling = "bg-white";
    const scrollNavLinkColor = "primary";
    const defaultNavLinkColor = color === "white" ? "primary" : "white";

    return (
        <div className={`sticky z-50 w-full h-auto order-first top-0 left-0 right-0 transition-all duration-300 ${isScrolled ? scrollStyling : getDefaultStyling()
            }`}>
            <nav className={`flex items-center justify-between relative overflow-visible transition-all duration-300 ${isScrolled
                ? 'py-3 px-4 md:py-5 md:px-11'
                : 'py-4 px-4 md:py-6 md:px-11'
                }`}>
                <div className="flex items-center relative">
                    <Link href="/">
                        <LuxuriaLogo
                            width={isScrolled ? (isMobile ? 120 : 140) : (isMobile ? 135 : 159)}
                            height={isScrolled ? (isMobile ? 20 : 23) : (isMobile ? 22 : 26)}
                            className={getLogoColorClass()}
                        />
                    </Link>
                </div>
                <div className="md:hidden">
                    <PhoneMenu
                        color={isScrolled ? "primary" : (color === "white" ? "primary" : "white")}
                        onToggle={handleMobileMenuToggle}
                    />
                </div>
                <div className="hidden md:flex items-center gap-6">
                    {navigationItems.map((item) => (
                        <NavLink
                            key={item.href}
                            href={item.href}
                            color={isScrolled ? scrollNavLinkColor : defaultNavLinkColor}
                        >
                            {item.label}
                        </NavLink>
                    ))}
                </div>
            </nav>

            {/* Mobile Menu Overlay */}
            {isMobileMenuOpen && (
                <motion.div {...appearEffect} transition={appearEffect.transition} className='absolute top-20 right-5 w-max z-50 md:hidden flex flex-col items-end bg-white rounded-2xl shadow-md p-8 gap-8'>
                    {navigationItems.map((item) => (
                        <NavLink
                            key={item.href}
                            href={item.href}
                            color="primary"
                        >
                            {item.label}
                        </NavLink>
                    ))}
                </motion.div>
            )}
        </div >
    );
}
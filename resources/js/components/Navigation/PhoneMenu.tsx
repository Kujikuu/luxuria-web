import { useState } from 'react';

interface PhoneMenuProps {
    color?: string;
    onToggle?: (isOpen: boolean) => void;
}

export default function PhoneMenu({ color = "primary", onToggle }: PhoneMenuProps) {
    const [isOpen, setIsOpen] = useState(false);

    const handleClick = () => {
        const newState = !isOpen;
        setIsOpen(newState);
        onToggle?.(newState);
    };

    return (
        <div
            className='relative flex flex-col w-6 h-6 items-center justify-center overflow-hidden cursor-pointer group'
            onClick={handleClick}
            role="button"
            aria-label={isOpen ? "Close menu" : "Open menu"}
            aria-expanded={isOpen}
        >
            {/* Top bar */}
            <div
                className={`absolute w-[20px] h-[2px] bg-${color} transition-all duration-300 ease-in-out ${isOpen
                        ? 'rotate-45 translate-y-0'
                        : '-translate-y-1'
                    }`}
            ></div>

            {/* Bottom bar */}
            <div
                className={`absolute w-[20px] h-[2px] bg-${color} transition-all duration-300 ease-in-out ${isOpen
                        ? '-rotate-45 translate-y-0'
                        : 'translate-y-1'
                    }`}
            ></div>
        </div>
    );
}
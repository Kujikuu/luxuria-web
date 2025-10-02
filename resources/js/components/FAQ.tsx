import { CaretDownIcon } from "@phosphor-icons/react";
import { Text } from "./Typography";
import { motion } from "framer-motion";

interface FAQProps {
    question: string;
    answer: string;
    isOpen: boolean;
    onClick: () => void;
}

export default function FAQ({ question, answer, isOpen, onClick }: FAQProps) {
    const handleClick = () => {
        onClick();
    };

    return (
        <motion.div className={`flex flex-col px-4 py-6 bg-ui-2 border border-ui-3 rounded-2xl overflow-hidden cursor-pointer ${isOpen ? 'gap-5' : 'gap-0'}`} role="button" onClick={handleClick}
            aria-label={isOpen ? "Close menu" : "Open menu"}
            aria-expanded={isOpen}
            tabIndex={0}
            onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    handleClick();
                }
            }}
            transition={{ type: "spring", stiffness: 400, damping: 80, mass: 1 }}
        >
            <div className="flex items-center gap-6 w-full">
                <Text variant="bodyBold" className="text-text-primary w-full" as="p">{question || "What is the return policy?"}</Text>
                <motion.div
                    className="p-2 bg-ui-3 rounded-full"
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ type: "spring", stiffness: 400, damping: 80, mass: 1 }}
                >
                    <CaretDownIcon size={20} className="text-text-primary" />
                </motion.div>
            </div>
            <motion.div
                className="overflow-hidden"
                initial={false}
                animate={isOpen ? { height: 'auto', opacity: 1, y: 0 } : { height: 0, opacity: 0, y: -10 }}
                transition={{ type: "spring", stiffness: 400, damping: 80, mass: 1 }}
            >
                <div className="pb-2">
                    <Text variant="bodyLong" className={`text-text-secondary`}>{answer || "Our return policy allows returns within 30 days of purchase with a valid receipt. Items must be in original condition."}</Text>
                </div>
            </motion.div>
        </motion.div>
    );
}
import FAQ from "@/components/FAQ";
import { useState } from "react";

interface FaqItem {
    id: number;
    question: string;
    answer: string;
    sort_order: number;
}

interface FAQsProps {
    faqs?: FaqItem[];
}

export default function FAQs({ faqs = [] }: FAQsProps) {
    const [openFAQIndex, setOpenFAQIndex] = useState<number>(0); // First FAQ open by default

    const handleFAQClick = (index: number) => {
        setOpenFAQIndex(openFAQIndex === index ? -1 : index);
    };

    // Fallback data if no FAQs are provided
    const fallbackFaqs = [
        {
            id: 1,
            question: "What services does LUXURIA provide?",
            answer: "We specialize in brokerage, property management, luxury housing, and investment consultancy.",
            sort_order: 1
        },
        {
            id: 2,
            question: "Where are your properties located?",
            answer: "All properties are located in prime real estate areas, carefully selected for convenience and prestige.",
            sort_order: 2
        },
        {
            id: 3,
            question: "Why should I invest with LUXURIA?",  
            answer: "We offer diverse revenue streams, deep market expertise, and innovative real estate solutions tailored to client needs.",
            sort_order: 3
        },
        {
            id: 4,
            question: "Do you handle property maintenance?",
            answer: "Yes. We provide complete facility management, tenant relations, and compliance with real estate regulations.",
            sort_order: 4
        },
        {
            id: 5,
            question: "How can I contact your team?",
            answer: "You can reach us via email at broker@luxuria.sa or call us at 0503422777 / 0580037374.",
            sort_order: 5
        }
    ];

    const displayFaqs = faqs.length > 0 ? faqs : fallbackFaqs;

    return (
        <div className="flex flex-col w-full gap-3">
            {displayFaqs.map((faq, index) => (
                <FAQ
                    key={faq.id}
                    question={faq.question}
                    answer={faq.answer}
                    isOpen={openFAQIndex === index}
                    onClick={() => handleFAQClick(index)}
                />
            ))}
        </div>
    );
}
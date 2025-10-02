import FAQ from "@/components/FAQ";
import { useState } from "react";

export default function FAQs() {
    const [openFAQIndex, setOpenFAQIndex] = useState<number>(0); // First FAQ open by default

    const faqs = [
        {
            question: "What services does LUXURIA provide?",
            answer: "We specialize in brokerage, property management, luxury housing, and investment consultancy."
        },
        {
            question: "Where are your properties located?",
            answer: "All properties are located in prime real estate areas, carefully selected for convenience and prestige."
        },
        {
            question: "Why should I invest with LUXURIA?",
            answer: "We offer diverse revenue streams, deep market expertise, and innovative real estate solutions tailored to client needs."
        },
        {
            question: "Do you handle property maintenance?",
            answer: "Yes. We provide complete facility management, tenant relations, and compliance with real estate regulations."
        },
        {
            question: "How can I contact your team?",
            answer: "You can reach us via email at broker@luxuria.sa  or call us at 0503422777 / 0580037374."
        }
    ];

    const handleFAQClick = (index: number) => {
        setOpenFAQIndex(openFAQIndex === index ? -1 : index);
    };

    return (
        <div className="flex flex-col w-[559px] gap-3">
            {faqs.map((faq, index) => (
                <FAQ
                    key={index}
                    question={faq.question}
                    answer={faq.answer}
                    isOpen={openFAQIndex === index}
                    onClick={() => handleFAQClick(index)}
                />
            ))}
        </div>
    );
}
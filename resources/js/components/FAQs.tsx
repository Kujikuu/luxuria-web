import FAQ from "@/components/FAQ";
import { useState } from "react";
import { useTranslations } from "@/hooks/useLocalization";

export default function FAQs() {
    const { t } = useTranslations('pages');
    const [openFAQIndex, setOpenFAQIndex] = useState<number>(0); // First FAQ open by default

    const faqs = [
        {
            questionKey: "faq_services_question",
            answerKey: "faq_services_answer",
            fallbackQuestion: "What services does LUXURIA provide?",
            fallbackAnswer: "We specialize in brokerage, property management, luxury housing, and investment consultancy."
        },
        {
            questionKey: "faq_location_question",
            answerKey: "faq_location_answer",
            fallbackQuestion: "Where are your properties located?",
            fallbackAnswer: "All properties are located in prime real estate areas, carefully selected for convenience and prestige."
        },
        {
            questionKey: "faq_investment_question",
            answerKey: "faq_investment_answer",
            fallbackQuestion: "Why should I invest with LUXURIA?",
            fallbackAnswer: "We offer diverse revenue streams, deep market expertise, and innovative real estate solutions tailored to client needs."
        },
        {
            questionKey: "faq_maintenance_question",
            answerKey: "faq_maintenance_answer",
            fallbackQuestion: "Do you handle property maintenance?",
            fallbackAnswer: "Yes. We provide complete facility management, tenant relations, and compliance with real estate regulations."
        },
        {
            questionKey: "faq_contact_question",
            answerKey: "faq_contact_answer",
            fallbackQuestion: "How can I contact your team?",
            fallbackAnswer: "You can reach us via email at broker@luxuria.sa or call us at 0503422777 / 0580037374."
        }
    ];

    const handleFAQClick = (index: number) => {
        setOpenFAQIndex(openFAQIndex === index ? -1 : index);
    };

    return (
        <div className="flex flex-col w-full gap-3">
            {faqs.map((faq, index) => (
                <FAQ
                    key={index}
                    question={t(faq.questionKey) || faq.fallbackQuestion}
                    answer={t(faq.answerKey) || faq.fallbackAnswer}
                    isOpen={openFAQIndex === index}
                    onClick={() => handleFAQClick(index)}
                />
            ))}
        </div>
    );
}
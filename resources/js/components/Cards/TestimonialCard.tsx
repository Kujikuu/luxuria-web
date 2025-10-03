import { Text } from "@/components/Typography";
import { QuotesIcon } from "@phosphor-icons/react";

interface TestimonialCardProps {
    quote: string;
    name: string;
    role: string;
    image: string;
    authorImage: string;
    className?: string;
}

export default function TestimonialCard({ quote, name, role, image, authorImage, className = '' }: TestimonialCardProps) {
    return (
        <div className={`flex flex-col p-6 gap-6 bg-ui-2 rounded-2xl border border-ui-3 ${className}`}>
            <div className="flex w-full gap-2.5 text-text-primary">
                {/* Quote icon */}
                <QuotesIcon size={32} />

                {/* Testimonial text */}
                <Text variant="bodyLarge" className="flex-grow">
                    {quote}
                </Text>
            </div>

            {/* Image */}
            <div className="w-[314px] h-[163px] rounded-2xl overflow-hidden">
                <img src={image} alt={name} className="w-full h-full object-cover" />
            </div>

            {/* Author info */}
            <div className="flex items-center gap-2.5">
                <div className="w-12 h-12 rounded-full overflow-hidden">
                    <img
                        src={authorImage}
                        alt={name}
                        className="w-full h-full object-cover"
                    />
                </div>
                <div className="flex flex-col gap-0.5">
                    <Text variant="bodyLarge" className="font-medium text-text-primary">
                        {name}
                    </Text>
                    <Text variant="bodySmall" className="text-text-secondary">
                        {role}
                    </Text>
                </div>
            </div>
        </div>
    );
}

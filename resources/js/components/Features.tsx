import { useState } from "react";
import { motion } from "framer-motion";
import { Text } from "./Typography";
import Tag from "./Tag";

interface Feature {
    id: number;
    title: string;
    description: string;
    image: string;
}

const features: Feature[] = [
    {
        id: 1,
        title: "Expert Brokerage",
        description: "Professional sales & marketing to maximize property value and ensure smooth transactions.",
        image: "https://framerusercontent.com/images/FnGLm2yRNviYdXrQyrqRuUBnz0.png?width=904&height=1200"
    },
    {
        id: 2,
        title: "Property Management",
        description: "Comprehensive property management services to maintain and optimize your real estate investments.",
        image: "https://framerusercontent.com/images/PjHJMX19p4rUgEbsFA6rEDDges.png?width=1200&height=800"
    },
    {
        id: 3,
        title: "Investment Guidance",
        description: "Strategic investment advice to help you make informed decisions in the luxury real estate market.",
        image: "https://framerusercontent.com/images/OKoiSJ7boY71o8nLuIvbtaihs4.png?width=1200&height=923"
    }
];

const fadeInUp = {
    initial: { opacity: 0, y: 20, filter: 'blur(10px)' },
    whileInView: { opacity: 1, y: 0, filter: 'blur(0px)' },
    viewport: { once: true, amount: 0.3 },
    transition: {
        type: "spring" as const,
        stiffness: 400,
        damping: 80,
        mass: 1,
    }
};

export default function Features() {
    const [activeFeature, setActiveFeature] = useState(1);

    return (
        <section className="flex flex-col md:flex-row items-center justify-center gap-6 h-[600px]">
            {/* Content */}
            <div className="flex flex-col w-full h-full justify-between">

                {/* Header */}
                <div className="flex flex-col gap-6 w-full h-max">

                    <Tag text="Features" />

                    <div className="flex flex-col gap-6">
                        <Text variant="heading2" className="text-text-primary">
                            Discover our features
                        </Text>
                        <Text variant="bodyLarge" className="text-text-secondary">
                            Features built to simplify your journey.
                        </Text>
                    </div>
                </div>

                {/* Features List */}
                <div className="flex flex-col w-full">
                    {features.map((feature, index) => (
                        <motion.div
                            key={feature.id}
                            className={`flex flex-col pb-6 gap-3 overflow-hidden border-b border-ui-3 cursor-pointer transition-all duration-300 ${index === 0 ? 'pt-0' : 'pt-6'
                                }`}
                            onClick={() => setActiveFeature(feature.id)}
                        >
                            <Text variant="heading4" className="text-text-primary">
                                {feature.title}
                            </Text>
                            {activeFeature === feature.id && (
                                <motion.div
                                    initial={{ opacity: 0, height: 0, y: 10 }}
                                    animate={{ opacity: 1, height: "auto" }}
                                    exit={{ opacity: 0, height: 0, y: 10 }}
                                    transition={{ type: 'spring', stiffness: 400, damping: 80, mass: 1 }}
                                >
                                    <Text variant="bodyLong" className="text-text-secondary">
                                        {feature.description}
                                    </Text>
                                </motion.div>
                            )}
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Right Images */}
            <div className="flex justify-center items-center w-full h-full">
                <div className="relative w-[548px] h-[600px] rounded-[18px] overflow-hidden">
                    {features.map((feature) => (
                        <motion.div
                            key={feature.id}
                            className="absolute inset-0 w-full h-full"
                            initial={{ opacity: 0 }}
                            animate={{
                                opacity: activeFeature === feature.id ? 1 : 0
                            }}
                            transition={{ duration: 0.5 }}
                        >
                            <img
                                src={feature.image}
                                alt={feature.title}
                                className="w-full h-full object-cover"
                                loading="lazy"
                            />
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
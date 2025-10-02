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
        <section className="flex flex-col lg:flex-row items-stretch justify-center gap-6 sm:gap-8 md:gap-10 lg:gap-12 min-h-[400px] lg:h-[600px] px-4 sm:px-6 md:px-10 py-8 sm:py-12 md:py-16 lg:py-0 w-full max-w-[1200px] mx-auto">
            {/* Content */}
            <div className="flex flex-col w-full lg:w-1/2 h-full justify-between">

                {/* Header */}
                <div className="flex flex-col gap-4 sm:gap-6 w-full h-max">

                    <div className="flex">
                        <Tag text="Features" />
                    </div>

                    <div className="flex flex-col gap-4 sm:gap-6">
                        <Text variant="heading2" className="text-text-primary">
                            Discover our features
                        </Text>
                        <Text variant="bodyLarge" className="text-text-secondary">
                            Features built to simplify your journey.
                        </Text>
                    </div>
                </div>

                {/* Features List */}
                <div className="flex flex-col w-full mt-6 lg:mt-0">
                    {features.map((feature, index) => (
                        <motion.div
                            key={feature.id}
                            className={`flex flex-col pb-4 sm:pb-6 gap-3 overflow-hidden border-b border-ui-3 cursor-pointer transition-all duration-300 ${index === 0 ? 'pt-0' : 'pt-4 sm:pt-6'
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
            <div className="flex justify-center items-center w-full lg:w-1/2 h-full mt-6 lg:mt-0">
                <div className="relative w-full h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px] rounded-[18px] overflow-hidden">
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
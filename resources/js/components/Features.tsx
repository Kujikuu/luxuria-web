import { useState } from "react";
import { motion } from "framer-motion";
import { Text } from "./Typography";
import Tag from "./Tag";
import { useTranslations } from "@/hooks/useLocalization";

interface Feature {
    id: number;
    title: string;
    description: string;
    image: string | null;
    sort_order: number;
}

interface FeaturesProps {
    features?: Feature[];
}

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

export default function Features({ features = [] }: FeaturesProps) {
    const { t } = useTranslations('pages');
    
    // Fallback features data if none provided from backend
    const fallbackFeatures: Feature[] = [
        {
            id: 1,
            title: "Premium Property Portfolio",
            description: "Curated selection of luxury properties in prime locations with exceptional quality and unique characteristics.",
            image: "https://framerusercontent.com/images/FnGLm2yRNviYdXrQyrqRuUBnz0.png?width=904&height=1200",
            sort_order: 1
        },
        {
            id: 2,
            title: "Expert Advisory Services",
            description: "Professional guidance from experienced real estate experts to help you make informed investment decisions.",
            image: "https://framerusercontent.com/images/PjHJMX19p4rUgEbsFA6rEDDges.png?width=1200&height=800",
            sort_order: 2
        },
        {
            id: 3,
            title: "Personalized Service", 
            description: "Tailored approach to meet your specific needs with dedicated support throughout your real estate journey.",
            image: "https://framerusercontent.com/images/OKoiSJ7boY71o8nLuIvbtaihs4.png?width=1200&height=923",
            sort_order: 3
        }
    ];

    const displayFeatures = features.length > 0 ? features.slice(0, 3) : fallbackFeatures;
    const [activeFeature, setActiveFeature] = useState(displayFeatures[0]?.id || 1);

    return (
        <section className="flex flex-col lg:flex-row items-stretch justify-center gap-6 sm:gap-8 md:gap-10 lg:gap-12 min-h-[400px] lg:h-[600px] px-4 sm:px-6 md:px-10 py-8 sm:py-12 md:py-16 lg:py-0 w-full max-w-[1200px] mx-auto">
            {/* Content */}
            <div className="flex flex-col w-full lg:w-1/2 h-full justify-between">

                {/* Header */}
                <div className="flex flex-col gap-4 sm:gap-6 w-full h-max">

                    <div className="flex">
                        <Tag text={t('features') || 'Features'} />
                    </div>

                    <div className="flex flex-col gap-4 sm:gap-6">
                        <Text variant="heading2" className="text-text-primary">
                            {t('features_title') || 'Discover our features'}
                        </Text>
                        <Text variant="bodyLarge" className="text-text-secondary">
                            {t('features_subtitle') || 'Features built to simplify your journey.'}
                        </Text>
                    </div>
                </div>

                {/* Features List */}
                <div className="flex flex-col w-full mt-6 lg:mt-0">
                    {displayFeatures.map((feature: Feature, index: number) => (
                        <motion.div
                            key={feature.id}
                            className={`flex flex-col pb-4 sm:pb-6 gap-3 overflow-hidden border-b border-ui-3 cursor-pointer transition-all duration-300 ${index === 0 ? 'pt-0' : 'pt-4 sm:pt-6'
                                }`}
                            onClick={() => setActiveFeature(feature.id)}
                        >
                            <Text variant="heading4" className="text-text-primary font-bold">
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
                    {displayFeatures.map((feature: Feature) => (
                        <motion.div
                            key={feature.id}
                            className="absolute inset-0 w-full h-full"
                            initial={{ opacity: 0 }}
                            animate={{
                                opacity: activeFeature === feature.id ? 1 : 0
                            }}
                            transition={{ duration: 0.5 }}
                        >
                            {feature.image && (
                                <img
                                    src={feature.image}
                                    alt={feature.title}
                                    className="w-full h-full object-cover"
                                    loading="lazy"
                                />
                            )}
                            {!feature.image && (
                                <div className="w-full h-full bg-gradient-to-br from-ui-2 to-ui-3 flex items-center justify-center">
                                    <Text variant="bodyLarge" className="text-text-secondary">
                                        {feature.title}
                                    </Text>
                                </div>
                            )}
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
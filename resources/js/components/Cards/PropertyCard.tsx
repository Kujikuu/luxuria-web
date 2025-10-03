import { useLocale, useTranslations } from '@/hooks/useLocalization';
import { Link } from '@inertiajs/react';
import { RulerIcon } from '@phosphor-icons/react';
import { motion } from 'motion/react';
import { useState } from 'react';
import { Text } from '../Typography';

const Divider = () => <div className="h-5 w-[1px] bg-ui-3"></div>;

interface PropertyCardProps {
    href: string;
    img: string;
    name: string;
    name_ar?: string;
    price: number;
    area: number;
    propertyType: string;
}

export default function PropertyCard({ href, img, name, name_ar, price, area, propertyType }: PropertyCardProps) {
    const [isHovered, setIsHovered] = useState(false);
    const { isArabic } = useLocale();
    const { t } = useTranslations('components');

    return (
        <Link href={href}>
            <motion.div
                className="w-full overflow-hidden rounded-2xl border border-ui-3 bg-ui-2"
                onHoverStart={() => setIsHovered(true)}
                onHoverEnd={() => setIsHovered(false)}
            >
                <div className="h-64 w-full overflow-hidden rounded-2xl sm:h-72 md:h-80">
                    <motion.img
                        className="h-full w-full object-cover shadow-md"
                        src={img}
                        alt="Listing"
                        animate={{
                            scale: isHovered ? 1.05 : 1,
                        }}
                        transition={{
                            type: 'spring',
                            stiffness: 300,
                            damping: 30,
                            mass: 0.8,
                        }}
                    />
                </div>
                <motion.div
                    className="flex flex-col gap-3 px-4 pt-4 pb-4 sm:px-[18px] sm:pt-[18px] sm:pb-6"
                    animate={{
                        x: isHovered ? 6 : 0,
                        y: isHovered ? 6 : 0,
                    }}
                    transition={{
                        type: 'spring',
                        stiffness: 400,
                        damping: 80,
                        mass: 1,
                    }}
                >
                    <Text variant="bodyLarge" className="text-text-secondary">
                        {isArabic && name_ar ? name_ar : name}
                    </Text>
                    <Text variant="heading4" className="text-text-primary">
                        {Math.round(price).toLocaleString('en-US')} {isArabic ? 'ر.س' : 'SAR'}
                    </Text>
                    <div className="flex items-center gap-3 text-sm sm:gap-4 sm:text-base md:gap-6">
                        <div className="flex items-center gap-1.5 text-text-secondary">
                            <Text variant="bodyMedium" className="capitalize">
                                {t(`property_type_${propertyType}`) || propertyType.replace('_', ' ')}
                            </Text>
                        </div>
                        <Divider />
                        <div className="flex items-center gap-1.5 text-text-secondary">
                            <RulerIcon size={15} />
                            <Text variant="bodyMedium" className="xs:block hidden">
                                {area} m²
                            </Text>
                            <Text variant="bodyMedium" className="xs:hidden block">
                                {area}
                            </Text>
                        </div>
                    </div>
                </motion.div>
            </motion.div>
        </Link>
    );
}

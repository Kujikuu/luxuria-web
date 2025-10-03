import { CalendarIcon, ClockIcon, UserIcon } from "@phosphor-icons/react";
import { motion } from "motion/react";
import { useState } from "react";
import { Text } from "../Typography";
import { Link } from "@inertiajs/react";
import { useLocale, useTranslations } from "@/hooks/useLocalization";

interface BlogCardProps {
    href: string;
    img: string;
    title: string;
    about: string;
    authorName: string;
    authorImage: string;
    publishDate: string;
    readTime: number;
}

export default function BlogCard({ 
    href, 
    img, 
    title, 
    about, 
    authorName, 
    authorImage, 
    publishDate, 
    readTime 
}: BlogCardProps) {
    const [isHovered, setIsHovered] = useState(false);
    const { isArabic } = useLocale();
    const { t } = useTranslations('components');

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    return (
        <Link href={href}>
            <motion.article
                className="bg-ui-2 w-full rounded-2xl border border-ui-3 overflow-hidden"
                onHoverStart={() => setIsHovered(true)}
                onHoverEnd={() => setIsHovered(false)}
            >
                {/* Featured Image */}
                <div className="w-full h-48 sm:h-56 md:h-64 rounded-2xl overflow-hidden">
                    <motion.img
                        className="w-full h-full object-cover shadow-md"
                        src={img}
                        alt={title}
                        animate={{
                            scale: isHovered ? 1.05 : 1
                        }}
                        transition={{
                            type: 'spring',
                            stiffness: 300,
                            damping: 30,
                            mass: 0.8,
                        }}
                    />
                </div>

                {/* Content */}
                <motion.div
                    className="flex flex-col gap-4 px-4 sm:px-6 pt-4 sm:pt-6 pb-6"
                    animate={{
                        x: isHovered ? 6 : 0,
                        y: isHovered ? 6 : 0
                    }}
                    transition={{
                        type: "spring",
                        stiffness: 400,
                        damping: 80,
                        mass: 1,
                    }}
                >
                    {/* Title */}
                    <Text variant="heading4" className="text-text-primary line-clamp-2">
                        {title}
                    </Text>

                    {/* About/Excerpt */}
                    <Text variant="bodyMedium" className="text-text-secondary line-clamp-3">
                        {about}
                    </Text>

                    {/* Author and Meta Info */}
                    <div className="flex items-center justify-between pt-2 border-t border-ui-3">
                        {/* Author */}
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full overflow-hidden bg-ui-3">
                                <img
                                    src={authorImage || `https://ui-avatars.com/api/?name=${authorName}&size=32&background=f0f0f0&color=666`}
                                    alt={authorName}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <Text variant="bodySmall" className="text-text-secondary">
                                {authorName}
                            </Text>
                        </div>

                        {/* Meta info */}
                        <div className="flex items-center gap-4 text-text-secondary">
                            <div className="flex items-center gap-1">
                                <CalendarIcon size={14} />
                                <Text variant="bodySmall">
                                    {formatDate(publishDate)}
                                </Text>
                            </div>
                            <div className="flex items-center gap-1">
                                <ClockIcon size={14} />
                                <Text variant="bodySmall">
                                    {readTime} {t('min_read') || 'min'}
                                </Text>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </motion.article>
        </Link>
    );
}
import { Text } from '@/components/Typography';
import { Progress } from '@/components/ui/progress';
import { useLocale, useTranslations } from '@/hooks/useLocalization';
import type { DealioOpportunity } from '@/types/dealio';
import { Link } from '@inertiajs/react';
import { ArrowUpRightIcon, MapPinIcon, TrendUpIcon } from '@phosphor-icons/react';
import { motion } from 'motion/react';
import { useState } from 'react';
import { formatNumber, formatSAR, formatTagLabel, localizedLocation, mediaUrl } from './dealio-utils';

interface OpportunityCardProps {
    opportunity: DealioOpportunity;
    variant?: 'default' | 'featured' | 'small';
}

export default function OpportunityCard({ opportunity, variant = 'default' }: OpportunityCardProps) {
    const isSmall = variant === 'small';
    const isFeatured = variant === 'featured';
    const [isHovered, setIsHovered] = useState(false);
    const { currentLocale, getLocalizedPath, isArabic } = useLocale();
    const { t } = useTranslations('components');
    const image = mediaUrl(opportunity.mediaItems?.[0]);
    const title = isArabic && opportunity.title_ar ? opportunity.title_ar : opportunity.title;
    const summary = isArabic && opportunity.summary_ar ? opportunity.summary_ar : opportunity.summary;
    const region = localizedLocation(opportunity, isArabic);
    const fundedPercentage = Number(opportunity.fundedPercentage || 0);

    if (isSmall) {
        return (
            <Link href={getLocalizedPath(`/dealio/${opportunity.slug}`)}>
                <motion.article
                    className="group flex h-full flex-col overflow-hidden rounded-2xl border border-ui-3 bg-ui-2"
                    onHoverStart={() => setIsHovered(true)}
                    onHoverEnd={() => setIsHovered(false)}
                >
                    <div className="relative h-48 w-full overflow-hidden rounded-2xl">
                        {image ? (
                            <motion.img
                                src={image}
                                alt={title}
                                loading="lazy"
                                className="h-full w-full object-cover shadow-md"
                                animate={{ scale: isHovered ? 1.05 : 1 }}
                                transition={{ type: 'spring', stiffness: 300, damping: 30, mass: 0.8 }}
                            />
                        ) : (
                            <div className="flex h-full w-full flex-col items-center justify-center gap-2 bg-ui-3">
                                <TrendUpIcon size={34} className="text-text-secondary" />
                                <Text variant="bodySmall" className="text-text-secondary">
                                    {t('dealio_no_photo')}
                                </Text>
                            </div>
                        )}
                        <div className="absolute top-3 right-3 left-3 flex items-start justify-between gap-3">
                            <span className="rounded-full bg-primary px-3 py-1 text-xs font-semibold text-ui-1">{opportunity.typeLabel}</span>
                        </div>
                    </div>

                    <motion.div
                        className="flex flex-1 flex-col gap-3 p-4"
                        animate={{ x: isHovered ? 4 : 0, y: isHovered ? 4 : 0 }}
                        transition={{ type: 'spring', stiffness: 400, damping: 80, mass: 1 }}
                    >
                        <div className="flex items-start justify-between gap-4">
                            <div className="flex flex-col gap-2">
                                <Text variant="bodyLarge" className="line-clamp-2 text-text-primary">
                                    {title}
                                </Text>
                                {region && (
                                    <div className="flex items-center gap-1.5 text-text-secondary">
                                        <MapPinIcon size={16} />
                                        <Text variant="bodySmall" className="truncate text-text-secondary">
                                            {region}
                                        </Text>
                                    </div>
                                )}
                            </div>
                            <ArrowUpRightIcon size={22} className="mt-1 shrink-0 text-text-secondary" />
                        </div>

                        <div className="mt-auto border-t border-ui-3 pt-3">
                            <Text variant="bodySmall" className="text-text-secondary">
                                {t('dealio_min_investment')}
                            </Text>
                            <Text variant="heading4" className="text-text-primary">
                                {formatSAR(opportunity.minInvestment, currentLocale)}
                            </Text>
                        </div>
                    </motion.div>
                </motion.article>
            </Link>
        );
    }
}
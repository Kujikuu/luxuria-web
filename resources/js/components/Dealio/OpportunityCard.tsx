import { Text } from '@/components/Typography';
import { Progress } from '@/components/ui/progress';
import { useLocale, useTranslations } from '@/hooks/useLocalization';
import type { DealioOpportunity } from '@/types/dealio';
import { ArrowUpRightIcon, MapPinIcon, TrendUpIcon } from '@phosphor-icons/react';
import { Link } from '@inertiajs/react';
import { motion } from 'motion/react';
import { useState } from 'react';
import { formatNumber, formatSAR, formatTagLabel, mediaUrl } from './dealio-utils';

interface OpportunityCardProps {
    opportunity: DealioOpportunity;
    featured?: boolean;
}

export default function OpportunityCard({ opportunity, featured = false }: OpportunityCardProps) {
    const [isHovered, setIsHovered] = useState(false);
    const { currentLocale, getLocalizedPath, isArabic } = useLocale();
    const { t } = useTranslations('components');
    const image = mediaUrl(opportunity.mediaItems?.[0]);
    const title = isArabic && opportunity.title_ar ? opportunity.title_ar : opportunity.title;
    const summary = isArabic && opportunity.summary_ar ? opportunity.summary_ar : opportunity.summary;
    const region = [isArabic && opportunity.city_ar ? opportunity.city_ar : opportunity.city, opportunity.regionName].filter(Boolean).join(', ');
    const fundedPercentage = Number(opportunity.fundedPercentage || 0);

    return (
        <Link href={getLocalizedPath(`/dealio/${opportunity.slug}`)}>
            <motion.article
                className={`group h-full overflow-hidden rounded-2xl border border-ui-3 bg-ui-2 ${featured ? 'xl:grid xl:grid-cols-[0.9fr_1.1fr]' : 'flex flex-col'}`}
                onHoverStart={() => setIsHovered(true)}
                onHoverEnd={() => setIsHovered(false)}
            >
                <div className={`h-64 w-full overflow-hidden rounded-2xl ${featured ? 'h-72 xl:h-full' : 'h-64 sm:h-72'}`}>
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
                        <span className="rounded-full bg-primary px-3 py-1 text-xs font-semibold text-ui-1">
                            {opportunity.typeLabel}
                        </span>
                        {opportunity.is_featured && (
                            <span className="rounded-full bg-ui-1 px-3 py-1 text-xs font-semibold text-primary">{t('dealio_featured')}</span>
                        )}
                    </div>
                </div>

                <motion.div
                    className="flex flex-1 flex-col gap-4 p-4 sm:p-5"
                    animate={{ x: isHovered ? 6 : 0, y: isHovered ? 6 : 0 }}
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

                    {summary && (
                        <Text variant="bodySmall" className="line-clamp-3 max-w-[62ch] text-text-secondary">
                            {summary}
                        </Text>
                    )}

                    {opportunity.tags && opportunity.tags.length > 0 && (
                        <div className="flex flex-wrap gap-1.5">
                            {opportunity.tags.slice(0, featured ? 4 : 3).map((tag, index) => (
                                <span key={`${formatTagLabel(tag)}-${index}`} className="rounded-full bg-ui-3 px-2.5 py-1 text-xs font-medium text-text-secondary">
                                    {formatTagLabel(tag)}
                                </span>
                            ))}
                        </div>
                    )}

                    <div className="mt-auto flex flex-col gap-3 border-t border-ui-3 pt-4">
                        <div className="flex items-end justify-between gap-4">
                            <div className="flex flex-col gap-1">
                                <Text variant="bodySmall" className="text-text-secondary">
                                    {t('dealio_min_investment')}
                                </Text>
                                <Text variant="heading4" className="text-text-primary">
                                    {formatSAR(opportunity.minInvestment, currentLocale)}
                                </Text>
                            </div>
                            {(opportunity.roiMin || opportunity.roiMax) && (
                                <div className="flex flex-col items-end gap-1 text-right">
                                    <Text variant="bodySmall" className="text-text-secondary">
                                        {t('dealio_expected_roi')}
                                    </Text>
                                    <Text variant="bodySmallBold" className="text-text-primary">
                                        {[opportunity.roiMin, opportunity.roiMax].filter(Boolean).map((roi) => `${formatNumber(roi, currentLocale)}%`).join(' - ')}
                                    </Text>
                                </div>
                            )}
                        </div>

                        {fundedPercentage > 0 && (
                            <div className="flex flex-col gap-1.5">
                                <div className="flex justify-between">
                                    <Text variant="bodySmall" className="text-text-secondary">
                                        {t('dealio_funded')}
                                    </Text>
                                    <Text variant="bodySmall" className="text-text-secondary">
                                        {formatNumber(Math.round(fundedPercentage), currentLocale)}%
                                    </Text>
                                </div>
                                <Progress value={Math.min(fundedPercentage, 100)} className="h-1.5 bg-ui-3" />
                            </div>
                        )}
                    </div>
                </motion.div>
            </motion.article>
        </Link>
    );
}

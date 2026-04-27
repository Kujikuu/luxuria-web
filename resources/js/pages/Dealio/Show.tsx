import FinancialsGrid from '@/components/Dealio/FinancialsGrid';
import InterestForm from '@/components/Dealio/InterestForm';
import OpportunityCard from '@/components/Dealio/OpportunityCard';
import RoiCalculator from '@/components/Dealio/RoiCalculator';
import { formatTagLabel, localizedLocation, mediaUrl, normalizeOpportunity } from '@/components/Dealio/dealio-utils';
import { NavLink } from '@/components/Navigation/NavLink';
import Tag from '@/components/Tag';
import { Text } from '@/components/Typography';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { useLocale, useTranslations } from '@/hooks/useLocalization';
import AppLayout from '@/layouts/app-layout';
import type { DealioOpportunity } from '@/types/dealio';
import { Head } from '@inertiajs/react';
import { MapPinIcon } from '@phosphor-icons/react';
import { useEffect, useState } from 'react';

interface DealioShowPageProps {
    slug: string;
}

export default function DealioShowPage({ slug }: DealioShowPageProps) {
    const { t } = useTranslations('pages');
    const componentTranslations = useTranslations('components');
    const { getLocalizedPath, isArabic } = useLocale();
    const [opportunity, setOpportunity] = useState<DealioOpportunity | null>(null);
    const [similarOpportunities, setSimilarOpportunities] = useState<DealioOpportunity[]>([]);
    const [activeMediaIndex, setActiveMediaIndex] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    const fetchOpportunity = async () => {
        setLoading(true);
        setError('');

        try {
            const response = await fetch(`/api/dealio/opportunities/${slug}`);
            const payload = await response.json();

            if (!response.ok) {
                throw new Error('Unable to load opportunity.');
            }

            const loadedOpportunity = normalizeOpportunity(payload.data || payload);
            setOpportunity(loadedOpportunity);
            setActiveMediaIndex(0);

            fetch(`/api/dealio/opportunities/${slug}/view`, {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'X-CSRF-TOKEN': document.querySelector<HTMLMetaElement>('meta[name="csrf-token"]')?.content || '',
                },
            }).catch(() => undefined);

            const similarResponse = await fetch(`/api/dealio/opportunities/${slug}/similar`);
            const similarPayload = await similarResponse.json().catch(() => ({}));

            if (similarResponse.ok) {
                setSimilarOpportunities((similarPayload.data || similarPayload || []).map(normalizeOpportunity));
            }
        } catch {
            setError(componentTranslations.t('dealio_detail_error'));
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchOpportunity();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [slug]);

    const title = opportunity ? (isArabic && opportunity.title_ar ? opportunity.title_ar : opportunity.title) : t('dealio_opportunity');
    const description = opportunity ? (isArabic && opportunity.description_ar ? opportunity.description_ar : opportunity.description) : '';
    const mediaItems = opportunity?.mediaItems || [];
    const activeImage = mediaUrl(mediaItems[activeMediaIndex]);
    const region = opportunity ? localizedLocation(opportunity, isArabic) : '';

    return (
        <AppLayout color="white" section="hero">
            <Head title={title} />

            <section id="hero" className="-mt-20 flex w-full max-w-6xl flex-col gap-10 px-4 pt-24 pb-24 sm:px-6 sm:pt-32 md:px-10 md:pt-52">
                <div className="flex justify-between items-center">
                    <div>
                        <NavLink href={getLocalizedPath('/dealio')} className="text-text-primary" arrow={true}>
                            {t('go_back') || 'Go Back'}
                        </NavLink>
                    </div>
                    
                    {/* Unlock Status Indicator */}
                    {/* <UnlockStatusBanner compact /> */}
                </div>

                {loading ? (
                    <div className="flex flex-col gap-6">
                        <Skeleton className="h-12 w-3/4" />
                        <Skeleton className="h-[500px] w-full rounded-2xl" />
                    </div>
                ) : error || !opportunity ? (
                    <div className="flex flex-col items-center justify-center gap-4 py-20 text-center">
                        <Text variant="heading4" className="text-text-primary">
                            {error || componentTranslations.t('dealio_detail_error')}
                        </Text>
                        <Button onClick={fetchOpportunity}>{componentTranslations.t('dealio_retry')}</Button>
                    </div>
                ) : (
                    <>
                        <div className="flex flex-col gap-5">
                            <Tag variant="secondary" text={opportunity.typeLabel || ''} />
                            <Text variant="heading2" className="max-w-6xl text-text-primary" as="h1">
                                {title}
                            </Text>
                        </div>

                        <div className="flex flex-col gap-3">
                            {activeImage ? (
                                <img
                                    src={activeImage}
                                    alt={title}
                                    className="h-[300px] w-full max-w-6xl rounded-2xl object-cover sm:h-[400px] md:h-[500px]"
                                />
                            ) : (
                                <div className="flex h-[300px] w-full items-center justify-center rounded-2xl bg-ui-2 sm:h-[400px] md:h-[500px]">
                                    <Text variant="bodyMedium" className="text-text-secondary">
                                        {componentTranslations.t('dealio_no_photo')}
                                    </Text>
                                </div>
                            )}
                            {mediaItems.length > 1 && (
                                <div className="flex gap-3 overflow-x-auto pb-1">
                                    {mediaItems.map((item, index) => {
                                        const image = mediaUrl(item);

                                        return (
                                            <button
                                                key={`${image}-${index}`}
                                                type="button"
                                                onClick={() => setActiveMediaIndex(index)}
                                                className={`h-20 w-28 shrink-0 overflow-hidden rounded-xl border ${activeMediaIndex === index ? 'border-primary' : 'border-ui-3'}`}
                                            >
                                                <img src={image} alt={`${title} ${index + 1}`} className="h-full w-full object-cover" />
                                            </button>
                                        );
                                    })}
                                </div>
                            )}
                        </div>

                        <div className="grid w-full grid-cols-1 gap-6 lg:grid-cols-[1fr_24rem]">
                            <div className="flex flex-col gap-8">
                                {region && (
                                <div className="flex items-center gap-2 text-text-secondary">
                                    <MapPinIcon size={20} />
                                    <Text variant="bodyMedium" className="text-text-secondary">
                                        {region}
                                    </Text>
                                </div>
                            )}
                                {opportunity.tags && opportunity.tags.length > 0 && (
                                    <div className="flex flex-wrap gap-2">
                                        {opportunity.tags.map((tag, index) => (
                                            <span
                                                key={`${formatTagLabel(tag)}-${index}`}
                                                className="rounded-full bg-ui-2 px-3 py-1.5 text-sm font-medium text-text-secondary"
                                            >
                                                {formatTagLabel(tag)}
                                            </span>
                                        ))}
                                    </div>
                                )}

                                {description && (
                                    <section className="flex flex-col gap-4">
                                        <Text variant="bodyLarge" className="text-text-primary">
                                            {t('description')}
                                        </Text>
                                        <div
                                            className="prose prose-sm max-w-none text-text-secondary [&>h2]:mt-4 [&>h2]:mb-2 [&>h2]:text-lg [&>h2]:font-semibold [&>h2]:text-text-primary [&>h3]:mt-3 [&>h3]:mb-2 [&>h3]:text-base [&>h3]:font-medium [&>h3]:text-text-primary [&>li]:mb-1 [&>ol]:mb-3 [&>p]:mb-3 [&>ul]:mb-3"
                                            dangerouslySetInnerHTML={{ __html: description }}
                                        />
                                    </section>
                                )}

                                <FinancialsGrid opportunity={opportunity} />

                                {similarOpportunities.length > 0 && (
                                    <section className="flex flex-col gap-5">
                                        <Text variant="bodyLarge" className="text-text-primary">
                                            {componentTranslations.t('dealio_similar')}
                                        </Text>
                                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                            {similarOpportunities.slice(0, 2).map((similar) => (
                                                <OpportunityCard variant="small" key={similar.id || similar.slug} opportunity={similar} />
                                            ))}
                                        </div>
                                    </section>
                                )}
                            </div>

                            <aside className="flex flex-col gap-6 lg:sticky lg:top-28 lg:self-start">
                                <RoiCalculator opportunity={opportunity} />
                                <InterestForm opportunityUuid={opportunity.uuid} />
                            </aside>
                        </div>
                    </>
                )}
            </section>
        </AppLayout>
    );
}

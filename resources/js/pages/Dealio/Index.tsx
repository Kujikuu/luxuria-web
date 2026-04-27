import DealioFilters from '@/components/Dealio/DealioFilters';
import OpportunityCard from '@/components/Dealio/OpportunityCard';
import { investmentRanges, normalizeOpportunity, sortOpportunities } from '@/components/Dealio/dealio-utils';
import { Text } from '@/components/Typography';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { useTranslations } from '@/hooks/useLocalization';
import AppLayout from '@/layouts/app-layout';
import type { DealioApiListResponse, DealioOpportunity, DealioOption, DealioPagination } from '@/types/dealio';
import { Head } from '@inertiajs/react';
import { useEffect, useState } from 'react';

function extractPagination(meta: DealioApiListResponse['meta']): DealioPagination {
    if (!meta) {
        return {};
    }

    if ('pagination' in meta) {
        return meta.pagination || {};
    }

    return meta as DealioPagination;
}

export default function DealioIndexPage() {
    const { t } = useTranslations('pages');
    const componentTranslations = useTranslations('components');
    const [regions, setRegions] = useState<DealioOption[]>([]);
    const [types, setTypes] = useState<DealioOption[]>([]);
    const [search, setSearch] = useState('');
    const [region, setRegion] = useState('');
    const [type, setType] = useState('');
    const [investmentRange, setInvestmentRange] = useState('');
    const [opportunities, setOpportunities] = useState<DealioOpportunity[]>([]);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const featuredOpportunities = opportunities.filter((opportunity) => opportunity.promotedFeatured);
    const standardOpportunities = opportunities.filter((opportunity) => !opportunity.promotedFeatured);

    const fetchOptions = async () => {
        const [regionsResponse, typesResponse] = await Promise.all([fetch('/api/dealio/regions'), fetch('/api/dealio/types')]);
        const [regionsPayload, typesPayload] = await Promise.all([regionsResponse.json().catch(() => ({})), typesResponse.json().catch(() => ({}))]);

        if (regionsResponse.ok) {
            setRegions(regionsPayload.data || regionsPayload || []);
        }

        if (typesResponse.ok) {
            setTypes(typesPayload.data || typesPayload || []);
        }
    };

    const fetchOpportunities = async (
        reset = true,
        filters = {
            search,
            region,
            type,
            investmentRange,
        },
    ) => {
        setLoading(true);
        setError('');

        try {
            const nextPage = reset ? 1 : page;
            const params = new URLSearchParams({ page: String(nextPage) });
            const selectedRange = investmentRanges.find((range) => range.value === filters.investmentRange);

            if (filters.search) {
                params.append('search', filters.search);
            }

            if (filters.region) {
                params.append('region[]', filters.region);
            }

            if (filters.type) {
                params.append('type', filters.type);
            }

            if (selectedRange) {
                params.append('min_investment_gte', String(selectedRange.min));

                if (selectedRange.max !== '') {
                    params.append('min_investment_lte', String(selectedRange.max));
                }
            }

            const response = await fetch(`/api/dealio/opportunities?${params.toString()}`);
            const payload: DealioApiListResponse = await response.json();

            if (!response.ok) {
                throw new Error('Unable to load opportunities.');
            }

            const items = (payload.data || []).map(normalizeOpportunity);
            const pagination = extractPagination(payload.meta);
            const mergedItems = reset ? items : [...opportunities, ...items];

            setOpportunities(sortOpportunities(mergedItems));
            setHasMore((pagination.current_page || nextPage) < (pagination.last_page || nextPage));
            setPage((pagination.current_page || nextPage) + 1);
        } catch {
            setError(componentTranslations.t('dealio_listing_error'));
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchOptions().catch(() => undefined);
        fetchOpportunities(true);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const clearFilters = () => {
        setSearch('');
        setRegion('');
        setType('');
        setInvestmentRange('');
        fetchOpportunities(true, { search: '', region: '', type: '', investmentRange: '' });
    };

    return (
        <AppLayout color="white" section="hero">
            <Head title={t('dealio_title')} />

            <div className="-mt-20 flex w-full flex-col items-center justify-center gap-10 px-4 pt-24 pb-24 sm:px-6 sm:pt-32 md:px-10 md:pt-52">
                <div id="hero" className="flex w-full max-w-6xl flex-col gap-6 lg:flex-row">
                    <Text variant="heading2" className="w-full text-text-primary">
                        {t('dealio_header')}
                    </Text>
                    <div className="flex w-full max-w-96 items-start gap-6 lg:items-end lg:justify-end">
                        <Text variant="bodyLarge" className="text-text-secondary">
                            {t('dealio_subtitle')}
                        </Text>
                    </div>
                </div>

                <DealioFilters
                    regions={regions}
                    types={types}
                    search={search}
                    region={region}
                    type={type}
                    investmentRange={investmentRange}
                    onSearchChange={setSearch}
                    onRegionChange={setRegion}
                    onTypeChange={setType}
                    onInvestmentRangeChange={setInvestmentRange}
                    onApply={() => fetchOpportunities(true)}
                    onClear={clearFilters}
                />

                {opportunities.length > 0 && (
                    <div className="w-full max-w-6xl">
                        <Text variant="bodyMedium" className="text-text-secondary">
                            {t('dealio_found_opportunities', { count: opportunities.length })}
                        </Text>
                    </div>
                )}

                <div className="w-full max-w-6xl">
                    {loading && opportunities.length === 0 ? (
                        <div className="grid grid-cols-1 gap-4 sm:gap-6 md:grid-cols-2 xl:grid-cols-3">
                            {Array.from({ length: 6 }).map((_, index) => (
                                <div key={index} className="overflow-hidden rounded-2xl border border-ui-3 bg-ui-2">
                                    <Skeleton className="h-72 w-full rounded-none" />
                                    <div className="flex flex-col gap-3 p-5">
                                        <Skeleton className="h-5 w-3/4" />
                                        <Skeleton className="h-4 w-1/2" />
                                        <Skeleton className="h-16 w-full" />
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : error ? (
                        <div className="flex flex-col items-center justify-center gap-4 py-16 text-center">
                            <Text variant="heading4" className="text-text-primary">
                                {error}
                            </Text>
                            <Button onClick={() => fetchOpportunities(true)}>{componentTranslations.t('dealio_retry')}</Button>
                        </div>
                    ) : opportunities.length > 0 ? (
                        <div className="flex flex-col gap-4 sm:gap-6">
                            {featuredOpportunities.length > 0 && (
                                <div className="grid grid-cols-1 gap-4 sm:gap-6">
                                    {featuredOpportunities.map((opportunity) => (
                                        <OpportunityCard key={opportunity.id || opportunity.slug} opportunity={opportunity} variant="featured" />
                                    ))}
                                </div>
                            )}

                            {standardOpportunities.length > 0 && (
                                <div className="grid grid-cols-1 gap-4 sm:gap-6 md:grid-cols-2 xl:grid-cols-3">
                                    {standardOpportunities.map((opportunity) => (
                                        <OpportunityCard key={opportunity.id || opportunity.slug} opportunity={opportunity} />
                                    ))}
                                </div>
                            )}
                        </div>
                    ) : (
                        <div className="flex flex-col items-center justify-center py-16">
                            <Text variant="heading4" className="mb-4 text-text-primary">
                                {t('dealio_no_opportunities')}
                            </Text>
                            <Text variant="bodyLarge" className="text-center text-text-secondary">
                                {t('dealio_no_opportunities_description')}
                            </Text>
                        </div>
                    )}
                </div>

                {hasMore && (
                    <Button variant="outline" onClick={() => fetchOpportunities(false)} disabled={loading}>
                        {loading ? componentTranslations.t('submitting') : componentTranslations.t('dealio_load_more')}
                    </Button>
                )}
            </div>
        </AppLayout>
    );
}

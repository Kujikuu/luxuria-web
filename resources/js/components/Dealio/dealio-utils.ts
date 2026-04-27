import type { DealioMediaItem, DealioOpportunity, DealioOption } from '@/types/dealio';

export const investmentRanges = [
    { value: '0_500000', min: 0, max: 500000, labelKey: 'dealio_range_0_500000', fallback: 'Up to 500K SAR' },
    { value: '500000_2500000', min: 500000, max: 2500000, labelKey: 'dealio_range_500000_2500000', fallback: '500K - 2.5M SAR' },
    { value: '2500000_10000000', min: 2500000, max: 10000000, labelKey: 'dealio_range_2500000_10000000', fallback: '2.5M - 10M SAR' },
    { value: '10000000_plus', min: 10000000, max: '', labelKey: 'dealio_range_10000000_plus', fallback: '10M+ SAR' },
] as const;

export function optionValue(option: DealioOption): string {
    return String(option.slug || option.id || option.name || option.label || '');
}

export function optionLabel(option: DealioOption): string {
    return option.name || option.label || option.slug || String(option.id || '');
}

export function mediaUrl(item: string | DealioMediaItem | undefined): string {
    if (!item) {
        return '';
    }

    return typeof item === 'string' ? item : item.url || item.thumbnail_url || '';
}

export function formatTagLabel(tag: string | DealioOption): string {
    const value = typeof tag === 'string' ? tag : tag.name || tag.label || tag.slug || '';

    return value.replace(/[-_]+/g, ' ').replace(/\b\w/g, (char) => char.toUpperCase());
}

export function formatNumber(value: number | string | null | undefined, locale: string = 'en-US'): string {
    if (value === null || value === undefined || value === '') {
        return '';
    }

    return new Intl.NumberFormat(locale, {
        maximumFractionDigits: 0,
    }).format(Number(value));
}

export function formatPercent(value: number | string | null | undefined, locale: string = 'en-US'): string {
    if (value === null || value === undefined || value === '') {
        return '';
    }

    return `${new Intl.NumberFormat(locale, { maximumFractionDigits: 1 }).format(Number(value))}%`;
}

export function formatSAR(value: number | string | null | undefined, locale: string = 'en-US'): string {
    const formatted = formatNumber(value, locale);

    return formatted ? `${formatted} SAR` : '';
}

export function normalizeOpportunity(opportunity: DealioOpportunity): DealioOpportunity {
    const region = opportunity.region;
    const financials = opportunity.financials || {};

    return {
        ...opportunity,
        typeLabel: opportunity.type_label || opportunity.typeLabel || formatTagLabel(opportunity.type || ''),
        regionName: typeof region === 'string' ? region : region?.name || region?.label || '',
        mediaItems: Array.isArray(opportunity.media) ? opportunity.media : opportunity.mediaItems || [],
        highlights: Array.isArray(opportunity.highlights) ? opportunity.highlights : [],
        minInvestment: financials.min_investment ?? opportunity.min_investment ?? opportunity.minInvestment ?? null,
        roiMin: financials.expected_roi?.min ?? opportunity.expected_roi_min ?? opportunity.roiMin ?? null,
        roiMax: financials.expected_roi?.max ?? opportunity.expected_roi_max ?? opportunity.roiMax ?? null,
        fundedPercentage: financials.funded_percentage ?? opportunity.funded_percentage ?? opportunity.fundedPercentage ?? 0,
        financials: {
            ...financials,
            min_investment: financials.min_investment ?? opportunity.min_investment ?? null,
            max_investment: financials.max_investment ?? opportunity.max_investment ?? null,
            target_amount: financials.target_amount ?? opportunity.target_amount ?? null,
            expected_roi: {
                min: financials.expected_roi?.min ?? opportunity.expected_roi_min ?? null,
                max: financials.expected_roi?.max ?? opportunity.expected_roi_max ?? null,
            },
            horizon_months: financials.horizon_months ?? opportunity.investment_horizon_months ?? null,
            equity_offered_pct: financials.equity_offered_pct ?? opportunity.equity_offered_pct ?? null,
            funded_percentage: financials.funded_percentage ?? opportunity.funded_percentage ?? null,
        },
    };
}

export function sortOpportunities(opportunities: DealioOpportunity[]): DealioOpportunity[] {
    let promotedFeaturedCount = 0;

    return opportunities
        .map((opportunity, index) => ({ opportunity, index }))
        .sort((left, right) => {
            if (left.opportunity.is_featured === right.opportunity.is_featured) {
                return left.index - right.index;
            }

            return left.opportunity.is_featured ? -1 : 1;
        })
        .map(({ opportunity }) => {
            const promotedFeatured = Boolean(opportunity.is_featured) && promotedFeaturedCount < 2;

            if (promotedFeatured) {
                promotedFeaturedCount += 1;
            }

            return { ...opportunity, promotedFeatured };
        });
}

export interface DealioOption {
    id?: number | string;
    slug?: string;
    name?: string;
    label?: string;
}

export interface DealioMediaItem {
    url?: string;
    thumbnail_url?: string;
}

export interface DealioFinancials {
    min_investment?: number | string | null;
    max_investment?: number | string | null;
    target_amount?: number | string | null;
    expected_roi?: {
        min?: number | string | null;
        max?: number | string | null;
    };
    horizon_months?: number | string | null;
    equity_offered_pct?: number | string | null;
    funded_percentage?: number | string | null;
    min_space_sqm?: number | string | null;
    max_space_sqm?: number | string | null;
    employees_needed?: number | string | null;
}

export interface DealioOpportunity {
    id?: number | string;
    uuid?: string;
    slug: string;
    title: string;
    title_ar?: string;
    summary?: string;
    summary_ar?: string;
    description?: string;
    description_ar?: string;
    type?: string;
    type_label?: string;
    typeLabel?: string;
    city?: string;
    city_ar?: string;
    region?: string | DealioOption;
    regionName?: string;
    industry?: string | DealioOption;
    industries?: Array<string | DealioOption>;
    media?: Array<string | DealioMediaItem>;
    mediaItems?: Array<string | DealioMediaItem>;
    tags?: Array<string | DealioOption>;
    highlights?: Array<string | DealioOption>;
    is_featured?: boolean;
    promotedFeatured?: boolean;
    min_investment?: number | string | null;
    max_investment?: number | string | null;
    target_amount?: number | string | null;
    expected_roi_min?: number | string | null;
    expected_roi_max?: number | string | null;
    investment_horizon_months?: number | string | null;
    equity_offered_pct?: number | string | null;
    funded_percentage?: number | string | null;
    minInvestment?: number | string | null;
    roiMin?: number | string | null;
    roiMax?: number | string | null;
    fundedPercentage?: number | string | null;
    financials?: DealioFinancials;
    partner?: {
        name?: string;
        description?: string;
        bio?: string;
    };
    contact?: {
        email?: string;
        phone?: string;
    };
}

export interface DealioPagination {
    current_page?: number;
    last_page?: number;
    total?: number;
    from?: number;
    to?: number;
}

export interface DealioApiListResponse {
    data?: DealioOpportunity[];
    meta?: DealioPagination | { pagination?: DealioPagination };
}

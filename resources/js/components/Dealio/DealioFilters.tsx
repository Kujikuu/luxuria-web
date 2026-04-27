import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useTranslations } from '@/hooks/useLocalization';
import type { DealioOption } from '@/types/dealio';
import { MagnifyingGlassIcon } from '@phosphor-icons/react';
import { investmentRanges, optionLabel, optionValue } from './dealio-utils';

interface DealioFiltersProps {
    regions: DealioOption[];
    types: DealioOption[];
    search: string;
    region: string;
    type: string;
    investmentRange: string;
    onSearchChange: (value: string) => void;
    onRegionChange: (value: string) => void;
    onTypeChange: (value: string) => void;
    onInvestmentRangeChange: (value: string) => void;
    onApply: () => void;
    onClear: () => void;
}

const normalizeSelectValue = (value: string) => (value === 'all' ? '' : value);
const displaySelectValue = (value: string) => value || 'all';

export default function DealioFilters({
    regions,
    types,
    search,
    region,
    type,
    investmentRange,
    onSearchChange,
    onRegionChange,
    onTypeChange,
    onInvestmentRangeChange,
    onApply,
    onClear,
}: DealioFiltersProps) {
    const { t, isRtl } = useTranslations('components');

    const handleKeyPress = (event: React.KeyboardEvent) => {
        if (event.key === 'Enter') {
            onApply();
        }
    };

    return (
        <div className="w-full max-w-6xl rounded-2xl border border-ui-3 bg-ui-2 p-6">
            <div className="flex flex-col gap-4">
                <div className="relative">
                    <MagnifyingGlassIcon
                        size={20}
                        className={`absolute top-1/2 -translate-y-1/2 transform text-text-secondary ${isRtl ? 'right-3' : 'left-3'}`}
                    />
                    <Input
                        type="text"
                        placeholder={t('dealio_search_placeholder')}
                        value={search}
                        onChange={(event) => onSearchChange(event.target.value)}
                        onKeyPress={handleKeyPress}
                        className={isRtl ? 'pr-10 text-right' : 'pl-10 text-left'}
                        dir={isRtl ? 'rtl' : 'ltr'}
                    />
                </div>

                <div className="flex flex-wrap justify-between gap-4">
                    <div className="flex gap-4">
                        <Select value={displaySelectValue(region)} onValueChange={(value) => onRegionChange(normalizeSelectValue(value))}>
                            <SelectTrigger>
                                <SelectValue placeholder={t('dealio_region')} />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">{t('dealio_all_regions')}</SelectItem>
                                {regions.map((option) => (
                                    <SelectItem key={optionValue(option)} value={optionValue(option)}>
                                        {optionLabel(option)}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>

                        <Select value={displaySelectValue(type)} onValueChange={(value) => onTypeChange(normalizeSelectValue(value))}>
                            <SelectTrigger>
                                <SelectValue placeholder={t('dealio_type')} />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">{t('dealio_all_types')}</SelectItem>
                                {types.map((option) => (
                                    <SelectItem key={optionValue(option)} value={optionValue(option)}>
                                        {optionLabel(option)}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>

                        <Select value={displaySelectValue(investmentRange)} onValueChange={(value) => onInvestmentRangeChange(normalizeSelectValue(value))}>
                            <SelectTrigger>
                                <SelectValue placeholder={t('dealio_investment_range')} />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">{t('dealio_any_investment')}</SelectItem>
                                {investmentRanges.map((range) => (
                                    <SelectItem key={range.value} value={range.value}>
                                        {t(range.labelKey) || range.fallback}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="flex gap-3">
                        <Button onClick={onApply} className="flex-1 md:flex-initial">
                            {t('dealio_search')}
                        </Button>
                        <Button variant="outline" onClick={onClear} className="flex-1 md:flex-initial">
                            {t('clear_filters')}
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}

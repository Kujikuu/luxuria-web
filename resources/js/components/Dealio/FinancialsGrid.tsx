import { Text } from '@/components/Typography';
import { Progress } from '@/components/ui/progress';
import { useLocale, useTranslations } from '@/hooks/useLocalization';
import type { DealioOpportunity } from '@/types/dealio';
import { formatNumber, formatPercent, formatSAR } from './dealio-utils';

interface FinancialsGridProps {
    opportunity: DealioOpportunity;
}

export default function FinancialsGrid({ opportunity }: FinancialsGridProps) {
    const { currentLocale } = useLocale();
    const { t } = useTranslations('components');
    const financials = opportunity.financials || {};
    const fundedPercentage = Number(financials.funded_percentage || opportunity.fundedPercentage || 0);
    const metrics = [
        { label: t('dealio_min_investment'), value: formatSAR(financials.min_investment, currentLocale) },
        { label: t('dealio_max_investment'), value: formatSAR(financials.max_investment, currentLocale) },
        { label: t('dealio_target_amount'), value: formatSAR(financials.target_amount, currentLocale) },
        {
            label: t('dealio_expected_roi'),
            value: [financials.expected_roi?.min, financials.expected_roi?.max].filter(Boolean).map((roi) => formatPercent(roi, currentLocale)).join(' - '),
        },
        {
            label: t('dealio_investment_horizon'),
            value: financials.horizon_months ? `${formatNumber(financials.horizon_months, currentLocale)} ${t('dealio_months')}` : '',
        },
        { label: t('dealio_equity_offered'), value: formatPercent(financials.equity_offered_pct, currentLocale) },
    ].filter((metric) => metric.value);

    if (metrics.length === 0 && fundedPercentage <= 0) {
        return null;
    }

    return (
        <section className="flex flex-col gap-5">
            <Text variant="heading3" className="text-text-primary">
                {t('dealio_financials')}
            </Text>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {metrics.map((metric) => (
                    <div key={metric.label} className="rounded-2xl border border-ui-3 bg-ui-2 p-5">
                        <Text variant="bodySmall" className="text-text-secondary">
                            {metric.label}
                        </Text>
                        <Text variant="heading4" className="mt-2 text-text-primary">
                            {metric.value}
                        </Text>
                    </div>
                ))}
            </div>
            {fundedPercentage > 0 && (
                <div className="rounded-2xl border border-ui-3 bg-ui-2 p-5">
                    <div className="mb-2 flex justify-between">
                        <Text variant="bodySmall" className="text-text-secondary">
                            {t('dealio_funded')}
                        </Text>
                        <Text variant="bodySmall" className="text-text-secondary">
                            {formatNumber(Math.round(fundedPercentage), currentLocale)}%
                        </Text>
                    </div>
                    <Progress value={Math.min(fundedPercentage, 100)} className="h-2 bg-ui-3" />
                </div>
            )}
        </section>
    );
}

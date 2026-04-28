import SarAmount, { SarIcon } from '@/components/SarAmount';
import { Text } from '@/components/Typography';
import { Input } from '@/components/ui/input';
import { useLocale, useTranslations } from '@/hooks/useLocalization';
import type { DealioOpportunity } from '@/types/dealio';
import { useMemo, useState } from 'react';

interface RoiCalculatorProps {
    opportunity: DealioOpportunity;
}

export default function RoiCalculator({ opportunity }: RoiCalculatorProps) {
    const [amount, setAmount] = useState('');
    const { currentLocale } = useLocale();
    const { t } = useTranslations('components');
    const financials = opportunity.financials || {};
    const minRoi = Number(financials.expected_roi?.min || 0);
    const maxRoi = Number(financials.expected_roi?.max || 0);
    const horizonMonths = Number(financials.horizon_months || 0);

    const calculation = useMemo(() => {
        const investmentAmount = Number(amount);

        if (!investmentAmount || investmentAmount <= 0 || (!minRoi && !maxRoi)) {
            return null;
        }

        const horizonMultiplier = horizonMonths ? horizonMonths / 12 : 1;

        return {
            conservativeAnnual: investmentAmount * (minRoi / 100),
            optimisticAnnual: investmentAmount * (maxRoi / 100),
            conservativeTotal: investmentAmount * (minRoi / 100) * horizonMultiplier,
            optimisticTotal: investmentAmount * (maxRoi / 100) * horizonMultiplier,
        };
    }, [amount, horizonMonths, maxRoi, minRoi]);

    return (
        <section className="flex flex-col gap-4 rounded-2xl border border-ui-3 bg-ui-2 p-6">
            <Text variant="heading4" className="text-text-primary">
                {t('dealio_roi_title')}
            </Text>
            <div className="flex items-center gap-3">
                <Input
                    type="number"
                    min="0"
                    inputMode="decimal"
                    value={amount}
                    onChange={(event) => setAmount(event.target.value)}
                    placeholder={t('dealio_roi_placeholder')}
                    className="h-11 bg-ui-1"
                />
                <SarIcon className="size-5 shrink-0 text-text-secondary" />
            </div>

            {calculation ? (
                <div className="grid grid-cols-1 gap-3">
                    <div className="rounded-xl bg-ui-1 p-4">
                        <Text variant="bodySmallBold" className="text-text-primary">
                            {t('dealio_conservative')}
                        </Text>
                        <Text variant="bodySmall" className="mt-2 text-text-secondary">
                            {t('dealio_annual_return')}: <SarAmount value={calculation.conservativeAnnual} locale={currentLocale} />
                        </Text>
                        <Text variant="bodySmall" className="text-text-secondary">
                            {t('dealio_total_return')}: <SarAmount value={calculation.conservativeTotal} locale={currentLocale} />
                        </Text>
                    </div>
                    <div className="rounded-xl bg-ui-1 p-4">
                        <Text variant="bodySmallBold" className="text-text-primary">
                            {t('dealio_optimistic')}
                        </Text>
                        <Text variant="bodySmall" className="mt-2 text-text-secondary">
                            {t('dealio_annual_return')}: <SarAmount value={calculation.optimisticAnnual} locale={currentLocale} />
                        </Text>
                        <Text variant="bodySmall" className="text-text-secondary">
                            {t('dealio_total_return')}: <SarAmount value={calculation.optimisticTotal} locale={currentLocale} />
                        </Text>
                    </div>
                </div>
            ) : (
                <Text variant="bodySmall" className="text-text-secondary">
                    {t('dealio_roi_hint')}
                </Text>
            )}
        </section>
    );
}

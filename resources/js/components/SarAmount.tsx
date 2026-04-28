import { cn } from '@/lib/utils';

interface SarAmountProps {
    value: number | string | null | undefined;
    locale?: string;
    className?: string;
    iconClassName?: string;
    maximumFractionDigits?: number;
    notation?: Intl.NumberFormatOptions['notation'];
}

function formatAmount(
    value: number | string | null | undefined,
    locale: string,
    maximumFractionDigits: number,
    notation: Intl.NumberFormatOptions['notation'],
): string {
    if (value === null || value === undefined || value === '') {
        return '';
    }

    return new Intl.NumberFormat(locale, {
        maximumFractionDigits,
        notation,
    }).format(Number(value));
}

export function SarIcon({ className }: { className?: string }) {
    return (
        <svg
            width="24"
            height="27"
            viewBox="0 0 24 27"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
            focusable="false"
            className={cn('h-[1em] w-auto shrink-0', className)}
        >
            <g clipPath="url(#sar-icon-clip)">
                <path
                    d="M14.9365 23.9189C14.5083 24.8748 14.2252 25.9122 14.1167 27L23.1798 25.0607C23.6081 24.1051 23.891 23.0675 23.9997 21.9797L14.9365 23.9189Z"
                    fill="currentColor"
                />
                <path
                    d="M23.1799 19.2509C23.6082 18.2952 23.8913 17.2577 23.9998 16.1698L16.9399 17.6812V14.7758L23.1797 13.441C23.608 12.4853 23.8911 11.4478 23.9995 10.36L16.9396 11.8701V1.42114C15.8579 2.03254 14.8971 2.84637 14.1161 3.80633V12.4744L11.2927 13.0785V0C10.2109 0.61118 9.25013 1.42523 8.46916 2.38519V13.6823L2.15159 15.0336C1.72331 15.9893 1.44 17.0269 1.33133 18.1147L8.46916 16.5878V20.2467L0.819583 21.883C0.391308 22.8386 0.108212 23.8762 -0.000244141 24.964L8.00673 23.2513C8.65854 23.1148 9.21875 22.7269 9.58297 22.1931L11.0514 20.0017V20.0013C11.2038 19.7746 11.2927 19.5012 11.2927 19.2068V15.9837L14.1161 15.3796V21.1906L23.1797 19.2504L23.1799 19.2509Z"
                    fill="currentColor"
                />
            </g>
            <defs>
                <clipPath id="sar-icon-clip">
                    <rect width="24" height="27" fill="white" />
                </clipPath>
            </defs>
        </svg>
    );
}

export default function SarAmount({
    value,
    locale = 'en-US',
    className,
    iconClassName,
    maximumFractionDigits = 0,
    notation = 'standard',
}: SarAmountProps) {
    const formatted = formatAmount(value, locale, maximumFractionDigits, notation);

    if (!formatted) {
        return null;
    }

    return (
        <span dir="ltr" className={cn('inline-flex items-center gap-1.5 whitespace-nowrap', className)}>
            <SarIcon className={iconClassName} />
            <span>{formatted}</span>
        </span>
    );
}

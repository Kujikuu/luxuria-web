import { useLocale } from '@/hooks/useLocalization';

/**
 * Hook to get the appropriate font class based on current locale
 */
export function useFont() {
    const { currentLocale } = useLocale();

    const isArabic = currentLocale === 'ar';

    return {
        fontClass: isArabic ? 'font-arabic' : 'font-sans',
        isArabic,
        fontFamily: isArabic ? 'var(--font-arabic)' : 'var(--font-sans)',
    };
}

export default useFont;

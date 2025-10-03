import React from 'react';

interface RTLProviderProps {
    children: React.ReactNode;
    locale?: string;
}

export const RTLProvider: React.FC<RTLProviderProps> = ({ children, locale = 'en' }) => {
    const isRtl = ['ar', 'he', 'fa', 'ur'].includes(locale);
    const isArabic = locale === 'ar';

    React.useEffect(() => {
        // Update the document direction
        document.documentElement.dir = isRtl ? 'rtl' : 'ltr';

        // Add/remove rtl class on html element for CSS targeting
        if (isRtl) {
            document.documentElement.classList.add('rtl');
        } else {
            document.documentElement.classList.remove('rtl');
        }

        // Add/remove Arabic font class on body element
        if (isArabic) {
            document.body.classList.add('font-arabic');
        } else {
            document.body.classList.remove('font-arabic');
        }
    }, [isRtl, isArabic]);

    return <div className={isRtl ? 'rtl' : 'ltr'}>{children}</div>;
};

export default RTLProvider;

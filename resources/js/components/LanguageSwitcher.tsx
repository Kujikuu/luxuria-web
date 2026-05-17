import { useLocale, useTranslations } from '@/hooks/useLocalization';
import { CaretDown, Translate } from '@phosphor-icons/react';
import React, { useState } from 'react';

interface LanguageSwitcherProps {
    className?: string;
}

const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({ className = '' }) => {
    const [isOpen, setIsOpen] = useState(false);
    const { currentLocale, availableLocales, switchLocale } = useLocale();
    const { direction, t } = useTranslations();

    const localeNames = {
        en: t('english') || 'English',
        ar: t('arabic') || 'العربية',
    };

    return (
        <div className={`relative inline-block text-start ${className}`} dir={direction}>
            <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                className="inline-flex w-full items-center justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-100 focus:outline-none dark:border-gray-600 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700"
                aria-expanded={isOpen}
                aria-haspopup="true"
            >
                <Translate className="me-2 h-5 w-5" aria-hidden="true" />
                <span>{localeNames[currentLocale as keyof typeof localeNames] || currentLocale.toUpperCase()}</span>
                <CaretDown className="ms-2 -me-1 h-5 w-5" aria-hidden="true" />
            </button>

            {isOpen && (
                <>
                    {/* Overlay to close dropdown when clicking outside */}
                    <div className="fixed inset-0 z-10" onClick={() => setIsOpen(false)} />

                    <div className="inset-e-0 ring-opacity-5 absolute z-20 mt-2 w-56 origin-top-right rounded-md border border-gray-300 bg-white shadow-lg ring-1 ring-black focus:outline-none dark:border-gray-600 dark:bg-gray-800">
                        <div className="py-1" role="menu" aria-orientation="vertical">
                            {availableLocales.map((locale) => (
                                <button
                                    key={locale}
                                    onClick={() => {
                                        switchLocale(locale);
                                        setIsOpen(false);
                                    }}
                                    className={`block w-full px-4 py-2 text-start text-sm hover:bg-gray-100 dark:hover:bg-gray-700 ${
                                        currentLocale === locale
                                            ? 'bg-gray-100 text-gray-900 dark:bg-gray-700 dark:text-gray-100'
                                            : 'text-gray-700 dark:text-gray-300'
                                    } `}
                                    role="menuitem"
                                >
                                    <div className="flex items-center">
                                        <span className="me-3 text-lg">{locale === 'ar' ? '🇸🇦' : '🇺🇸'}</span>
                                        {localeNames[locale as keyof typeof localeNames] || locale.toUpperCase()}
                                        {currentLocale === locale && <span className="ms-auto text-xs text-gray-500 dark:text-gray-400">✓</span>}
                                    </div>
                                </button>
                            ))}
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default LanguageSwitcher;

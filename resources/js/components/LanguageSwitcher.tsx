import React, { useState } from 'react';
import { useLocale, useTranslations } from '@/hooks/useLocalization';
import { CaretDown, Translate } from '@phosphor-icons/react';

interface LanguageSwitcherProps {
    className?: string;
}

const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({ className = '' }) => {
    const [isOpen, setIsOpen] = useState(false);
    const { currentLocale, availableLocales, switchLocale } = useLocale();
    const { t } = useTranslations();

    const localeNames = {
        en: t('english') || 'English',
        ar: t('arabic') || 'العربية',
    };

    return (
        <div className={`relative inline-block text-left ${className}`}>
            <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                className="inline-flex items-center justify-center w-full px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500 dark:bg-gray-800 dark:text-gray-200 dark:border-gray-600 dark:hover:bg-gray-700"
                aria-expanded={isOpen}
                aria-haspopup="true"
            >
                <Translate className="w-5 h-5 mr-2" aria-hidden="true" />
                <span>{localeNames[currentLocale as keyof typeof localeNames] || currentLocale.toUpperCase()}</span>
                <CaretDown className="w-5 h-5 ml-2 -mr-1" aria-hidden="true" />
            </button>

            {isOpen && (
                <>
                    {/* Overlay to close dropdown when clicking outside */}
                    <div
                        className="fixed inset-0 z-10"
                        onClick={() => setIsOpen(false)}
                    />
                    
                    <div className="absolute right-0 z-20 w-56 mt-2 origin-top-right bg-white border border-gray-300 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none dark:bg-gray-800 dark:border-gray-600">
                        <div className="py-1" role="menu" aria-orientation="vertical">
                            {availableLocales.map((locale) => (
                                <button
                                    key={locale}
                                    onClick={() => {
                                        switchLocale(locale);
                                        setIsOpen(false);
                                    }}
                                    className={`
                                        block w-full px-4 py-2 text-sm text-left hover:bg-gray-100 dark:hover:bg-gray-700
                                        ${currentLocale === locale 
                                            ? 'bg-gray-100 text-gray-900 dark:bg-gray-700 dark:text-gray-100' 
                                            : 'text-gray-700 dark:text-gray-300'
                                        }
                                    `}
                                    role="menuitem"
                                >
                                    <div className="flex items-center">
                                        <span className="text-lg mr-3">
                                            {locale === 'ar' ? '🇸🇦' : '🇺🇸'}
                                        </span>
                                        {localeNames[locale as keyof typeof localeNames] || locale.toUpperCase()}
                                        {currentLocale === locale && (
                                            <span className="ml-auto text-xs text-gray-500 dark:text-gray-400">
                                                ✓
                                            </span>
                                        )}
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
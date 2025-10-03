import { PageProps } from '@/types';
import { usePage } from '@inertiajs/react';
import { useEffect } from 'react';

interface LocaleData {
    current: string;
    available: string[];
}

interface TranslationsCache {
    [locale: string]: {
        [namespace: string]: {
            [key: string]: string;
        };
    };
}

// Simple cache for translations
const translationsCache: TranslationsCache = {};

// Load translations for a specific locale and namespace
async function loadTranslations(locale: string, namespace: string): Promise<Record<string, string>> {
    if (!translationsCache[locale]) {
        translationsCache[locale] = {};
    }

    if (!translationsCache[locale][namespace]) {
        try {
            const response = await fetch(`/api/translations/${locale}/${namespace}`);

            if (response && response.ok) {
                const translations = await response.json();
                translationsCache[locale][namespace] = translations;
            } else {
                // Fallback to empty object if API fails
                translationsCache[locale][namespace] = {};
            }
        } catch (error) {
            console.warn(`Failed to load translations for ${locale}/${namespace}:`, error);
            translationsCache[locale][namespace] = {};
        }
    }

    return translationsCache[locale][namespace] || {};
}

// Translation function
export function t(key: string, replacements: Record<string, string | number> = {}, namespace: string = 'common'): string {
    const { locale } = usePage<PageProps>().props;
    const currentLocale = locale?.current || 'en';

    // Get cached translations
    const translations = translationsCache[currentLocale]?.[namespace] || {};

    let translation = translations[key] || key;

    // Replace placeholders
    Object.keys(replacements).forEach((placeholder) => {
        translation = translation.replace(`:${placeholder}`, String(replacements[placeholder]));
    });

    return translation;
}

// Hook for using translations
export function useTranslations(namespace: string = 'common') {
    let currentLocale = 'en';
    let translations: Record<string, string> = {};

    try {
        const page = usePage<PageProps>();
        currentLocale = page.props.locale?.current || 'en';
        
        // Get translations from the page props (passed from Laravel)
        const pageTranslations = (page.props as any).translations || {};
        translations = pageTranslations[namespace] || {};
        
        // Also update the cache for consistency
        if (!translationsCache[currentLocale]) {
            translationsCache[currentLocale] = {};
        }
        translationsCache[currentLocale][namespace] = translations;
    } catch {
        // Fallback if usePage is not available
        currentLocale = 'en';
        translations = translationsCache[currentLocale]?.[namespace] || {};
    }

    const translate = (key: string, replacements: Record<string, string | number> = {}): string => {
        let translation = translations[key];

        // If translation not found, try the fallback cache
        if (!translation) {
            translation = translationsCache[currentLocale]?.[namespace]?.[key];
        }

        // If still not found, return the key as fallback
        if (!translation || translation === key) {
            // Try to return the key itself or a formatted version
            if (key.includes('_')) {
                // Format snake_case to Title Case as fallback
                translation = key
                    .split('_')
                    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                    .join(' ');
            } else {
                translation = key;
            }
        }

        // Replace placeholders
        Object.keys(replacements).forEach((placeholder) => {
            translation = translation.replace(`:${placeholder}`, String(replacements[placeholder]));
        });

        return translation;
    };

    return {
        t: translate,
        locale: currentLocale,
        isRtl: ['ar', 'he', 'fa', 'ur'].includes(currentLocale),
        direction: ['ar', 'he', 'fa', 'ur'].includes(currentLocale) ? 'rtl' : 'ltr',
    };
}

// Hook for locale switching
export function useLocale() {
    let locale = { current: 'en', available: ['en'] };

    try {
        const page = usePage<PageProps>();
        locale = page.props.locale || { current: 'en', available: ['en'] };
    } catch {
        // Fallback if usePage is not available
        locale = { current: 'en', available: ['en'] };
    }

    const switchLocale = (newLocale: string) => {
        // Store the locale in localStorage as well for immediate feedback
        localStorage.setItem('preferred-locale', newLocale);

        // Use full page reload to ensure the locale middleware processes the change
        window.location.href = `/language/${newLocale}`;
    };

    const getLocalizedPath = (path: string, targetLocale?: string) => {
        const currentLocale = locale?.current || 'en';
        const locale_to_use = targetLocale || currentLocale;

        // Default locale (English) doesn't need prefix
        if (locale_to_use === 'en') {
            return path;
        }

        // Add locale prefix for non-default locales
        return `/${locale_to_use}${path}`;
    };

    const currentLoc = locale?.current || 'en';
    const isArabic = currentLoc === 'ar';

    return {
        currentLocale: currentLoc,
        availableLocales: locale?.available || ['en'],
        switchLocale,
        getLocalizedPath,
        isRtl: ['ar', 'he', 'fa', 'ur'].includes(currentLoc),
        isArabic,
        fontClass: isArabic ? 'font-arabic' : 'font-sans',
        fontFamily: isArabic ? 'Cairo' : 'Inter',
    };
}

// Initialize translations for common namespaces
export async function initializeTranslations(locale: string) {
    await Promise.all([loadTranslations(locale, 'common'), loadTranslations(locale, 'pages'), loadTranslations(locale, 'components')]);
}

// Simple client-side translation data
const clientTranslations: TranslationsCache = {
    en: {
        common: {
            home: 'Home',
            about: 'About',
            contact: 'Contact',
            properties: 'Properties',
            blog: 'Blog',
            search: 'Search',
            menu: 'Menu',
            close: 'Close',
            submit: 'Submit',
            send: 'Send',
            cancel: 'Cancel',
            save: 'Save',
            edit: 'Edit',
            delete: 'Delete',
            view: 'View',
            read_more: 'Read More',
            learn_more: 'Learn More',
            get_in_touch: 'Get in Touch',
            contact_us: 'Contact Us',
            inquire_now: 'Inquire Now',
            name: 'Name',
            email: 'Email',
            phone: 'Phone',
            message: 'Message',
            subject: 'Subject',
            price: 'Price',
            location: 'Location',
            date: 'Date',
            time: 'Time',
            address: 'Address',
            description: 'Description',
            features: 'Features',
            amenities: 'Amenities',
            bedrooms: 'Bedrooms',
            bathrooms: 'Bathrooms',
            area: 'Area',
            square_meters: 'Square Meters',
            property_type: 'Property Type',
            featured_properties: 'Featured Properties',
            property_details: 'Property Details',
            property_inquiry: 'Property Inquiry',
            required: 'Required',
            optional: 'Optional',
            language: 'Language',
            english: 'English',
            arabic: 'Arabic',
        },
        pages: {
            home_title: 'Luxuria - Premium Real Estate',
            home_subtitle: 'Discover Your Dream Property',
            home_description: 'Find the perfect luxury property with our comprehensive real estate platform.',
            about_title: 'About Us',
            about_description: 'Learn more about our company and our commitment to excellence in real estate.',
            contact_title: 'Contact Us',
            contact_description: 'Get in touch with our team for any inquiries or assistance.',
            contact_form_title: 'Send us a message',
            contact_info_title: 'Contact Information',
            properties_title: 'Properties',
            properties_description: 'Browse our collection of premium properties.',
            discover_homes: 'Discover homes tailored to your unique way of living',
            curated_portfolio: 'Step into a curated portfolio of breathtaking residences.',
            found_properties: 'Found :count properties',
            for: 'for',
            no_properties_found: 'No properties found',
            try_adjusting_filters: 'Try adjusting your search criteria or filters',
            no_properties_available: 'No properties are available at the moment',
            property_inquiry_title: 'Interested in this property?',
            property_inquiry_description: "Send us your inquiry and we'll get back to you soon.",
            blog_title: 'Blog',
            blog_description: 'Stay updated with the latest real estate news and insights.',
            no_posts_found: 'No blog posts found.',
            published_on: 'Published on',
            by_author: 'by',
        },
    },
    ar: {
        common: {
            home: 'الرئيسية',
            about: 'من نحن',
            contact: 'تواصل معنا',
            properties: 'العقارات',
            blog: 'المدونة',
            search: 'بحث',
            menu: 'القائمة',
            close: 'إغلاق',
            submit: 'إرسال',
            send: 'إرسال',
            cancel: 'إلغاء',
            save: 'حفظ',
            edit: 'تعديل',
            delete: 'حذف',
            view: 'عرض',
            read_more: 'قراءة المزيد',
            learn_more: 'اعرف المزيد',
            get_in_touch: 'تواصل معنا',
            contact_us: 'تواصل معنا',
            inquire_now: 'استفسر الآن',
            name: 'الاسم',
            email: 'البريد الإلكتروني',
            phone: 'الهاتف',
            message: 'الرسالة',
            subject: 'الموضوع',
            price: 'السعر',
            location: 'الموقع',
            date: 'التاريخ',
            time: 'الوقت',
            address: 'العنوان',
            description: 'الوصف',
            features: 'المميزات',
            amenities: 'الخدمات',
            bedrooms: 'غرف النوم',
            bathrooms: 'دورات المياه',
            area: 'المساحة',
            square_meters: 'متر مربع',
            property_type: 'نوع العقار',
            featured_properties: 'العقارات المميزة',
            property_details: 'تفاصيل العقار',
            property_inquiry: 'استفسار عن العقار',
            required: 'مطلوب',
            optional: 'اختياري',
            language: 'اللغة',
            english: 'English',
            arabic: 'العربية',
        },
        pages: {
            home_title: 'لوكسريا - العقارات المميزة',
            home_subtitle: 'اكتشف عقار أحلامك',
            home_description: 'اعثر على العقار الفاخر المثالي من خلال منصتنا العقارية الشاملة.',
            about_title: 'من نحن',
            about_description: 'تعرف على شركتنا والتزامنا بالتميز في مجال العقارات.',
            contact_title: 'تواصل معنا',
            contact_description: 'تواصل مع فريقنا لأي استفسارات أو مساعدة.',
            contact_form_title: 'أرسل لنا رسالة',
            contact_info_title: 'معلومات التواصل',
            properties_title: 'العقارات',
            properties_description: 'تصفح مجموعتنا من العقارات المميزة.',
            discover_homes: 'اكتشف منازل مصممة خصيصاً لنمط حياتك الفريد',
            curated_portfolio: 'ادخل إلى محفظة منسقة من المساكن الخلابة.',
            found_properties: 'تم العثور على :count عقار',
            for: 'لـ',
            no_properties_found: 'لم يتم العثور على عقارات',
            try_adjusting_filters: 'جرب تعديل معايير البحث أو الفلاتر',
            no_properties_available: 'لا تتوفر عقارات في الوقت الحالي',
            property_inquiry_title: 'مهتم بهذا العقار؟',
            property_inquiry_description: 'أرسل لنا استفسارك وسنتواصل معك قريباً.',
            blog_title: 'المدونة',
            blog_description: 'ابق على اطلاع على آخر أخبار ورؤى العقارات.',
            no_posts_found: 'لم يتم العثور على مقالات.',
            published_on: 'نُشر في',
            by_author: 'بواسطة',
        },
    },
};

// Initialize client translations
export function initializeClientTranslations() {
    Object.keys(clientTranslations).forEach((locale) => {
        if (!translationsCache[locale]) {
            translationsCache[locale] = {};
        }
        Object.keys(clientTranslations[locale]).forEach((namespace) => {
            translationsCache[locale][namespace] = clientTranslations[locale][namespace];
        });
    });
}

// Call this when the app loads
initializeClientTranslations();

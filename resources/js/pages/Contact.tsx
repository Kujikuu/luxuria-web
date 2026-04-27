// Contact.tsx
import HomeFaqs from '@/components/Home/HomeFaqs';
import Tag from '@/components/Tag';
import { Text } from '@/components/Typography';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { useTranslations } from '@/hooks/useLocalization';
import AppLayout from '@/layouts/app-layout';
import { Head, useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';

interface FaqItem {
    id: number;
    question: string;
    answer: string;
    sort_order: number;
}

interface ContactProps {
    success?: string;
    faqs?: FaqItem[];
}

export default function Contact({ success, faqs }: ContactProps) {
    const { t } = useTranslations('pages');
    const { t: tc } = useTranslations('common');

    const { data, setData, post, processing, errors, reset } = useForm({
        request_type: '',
        first_name: '',
        phone: '',
        email: '',
        message: '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post('/contact-inquiries', {
            onSuccess: () => reset(),
        });
    };
    return (
        <AppLayout color="primary" section="hero">
            <Head title={t('contact_title')} />

            {/* Hero Section */}
            <section
                id="hero"
                className="relative -mt-24 flex w-full flex-col items-center justify-center gap-10 overflow-hidden bg-primary pt-24 sm:pt-32 md:pt-52"
            >
                {/* Header */}
                <div className="flex w-full max-w-6xl flex-col items-center gap-6">
                    <Text variant="heading2" className="w-full text-center text-ui-1">
                        {t('contact_hero_title')}
                    </Text>
                    <Text variant="bodyLarge" className="max-w-[400px] text-center text-ui-2">
                        {t('contact_hero_subtitle')}
                    </Text>
                </div>

                {/* Contact Form */}
                <form onSubmit={submit} className="z-10 flex w-full max-w-[600px] flex-col items-center gap-6 rounded-2xl bg-ui-2 p-6">
                    <div className="mb-2 text-center">
                        <Text variant="heading3" className="mb-2 text-text-primary">
                            {t('contact_form_title')}
                        </Text>
                        <Text variant="bodyMedium" className="text-text-secondary">
                            {t('contact_form_subtitle')}
                        </Text>
                    </div>

                    {/* Success Message */}
                    {success && (
                        <div className="w-full rounded-lg border border-green-200 bg-green-50 p-4">
                            <Text variant="bodyMedium" className="text-green-800">
                                {success}
                            </Text>
                        </div>
                    )}

                    {/* Request Select */}
                    <div className="grid w-full items-center gap-3">
                        <Label htmlFor="request_type">{t('request_type')}</Label>
                        <Select value={data.request_type} onValueChange={(value) => setData('request_type', value)}>
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder={t('request_type_placeholder')} />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="buy">{t('request_type_buy')}</SelectItem>
                                <SelectItem value="sell">{t('request_type_sell')}</SelectItem>
                                <SelectItem value="rent">{t('request_type_consulting')}</SelectItem>
                            </SelectContent>
                        </Select>
                        {errors.request_type && (
                            <Text variant="bodySmall" className="text-red-500">
                                {errors.request_type}
                            </Text>
                        )}
                    </div>

                    {/* First Name & Phone Inputs */}
                    <div className="flex w-full gap-6">
                        <div className="grid w-full items-center gap-3">
                            <Label htmlFor="first_name">{t('first_name')}</Label>
                            <Input
                                id="first_name"
                                placeholder={t('first_name_placeholder')}
                                value={data.first_name}
                                onChange={(e) => setData('first_name', e.target.value)}
                            />
                            {errors.first_name && (
                                <Text variant="bodySmall" className="text-red-500">
                                    {errors.first_name}
                                </Text>
                            )}
                        </div>
                        <div className="grid w-full items-center gap-3">
                            <Label htmlFor="phone">{tc('phone')}</Label>
                            <Input
                                id="phone"
                                placeholder={t('phone_placeholder')}
                                type="tel"
                                value={data.phone}
                                onChange={(e) => setData('phone', e.target.value)}
                            />
                            {errors.phone && (
                                <Text variant="bodySmall" className="text-red-500">
                                    {errors.phone}
                                </Text>
                            )}
                        </div>
                    </div>

                    {/* Email Input */}
                    <div className="grid w-full items-center gap-3">
                        <Label htmlFor="email">{tc('email')}</Label>
                        <Input
                            id="email"
                            placeholder={t('email_placeholder')}
                            type="email"
                            value={data.email}
                            onChange={(e) => setData('email', e.target.value)}
                        />
                        {errors.email && (
                            <Text variant="bodySmall" className="text-red-500">
                                {errors.email}
                            </Text>
                        )}
                    </div>

                    {/* Message Input */}
                    <div className="grid w-full items-center gap-3">
                        <Label htmlFor="message">{tc('message')}</Label>
                        <Textarea
                            id="message"
                            placeholder={t('message_placeholder')}
                            value={data.message}
                            onChange={(e) => setData('message', e.target.value)}
                            rows={4}
                        />
                        {errors.message && (
                            <Text variant="bodySmall" className="text-red-500">
                                {errors.message}
                            </Text>
                        )}
                    </div>

                    {/* Submit Button */}
                    <Button type="submit" className="w-full" disabled={processing}>
                        {processing ? t('sending') : t('send_message')}
                    </Button>
                </form>

                {/* BG */}
                <div className="absolute right-0 bottom-0 left-0 h-80 w-full bg-ui-1"></div>
            </section>

            {/* Contact Details */}
            <section className="flex w-full flex-col items-center justify-center gap-6 px-4 py-12 sm:gap-8 sm:px-6 sm:py-16 md:gap-10 md:px-10 md:py-24">
                <div className="w-full max-w-6xl">
                    {/* Header */}
                    <div className="mb-12 flex flex-col items-center gap-6 text-center">
                        <Tag text={t('contact_info_tag')} />
                        <Text variant="heading2" className="text-text-primary">
                            {t('get_in_touch_title')}
                        </Text>
                        <Text variant="bodyLarge" className="max-w-2xl text-text-secondary">
                            {t('get_in_touch_subtitle')}
                        </Text>
                    </div>

                    {/* Contact Cards */}
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
                        {/* Phone */}
                        <div className="hover:bg-accent-primary/5 flex flex-col items-center gap-4 rounded-2xl bg-ui-2 p-6 transition-colors">
                            <div className="bg-accent-primary/10 flex h-12 w-12 items-center justify-center rounded-xl">
                                <svg className="text-accent-primary h-6 w-6" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                                </svg>
                            </div>
                            <div className="text-center">
                                <Text variant="heading4" className="mb-2 text-text-primary">
                                    {t('phone_contact')}
                                </Text>
                                <Text variant="bodyMedium" className="text-text-secondary">
                                    {t('phone_number_1')}
                                </Text>
                                <Text variant="bodyMedium" className="text-text-secondary">
                                    {t('phone_number_2')}
                                </Text>
                            </div>
                        </div>

                        {/* Email */}
                        <div className="hover:bg-accent-primary/5 flex flex-col items-center gap-4 rounded-2xl bg-ui-2 p-6 transition-colors">
                            <div className="bg-accent-primary/10 flex h-12 w-12 items-center justify-center rounded-xl">
                                <svg className="text-accent-primary h-6 w-6" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                                </svg>
                            </div>
                            <div className="text-center">
                                <Text variant="heading4" className="mb-2 text-text-primary">
                                    {t('email_contact')}
                                </Text>
                                <Text variant="bodyMedium" className="text-text-secondary">
                                    {t('email_info')}
                                </Text>
                                <Text variant="bodyMedium" className="text-text-secondary">
                                    {t('email_sales')}
                                </Text>
                            </div>
                        </div>

                        {/* Address */}
                        <div className="hover:bg-accent-primary/5 flex flex-col items-center gap-4 rounded-2xl bg-ui-2 p-6 transition-colors">
                            <div className="bg-accent-primary/10 flex h-12 w-12 items-center justify-center rounded-xl">
                                <svg className="text-accent-primary h-6 w-6" fill="currentColor" viewBox="0 0 20 20">
                                    <path
                                        fillRule="evenodd"
                                        d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                            </div>
                            <div className="text-center">
                                <Text variant="heading4" className="mb-2 text-text-primary">
                                    {t('address_contact')}
                                </Text>
                                <Text variant="bodyMedium" className="text-text-secondary">
                                    {t('address_line_1')}
                                </Text>
                                <Text variant="bodyMedium" className="text-text-secondary">
                                    {t('address_line_2')}
                                </Text>
                            </div>
                        </div>

                        {/* Social Media */}
                        <div className="hover:bg-accent-primary/5 flex flex-col items-center gap-4 rounded-2xl bg-ui-2 p-6 transition-colors">
                            <div className="bg-accent-primary/10 flex h-12 w-12 items-center justify-center rounded-xl">
                                <svg className="text-accent-primary h-6 w-6" fill="currentColor" viewBox="0 0 20 20">
                                    <path
                                        fillRule="evenodd"
                                        d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                            </div>
                            <div className="text-center">
                                <Text variant="heading4" className="mb-2 text-text-primary">
                                    {t('follow_us')}
                                </Text>
                                <div className="flex justify-center gap-2">
                                    <a href="#" className="hover:text-accent-primary text-text-secondary transition-colors">
                                        <Text variant="bodyMedium">{t('social_instagram')}</Text>
                                    </a>
                                    <Text variant="bodyMedium" className="text-text-tertiary">
                                        •
                                    </Text>
                                    <a href="#" className="hover:text-accent-primary text-text-secondary transition-colors">
                                        <Text variant="bodyMedium">{t('social_linkedin')}</Text>
                                    </a>
                                </div>
                                <div className="mt-1 flex justify-center gap-2">
                                    <a href="#" className="hover:text-accent-primary text-text-secondary transition-colors">
                                        <Text variant="bodyMedium">{t('social_twitter')}</Text>
                                    </a>
                                    <Text variant="bodyMedium" className="text-text-tertiary">
                                        •
                                    </Text>
                                    <a href="#" className="hover:text-accent-primary text-text-secondary transition-colors">
                                        <Text variant="bodyMedium">{t('social_facebook')}</Text>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Google map emebed container */}
            <section className="flex w-full items-start justify-center gap-6 border-t border-b border-ui-3 bg-ui-2 px-4 py-12 sm:gap-8 sm:px-6 sm:py-16 md:gap-10 md:px-10 md:py-20">
                <div className="h-[400px] w-full max-w-5xl px-4 sm:px-6 md:px-10">
                    <iframe
                        src="https://maps.google.com/maps?q=Riyadh%2C%20KSA&z=15&output=embed"
                        spellCheck={false}
                        aria-label="To enrich screen reader interactions, please activate Accessibility in Grammarly extension settings"
                        style={{ height: '100%', width: '100%', border: '0px' }}
                        className="overflow-hidden rounded-xl"
                    />
                </div>
            </section>

            {/* Faqs */}
            <HomeFaqs faqs={faqs} />
        </AppLayout>
    );
}

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

type ContactForm = {
    request_type: string;
    first_name: string;
    last_name: string;
    phone: string;
    email: string;
    message: string;
    consent: boolean;
};

interface ContactProps {
    success?: string;
    faqs?: FaqItem[];
}

export default function Contact({ success, faqs }: ContactProps) {
    const { t } = useTranslations('pages');
    const { t: tc } = useTranslations('common');

    const { data, setData, post, processing, errors, reset } = useForm<ContactForm>({
        request_type: '',
        first_name: '',
        last_name: '',
        consent: false,
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
                <form onSubmit={submit} className="z-10 flex w-[calc(100%_-_2rem)] max-w-[600px] flex-col items-center gap-6 rounded-2xl bg-ui-2 p-6">
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
                        <Label htmlFor="request_type">{t('contact_lead_type')}</Label>
                        <Select name="request_type" required value={data.request_type} onValueChange={(value) => setData('request_type', value)}>
                            <SelectTrigger id="request_type" aria-invalid={Boolean(errors.request_type)} className="w-full">
                                <SelectValue placeholder={t('contact_lead_type_placeholder')} />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="broker">{t('contact_type_broker')}</SelectItem>
                                <SelectItem value="investor">{t('contact_type_investor')}</SelectItem>
                                <SelectItem value="project_owner">{t('contact_type_project_owner')}</SelectItem>
                                <SelectItem value="other">{t('contact_type_other')}</SelectItem>
                            </SelectContent>
                        </Select>
                        {errors.request_type && (
                            <Text variant="bodySmall" className="text-red-500">
                                {errors.request_type}
                            </Text>
                        )}
                    </div>

                    {/* Name inputs */}
                    <div className="flex w-full flex-col gap-6 sm:flex-row">
                        <div className="grid w-full items-center gap-3">
                            <Label htmlFor="first_name">{t('first_name')}</Label>
                            <Input
                                id="first_name"
                                name="first_name"
                                autoComplete="given-name"
                                required
                                maxLength={255}
                                aria-invalid={Boolean(errors.first_name)}
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
                            <Label htmlFor="last_name">{t('contact_last_name')}</Label>
                            <Input
                                id="last_name"
                                name="last_name"
                                autoComplete="family-name"
                                required
                                maxLength={255}
                                aria-invalid={Boolean(errors.last_name)}
                                placeholder={t('contact_last_name')}
                                value={data.last_name}
                                onChange={(e) => setData('last_name', e.target.value)}
                            />
                            {errors.last_name && (
                                <Text variant="bodySmall" className="text-red-500">
                                    {errors.last_name}
                                </Text>
                            )}
                        </div>
                    </div>

                    <div className="grid w-full items-center gap-3">
                        <Label htmlFor="phone">{tc('phone')} *</Label>
                        <Input
                            id="phone"
                            name="phone"
                            autoComplete="tel"
                            required
                            maxLength={40}
                            aria-invalid={Boolean(errors.phone)}
                            aria-describedby="phone-help"
                            dir="ltr"
                            placeholder={t('phone_placeholder')}
                            type="tel"
                            value={data.phone}
                            onChange={(e) => setData('phone', e.target.value)}
                        />
                        <p id="phone-help" className="text-sm text-text-secondary">
                            {t('contact_phone_help')}
                        </p>
                        {errors.phone && (
                            <Text variant="bodySmall" className="text-red-500">
                                {errors.phone}
                            </Text>
                        )}
                    </div>

                    {/* Email Input */}
                    <div className="grid w-full items-center gap-3">
                        <Label htmlFor="email">{tc('email')}</Label>
                        <Input
                            id="email"
                            name="email"
                            autoComplete="email"
                            required
                            maxLength={255}
                            aria-invalid={Boolean(errors.email)}
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
                            name="message"
                            required
                            maxLength={2000}
                            aria-invalid={Boolean(errors.message)}
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

                    <div className="grid w-full gap-3">
                        <div className="flex items-start gap-3">
                            <input
                                id="consent"
                                name="consent"
                                type="checkbox"
                                required
                                checked={data.consent}
                                aria-invalid={Boolean(errors.consent)}
                                className="mt-1 size-4 shrink-0 accent-primary"
                                onChange={(e) => setData('consent', e.target.checked)}
                            />
                            <Label htmlFor="consent" className="text-sm leading-relaxed">
                                {t('contact_lead_consent')}
                            </Label>
                        </div>
                        {errors.consent && (
                            <Text variant="bodySmall" className="text-red-500">
                                {errors.consent}
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
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                        {/* Phone */}
                        <div className="flex flex-col items-center gap-4 rounded-2xl bg-ui-2 p-6 transition-colors hover:bg-accent-primary/5">
                            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent-primary/10">
                                <svg className="h-6 w-6 text-accent-primary" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                                </svg>
                            </div>
                            <div className="text-center">
                                <Text variant="heading4" className="mb-2 text-text-primary">
                                    {t('phone_contact')}
                                </Text>
                                <a href="tel:+966503422777" dir="ltr" className="text-text-secondary hover:underline">
                                    {t('phone_number_1')}
                                </a>
                            </div>
                        </div>

                        {/* Email */}
                        <div className="flex flex-col items-center gap-4 rounded-2xl bg-ui-2 p-6 transition-colors hover:bg-accent-primary/5">
                            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent-primary/10">
                                <svg className="h-6 w-6 text-accent-primary" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                                </svg>
                            </div>
                            <div className="text-center">
                                <Text variant="heading4" className="mb-2 text-text-primary">
                                    {t('email_contact')}
                                </Text>
                                <a href="mailto:info@luxuria.com.sa" className="text-text-secondary hover:underline">
                                    {t('email_info')}
                                </a>
                            </div>
                        </div>

                        {/* Address */}
                        <div className="flex flex-col items-center gap-4 rounded-2xl bg-ui-2 p-6 transition-colors hover:bg-accent-primary/5">
                            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent-primary/10">
                                <svg className="h-6 w-6 text-accent-primary" fill="currentColor" viewBox="0 0 20 20">
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
                    </div>
                </div>
            </section>

            {/* Google map emebed container */}
            <section className="flex w-full items-start justify-center gap-6 border-t border-b border-ui-3 bg-ui-2 px-4 py-12 sm:gap-8 sm:px-6 sm:py-16 md:gap-10 md:px-10 md:py-20">
                <div className="h-[400px] w-full max-w-5xl px-4 sm:px-6 md:px-10">
                    <iframe
                        src="https://maps.google.com/maps?q=Olaya%20view%2C%20King%20Fahd%20Road%2C%20Riyadh&z=15&output=embed"
                        spellCheck={false}
                        title={t('address_contact')}
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

import { Text } from '@/components/Typography';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useTranslations } from '@/hooks/useLocalization';
import { FormEvent, useState } from 'react';

interface InterestFormProps {
    opportunityUuid?: string;
}

interface InterestFormState {
    name: string;
    email: string;
    phone: string;
    investment_amount: string;
    message: string;
}

const initialForm: InterestFormState = {
    name: '',
    email: '',
    phone: '',
    investment_amount: '',
    message: '',
};

function csrfToken(): string {
    return document.querySelector<HTMLMetaElement>('meta[name="csrf-token"]')?.content || '';
}

export default function InterestForm({ opportunityUuid }: InterestFormProps) {
    const { t } = useTranslations('components');
    const [form, setForm] = useState<InterestFormState>(initialForm);
    const [submitting, setSubmitting] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState('');

    const updateField = (field: keyof InterestFormState, value: string) => {
        setForm((current) => ({ ...current, [field]: value }));
    };

    const submit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setSubmitting(true);
        setError('');

        try {
            if (!opportunityUuid) {
                throw new Error(t('dealio_interest_missing_opportunity'));
            }

            const response = await fetch('/api/ventra/leads', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': csrfToken(),
                },
                body: JSON.stringify({
                    opportunity_uuid: opportunityUuid,
                    ...form,
                    investment_amount: form.investment_amount || null,
                }),
            });

            const payload = await response.json().catch(() => ({}));

            if (!response.ok) {
                const validationError = payload?.errors ? Object.values(payload.errors).flat()[0] : null;
                throw new Error(String(validationError || payload?.message || t('dealio_interest_error')));
            }

            setSuccess(true);
            setForm(initialForm);
        } catch (submissionError) {
            setError(submissionError instanceof Error ? submissionError.message : t('dealio_interest_error'));
        } finally {
            setSubmitting(false);
        }
    };

    if (success) {
        return (
            <section className="flex flex-col gap-3 rounded-2xl border border-ui-3 bg-ui-2 p-6">
                <Text variant="heading4" className="text-text-primary">
                    {t('dealio_interest_success_title')}
                </Text>
                <Text variant="bodySmall" className="text-text-secondary">
                    {t('dealio_interest_success_description')}
                </Text>
            </section>
        );
    }

    return (
        <section className="flex flex-col gap-4 rounded-2xl border border-ui-3 bg-ui-2 p-6">
            <Text variant="heading4" className="text-text-primary">
                {t('dealio_interest_title')}
            </Text>
            <form onSubmit={submit} className="flex flex-col gap-3">
                <Input value={form.name} onChange={(event) => updateField('name', event.target.value)} placeholder={t('name_placeholder')} required className="h-11 bg-ui-1" />
                <Input
                    type="email"
                    value={form.email}
                    onChange={(event) => updateField('email', event.target.value)}
                    placeholder={t('email_placeholder')}
                    required
                    className="h-11 bg-ui-1"
                />
                <Input value={form.phone} onChange={(event) => updateField('phone', event.target.value)} placeholder={t('phone_placeholder')} className="h-11 bg-ui-1" />
                <Input
                    type="number"
                    min="0"
                    value={form.investment_amount}
                    onChange={(event) => updateField('investment_amount', event.target.value)}
                    placeholder={t('dealio_interest_amount')}
                    className="h-11 bg-ui-1"
                />
                <Textarea value={form.message} onChange={(event) => updateField('message', event.target.value)} placeholder={t('message')} className="min-h-28 bg-ui-1" />
                {error && (
                    <Text variant="bodySmall" className="text-red-600">
                        {error}
                    </Text>
                )}
                <Button type="submit" disabled={submitting} className="h-11">
                    {submitting ? t('submitting') : t('dealio_interest_submit')}
                </Button>
            </form>
        </section>
    );
}

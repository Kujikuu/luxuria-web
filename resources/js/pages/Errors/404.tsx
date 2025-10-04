import AppLayout from "@/layouts/app-layout";
import { Head, Link } from "@inertiajs/react";
import { Text } from "@/components/Typography";
import { Button } from "@/components/ui/button";
import { useTranslations } from "@/hooks/useLocalization";

export default function NotFound() {
    const { t } = useTranslations('pages');
    const { t: tc } = useTranslations('common');

    return (
        <AppLayout color='white' section='error'>
            <Head title={t('404_title')} />

            <section className="flex flex-col items-center justify-center min-h-screen py-16 px-4 sm:px-6 md:px-10 -mt-20">
                <div className="flex flex-col items-center text-center gap-8 max-w-2xl">
                    {/* 404 Number */}
                    <div className="text-9xl sm:text-[12rem] font-bold text-accent-primary opacity-20">
                        404
                    </div>

                    {/* Title and Description */}
                    <div className="flex flex-col gap-4 items-center">
                        <Text variant="heading1" className="text-text-primary">
                            {t('404_heading')}
                        </Text>
                        <Text variant="bodyLarge" className="text-text-secondary text-center max-w-md">
                            {t('404_description')}
                        </Text>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row gap-4 mt-4">
                        <Link href="/">
                            <Button variant="default" size="lg">
                                {t('404_go_home')}
                            </Button>
                        </Link>
                        <Link href="/contact">
                            <Button variant="outline" size="lg">
                                {t('404_contact_us')}
                            </Button>
                        </Link>
                    </div>

                </div>
            </section>
        </AppLayout>
    );
}
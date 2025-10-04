import AppLayout from "@/layouts/app-layout";
import { Head } from "@inertiajs/react";
import { Text } from "@/components/Typography";
import Tag from "@/components/Tag";

interface CustomPageProps {
    page: {
        slug: string;
        title: string;
        subtitle?: string;
        content: string;
    };
}

export default function CustomPage({ page }: CustomPageProps) {
    return (
        <AppLayout color='white' section={page.slug}>
            <Head title={page.title} />

            <section className="flex flex-col gap-10 pt-24 sm:pt-32 md:pt-52 -mt-20 px-4 sm:px-6 md:px-10 pb-16">
                <div className="max-w-4xl mx-auto w-full">
                    {/* Header */}
                    <div className="flex flex-col gap-6 mb-12">
                        <Tag text={page.title} />
                        <Text variant="heading1" className="text-text-primary">
                            {page.title}
                        </Text>
                        {page.subtitle && (
                            <Text variant="bodyLarge" className="text-text-secondary">
                                {page.subtitle}
                            </Text>
                        )}
                    </div>

                    {/* Dynamic Content */}
                    <div className="prose prose-lg max-w-none">
                        <div 
                            className="space-y-8 text-text-secondary leading-relaxed"
                            dangerouslySetInnerHTML={{ __html: page.content }}
                        />
                    </div>
                </div>
            </section>
        </AppLayout>
    );
}
import AppLayout from "@/layouts/app-layout";
import { Head } from "@inertiajs/react";
import { Text } from "@/components/Typography";
import Tag from "@/components/Tag";
import DetailCard from "@/components/Cards/DetailCard";
import TestimonialCard from "@/components/Cards/TestimonialCard";
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import '@/../css/slick-theme.css';
import { ArrowRightIcon, ArrowLeftIcon } from "@phosphor-icons/react";
import AgentCard from "@/components/Cards/AgentCard";
import HomeFaqs from "@/components/Home/HomeFaqs";
import FeatureCard from "@/components/Cards/FeatureCard";
import { useTranslations } from "@/hooks/useLocalization";

interface FaqItem {
    id: number;
    question: string;
    answer: string;
    sort_order: number;
}

interface AboutPageProps {
    faqs?: FaqItem[];
}

export default function AboutPage({ faqs }: AboutPageProps) {
    const { t } = useTranslations('pages');
    const { t: tc } = useTranslations('common');
    
    return (
        <AppLayout color='white' section='hero'>
            <Head title={t('about_title')} />

            {/* Hero */}
            <section id="hero" className="flex flex-col items-center justify-center gap-10 pt-24 sm:pt-32 md:pt-52 -mt-20 px-4 sm:px-6 md:px-10">
                {/* Header */}
                <div className="flex flex-col lg:flex-row gap-6 max-w-6xl w-full">
                    <div className="flex flex-col gap-6">
                        <Tag text={tc('about')} />
                        <Text variant="heading2" className="w-full text-text-primary">{t('about_hero_title')}</Text>
                    </div>
                    <div className="flex gap-6 w-full items-start lg:items-end max-w-96 lg:justify-end">
                        <Text variant="bodyLarge" className="text-text-secondary">{t('about_hero_subtitle')}</Text>
                    </div>
                </div>

                {/* Image */}
                <div className="w-full">
                    <img src="/assets/images/about-img.png" alt="About" className="w-full max-w-6xl object-cover justify-self-center rounded-2xl" />
                </div>
            </section>

            {/* Mission & Vision */}
            <section className="flex flex-col gap-6 sm:gap-8 md:gap-10 py-12 sm:py-16 md:py-24 px-4 sm:px-6 md:px-10 items-center justify-center w-full">
                <div className="w-full max-w-6xl">
                    {/* Header */}
                    <div className="flex flex-col items-center text-center gap-6 mb-12">
                        <Tag text={t('mission_vision_tag')} />
                        <Text variant="heading2" className="text-text-primary">
                            {t('mission_vision_title')}
                        </Text>
                        <Text variant="bodyLarge" className="text-text-secondary max-w-2xl">
                            {t('mission_vision_subtitle')}
                        </Text>
                    </div>

                    {/* Mission & Vision Cards */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {/* Mission Card */}
                        <div className="flex flex-col gap-6 p-8 bg-ui-2 rounded-2xl">
                            <div className="flex items-center gap-3">
                                <Text variant="heading3" className="text-text-primary">{t('mission_title')}</Text>
                            </div>
                            <Text variant="bodyLarge" className="text-text-secondary leading-relaxed">
                                {t('mission_text')}
                            </Text>
                        </div>

                        {/* Vision Card */}
                        <div className="flex flex-col gap-6 p-8 bg-accent-primary/5 rounded-2xl border border-accent-primary/10">
                            <div className="flex items-center gap-3">
                                <Text variant="heading3" className="text-text-primary">{t('vision_title')}</Text>
                            </div>
                            <Text variant="bodyLarge" className="text-text-secondary leading-relaxed">
                                {t('vision_text')}
                            </Text>
                        </div>
                    </div>
                </div>
            </section>

            {/* Our Values */}
            <section className="py-16 px-4 sm:px-6 md:px-10 bg-ui-2 w-full">
                <div className="flex flex-col gap-10 max-w-6xl mx-auto">
                    <div className="flex flex-col items-center text-center gap-6">
                            <Tag text={t('values_tag')} />
                        <Text variant="heading2" className="text-text-primary">
                            {t('values_title')}
                        </Text>
                        <Text variant="bodyLarge" className="text-text-secondary max-w-[400px]">
                            {t('values_subtitle')}
                        </Text>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        <FeatureCard
                            iconName="HandShake"
                            title={t('value_integrity_title')}
                            description={t('value_integrity_description')}
                        />
                        <FeatureCard
                            iconName="Star"
                            title={t('value_excellence_title')}
                            description={t('value_excellence_description')}
                        />
                        <FeatureCard
                            iconName="Lightbulb"
                            title={t('value_innovation_title')}
                            description={t('value_innovation_description')}
                        />
                        <FeatureCard
                            iconName="UserIcon"
                            title={t('value_client_first_title')}
                            description={t('value_client_first_description')}
                        />
                        <FeatureCard
                            iconName="Heart"
                            title={t('value_passion_title')}
                            description={t('value_passion_description')}
                        />
                        <FeatureCard
                            iconName="ShieldCheck"
                            title={t('value_reliability_title')}
                            description={t('value_reliability_description')}
                        />
                    </div>
                </div>
            </section>

            {/* Details */}
            <section className="flex gap-6 sm:gap-8 md:gap-10 py-12 sm:py-16 md:py-24 px-4 sm:px-6 md:px-10 items-start justify-center w-full">
                <div className="flex flex-col md:flex-row gap-6 max-w-5xl px-12">
                    <DetailCard iconName="ArrowLineUpRightIcon" title={t('detail_innovation_title')} description={t('detail_innovation_description')} />
                    <DetailCard iconName="UserIcon" title={t('detail_client_centered_title')} description={t('detail_client_centered_description')} />
                    <DetailCard iconName="HandShakeIcon" title={t('detail_expertise_title')} description={t('detail_expertise_description')} />
                </div>
            </section>

            {/* Our Team */}
            <section className="flex flex-col gap-6 bg-ui-3 sm:gap-8 md:gap-10 py-12 sm:py-16 md:py-24 px-4 sm:px-6 md:px-10 items-center justify-center w-full">
                <div className="flex gap-6 w-full max-w-6xl">
                    {/* Header */}
                    <div className="flex flex-col gap-4 sm:gap-6 w-full h-max">

                        <div className="flex">
                            <Tag text={t('team_tag')} />
                        </div>

                        <div className="flex flex-col gap-4 sm:gap-6">
                            <Text variant="heading2" className="text-text-primary">
                                {t('team_title')}
                            </Text>
                            <Text variant="bodyLarge" className="text-text-secondary max-w-[400px]">
                            {t('team_subtitle')}
                            </Text>
                        </div>
                    </div>

                    {/* Team Members with AgentCard */}
                    <div className="w-full grid grid-cols-2 gap-6">
                        <div className="col-span-1 w-auto">
                            <AgentCard
                                img="https://framerusercontent.com/images/nV5khFPcsJzJ1tk6zisRyfQ0NYQ.jpg?width=400&height=400"
                                role="Founder & CEO"
                                title="Yousef Alharbi"
                                href="#"
                            />
                        </div>
                        {/* <div className="col-span-1 w-auto">
                            <AgentCard
                                img="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80"
                                role="Real Estate Agent"
                                title="John Doe"
                                href="#"
                            />
                        </div> */}
                    </div>
                </div>
            </section>

            {/* Faqs */}
            <HomeFaqs faqs={faqs} />
        </AppLayout>
    );
}
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


export default function AboutPage() {
    return (
        <AppLayout color='white' section='hero'>
            <Head title="About" />

            {/* Hero */}
            <section id="hero" className="flex flex-col items-center justify-center gap-10 pt-48 px-4 sm:px-6 md:px-10 pb-24">
                {/* Header */}
                <div className="flex flex-col lg:flex-row gap-6 max-w-6xl w-full">
                    <div className="flex flex-col gap-6">
                        <Tag text="About" />
                        <Text variant="heading2" className="w-full text-text-primary">Redefining real estate through excellence, innovation, and trust</Text>
                    </div>
                    <div className="flex gap-6 w-full items-start lg:items-end max-w-96 lg:justify-end">
                        <Text variant="bodyLarge" className="text-text-secondary">At LUXURIA, we are committed to making real estate transactions seamless and rewarding.</Text>
                    </div>
                </div>

                {/* Image */}
                <div className="w-full">
                    <img src="/assets/images/about-img.png" alt="About" className="w-full max-w-6xl object-cover justify-self-center rounded-2xl" />
                </div>
            </section>

            {/* Details */}
            <section className="flex gap-6 sm:gap-8 md:gap-10 py-12 sm:py-16 md:py-24 px-4 sm:px-6 md:px-10 bg-ui-2 items-start justify-center w-full">
                <div className="flex flex-col md:flex-row gap-6 max-w-5xl px-12">
                    <DetailCard iconName="ArrowLineUpRightIcon" title="Innovation First" description="We integrate the latest technologies and market insights to deliver modern property solutions." />
                    <DetailCard iconName="UserIcon" title="Client-Centered" description="Every service is designed to align with evolving client aspirations and expectations." />
                    <DetailCard iconName="HandShakeIcon" title="Trusted Expertise" description="Backed by years of experience, we provide reliable guidance and sustainable growth opportunities." />
                </div>
            </section>

            {/* Testimonials */}
            <section className="flex flex-col gap-6 sm:gap-8 md:gap-10 py-12 sm:py-16 md:py-24 px-4 sm:px-6 md:px-10 items-center justify-center w-full">
                <div className="w-full max-w-6xl">
                    {/* Header */}
                    <div className="flex flex-col lg:flex-row gap-6 mb-12">
                        <div className="flex flex-col gap-6">
                            <Tag text="Testimonials" />
                            <Text variant="heading2" className="w-full max-w-2xl text-text-primary">In our clients' words, real estate done right</Text>
                        </div>
                    </div>

                    {/* Testimonials Carousel */}
                    <div className="relative">
                        <Slider
                            infinite={true}
                            speed={1000}
                            slidesToShow={3}
                            slidesToScroll={1}
                            arrows={true}
                            nextArrow={<ArrowRightIcon size={24} color="text-text-primary" />}
                            prevArrow={<ArrowLeftIcon size={24} color="text-text-primary" />}
                            easing="ease-in-out"
                            responsive={[
                                {
                                    breakpoint: 1024,
                                    settings: {
                                        slidesToShow: 2,
                                        slidesToScroll: 1,
                                    }
                                },
                                {
                                    breakpoint: 768,
                                    settings: {
                                        slidesToShow: 1,
                                        slidesToScroll: 1,
                                        dots: true
                                    }
                                }
                            ]}
                            className="testimonials-slider"
                        >
                            <div className="px-3">
                                <TestimonialCard
                                    quote="Incredible service from start to finish."
                                    name="Amina Al-Qahtani"
                                    role="Architect"
                                    authorImage="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80"
                                    image="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80"
                                />
                            </div>
                            <div className="px-3">
                                <TestimonialCard
                                    quote="They made selling my home effortless."
                                    name="Abdulrahman Al-Shehri"
                                    role="Attorney"
                                    authorImage="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80"
                                    image="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80"
                                />
                            </div>
                            <div className="px-3">
                                <TestimonialCard
                                    quote="Knowledgeable, professional, and always one step ahead."
                                    name="Abdulrahman Al-Jubeir"
                                    role="Financial Advisor"
                                    image="https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80"
                                    authorImage="https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80"
                                />
                            </div>
                            <div className="px-3">
                                <TestimonialCard
                                    quote="Knowledgeable, professional, and always one step ahead."
                                    name="Abdulrahman Al-Jubeir"
                                    role="Financial Advisor"
                                    image="https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80"
                                    authorImage="https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80"
                                />
                            </div>
                        </Slider>
                    </div>
                </div>
            </section>

            {/* Our Team */}
            <section className="flex flex-col gap-6 sm:gap-8 md:gap-10 py-12 sm:py-16 md:py-24 px-4 sm:px-6 md:px-10 items-center justify-center w-full">
                <div className="flex gap-6 w-full max-w-6xl">
                    {/* Header */}
                    <div className="flex flex-col gap-4 sm:gap-6 w-full h-max">

                        <div className="flex">
                            <Tag text="Our Team" />
                        </div>

                        <div className="flex flex-col gap-4 sm:gap-6">
                            <Text variant="heading2" className="text-text-primary">
                                Meet Our Team
                            </Text>
                            <Text variant="bodyLarge" className="text-text-secondary max-w-[400px]">
                            Passionate professionals committed to redefining real estate with vision and expertise.
                            </Text>
                        </div>
                    </div>

                    {/* Team Members with AgentCard */}
                    <div className="w-full grid grid-cols-2 gap-6">
                        <div className="col-span-1 w-auto">
                            <AgentCard
                                img="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80"
                                role="Real Estate Agent"
                                title="John Doe"
                                href="#"
                            />
                        </div>
                        <div className="col-span-1 w-auto">
                            <AgentCard
                                img="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80"
                                role="Real Estate Agent"
                                title="John Doe"
                                href="#"
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* Why Choose Us */}
            <section className="py-16 px-4 sm:px-6 md:px-10 bg-ui-2 w-full">
                <div className="flex flex-col gap-10 max-w-6xl mx-auto">
                    <div className="flex flex-col items-center text-center gap-6">
                            <Tag text="Why us" />
                        <Text variant="heading2" className="text-text-primary">
                            Why Choose LUXURIA
                        </Text>
                        <Text variant="bodyLarge" className="text-text-secondary max-w-[400px]">
                            Setting new standards in real estate through innovation and excellence.
                        </Text>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        <FeatureCard
                            iconName="Buildings"
                            title="Diverse Services"
                            description="From brokerage to property management, we cover all aspects of real estate."
                        />
                        <FeatureCard
                            iconName="HouseLine"
                            title="Luxury Residences"
                            description="High-end living spaces designed for comfort and style."
                        />
                        <FeatureCard
                            iconName="ChartLineUp"
                            title="Market Expertise"
                            description="Years of industry knowledge and deep insights."
                        />
                        <FeatureCard
                            iconName="TrendUp"
                            title="Growth Potential"
                            description="Expanding opportunities in a booming real estate market."
                        />
                        <FeatureCard
                            iconName="Star"
                            title="Professional Excellence"
                            description="Commitment to quality and service in every project."
                        />
                        <FeatureCard
                            iconName="Lightbulb"
                            title="Innovative Approach"
                            description="Leveraging digital marketing, smart home integrations, and modern solutions."
                        />
                    </div>
                </div>
            </section>

            {/* Faqs */}
            <HomeFaqs />
        </AppLayout>
    );
}
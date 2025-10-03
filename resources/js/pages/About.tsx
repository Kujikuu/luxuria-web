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
            <section id="hero" className="flex flex-col items-center justify-center gap-10 pt-24 sm:pt-32 md:pt-52 -mt-20 px-4 sm:px-6 md:px-10">
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

            {/* Mission & Vision */}
            <section className="flex flex-col gap-6 sm:gap-8 md:gap-10 py-12 sm:py-16 md:py-24 px-4 sm:px-6 md:px-10 items-center justify-center w-full">
                <div className="w-full max-w-6xl">
                    {/* Header */}
                    <div className="flex flex-col items-center text-center gap-6 mb-12">
                        <Tag text="Mission & Vision" />
                        <Text variant="heading2" className="text-text-primary">
                            Our Purpose & Direction
                        </Text>
                        <Text variant="bodyLarge" className="text-text-secondary max-w-2xl">
                            Driven by purpose and guided by vision, we shape the future of real estate.
                        </Text>
                    </div>

                    {/* Mission & Vision Cards */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {/* Mission Card */}
                        <div className="flex flex-col gap-6 p-8 bg-ui-2 rounded-2xl">
                            <div className="flex items-center gap-3">
                                <Text variant="heading3" className="text-text-primary">Our Mission</Text>
                            </div>
                            <Text variant="bodyLarge" className="text-text-secondary leading-relaxed">
                                To revolutionize the real estate experience by providing exceptional service, innovative solutions, and personalized guidance that empowers clients to achieve their property dreams while building lasting relationships founded on trust and integrity.
                            </Text>
                        </div>

                        {/* Vision Card */}
                        <div className="flex flex-col gap-6 p-8 bg-accent-primary/5 rounded-2xl border border-accent-primary/10">
                            <div className="flex items-center gap-3">
                                <Text variant="heading3" className="text-text-primary">Our Vision</Text>
                            </div>
                            <Text variant="bodyLarge" className="text-text-secondary leading-relaxed">
                                To become the most trusted and innovative real estate company, setting new industry standards through technology-driven solutions, sustainable practices, and a commitment to transforming communities one property at a time.
                            </Text>
                        </div>
                    </div>
                </div>
            </section>

            {/* Our Values */}
            <section className="py-16 px-4 sm:px-6 md:px-10 bg-ui-2 w-full">
                <div className="flex flex-col gap-10 max-w-6xl mx-auto">
                    <div className="flex flex-col items-center text-center gap-6">
                            <Tag text="Our Values" />
                        <Text variant="heading2" className="text-text-primary">
                            What We Stand For
                        </Text>
                        <Text variant="bodyLarge" className="text-text-secondary max-w-[400px]">
                            The core principles that guide everything we do at LUXURIA.
                        </Text>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        <FeatureCard
                            iconName="HandShake"
                            title="Integrity"
                            description="Building trust through transparency, honesty, and ethical practices in every transaction."
                        />
                        <FeatureCard
                            iconName="Star"
                            title="Excellence"
                            description="Pursuing the highest standards of quality and service to exceed client expectations."
                        />
                        <FeatureCard
                            iconName="Lightbulb"
                            title="Innovation"
                            description="Embracing cutting-edge technology and creative solutions to transform the real estate experience."
                        />
                        <FeatureCard
                            iconName="UserIcon"
                            title="Client-First"
                            description="Putting our clients' needs, dreams, and success at the heart of everything we do."
                        />
                        <FeatureCard
                            iconName="Heart"
                            title="Passion"
                            description="Bringing enthusiasm and dedication to help clients find their perfect property match."
                        />
                        <FeatureCard
                            iconName="ShieldCheck"
                            title="Reliability"
                            description="Delivering consistent, dependable service you can count on throughout your real estate journey."
                        />
                    </div>
                </div>
            </section>

            {/* Details */}
            <section className="flex gap-6 sm:gap-8 md:gap-10 py-12 sm:py-16 md:py-24 px-4 sm:px-6 md:px-10 items-start justify-center w-full">
                <div className="flex flex-col md:flex-row gap-6 max-w-5xl px-12">
                    <DetailCard iconName="ArrowLineUpRightIcon" title="Innovation First" description="We integrate the latest technologies and market insights to deliver modern property solutions." />
                    <DetailCard iconName="UserIcon" title="Client-Centered" description="Every service is designed to align with evolving client aspirations and expectations." />
                    <DetailCard iconName="HandShakeIcon" title="Trusted Expertise" description="Backed by years of experience, we provide reliable guidance and sustainable growth opportunities." />
                </div>
            </section>

            {/* Our Team */}
            <section className="flex flex-col gap-6 bg-ui-3 sm:gap-8 md:gap-10 py-12 sm:py-16 md:py-24 px-4 sm:px-6 md:px-10 items-center justify-center w-full">
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

            {/* Faqs */}
            <HomeFaqs />
        </AppLayout>
    );
}
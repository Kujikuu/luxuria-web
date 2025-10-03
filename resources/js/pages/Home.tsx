import Features from "@/components/Features";
import HomeFaqs from "@/components/Home/HomeFaqs";
import HomeHero from "@/components/Home/HomeHero";
import HomeProperties from "@/components/Home/HomeProperties";
import AppLayout from "@/layouts/app-layout";
import { Head } from "@inertiajs/react";

interface Property {
    id: number;
    title: string;
    slug: string;
    property_type: string;
    property_area: number;
    images: string[];
    price: number;
}

interface HomePageProps {
    featuredProperties: Property[];
}

export default function HomePage({ featuredProperties }: HomePageProps) {
    return (
        <AppLayout color='transparent' section='hero'>
            <Head title="Home" />

            {/* Hero */}
            <HomeHero />

            <HomeProperties properties={featuredProperties} />

            {/* Features Container */}
            <div className="w-full relative h-fit flex py-10 md:py-24 bg-ui-2 border-t border-b border-ui-3 justify-center">
                <Features />
            </div>

            <HomeFaqs />

        </AppLayout>
    );
}
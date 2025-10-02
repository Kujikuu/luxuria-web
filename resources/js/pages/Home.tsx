import Features from "@/components/Features";
import HomeFaqs from "@/components/Home/HomeFaqs";
import HomeHero from "@/components/Home/HomeHero";
import HomeListings from "@/components/Home/HomeListings";
import AppLayout from "@/layouts/app-layout";
import { Head } from "@inertiajs/react";

export default function HomePage() {
    return (
        <AppLayout color='transparent' section='hero'>
            <Head title="Home" />

            {/* Hero */}
            <HomeHero />

            <HomeListings />

            {/* Features Container */}
            <div className="w-full relative h-fit flex py-10 px-3.5 md:py-24 md:px-10 bg-ui-2 border-t border-b border-ui-3 justify-center">
                <Features />
            </div>

            <HomeFaqs />

        </AppLayout>
    );
}
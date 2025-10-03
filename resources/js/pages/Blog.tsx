import AppLayout from "@/layouts/app-layout";
import { Text } from "@/components/Typography";

import { Head } from "@inertiajs/react";
import { BlogCardLarge, BlogCardMedium } from "@/components/Cards/BlogCard";

export default function BlogPage() {
    return (
        <AppLayout color='white' section='hero'>
            <Head title="Blog" />

            {/* Hero */}
            <section id="hero" className="flex flex-col items-center justify-center gap-10 pt-48 px-4 sm:px-6 md:px-10 pb-24">
                {/* Header */}
                <div className="flex flex-col lg:flex-row gap-6 max-w-6xl w-full">
                    <div className="flex flex-col gap-6">
                        <Text variant="heading2" className="w-full text-text-primary">Explore our latest blogs for real estate insights</Text>
                    </div>
                    <div className="flex gap-6 w-full items-start lg:items-end max-w-96 lg:justify-end">
                        <Text variant="bodyLarge" className="text-text-secondary">Explore expert tips on luxury living, refined style, and the latest interior inspiration.</Text>
                    </div>
                </div>

                {/* Main Blog Post */}
                <BlogCardLarge
                    img="https://framerusercontent.com/images/PjHJMX19p4rUgEbsFA6rEDDges.png?scale-down-to=1024&width=1200&height=800"
                    date="2023-08-15"
                    title="Luxury Living: Refined Style and Inspiration"
                    description="Discover the art of luxury living with refined style and interior inspiration."
                    author="John Doe"
                    authorImage="https://framerusercontent.com/images/PjHJMX19p4rUgEbsFA6rEDDges.png?scale-down-to=1024&width=1200&height=800"
                    authorRole="Real Estate Agent"
                    href="/blog/luxury-living"
                />

                {/* Secondary Blog Post */}
                <div className="grid gap-6 grid-cols-1 md:grid-cols-3 w-full max-w-6xl">
                    <BlogCardMedium
                        img="https://framerusercontent.com/images/Z225duIP6ydu7YFVXpBmr3DJA.png?scale-down-to=1024&width=800&height=1200"
                        date="2023-08-16"
                        title="High-End Properties: Luxury Living at its Finest"
                        href="/blog/high-end-properties"
                    />
                    <BlogCardMedium
                        img="https://framerusercontent.com/images/8oQwCyYztEqHQA4bPR5y2wJe1ak.png?scale-down-to=512&width=1200&height=800"
                        date="2023-08-16"
                        title="High-End Properties: Luxury Living at its Finest"
                        href="/blog/high-end-properties"
                    />
                    <BlogCardMedium
                        img="https://framerusercontent.com/images/YuMxsp5oKaTyUe1sxeM2PKV8poA.png?scale-down-to=1024&width=904&height=1200"
                        date="2023-08-16"
                        title="High-End Properties: Luxury Living at its Finest"
                        href="/blog/high-end-properties"
                    />
                </div>

            </section>
        </AppLayout>
    )
}
import Button from "@/components/Buttons/Button";
import { BlogCardMedium } from "@/components/Cards/BlogCard";
import { NavLink } from "@/components/Navigation/NavLink";
import Tag from "@/components/Tag";
import { Text } from "@/components/Typography";
import AppLayout from "@/layouts/app-layout";
import { Head } from "@inertiajs/react";

export default function BlogPost() {
    return (
        <AppLayout color='white' section='hero'>
            <Head title="Blog Post" />

            <section id='hero' className="flex flex-col gap-10 pt-48 px-4 sm:px-6 md:px-10 pb-24 max-w-5xl mx-auto">
                {/* Text */}
                <div className="flex flex-col gap-6">
                    {/* Header */}
                    <div className="flex flex-col gap-6">
                        {/* Go Back */}
                        <div className="flex justify-between items-center">
                            <div>
                                <NavLink href="/blog" className="text-text-primary" arrow={true}>Go Back</NavLink>
                            </div>
                            <Tag text="High-end properties" />
                        </div>
                        {/* Title */}
                        <Text variant="heading2" as="h1">Luxury homebuyers and sellers are navigating changing market conditions</Text>
                    </div>

                    {/* Container Date & Minutes to read */}
                    <div className="flex justify-between items-center">
                        <Text variant="bodyMedium" className="text-text-secondary">5 min read</Text>
                        <Text variant="bodyMedium" className="text-text-secondary">Published on 10th July 2023</Text>
                    </div>
                </div>

                {/* Featured Image */}
                <img src="https://framerusercontent.com/images/PjHJMX19p4rUgEbsFA6rEDDges.png?scale-down-to=1024&width=1200&height=800" alt="Blog Image" className="w-full h-[500px] object-cover rounded-2xl overflow-hidden " />

                {/* Content */}
                <div className="flex w-full flex-col gap-6 overflow-hidden">
                    {/* HTML content */}
                    <div className="flex w-full flex-col gap-6 overflow-hidden">

                    </div>
                    {/* Divider Lin */}
                    <div className="w-full h-[2px] bg-ui-3" />

                    {/* Author Image, Name, Role */}
                    <div className="flex gap-2.5 overflow-hidden items-center">
                        <img src="https://framerusercontent.com/images/5U7azVaVT6ogBk23qZv9AtdLy5c.png?scale-down-to=512&width=1200&height=1200" alt="Author Image" className="w-14 h-14 rounded-full object-cover " />
                        <div className="flex flex-col gap-0.5">
                            <Text variant='bodyBold'>Dylan Carter</Text>
                            <Text variant='bodySmall' className="text-text-secondary">Senior Housing Economist</Text>
                        </div>
                    </div>
                </div>
            </section>

            <section id="related-blog" className="flex flex-col max-w-5xl mx-auto gap-6 sm:gap-8 md:gap-10 py-12 sm:py-16 md:py-20 px-4 sm:px-6 md:px-10">
                
                {/* Container */}
                <div className="flex gap-6 items-center">
                    <div className="flex flex-col gap-6 w-full">
                        <Tag text="Other blogs" />
                        <Text variant="heading2">Be sure to check out our other blogs</Text>
                    </div>
                    <div className="flex w-full items-end justify-end self-end">
                        <Button text="View All" variant='secondary' href="/blog" />
                    </div>
                </div>

                {/* 2 Blog posts */}
                <div className="grid gap-6 grid-cols-1 md:grid-cols-2 w-full">
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
                </div>

            </section>
        </AppLayout>
    )
}
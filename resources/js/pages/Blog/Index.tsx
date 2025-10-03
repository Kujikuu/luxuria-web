import AppLayout from "@/layouts/app-layout";
import { Text } from "@/components/Typography";
import BlogSearch from "@/components/Blog/BlogSearch";
import BlogPagination from "@/components/Blog/BlogPagination";

import { Head } from "@inertiajs/react";
import { BlogCardLarge, BlogCardMedium } from "@/components/Cards/BlogCard";

interface Author {
    id: number;
    name: string;
    role: string;
    image?: string;
}

interface Blog {
    id: number;
    title: string;
    slug: string;
    about: string;
    read_time: number;
    publish_date: string;
    featured_image?: string;
    author: Author;
}

interface BlogPageProps {
    blogs: {
        data: Blog[];
        current_page: number;
        last_page: number;
        per_page: number;
        total: number;
        from: number;
        to: number;
        links: Array<{
            url: string | null;
            label: string;
            active: boolean;
        }>;
    };
    filters: {
        search?: string;
    };
}

export default function BlogPage({ blogs, filters }: BlogPageProps) {
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

                {/* Search */}
                <BlogSearch initialSearch={filters.search || ''} />

                {blogs.data.length > 0 ? (
                    <>
                        {/* Main Blog Post (First/Latest) */}
                        <BlogCardLarge
                            img={blogs.data[0].featured_image || 'https://via.placeholder.com/1200x800.png?text=No+Image'}
                            date={blogs.data[0].publish_date}
                            title={blogs.data[0].title}
                            description={blogs.data[0].about}
                            author={blogs.data[0].author.name}
                            authorImage={blogs.data[0].author.image || `https://ui-avatars.com/api/?name=${blogs.data[0].author.name}&size=80&background=f0f0f0&color=666`}
                            authorRole={blogs.data[0].author.role}
                            href={`/blog/${blogs.data[0].slug}`}
                        />

                        {/* Secondary Blog Posts */}
                        {blogs.data.length > 1 && (
                            <div className="grid gap-6 grid-cols-1 md:grid-cols-3 w-full max-w-6xl">
                                {blogs.data.slice(1).map((blog) => (
                                    <BlogCardMedium
                                        key={blog.id}
                                        img={blog.featured_image || 'https://via.placeholder.com/400x300.png?text=No+Image'}
                                        date={blog.publish_date}
                                        title={blog.title}
                                        href={`/blog/${blog.slug}`}
                                    />
                                ))}
                            </div>
                        )}

                        {/* Pagination */}
                        <BlogPagination pagination={blogs} />
                    </>
                ) : (
                    <div className="flex flex-col items-center justify-center py-16">
                        <Text variant="heading4" className="text-text-primary mb-4">
                            No blog posts found
                        </Text>
                        <Text variant="bodyLarge" className="text-text-secondary text-center">
                            {filters.search
                                ? "Try adjusting your search criteria"
                                : "No blog posts are available at the moment"
                            }
                        </Text>
                    </div>
                )}

            </section>
        </AppLayout>
    )
}
import AppLayout from "@/layouts/app-layout";
import { Text } from "@/components/Typography";
import BlogSearch from "@/components/Blog/BlogSearch";
import BlogPagination from "@/components/Blog/BlogPagination";

import { Head } from "@inertiajs/react";
import { BlogCardLarge, BlogCardMedium } from "@/components/Cards/BlogCard";
import { useTranslations } from "@/hooks/useLocalization";

interface Author {
    id: number;
    name: string;
    name_ar?: string;
    role: string;
    role_ar?: string;
    image?: string;
}

interface Blog {
    id: number;
    title: string;
    title_ar?: string;
    slug: string;
    about: string;
    about_ar?: string;
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
    const { t } = useTranslations('pages');
    
    return (
        <AppLayout color='white' section='hero'>
            <Head title={t('blog') || 'Blog'} />

            {/* Hero */}
            <section id="hero" className="flex flex-col items-center justify-center gap-10 pt-24 sm:pt-32 md:pt-52 -mt-20 px-4 sm:px-6 md:px-10 pb-24">
                {/* Header */}
                <div className="flex flex-col lg:flex-row gap-6 max-w-6xl w-full">
                    <div className="flex flex-col gap-6">
                        <Text variant="heading2" className="w-full text-text-primary">{t('blog_header') || 'Explore our latest blogs for real estate insights'}</Text>
                    </div>
                    <div className="flex gap-6 w-full items-start lg:items-end max-w-96 lg:justify-end">
                        <Text variant="bodyLarge" className="text-text-secondary">{t('blog_subtitle') || 'Explore expert tips on luxury living, refined style, and the latest interior inspiration.'}</Text>
                    </div>
                </div>

                {/* Search */}
                <BlogSearch initialSearch={filters.search || ''} />

                {blogs.data.length > 0 ? (
                    <>
                        {/* Main Blog Post (First/Latest) */}
                        <BlogCardLarge
                            img={blogs.data[0].featured_image || 'https://placehold.co/1200x800.png?text=No+Image'}
                            date={blogs.data[0].publish_date}
                            title={blogs.data[0].title}
                            title_ar={blogs.data[0].title_ar}
                            description={blogs.data[0].about}
                            description_ar={blogs.data[0].about_ar}
                            author={blogs.data[0].author.name}
                            author_ar={blogs.data[0].author.name_ar}
                            authorImage={blogs.data[0].author.image}
                            authorRole={blogs.data[0].author.role}
                            author_role_ar={blogs.data[0].author.role_ar}
                            href={`/blog/${blogs.data[0].slug}`}
                        />

                        {/* Secondary Blog Posts */}
                        {blogs.data.length > 1 && (
                            <div className="grid gap-6 grid-cols-1 md:grid-cols-3 w-full max-w-6xl">
                                {blogs.data.slice(1).map((blog) => (
                                    <BlogCardMedium
                                        key={blog.id}
                                        img={blog.featured_image || 'https://placehold.co/400x300.png?text=No+Image'}
                                        date={blog.publish_date}
                                        title={blog.title}
                                        title_ar={blog.title_ar}
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
                            {t('no_blog_posts_found') || 'No blog posts found'}
                        </Text>
                        <Text variant="bodyLarge" className="text-text-secondary text-center">
                            {filters.search
                                ? (t('try_adjusting_search') || "Try adjusting your search criteria")
                                : (t('no_blog_posts_available') || "No blog posts are available at the moment")
                            }
                        </Text>
                    </div>
                )}

            </section>
        </AppLayout>
    )
}
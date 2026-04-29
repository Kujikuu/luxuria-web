import BlogPagination from '@/components/Blog/BlogPagination';
import BlogSearch from '@/components/Blog/BlogSearch';
import { BlogCardLarge, BlogCardMedium } from '@/components/Cards/BlogCard';
import { Text } from '@/components/Typography';
import AppLayout from '@/layouts/app-layout';
import { Head, Link } from '@inertiajs/react';
import { useTranslations } from '@/hooks/useLocalization';

interface Author {
    name: string;
    role?: string;
    image?: string;
}

interface Taxonomy {
    name: string;
    slug: string;
    posts_count: number;
}

interface Blog {
    id: number;
    title: string;
    slug: string;
    about?: string;
    read_time: number;
    publish_date: string;
    featured_image?: string;
    author: Author;
    category?: Taxonomy | null;
    tags: Taxonomy[];
    is_rv_club_only: boolean;
}

interface BlogPageProps {
    blogs: {
        data: Blog[];
        current_page: number;
        last_page: number;
        per_page: number;
        total: number;
        from: number | null;
        to: number | null;
        links: Array<{
            url: string | null;
            label: string;
            active: boolean;
        }>;
    };
    categories: Taxonomy[];
    tags: Taxonomy[];
    filters: {
        search?: string;
        category?: string;
        tag?: string;
    };
}

export default function BlogPage({ blogs, categories, tags, filters }: BlogPageProps) {
    const { t } = useTranslations('pages');
    const blogPath = typeof window !== 'undefined' ? window.location.pathname : '/blog';

    const blogUrl = (query: Record<string, string | undefined>) => {
        const params = new URLSearchParams();

        Object.entries(query).forEach(([key, value]) => {
            if (value) {
                params.set(key, value);
            }
        });

        const queryString = params.toString();

        return queryString ? `${blogPath}?${queryString}` : blogPath;
    };

    const activeCategory = filters.category;
    const activeTag = filters.tag;

    return (
        <AppLayout color="white" section="hero">
            <Head title={t('blog') || 'Blog'} />

            <section id="hero" className="flex flex-col items-center justify-center gap-10 px-4 pt-24 pb-24 sm:px-6 sm:pt-32 md:-mt-20 md:px-10 md:pt-52">
                <div className="flex w-full max-w-6xl flex-col gap-6 lg:flex-row">
                    <div className="flex flex-col gap-6">
                        <Text variant="heading2" className="w-full text-text-primary">
                            {t('blog_header') || 'Explore our latest blogs for real estate insights'}
                        </Text>
                    </div>
                    <div className="flex w-full max-w-96 items-start gap-6 lg:items-end lg:justify-end">
                        <Text variant="bodyLarge" className="text-text-secondary">
                            {t('blog_subtitle') || 'Explore expert tips on luxury living, refined style, and the latest interior inspiration.'}
                        </Text>
                    </div>
                </div>

                <div className="flex w-full max-w-6xl flex-col items-center gap-5">
                    <div className="flex w-full flex-wrap justify-center gap-2">
                        <Link
                            href={blogUrl({ search: filters.search })}
                            className={`rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
                                !activeCategory && !activeTag ? 'bg-text-primary text-ui-1' : 'bg-ui-2 text-text-secondary hover:bg-ui-3 hover:text-text-primary'
                            }`}
                        >
                            {t('all_categories') || 'All'}
                        </Link>

                        {categories.map((category) => (
                            <Link
                                key={category.slug}
                                href={blogUrl({ category: category.slug, search: filters.search })}
                                className={`rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
                                    activeCategory === category.slug ? 'bg-text-primary text-ui-1' : 'bg-ui-2 text-text-secondary hover:bg-ui-3 hover:text-text-primary'
                                }`}
                            >
                                {category.name}
                                {category.posts_count > 0 && <span className="opacity-70"> ({category.posts_count})</span>}
                            </Link>
                        ))}
                    </div>

                    {tags.length > 0 && (
                        <div className="flex w-full flex-wrap justify-center gap-2">
                            {tags.map((tag) => (
                                <Link
                                    key={tag.slug}
                                    href={blogUrl({ tag: tag.slug, search: filters.search })}
                                    className={`rounded-full border px-3 py-1.5 text-xs font-semibold transition-colors ${
                                        activeTag === tag.slug
                                            ? 'border-text-primary bg-text-primary text-ui-1'
                                            : 'border-ui-3 bg-white text-text-secondary hover:border-text-primary hover:text-text-primary'
                                    }`}
                                >
                                    #{tag.name}
                                </Link>
                            ))}
                        </div>
                    )}
                </div>

                <BlogSearch initialSearch={filters.search || ''} filters={{ category: filters.category, tag: filters.tag }} />

                {blogs.data.length > 0 ? (
                    <>
                        <BlogCardLarge
                            img={blogs.data[0].featured_image || '/assets/images/img-placeholder.png'}
                            date={blogs.data[0].publish_date}
                            title={blogs.data[0].title}
                            description={blogs.data[0].about}
                            author={blogs.data[0].author.name}
                            authorImage={blogs.data[0].author.image}
                            authorRole={blogs.data[0].author.role}
                            href={`${blogPath}/${blogs.data[0].slug}`}
                        />

                        {blogs.data.length > 1 && (
                            <div className="grid w-full max-w-6xl grid-cols-1 gap-6 md:grid-cols-3">
                                {blogs.data.slice(1).map((blog) => (
                                    <BlogCardMedium
                                        key={blog.id}
                                        img={blog.featured_image || '/assets/images/img-placeholder.png'}
                                        date={blog.publish_date}
                                        title={blog.title}
                                        href={`${blogPath}/${blog.slug}`}
                                    />
                                ))}
                            </div>
                        )}

                        <BlogPagination pagination={blogs} />
                    </>
                ) : (
                    <div className="flex flex-col items-center justify-center py-16">
                        <Text variant="heading4" className="mb-4 text-text-primary">
                            {t('no_blog_posts_found') || 'No blog posts found'}
                        </Text>
                        <Text variant="bodyLarge" className="text-center text-text-secondary">
                            {filters.search ? t('try_adjusting_search') || 'Try adjusting your search criteria' : t('no_blog_posts_available') || 'No blog posts are available at the moment'}
                        </Text>
                    </div>
                )}
            </section>
        </AppLayout>
    );
}

import Button from "@/components/Buttons/Button";
import { BlogCardMedium } from "@/components/Cards/BlogCard";
import { NavLink } from "@/components/Navigation/NavLink";
import Tag from "@/components/Tag";
import { Text } from "@/components/Typography";
import AppLayout from "@/layouts/app-layout";
import { Head } from "@inertiajs/react";
import { useLocale, useTranslations } from "@/hooks/useLocalization";

interface Author {
    id: number;
    name: string;
    name_ar?: string;
    role: string;
    role_ar?: string;
    image?: string;
    about?: string;
    about_ar?: string;
}

interface Blog {
    id: number;
    title: string;
    title_ar?: string;
    slug: string;
    about: string;
    about_ar?: string;
    content: string;
    content_ar?: string;
    read_time: number;
    publish_date: string;
    featured_image?: string;
    author: Author;
}

interface BlogPostProps {
    blog: Blog;
    relatedBlogs: Blog[];
}

export default function BlogPost({ blog, relatedBlogs }: BlogPostProps) {
    const { isArabic } = useLocale();
    const { t } = useTranslations('pages');
    
    return (
        <AppLayout color='white' section='hero'>
            <Head title={`${isArabic && blog.title_ar ? blog.title_ar : blog.title} - ${t('blog') || 'Blog'}`} />

            <section id='hero' className="flex flex-col gap-10 pt-24 sm:pt-32 md:pt-52 -mt-20 px-4 sm:px-6 md:px-10 pb-24 w-full max-w-5xl mx-auto">
                {/* Text */}
                <div className="flex flex-col gap-6">
                    {/* Header */}
                    <div className="flex flex-col gap-6">
                        {/* Go Back */}
                        <div className="flex justify-between items-center">
                            <div>
                                <NavLink href="/blog" className="text-text-primary" arrow={true}>{t('go_back') || 'Go Back'}</NavLink>
                            </div>
                            <Tag text={t('blog_post') || 'Blog Post'} />
                        </div>
                        {/* Title */}
                        <Text variant="heading2" as="h1">{isArabic && blog.title_ar ? blog.title_ar : blog.title}</Text>
                    </div>

                    {/* Container Date & Minutes to read */}
                    <div className="flex justify-between items-center">
                        <Text variant="bodyMedium" className="text-text-secondary">{blog.read_time} {t('min_read') || 'min read'}</Text>
                        <Text variant="bodyMedium" className="text-text-secondary">
                            {t('published_on') || 'Published on'} {new Date(blog.publish_date).toLocaleDateString(isArabic ? 'ar-SA' : 'en-US', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric'
                            })}
                        </Text>
                    </div>
                </div>

                {/* Featured Image */}
                <img 
                    src={blog.featured_image || 'https://placehold.co/1200x500.png?text=No+Image'} 
                    alt={blog.title} 
                    className="w-full h-[500px] object-cover rounded-2xl overflow-hidden" 
                />

                {/* Content */}
                <div className="flex w-full flex-col gap-6 overflow-hidden">
                    {/* HTML content */}
                    <div className="flex w-full flex-col gap-6 overflow-hidden">
                        <div 
                            className="prose prose-lg max-w-none text-text-secondary [&>h2]:text-2xl [&>h2]:font-bold [&>h2]:text-text-primary [&>h2]:mt-8 [&>h2]:mb-4 [&>h3]:text-xl [&>h3]:font-semibold [&>h3]:text-text-primary [&>h3]:mt-6 [&>h3]:mb-3 [&>p]:mb-4 [&>p]:leading-relaxed [&>ul]:mb-4 [&>ol]:mb-4 [&>li]:mb-2 [&>blockquote]:border-l-4 [&>blockquote]:border-ui-3 [&>blockquote]:pl-6 [&>blockquote]:italic [&>blockquote]:text-text-secondary [&>blockquote]:my-6 [&>strong]:text-text-primary [&>a]:text-blue-600 [&>a]:underline hover:[&>a]:text-blue-700"
                            dangerouslySetInnerHTML={{ __html: isArabic && blog.content_ar ? blog.content_ar : blog.content }}
                        />
                    </div>
                    {/* Divider Line */}
                    <div className="w-full h-[2px] bg-ui-3" />

                    {/* Author Image, Name, Role */}
                    <div className="flex gap-2.5 overflow-hidden items-center">
                        <img 
                            src={blog.author.image || `https://ui-avatars.com/api/?name=${blog.author.name}&size=56&background=f0f0f0&color=666`} 
                            alt={blog.author.name} 
                            className="w-14 h-14 rounded-full object-cover" 
                        />
                        <div className="flex flex-col gap-0.5">
                            <Text variant='bodyBold'>{isArabic && blog.author.name_ar ? blog.author.name_ar : blog.author.name}</Text>
                            <Text variant='bodySmall' className="text-text-secondary">{isArabic && blog.author.role_ar ? blog.author.role_ar : blog.author.role}</Text>
                        </div>
                    </div>
                </div>
            </section>

            <section id="related-blog" className="flex flex-col max-w-5xl mx-auto gap-6 sm:gap-8 md:gap-10 py-12 sm:py-16 md:py-20 px-4 sm:px-6 md:px-10">
                
                {/* Container */}
                <div className="flex gap-6 items-center">
                    <div className="flex flex-col gap-6 w-full">
                        <Tag text={t('other_blogs') || 'Other blogs'} />
                        <Text variant="heading2">{t('check_other_blogs') || 'Be sure to check out our other blogs'}</Text>
                    </div>
                    <div className="flex w-full items-end justify-end self-end">
                        <Button text={t('view_all') || 'View All'} variant='secondary' href="/blog" />
                    </div>
                </div>

                {/* Related Blog Posts */}
                {relatedBlogs.length > 0 ? (
                    <div className="grid gap-6 grid-cols-1 md:grid-cols-2 xl:grid-cols-3 w-full">
                        {relatedBlogs.map((relatedBlog) => (
                            <BlogCardMedium
                                key={relatedBlog.id}
                                img={relatedBlog.featured_image || 'https://placehold.co/400x300.png?text=No+Image'}
                                date={relatedBlog.publish_date}
                                title={relatedBlog.title}
                                title_ar={relatedBlog.title_ar}
                                href={`/blog/${relatedBlog.slug}`}
                            />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-8">
                        <Text variant="bodyLarge" className="text-text-secondary">
                            {t('no_related_blogs') || 'No related blog posts available at the moment'}
                        </Text>
                    </div>
                )}

            </section>
        </AppLayout>
    )
}
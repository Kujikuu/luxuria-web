import Button from '@/components/Buttons/Button';
import { BlogCardMedium } from '@/components/Cards/BlogCard';
import { NavLink } from '@/components/Navigation/NavLink';
import Tag from '@/components/Tag';
import { Text } from '@/components/Typography';
import { Input } from '@/components/ui/input';
import AppLayout from '@/layouts/app-layout';
import { Head, Link } from '@inertiajs/react';
import { HashIcon, LockIcon, Share2Icon } from 'lucide-react';
import { useState } from 'react';
import { useLocale, useTranslations } from '@/hooks/useLocalization';

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
    content: string;
    read_time: number;
    publish_date: string;
    featured_image?: string;
    author: Author;
    category?: Taxonomy | null;
    tags: Taxonomy[];
    is_rv_club_only: boolean;
    has_access: boolean;
    meta_title?: string;
    meta_description?: string;
    og_image?: string;
}

interface BlogPostProps {
    blog: Blog;
    relatedBlogs: Blog[];
}

function csrfToken() {
    return document.querySelector<HTMLMetaElement>('meta[name="csrf-token"]')?.content || '';
}

export default function BlogPost({ blog, relatedBlogs }: BlogPostProps) {
    const { isArabic } = useLocale();
    const { t } = useTranslations('pages');
    const [copied, setCopied] = useState(false);
    const [step, setStep] = useState<'check' | 'subscribe'>('check');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [error, setError] = useState('');
    const [processing, setProcessing] = useState(false);

    const blogPath = typeof window !== 'undefined' ? window.location.pathname.replace(/\/$/, '') : `/blog/${blog.slug}`;
    const blogIndexPath = blogPath.replace(new RegExp(`/${blog.slug}$`), '');
    const isGated = blog.is_rv_club_only && !blog.has_access;

    const copyLink = async () => {
        await navigator.clipboard.writeText(window.location.href);
        setCopied(true);
        window.setTimeout(() => setCopied(false), 1800);
    };

    const checkAccess = async (event: React.FormEvent) => {
        event.preventDefault();
        setError('');
        setProcessing(true);

        try {
            const response = await fetch(`${blogPath}/check-access`, {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': csrfToken(),
                    'X-Requested-With': 'XMLHttpRequest',
                },
                body: JSON.stringify({ email }),
            });

            if (!response.ok) {
                throw new Error('Access check failed');
            }

            const result = await response.json();

            if (result.subscribed) {
                window.location.reload();
                return;
            }

            setStep('subscribe');
        } catch {
            setError(t('rv_club_check_error') || 'Something went wrong. Please try again.');
        } finally {
            setProcessing(false);
        }
    };

    const subscribe = async (event: React.FormEvent) => {
        event.preventDefault();
        setError('');
        setProcessing(true);

        try {
            const response = await fetch(`${blogPath}/subscribe`, {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': csrfToken(),
                    'X-Requested-With': 'XMLHttpRequest',
                },
                body: JSON.stringify({ email, phone }),
            });

            if (!response.ok) {
                const payload = await response.json().catch(() => null);
                const validationError = payload?.errors ? Object.values(payload.errors).flat().at(0) : null;

                throw new Error(typeof validationError === 'string' ? validationError : t('rv_club_check_error') || 'Something went wrong. Please try again.');
            }

            window.location.reload();
        } catch (exception) {
            setError(exception instanceof Error ? exception.message : t('rv_club_check_error') || 'Something went wrong. Please try again.');
        } finally {
            setProcessing(false);
        }
    };

    return (
        <AppLayout color="white" section="hero">
            <Head title={`${blog.meta_title || blog.title} - ${t('blog') || 'Blog'}`} />

            <section id="hero" className="mx-auto flex w-full max-w-5xl flex-col gap-10 px-4 pt-24 pb-24 sm:px-6 sm:pt-32 md:-mt-20 md:px-10 md:pt-52">
                <div className="flex flex-col gap-6">
                    <div className="flex flex-col gap-6">
                        <div className="flex items-center justify-between gap-4">
                            <NavLink href={blogIndexPath || '/blog'} className="text-text-primary" arrow={true}>
                                {t('go_back') || 'Go Back'}
                            </NavLink>

                            <div className="flex flex-wrap justify-end gap-2">
                                {blog.is_rv_club_only && <Tag text={t('rv_club_badge') || 'RV Club'} />}
                                {blog.category && (
                                    <Link href={`${blogIndexPath}?category=${blog.category.slug}`}>
                                        <Tag text={blog.category.name} />
                                    </Link>
                                )}
                            </div>
                        </div>

                        <Text variant="heading2" as="h1">
                            {blog.title}
                        </Text>
                    </div>

                    <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
                        <div className="flex flex-wrap items-center gap-4">
                            <Text variant="bodyMedium" className="text-text-secondary">
                                {blog.read_time} {t('min_read') || 'min read'}
                            </Text>
                            <Text variant="bodyMedium" className="text-text-secondary">
                                {t('published_on') || 'Published on'}{' '}
                                {new Date(blog.publish_date).toLocaleDateString(isArabic ? 'ar-SA' : 'en-US', {
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric',
                                })}
                            </Text>
                        </div>

                        <button type="button" onClick={copyLink} className="flex w-max items-center gap-2 rounded-full bg-ui-2 px-4 py-2 text-sm font-semibold text-text-secondary transition-colors hover:text-text-primary">
                            <Share2Icon className="size-4" />
                            {copied ? t('copied') || 'Copied' : t('share_post') || 'Share post'}
                        </button>
                    </div>
                </div>

                <img src={blog.featured_image || '/assets/images/img-placeholder.png'} alt={blog.title} className="h-[500px] w-full overflow-hidden rounded-2xl object-cover" />

                <div className="flex w-full flex-col gap-6 overflow-hidden">
                    {isGated ? (
                        <>
                            <div className="relative overflow-hidden">
                                <div className="prose prose-lg max-h-36 max-w-none text-text-secondary">
                                    <p>{blog.about || blog.content.replace(/<[^>]*>/g, '').slice(0, 260)}</p>
                                </div>
                                <div className="absolute inset-0 bg-gradient-to-b from-transparent from-30% to-white" />
                            </div>

                            <div className="mx-auto flex w-full max-w-2xl flex-col items-center rounded-2xl border border-ui-3 bg-ui-2 px-5 py-8 text-center md:px-8 md:py-10">
                                <div className="relative mb-4 flex size-14 items-center justify-center rounded-full bg-text-primary text-ui-1">
                                    <span className="text-lg font-extrabold italic">RV</span>
                                    <span className="absolute -end-1 -bottom-1 flex size-6 items-center justify-center rounded-full bg-ui-1 text-text-primary">
                                        <LockIcon className="size-3" />
                                    </span>
                                </div>

                                <span className="mb-3 inline-flex items-center gap-1 rounded-full bg-white px-3 py-1 text-xs font-bold text-text-primary">
                                    <LockIcon className="size-3" />
                                    {t('rv_club_exclusive') || 'RV Club Exclusive'}
                                </span>

                                <Text variant="heading4" className="text-text-primary">
                                    {t('rv_club_badge') || 'RV Club'}
                                </Text>
                                <Text variant="bodyMedium" className="mt-3 max-w-xl text-text-secondary">
                                    {t('rv_club_description') || 'This content is available exclusively to RV Club subscribers. Enter your email to check your access.'}
                                </Text>

                                {step === 'check' ? (
                                    <form onSubmit={checkAccess} className="mt-6 flex w-full flex-col gap-3">
                                        <Input
                                            type="email"
                                            value={email}
                                            onChange={(event) => setEmail(event.target.value)}
                                            placeholder={t('rv_club_email_placeholder') || 'Enter your email to check access'}
                                            required
                                            className="h-12 rounded-xl border-ui-3 bg-white px-4"
                                        />
                                        {error && <p className="text-sm text-red-600">{error}</p>}
                                        <button type="submit" disabled={processing} className="flex h-12 items-center justify-center gap-2 rounded-xl bg-text-primary px-5 text-sm font-semibold text-ui-1 disabled:opacity-60">
                                            <LockIcon className="size-4" />
                                            {processing ? t('rv_club_checking') || 'Checking...' : t('rv_club_unlock') || 'Unlock'}
                                        </button>
                                    </form>
                                ) : (
                                    <form onSubmit={subscribe} className="mt-6 flex w-full flex-col gap-3">
                                        <Text variant="bodySmall" className="text-text-secondary">
                                            {t('rv_club_not_found') || "You're not a subscriber yet. Add your phone number below to join the RV Club."}
                                        </Text>
                                        <Input
                                            type="tel"
                                            value={phone}
                                            onChange={(event) => setPhone(event.target.value)}
                                            placeholder={t('rv_club_phone_placeholder') || 'Phone number'}
                                            required
                                            className="h-12 rounded-xl border-ui-3 bg-white px-4"
                                        />
                                        {error && <p className="text-sm text-red-600">{error}</p>}
                                        <div className="flex flex-col gap-3 sm:flex-row">
                                            <button type="submit" disabled={processing} className="flex h-12 flex-1 items-center justify-center rounded-xl bg-text-primary px-5 text-sm font-semibold text-ui-1 disabled:opacity-60">
                                                {processing ? t('submitting') || 'Submitting...' : t('rv_club_subscribe') || 'Join RV Club'}
                                            </button>
                                            <button type="button" onClick={() => setStep('check')} className="h-12 rounded-xl border border-ui-3 px-5 text-sm font-semibold text-text-primary">
                                                {t('rv_club_back_to_email') || 'Back to email'}
                                            </button>
                                        </div>
                                    </form>
                                )}
                            </div>
                        </>
                    ) : (
                        <>
                            <div
                                className="prose prose-lg max-w-none text-text-secondary [&>a]:text-blue-600 [&>a]:underline hover:[&>a]:text-blue-700 [&>blockquote]:my-6 [&>blockquote]:border-l-4 [&>blockquote]:border-ui-3 [&>blockquote]:pl-6 [&>blockquote]:text-text-secondary [&>blockquote]:italic [&>h2]:mt-8 [&>h2]:mb-4 [&>h2]:text-2xl [&>h2]:font-bold [&>h2]:text-text-primary [&>h3]:mt-6 [&>h3]:mb-3 [&>h3]:text-xl [&>h3]:font-semibold [&>h3]:text-text-primary [&>li]:mb-2 [&>ol]:mb-4 [&>p]:mb-4 [&>p]:leading-relaxed [&>strong]:text-text-primary [&>ul]:mb-4"
                                dangerouslySetInnerHTML={{ __html: blog.content }}
                            />

                            {blog.tags.length > 0 && (
                                <div className="flex flex-wrap items-center gap-2 border-t border-ui-3 pt-6">
                                    <HashIcon className="size-4 text-text-secondary" />
                                    {blog.tags.map((tag) => (
                                        <Link key={tag.slug} href={`${blogIndexPath}?tag=${tag.slug}`} className="rounded-full bg-ui-2 px-3 py-1.5 text-xs font-semibold text-text-secondary transition-colors hover:bg-text-primary hover:text-ui-1">
                                            {tag.name}
                                        </Link>
                                    ))}
                                </div>
                            )}
                        </>
                    )}

                    <div className="h-[2px] w-full bg-ui-3" />

                    <div className="flex items-center gap-2.5 overflow-hidden">
                        <img src={blog.author.image || `https://ui-avatars.com/api/?name=${blog.author.name}&size=56&background=f0f0f0&color=666`} alt={blog.author.name} className="h-14 w-14 rounded-full object-cover" />
                        <div className="flex flex-col gap-0.5">
                            <Text variant="bodyBold">{blog.author.name}</Text>
                            <Text variant="bodySmall" className="text-text-secondary">
                                {blog.author.role || t('default_author_role') || 'Author'}
                            </Text>
                        </div>
                    </div>
                </div>
            </section>

            <section id="related-blog" className="mx-auto flex max-w-5xl flex-col gap-6 px-4 py-12 sm:gap-8 sm:px-6 sm:py-16 md:gap-10 md:px-10 md:py-20">
                <div className="flex items-center gap-6">
                    <div className="flex w-full flex-col gap-6">
                        <Tag text={t('other_blogs') || 'Other blogs'} />
                        <Text variant="heading2">{t('check_other_blogs') || 'Be sure to check out our other blogs'}</Text>
                    </div>
                    <div className="flex w-full items-end justify-end self-end">
                        <Button text={t('view_all') || 'View All'} variant="secondary" href={blogIndexPath || '/blog'} />
                    </div>
                </div>

                {relatedBlogs.length > 0 ? (
                    <div className="grid w-full grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
                        {relatedBlogs.map((relatedBlog) => (
                            <BlogCardMedium
                                key={relatedBlog.id}
                                img={relatedBlog.featured_image || '/assets/images/img-placeholder.png'}
                                date={relatedBlog.publish_date}
                                title={relatedBlog.title}
                                href={`${blogIndexPath}/${relatedBlog.slug}`}
                            />
                        ))}
                    </div>
                ) : (
                    <div className="py-8 text-center">
                        <Text variant="bodyLarge" className="text-text-secondary">
                            {t('no_related_blogs') || 'No related blog posts available at the moment'}
                        </Text>
                    </div>
                )}
            </section>
        </AppLayout>
    );
}

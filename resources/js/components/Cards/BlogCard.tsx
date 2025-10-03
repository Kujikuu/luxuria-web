import { useLocale, useTranslations } from '@/hooks/useLocalization';
import { Link } from '@inertiajs/react';
import { Text } from '../Typography';

interface BlogCardLargeProps {
    img?: string;
    date?: string;
    title?: string;
    title_ar?: string;
    description?: string;
    description_ar?: string;
    author?: string;
    author_ar?: string;
    authorImage?: string;
    authorRole?: string;
    author_role_ar?: string;
    href: string;
}

function BlogCardLarge({
    img,
    date,
    title,
    title_ar,
    description,
    description_ar,
    author,
    author_ar,
    authorImage,
    authorRole,
    author_role_ar,
    href,
}: BlogCardLargeProps) {
    const { isArabic } = useLocale();
    const { t } = useTranslations('components');

    return (
        <Link href={href}>
            <div className="group flex w-80 flex-col gap-3 overflow-hidden rounded-2xl border border-ui-3 bg-ui-2 md:w-3xl md:flex-row lg:w-6xl">
                <div className="flex h-[320px] w-full overflow-hidden shadow-md md:h-[460px]">
                    <img
                        src={img || 'https://placehold.co/150'}
                        alt="Blog Image"
                        className="h-full w-full object-cover transition-transform duration-400 group-hover:scale-105"
                    />
                </div>

                <div className="flex w-full flex-col gap-6 overflow-hidden p-4 md:justify-between md:p-6">
                    <div className="flex flex-col gap-6 overflow-hidden">
                        <div className="flex w-max rounded-full bg-text-primary px-[16px] py-[7px] text-ui-1">
                            <Text variant="bodySmall" className="text-ui-1" as="p">
                                {date
                                    ? (() => {
                                          const now = new Date();
                                          const postDate = new Date(date);
                                          const diffTime = Math.abs(now.getTime() - postDate.getTime());
                                          const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

                                          if (diffDays === 0) return t('today') || 'Today';
                                          if (diffDays === 1) return t('one_day_ago') || '1 day ago';
                                          if (diffDays === 2) return t('two_days_ago') || '2 days ago';

                                          // After 2 days, show real date
                                          return postDate.toLocaleDateString(isArabic ? 'ar-SA' : 'en-US', {
                                              year: 'numeric',
                                              month: 'long',
                                              day: 'numeric',
                                          });
                                      })()
                                    : 'Today'}
                            </Text>
                        </div>

                        <div className="flex flex-col gap-3">
                            <Text variant="heading3" className="text-text-primary">
                                {isArabic && title_ar ? title_ar : title || t('default_blog_title') || 'High-End Properties'}
                            </Text>
                            <Text variant="bodyLarge" className="text-text-secondary">
                                {isArabic && description_ar
                                    ? description_ar
                                    : description || t('default_blog_description') || 'Luxury homebuyers and sellers are navigating changing market conditions'}
                            </Text>
                        </div>
                    </div>

                    <div className="flex items-center gap-3 overflow-hidden">
                        <img src={authorImage || 'https://placehold.co/40'} alt="Author Avatar" className="h-9 w-9 rounded-full object-cover" />
                        <div className="flex flex-col">
                            <Text variant="bodyMedium" className="text-text-primary">
                                {isArabic && author_ar ? author_ar : author || t('default_author_name') || 'Yousif Al Harbi'}
                            </Text>
                            <Text variant="bodySmall" className="text-text-secondary">
                                {isArabic && author_role_ar ? author_role_ar : authorRole || t('default_author_role') || 'CEO & Founder'}
                            </Text>
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    );
}

interface BlogCardMediumProps {
    img?: string;
    date?: string;
    title?: string;
    title_ar?: string;
    href: string;
}

function BlogCardMedium({ img, date, title, title_ar, href }: BlogCardMediumProps) {
    const { isArabic } = useLocale();
    const { t } = useTranslations('components');

    return (
        <Link href={href}>
            <div className="group flex flex-col gap-6 overflow-hidden rounded-2xl border border-ui-3 bg-ui-2 pb-6 transition-colors duration-400 hover:border-ui-3 hover:bg-ui-2 md:border-ui-3/0 md:bg-ui-2/0">
                <div className="flex h-[300px] w-full overflow-hidden rounded-2xl shadow-md">
                    <img
                        src={img || 'https://placehold.co/150'}
                        alt="Blog Image"
                        className="h-full w-full object-cover transition-transform duration-400 md:group-hover:scale-105"
                    />
                </div>

                <div className="transition-padding flex flex-col gap-3 px-0 duration-400 md:group-hover:px-6">
                    <Text variant="heading4" className="text-text-primary">
                        {isArabic && title_ar ? title_ar : title || t('default_blog_title') || 'High-End Properties'}
                    </Text>
                    <Text variant="bodyMedium" className="text-text-secondary">
                        {date
                            ? (() => {
                                  const now = new Date();
                                  const postDate = new Date(date);
                                  const diffTime = Math.abs(now.getTime() - postDate.getTime());
                                  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

                                  if (diffDays === 0) return t('today') || 'Today';
                                  if (diffDays === 1) return t('one_day_ago') || '1 day ago';
                                  if (diffDays === 2) return t('two_days_ago') || '2 days ago';

                                  // After 2 days, show real date
                                  return postDate.toLocaleDateString(isArabic ? 'ar-SA' : 'en-US', {
                                      year: 'numeric',
                                      month: 'long',
                                      day: 'numeric',
                                  });
                              })()
                            : t('today') || 'Today'}
                    </Text>
                </div>
            </div>
        </Link>
    );
}

export { BlogCardLarge, BlogCardMedium };

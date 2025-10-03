import { Link } from "@inertiajs/react";
import { ArrowLeftIcon, ArrowRightIcon } from "@phosphor-icons/react";
import { Button } from "@/components/ui/button";
import { Text } from "../Typography";
import { useTranslations } from "@/hooks/useLocalization";

interface PaginationLink {
    url: string | null;
    label: string;
    active: boolean;
}

interface PaginationData {
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
    from: number;
    to: number;
    links: PaginationLink[];
}

interface BlogPaginationProps {
    pagination: PaginationData;
}

export default function BlogPagination({ pagination }: BlogPaginationProps) {
    const { t, isRtl } = useTranslations('components');
    
    if (pagination.last_page <= 1) {
        return null;
    }

    const { current_page, last_page, from, to, total, links } = pagination;
    const PrevIcon = isRtl ? ArrowRightIcon : ArrowLeftIcon;
    const NextIcon = isRtl ? ArrowLeftIcon : ArrowRightIcon;

    return (
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 w-full max-w-6xl">
            {/* Results Info */}
            <Text variant="bodyMedium" className="text-text-secondary">
                {t('showing_results', { from, to, total: t('blog_posts_count', { count: total }) }) || `Showing ${from}-${to} of ${total} blog posts`}
            </Text>

            {/* Pagination Links */}
            <div className="flex items-center gap-2">
                {/* Previous Button */}
                {links[0]?.url && (
                    <Link href={links[0].url!} preserveState preserveScroll>
                        <Button variant="outline" size="sm" className={`flex items-center gap-2 ${isRtl ? 'flex-row-reverse' : ''}`}>
                            <PrevIcon size={16} />
                            {t('previous') || 'Previous'}
                        </Button>
                    </Link>
                )}

                {/* Page Numbers */}
                <div className="flex items-center gap-1">
                    {links.slice(1, -1).map((link, index) => {
                        if (!link.url && link.label === '...') {
                            return (
                                <span key={index} className="px-3 py-1 text-text-secondary">
                                    ...
                                </span>
                            );
                        }

                        if (!link.url) {
                            return null;
                        }

                        return (
                            <Link
                                key={index}
                                href={link.url!}
                                preserveState
                                preserveScroll
                                className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                                    link.active
                                        ? 'bg-primary text-primary-foreground'
                                        : 'text-text-secondary hover:text-text-primary hover:bg-ui-3'
                                }`}
                            >
                                {link.label}
                            </Link>
                        );
                    })}
                </div>

                {/* Next Button */}
                {links[links.length - 1]?.url && (
                    <Link href={links[links.length - 1].url!} preserveState preserveScroll>
                        <Button variant="outline" size="sm" className={`flex items-center gap-2 ${isRtl ? 'flex-row-reverse' : ''}`}>
                            {t('next') || 'Next'}
                            <NextIcon size={16} />
                        </Button>
                    </Link>
                )}
            </div>
        </div>
    );
}
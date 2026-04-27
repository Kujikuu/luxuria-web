import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useTranslations } from '@/hooks/useLocalization';
import { router } from '@inertiajs/react';
import { MagnifyingGlassIcon } from '@phosphor-icons/react';
import { XIcon } from 'lucide-react';
import { useState } from 'react';

interface BlogSearchProps {
    initialSearch: string;
}

export default function BlogSearch({ initialSearch }: BlogSearchProps) {
    const { t, isRtl } = useTranslations('components');
    const [search, setSearch] = useState(initialSearch || '');

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        router.get(
            '/blog',
            { search },
            {
                preserveState: true,
                replace: true,
            },
        );
    };

    const handleClearSearch = () => {
        setSearch('');
        router.get(
            '/blog',
            {},
            {
                preserveState: true,
                replace: true,
            },
        );
    };

    return (
        <div className="w-full max-w-md">
            <form onSubmit={handleSearch} className="relative">
                <div className="relative">
                    <Input
                        type="text"
                        placeholder={t('search_blog_placeholder') || 'Search blog posts...'}
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className={`h-12 rounded-2xl border-ui-3 bg-ui-2 px-4 py-3 text-text-primary placeholder:text-text-secondary focus-visible:border-transparent focus-visible:ring-blue-500 ${
                            isRtl ? 'pr-12 pl-12 text-right' : 'pr-12 pl-12 text-left'
                        }`}
                        dir={isRtl ? 'rtl' : 'ltr'}
                    />
                    <MagnifyingGlassIcon
                        size={20}
                        className={`absolute top-1/2 -translate-y-1/2 transform text-text-secondary ${isRtl ? 'right-4' : 'left-4'}`}
                    />
                    {search && (
                        <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            onClick={handleClearSearch}
                            className={`absolute top-1/2 size-8 -translate-y-1/2 rounded-full text-text-secondary hover:text-text-primary ${
                                isRtl ? 'left-4' : 'right-4'
                            }`}
                            title={t('clear_search') || 'Clear search'}
                        >
                            <XIcon className="size-4" />
                        </Button>
                    )}
                </div>
            </form>
        </div>
    );
}

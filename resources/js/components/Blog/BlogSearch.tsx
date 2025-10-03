import { router } from "@inertiajs/react";
import { MagnifyingGlassIcon } from "@phosphor-icons/react";
import { useState } from "react";
import { useTranslations } from "@/hooks/useLocalization";

interface BlogSearchProps {
    initialSearch: string;
}

export default function BlogSearch({ initialSearch }: BlogSearchProps) {
    const { t, isRtl } = useTranslations('components');
    const [search, setSearch] = useState(initialSearch || '');

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        router.get('/blog', { search }, { 
            preserveState: true,
            replace: true 
        });
    };

    const handleClearSearch = () => {
        setSearch('');
        router.get('/blog', {}, { 
            preserveState: true,
            replace: true 
        });
    };

    return (
        <div className="w-full max-w-md">
            <form onSubmit={handleSearch} className="relative">
                <div className="relative">
                    <input
                        type="text"
                        placeholder={t('search_blog_placeholder') || 'Search blog posts...'}
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className={`w-full px-4 py-3 bg-ui-2 border border-ui-3 rounded-2xl text-text-primary placeholder:text-text-secondary focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                            isRtl ? 'pr-12 pl-12 text-right' : 'pl-12 pr-12 text-left'
                        }`}
                        dir={isRtl ? 'rtl' : 'ltr'}
                    />
                    <MagnifyingGlassIcon 
                        size={20} 
                        className={`absolute top-1/2 transform -translate-y-1/2 text-text-secondary ${
                            isRtl ? 'right-4' : 'left-4'
                        }`}
                    />
                    {search && (
                        <button
                            type="button"
                            onClick={handleClearSearch}
                            className={`absolute top-1/2 transform -translate-y-1/2 text-text-secondary hover:text-text-primary transition-colors ${
                                isRtl ? 'left-4' : 'right-4'
                            }`}
                            title={t('clear_search') || 'Clear search'}
                        >
                            ×
                        </button>
                    )}
                </div>
            </form>
        </div>
    );
}
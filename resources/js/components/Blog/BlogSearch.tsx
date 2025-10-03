import { router } from "@inertiajs/react";
import { MagnifyingGlassIcon } from "@phosphor-icons/react";
import { useState } from "react";

interface BlogSearchProps {
    initialSearch: string;
}

export default function BlogSearch({ initialSearch }: BlogSearchProps) {
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
                        placeholder="Search blog posts..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full px-4 py-3 pl-12 pr-12 bg-ui-2 border border-ui-3 rounded-2xl text-text-primary placeholder:text-text-secondary focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <MagnifyingGlassIcon 
                        size={20} 
                        className="absolute left-4 top-1/2 transform -translate-y-1/2 text-text-secondary" 
                    />
                    {search && (
                        <button
                            type="button"
                            onClick={handleClearSearch}
                            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-text-secondary hover:text-text-primary transition-colors"
                        >
                            ×
                        </button>
                    )}
                </div>
            </form>
        </div>
    );
}
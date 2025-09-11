"use client";
import { useDebouncedCallback } from "use-debounce";
import { Search } from "lucide-react";
import { usePathname, useSearchParams, useRouter } from "next/navigation";

export default function SearchItems() {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter();

    const handleChange = useDebouncedCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const params = new URLSearchParams(searchParams);
        const searchString = e.target.value;

        if (searchString) {
            params.set("search", searchString);
            params.delete("page");
        } else {
            params.delete("search");
        }

        replace(`${pathname}?${params.toString()}`);
    }, 600);

    return (
        <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <input
                type="text"
                placeholder="Buscar usuários..."
                className="w-full pl-10 pr-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
                onChange={handleChange}
            />
        </div>
    );
}

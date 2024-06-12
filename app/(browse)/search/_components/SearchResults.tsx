import { getSearch } from "@/lib/searchService";
import ResultCard, { ResultCardSkeleton } from "./ResultCard";
import { Skeleton } from "@/components/ui/skeleton";

interface SearchResultsProps {
    term?: string;
}

export default async function SearchResults({ term }: SearchResultsProps) {
    const data = await getSearch(term);

    return (
        <div>
            <h2 className="font-semibold text-lg mb-4">
                Displaying results for &quot;{term}&quot;
            </h2>
            {data.length === 0 && (
                <div className="flex flex-1 justify-center items-center text-base text-muted-foreground mt-32">
                    No results found.
                </div>
            )}
            <div className="flex gap-y-4 flex-col">
                {data.map((res) => {
                    return <ResultCard key={res.id} data={res} />;
                })}
            </div>
        </div>
    );
}

export function SearchResultsSkeleton() {
    return (
        <div>
            <Skeleton className="mb-4 h-8 w-[290px]" />
            <div className="flex gap-y-4 flex-col">
                {[...Array(4)].map((_, idx) => {
                    return <ResultCardSkeleton key={idx} />;
                })}
            </div>
        </div>
    );
}

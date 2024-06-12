import NotFound from "@/app/not-found";
import SearchResults, {
    SearchResultsSkeleton,
} from "./_components/SearchResults";
import { Suspense } from "react";

interface PageProps {
    searchParams: { term?: string };
}

export default function Page({ searchParams: { term } }: PageProps) {
    if (!term) {
        return <NotFound />;
    }

    return (
        <div className="p-8 mx-auto h-full max-w-screen-2xl">
            <Suspense fallback={<SearchResultsSkeleton />}>
                <SearchResults term={term} />
            </Suspense>
        </div>
    );
}

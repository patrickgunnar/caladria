import { getStreams } from "@/lib/feedService";
import FeedCard, { FeedCardSkeleton } from "./FeedCard";
import { Skeleton } from "@/components/ui/skeleton";

interface FeedResultsProps {}

export default async function FeedResults({}: FeedResultsProps) {
    const data = await getStreams();

    return (
        <div>
            <h2 className="font-semibold text-lg mb-4">
                Your personalized streams
            </h2>
            {data.length === 0 && (
                <div className="text-sm text-muted-foreground">
                    No streams were found.
                </div>
            )}
            <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
                {data.map((stream) => {
                    return <FeedCard key={stream.id} data={stream} />;
                })}
            </div>
        </div>
    );
}

export function FeedResultsSkeleton() {
    return (
        <div>
            <Skeleton className="mb-4 h-8 w-[290px]" />
            <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
                {[...Array(4)].map((_, idx) => (
                    <FeedCardSkeleton key={idx} />
                ))}
            </div>
        </div>
    );
}

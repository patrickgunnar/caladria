import { Suspense } from "react";
import FeedResults, { FeedResultsSkeleton } from "./_components/FeedResults";

export default function Home() {
    return (
        <div className="p-8 mx-auto h-full max-w-screen-2xl">
            <Suspense fallback={<FeedResultsSkeleton />}>
                <FeedResults />
            </Suspense>
        </div>
    );
}

import Link from "next/link";
import Thumbnail, { ThumbnailSkeleton } from "../../_components/Thumbnail";
import VerifiedMark from "@/components/marks/VerifiedMark";
import { formatDistanceToNow } from "date-fns";
import { PartialStreamSearch } from "@/lib/searchService";
import { Skeleton } from "@/components/ui/skeleton";

interface ResultCardProps {
    data: PartialStreamSearch;
}

export default function ResultCard({
    data: {
        user: { username, imageUrl },
        name,
        isLive,
        thumbnailUrl,
        updatedAt,
    },
}: ResultCardProps) {
    return (
        <Link href={`/${username}`}>
            <div className="flex gap-x-4 w-full">
                <div className="relative h-[9rem] w-[16rem]">
                    <Thumbnail
                        src={thumbnailUrl}
                        username={username}
                        fallback={imageUrl}
                        isLive={isLive}
                    />
                </div>
                <div className="space-y-2">
                    <div className="flex gap-x-2 items-center">
                        <p className="font-bold text-lg cursor-pointer hover:text-[#FF7F00]">
                            @{username}
                        </p>
                        <VerifiedMark />
                    </div>
                    <p className="text-sm text-muted-foreground">{name}</p>
                    <p className="text-sm text-muted-foreground">
                        {formatDistanceToNow(new Date(updatedAt), {
                            addSuffix: true,
                        })}
                    </p>
                </div>
            </div>
        </Link>
    );
}

export function ResultCardSkeleton() {
    return (
        <div className="flex gap-x-4 w-full">
            <div className="relative h-[9rem] w-[16rem]">
                <ThumbnailSkeleton />
            </div>
            <div className="space-y-2">
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-3 w-24" />
                <Skeleton className="h-3 w-12" />
            </div>
        </div>
    );
}

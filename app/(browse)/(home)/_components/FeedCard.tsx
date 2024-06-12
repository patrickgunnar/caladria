import Link from "next/link";
import Thumbnail, { ThumbnailSkeleton } from "../../_components/Thumbnail";
import UserAvatar, { UserAvatarSkeleton } from "@/components/avatar/UserAvatar";
import { Skeleton } from "@/components/ui/skeleton";
import { PartialStream } from "@/lib/feedService";

interface FeedCardProps {
    data: PartialStream;
}

export default function FeedCard({
    data: {
        user: { username, imageUrl },
        name,
        thumbnailUrl,
        isLive,
    },
}: FeedCardProps) {
    return (
        <Link href={`/${username}`}>
            <div className="relative space-y-4 h-full w-full">
                <Thumbnail
                    src={thumbnailUrl}
                    fallback={imageUrl}
                    username={username}
                    isLive={isLive}
                />
                <div className="flex gap-x-3">
                    <UserAvatar
                        imageUrl={imageUrl}
                        username={username}
                        isLive={isLive}
                    />
                    <div className="flex flex-col text-sm overflow-hidden">
                        <p className="truncate font-semibold hover:text-[#FF7F00]">
                            {name}
                        </p>
                        <p className="text-muted-foreground">@{username}</p>
                    </div>
                </div>
            </div>
        </Link>
    );
}

export function FeedCardSkeleton() {
    return (
        <div className="space-y-4 h-full w-full">
            <ThumbnailSkeleton />
            <div className="flex gap-x-3">
                <UserAvatarSkeleton />
                <div className="flex gap-y-1 flex-col">
                    <Skeleton className="h-4 w-32" />
                    <Skeleton className="h-3 w-24" />
                </div>
            </div>
        </div>
    );
}

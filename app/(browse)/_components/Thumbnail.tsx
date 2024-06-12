import LiveBadge from "@/components/avatar/LiveBadge";
import UserAvatar from "@/components/avatar/UserAvatar";
import { Skeleton } from "@/components/ui/skeleton";
import Image from "next/image";

interface ThumbnailProps {
    src: string | null;
    fallback: string;
    username: string;
    isLive: boolean;
}

export default function Thumbnail({
    src,
    fallback,
    username,
    isLive,
}: ThumbnailProps) {
    let content: React.ReactNode;

    if (!src) {
        content = (
            <div className="flex gap-y-4 flex-col items-center justify-center bg-[#444444] transition-transform rounded-md h-full w-full group-hover:translate-x-2 group-hover:translate-y-2">
                <UserAvatar
                    imageUrl={fallback}
                    username={username}
                    isLive={isLive}
                    size="lg"
                    showBadge
                />
            </div>
        );
    } else {
        content = (
            <Image
                src={src}
                alt={`@${username}&apos; thumbnail`}
                className="object-cover rounded-md transition-transform group-hover:translate-x-2 group-hover:translate-y-2"
                fill
            />
        );
    }

    return (
        <div className="group relative aspect-video rounded-md cursor-pointer">
            <div className="absolute flex items-center justify-center bg-[#FF7F00] rounded-md inset-0 opacity-0 transition-opacity group-hover:opacity-100" />
            {content}
            {isLive && (
                <div className="absolute flex items-center justify-center bg-[#2C2C2C80] transition-transform h-full w-full group-hover:translate-x-2 group-hover:translate-y-2">
                    <LiveBadge className="text-sm" />
                </div>
            )}
        </div>
    );
}

export function ThumbnailSkeleton() {
    return (
        <div className="group relative aspect-video rounded-md cursor-pointer">
            <Skeleton className="h-full w-full" />
        </div>
    );
}

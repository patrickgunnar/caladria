import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { Skeleton } from "../ui/skeleton";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import LiveBadge from "./LiveBadge";

const avatarSizes = cva("", {
    variants: {
        size: {
            default: "h-8 w-8",
            lg: "h-14 w-14",
        },
    },
    defaultVariants: {
        size: "default",
    },
});

interface UserAvatarProps extends VariantProps<typeof avatarSizes> {
    username: string;
    imageUrl: string;
    isLive?: boolean;
    showBadge?: boolean;
}

export default function UserAvatar({
    username,
    imageUrl,
    isLive,
    showBadge,
    size,
}: UserAvatarProps) {
    const canShowBadge = showBadge && isLive;

    return (
        <div className="relative">
            <Avatar
                className={cn(
                    isLive && "ring-2 ring-[#FF6600] border border-[#393939]",
                    avatarSizes({ size })
                )}
            >
                <AvatarImage src={imageUrl} className="object-cover" />
                <AvatarFallback>
                    {username[0]}
                    {username[username.length - 1]}
                </AvatarFallback>
            </Avatar>
            {canShowBadge && (
                <div className="absolute left-1/2 -bottom-3 transform -translate-x-1/2">
                    <LiveBadge />
                </div>
            )}
        </div>
    );
}

interface UserAvatarSkeletonProps extends VariantProps<typeof avatarSizes> {}

export const UserAvatarSkeleton = ({ size }: UserAvatarSkeletonProps) => {
    return <Skeleton className={cn("rounded-full", avatarSizes({ size }))} />;
};

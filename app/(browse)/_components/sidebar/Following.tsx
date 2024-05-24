"use client";

import { useSidebar } from "@/store/useSidebar";
import { Follow, User } from "@prisma/client";
import UserItem, { UserItemSkeleton } from "./UserItem";
import { Skeleton } from "@/components/ui/skeleton";

interface FollowingProps {
    data: (Follow & { following: User })[];
}

export default function Following({ data }: FollowingProps) {
    const { collapsed } = useSidebar((state) => state);

    if (!data.length) {
        return null;
    }

    return (
        <div>
            {!collapsed && (
                <div className="pl-6 mb-6">
                    <p className="text-sm text-muted-foreground">Following</p>
                </div>
            )}
            <ul className="px-2 space-y-2">
                {data.map(({ following: { id, username, imageUrl } }) => (
                    <UserItem
                        key={id}
                        id={id}
                        username={username}
                        imageUrl={imageUrl}
                        isLive={false}
                    />
                ))}
            </ul>
        </div>
    );
}

export const FollowingSkeleton = () => {
    return (
        <>
            <Skeleton className="hidden lg:flex ml-6 h-6 w-32" />
            <ul className="px-2 pt-2 lg:pt-0">
                {[...Array(3)].map((_, i) => (
                    <UserItemSkeleton key={i} />
                ))}
            </ul>
        </>
    );
};

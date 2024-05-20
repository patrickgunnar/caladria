"use client";

import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useSidebar } from "@/store/useSidebar";
import { Skeleton } from "@/components/ui/skeleton";
import Link from "next/link";
import UserAvatar from "@/components/avatar/UserAvatar";
import LiveBadge from "@/components/avatar/LiveBadge";

interface UserItemProps {
    id: string;
    username: string;
    imageUrl: string;
    isLive: boolean;
}

export default function UserItem({
    id,
    username,
    imageUrl,
    isLive,
}: UserItemProps) {
    const pathname = usePathname();
    const { collapsed } = useSidebar();

    const href = `/${username}`;
    const isActive = pathname === href;

    return (
        <Button
            variant="orangeGhost"
            className={cn(
                "h-12 w-full",
                collapsed ? "justify-center" : "justify-start",
                isActive && "bg-[#FF7F00]"
            )}
            asChild
        >
            <Link href={href}>
                <div
                    className={cn(
                        "flex gap-x-4 items-center text-[#E8E8E8] w-full",
                        collapsed && "justify-center"
                    )}
                >
                    <UserAvatar
                        username={username}
                        imageUrl={imageUrl}
                        isLive={isLive}
                    />
                    {!collapsed && <p className="truncate">{username}</p>}
                    {!collapsed && isLive && <LiveBadge className="ml-auto" />}
                </div>
            </Link>
        </Button>
    );
}

export const UserItemSkeleton = () => {
    return (
        <li className="flex gap-x-4 items-center px-3 py-2">
            <Skeleton className="rounded-full min-h-[32px] min-w-[32px]" />
            <div className="flex-1">
                <Skeleton className="h-6" />
            </div>
        </li>
    );
};

"use client";

import { useSidebar } from "@/store/useSidebar";
import { User } from "@prisma/client";
import UserItem, { UserItemSkeleton } from "./UserItem";

interface RecommendedProps {
    data: User[];
}

export default function Recommended({ data }: RecommendedProps) {
    const { collapsed } = useSidebar();
    const showLabel = !collapsed && data.length > 0;

    return (
        <div>
            {showLabel && (
                <div className="mb-4 pl-6">
                    <p className="text-sm text-muted-foreground">Suggestion</p>
                </div>
            )}
            <ul className="px-2 space-y-2">
                {data.map(({ id, username, imageUrl }) => {
                    return (
                        <UserItem
                            key={id}
                            id={id}
                            username={username}
                            imageUrl={imageUrl}
                            isLive={true}
                        />
                    );
                })}
            </ul>
        </div>
    );
}

export const RecommendedSkeleton = () => {
    return (
        <ul className="px-2">
            {[...Array(3)].map((_, idx) => {
                return <UserItemSkeleton key={idx} />;
            })}
        </ul>
    );
};

"use client";

import { onFollow, onUnfollow } from "@/actions/follow";
import { Button } from "@/components/ui/button";
import { useTransition } from "react";
import { toast } from "sonner";

interface ActionsProps {
    isFollowing: boolean;
    userId: string;
}

export default function Actions({ isFollowing, userId }: ActionsProps) {
    const [isPending, startTransition] = useTransition();

    const handleFollow = () => {
        startTransition(() => {
            onFollow(userId)
                .then((data) =>
                    toast.success(
                        `Successfully followed @${data.following.username}`
                    )
                )
                .catch((err) => toast.error(err));
        });
    };

    const handleUnfollow = () => {
        startTransition(() => {
            onUnfollow(userId)
                .then((data) =>
                    toast.success(
                        `Successfully unfollowed @${data.following.username}`
                    )
                )
                .catch((err) => toast.error(err));
        });
    };

    return (
        <Button
            variant="orange"
            disabled={isPending}
            onClick={isFollowing ? handleUnfollow : handleFollow}
        >
            {isPending
                ? isFollowing
                    ? "Unfollowing..."
                    : "Following..."
                : isFollowing
                ? "Unfollow"
                : "Follow"}
        </Button>
    );
}

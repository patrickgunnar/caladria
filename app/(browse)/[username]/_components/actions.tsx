"use client";

import { onBlock, onUnblock } from "@/actions/block";
import { onFollow, onUnfollow } from "@/actions/follow";
import { Button } from "@/components/ui/button";
import { useTransition } from "react";
import { toast } from "sonner";

interface ActionsProps {
    isFollowing: boolean;
    userId: string;
}

export default function Actions({ isFollowing, userId }: ActionsProps) {
    const [isFollowPending, startFollowTransition] = useTransition();
    const [isBlockPending, startBlockTransition] = useTransition();

    const handleFollow = () => {
        startFollowTransition(() => {
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
        startFollowTransition(() => {
            onUnfollow(userId)
                .then((data) =>
                    toast.success(
                        `Successfully unfollowed @${data.following.username}`
                    )
                )
                .catch((err) => toast.error(err));
        });
    };

    const handleBlock = () => {
        startBlockTransition(() => {
            onBlock(userId)
                .then((data) => {
                    toast.success(
                        `Successfully blocked @${data?.blocked.username}`
                    );
                })
                .catch((err) => toast.error(err));
        });
    };

    const handleUnblock = () => {
        startBlockTransition(() => {
            onUnblock(userId)
                .then((data) => {
                    toast.success(
                        `Successfully unblocked @${data?.blocked.username}`
                    );
                })
                .catch((err) => toast.error(err));
        });
    };

    return (
        <>
            <Button
                variant="orange"
                disabled={isFollowPending}
                onClick={isFollowing ? handleUnfollow : handleFollow}
            >
                {isFollowPending
                    ? isFollowing
                        ? "Unfollowing..."
                        : "Following..."
                    : isFollowing
                    ? "Unfollow"
                    : "Follow"}
            </Button>
            <Button onClick={handleUnblock} disabled={isBlockPending}>
                Block User
            </Button>
        </>
    );
}

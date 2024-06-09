"use client";

import { useAuth } from "@clerk/nextjs";
import { Button } from "../ui/button";
import { UserRoundCheck, UserRoundPlus } from "lucide-react";
import { useRouter } from "next/navigation";
import { onFollow, onUnfollow } from "@/actions/follow";
import { useTransition } from "react";
import { toast } from "sonner";
import { Skeleton } from "../ui/skeleton";

interface ActionsProps {
    hostIdentity: string;
    isFollowing: boolean;
    isHost: boolean;
}

export default function Actions({
    hostIdentity,
    isFollowing,
    isHost,
}: ActionsProps) {
    const router = useRouter();
    const { userId } = useAuth();

    const [isPending, startTransition] = useTransition();

    const toggleFollow = () => {
        if (!userId) {
            return router.push("/sign-in");
        } else if (isHost) {
            return;
        }

        if (isFollowing) {
            startTransition(() => {
                onUnfollow(hostIdentity)
                    .then((dt) =>
                        toast.success(`Unfollowed @${dt.following.username}`)
                    )
                    .catch((err) => toast.error(err.message));
            });
        } else {
            startTransition(() => {
                onFollow(hostIdentity)
                    .then((dt) =>
                        toast.success(`Followed @${dt.following.username}`)
                    )
                    .catch((err) => toast.error(err.message));
            });
        }
    };

    return (
        <Button
            size="sm"
            variant="orange"
            onClick={toggleFollow}
            disabled={isHost ?? isPending}
            className="font-medium w-full lg:w-auto"
        >
            {isFollowing ? (
                <UserRoundCheck className="mr-2 h-5 w-5" />
            ) : (
                <UserRoundPlus className="mr-2 h-5 w-5" />
            )}
            {isFollowing ? "Unfollow" : "Follow"}
        </Button>
    );
}

export function ActionsSkeleton() {
    return <Skeleton className="h-10 w-full lg:w-24" />;
}

"use client";

import { onUnblock } from "@/actions/block";
import { Button } from "@/components/ui/button";
import { useTransition } from "react";
import { toast } from "sonner";

export default function UnblockButton({ userId }: { userId: string }) {
    const [isPending, startTransition] = useTransition();

    const handleUnblock = () => {
        startTransition(() => {
            onUnblock(userId)
                .then((res) =>
                    toast.success(
                        `Successfully unblocked @${res?.blocked.username}`
                    )
                )
                .catch((err) => toast.error(err.message));
        });
    };

    return (
        <Button
            variant="orange"
            size="sm"
            disabled={isPending}
            onClick={handleUnblock}
            className="w-full"
        >
            Unblock
        </Button>
    );
}

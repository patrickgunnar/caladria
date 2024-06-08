"use client";

import { toast } from "sonner";
import { useTransition } from "react";
import { MinusCircle } from "lucide-react";
import Hint from "../hint/Hint";
import { onBlock } from "@/actions/block";
import { cn, stringColor } from "@/lib/utils";
import { Button } from "../ui/button";

interface CommunityItemProps {
    participantName: string | undefined;
    participantIdentity: string;
    hostName: string;
    viewerName: string;
}

export default function CommunityItem({
    participantName,
    participantIdentity,
    hostName,
    viewerName,
}: CommunityItemProps) {
    const [isPending, startTransition] = useTransition();

    const color = stringColor(participantName ?? "");
    const isSelf = participantName === viewerName;
    const isHost = viewerName === hostName;

    const handleBlock = () => {
        if (!participantName || isSelf || !isHost) return;

        startTransition(() => {
            onBlock(participantIdentity)
                .then(() => toast.success(`Blocked ${participantName}`))
                .catch(() => toast.error("Something went wrong"));
        });
    };

    return (
        <div
            className={cn(
                "group flex items-center justify-between rounded-md text-sm p-2 w-full hover:bg-white/5",
                isPending && "opacity-50 pointer-events-none"
            )}
        >
            <p style={{ color }}>{participantName ?? "No name"}</p>
            {isHost && !isSelf && (
                <Hint label="Block">
                    <Button
                        variant="orangeGhost"
                        disabled={isPending}
                        onClick={handleBlock}
                        className="transition opacity-0 p-1 h-auto w-auto group-hover:opacity-100"
                    >
                        <MinusCircle className="text-muted-foreground h-4 w-4" />
                    </Button>
                </Hint>
            )}
        </div>
    );
}

"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Skeleton } from "../ui/skeleton";
import ChatInfo from "./ChatInfo";

interface ChatFormProps {
    value: string;
    isHidden: boolean;
    isFollowersOnly: boolean;
    isDelayed: boolean;
    isFollowing: boolean;
    onSubmit: () => void;
    onChange: (value: string) => void;
}

export default function ChatForm({
    value,
    isHidden,
    isFollowersOnly,
    isDelayed,
    isFollowing,
    onSubmit,
    onChange,
}: ChatFormProps) {
    const [isDelayBlock, setIsDelayBlock] = useState<boolean>(false);

    const isFollowersOnlyAndNotFollowing = isFollowersOnly && !isFollowing;
    const isDisabled =
        isHidden || isDelayBlock || isFollowersOnlyAndNotFollowing;

    const handleSubmit = (ev: React.FormEvent<HTMLFormElement>) => {
        ev.preventDefault();
        ev.stopPropagation();

        if (!value || isDisabled) return;
        if (isDelayed && !isDelayBlock) {
            setIsDelayBlock(true);
            setTimeout(() => {
                setIsDelayBlock(false);
                onSubmit();
            }, 5000);
        } else {
            onSubmit();
        }
    };

    //if (isHidden) return null;

    return (
        <form
            className="flex gap-y-4 flex-col items-center p-3"
            onSubmit={handleSubmit}
        >
            <div className="w-full">
                <ChatInfo
                    isDelayed={isDelayed}
                    isFollowersOnly={isFollowersOnly}
                />
                <Input
                    onChange={(ev) => onChange(ev.target.value)}
                    value={value}
                    disabled={isDisabled}
                    placeholder="Send a message"
                    className={cn(
                        "border-white/10 bg-[#333333] text-inherit",
                        isFollowersOnly && "rounded-t-none border-t-0"
                    )}
                />
            </div>
            <div className="ml-auto">
                <Button
                    type="submit"
                    variant="orange"
                    size="sm"
                    disabled={isDisabled}
                >
                    Chat
                </Button>
            </div>
        </form>
    );
}

export function ChatFormSkeleton() {
    return (
        <div className="flex gap-y-4 flex-col items-center p-3">
            <Skeleton className="h-10 w-full" />
            <div className="flex gap-x-2 items-center ml-auto">
                <Skeleton className="h-7 w-7" />
                <Skeleton className="h-7 w-12" />
            </div>
        </div>
    );
}

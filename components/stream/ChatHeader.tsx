"use client";

import { Skeleton } from "../ui/skeleton";
import ChatToggle from "./ChatToggle";
import VariantToggle from "./VariantToggle";

export default function ChatHeader() {
    return (
        <div className="relative border-b border-[#393939] p-3">
            <div className="hidden absolute left-2 top-2 lg:block">
                <ChatToggle />
            </div>
            <p className="font-semibold text-center text-inherit">
                Stream Chat
            </p>
            <div className="absolute right-2 top-2">
                <VariantToggle />
            </div>
        </div>
    );
}

export function ChatHeaderSkeleton() {
    return (
        <div className="hidden relative border-b border-[#393939] p-3 md:block">
            <Skeleton className="absolute left-3 top-3 h-6 w-6" />
            <Skeleton className="mx-auto h-6 w-28" />
            <Skeleton className="absolute right-3 top-3 h-6 w-6" />
        </div>
    );
}

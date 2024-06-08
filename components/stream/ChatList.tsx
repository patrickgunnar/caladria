"use client";

import { ReceivedChatMessage } from "@livekit/components-react";
import ChatMessage from "./ChatMessage";
import { Skeleton } from "../ui/skeleton";

interface ChatListProps {
    messages: ReceivedChatMessage[];
    isHidden: boolean;
}

export default function ChatList({ messages, isHidden }: ChatListProps) {
    if (isHidden || !messages || messages.length === 0) {
        return (
            <div className="flex flex-1 items-center justify-center">
                <p className="text-sm text-muted-foreground">
                    {isHidden ? "Chat is disabled" : "Welcome to the chat"}
                </p>
            </div>
        );
    }

    return (
        <div className="flex flex-1 flex-col-reverse p-3 overflow-y-auto h-full">
            {messages.map((message) => {
                return <ChatMessage key={message.timestamp} data={message} />;
            })}
        </div>
    );
}

export function ChatListSkeleton() {
    return (
        <div className="flex items-center justify-center h-full">
            <Skeleton className="h-6 w-1/2" />
        </div>
    );
}

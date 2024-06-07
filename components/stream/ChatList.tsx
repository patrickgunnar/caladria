"use client";

import { ReceivedChatMessage } from "@livekit/components-react";
import ChatMessage from "./ChatMessage";

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

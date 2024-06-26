"use client";

import { ChatVariant, useChatSidebar } from "@/store/useChatSidebar";
import {
    useChat,
    useConnectionState,
    useRemoteParticipant,
} from "@livekit/components-react";
import { ConnectionState } from "livekit-client";
import { useEffect, useMemo, useState } from "react";
import { useMediaQuery } from "usehooks-ts";
import ChatHeader, { ChatHeaderSkeleton } from "./ChatHeader";
import ChatForm, { ChatFormSkeleton } from "./ChatForm";
import ChatList, { ChatListSkeleton } from "./ChatList";
import ChatCommunity from "./ChatCommunity";

interface ChatProps {
    viewerName: string;
    hostName: string;
    hostIdentity: string;
    isFollowing: boolean;
    isChatEnabled: boolean;
    isChatDelayed: boolean;
    isChatFollowersOnly: boolean;
}

export default function Chat({
    viewerName,
    hostName,
    hostIdentity,
    isFollowing,
    isChatEnabled,
    isChatDelayed,
    isChatFollowersOnly,
}: ChatProps) {
    const { variant, onExpand } = useChatSidebar((state) => state);
    const { chatMessages: messages, send } = useChat();

    const matches = useMediaQuery("(max-width: 1024px)");
    const connectionState = useConnectionState();
    const participant = useRemoteParticipant(hostIdentity);
    const isOnline =
        participant && connectionState === ConnectionState.Connected;
    const isHidden = !isChatEnabled || !isOnline;

    const [value, setValue] = useState<string>("");

    useEffect(() => {
        if (matches) {
            onExpand();
        }
    }, [matches, onExpand]);

    const reversedMessages = useMemo(() => {
        return messages.sort((a, b) => b.timestamp - a.timestamp);
    }, [messages]);

    const onSubmit = () => {
        if (!send) return;

        send(value);
        setValue("");
    };

    const onChange = (value: string) => {
        setValue(value);
    };

    return (
        <div className="flex flex-col bg-[#333333] border border-b border-[#393939] pt-0 h-[calc(100vh-64px)]">
            <ChatHeader />
            {variant === ChatVariant.CHAT && (
                <>
                    <ChatList messages={reversedMessages} isHidden={isHidden} />
                    <ChatForm
                        value={value}
                        isHidden={isHidden}
                        isFollowersOnly={isChatFollowersOnly}
                        isDelayed={isChatDelayed}
                        isFollowing={isFollowing}
                        onSubmit={onSubmit}
                        onChange={onChange}
                    />
                </>
            )}
            {variant === ChatVariant.COMMUNITY && (
                <>
                    <ChatCommunity
                        viewerName={viewerName}
                        hostName={hostName}
                        isHidden={isHidden}
                    />
                </>
            )}
        </div>
    );
}

export function ChatSkeleton() {
    return (
        <div className="flex flex-col bg-[#333333] border border-[#393939] border-l border-b pt-0 h-[calc(100vh-64px)]">
            <ChatHeaderSkeleton />
            <ChatListSkeleton />
            <ChatFormSkeleton />
        </div>
    );
}

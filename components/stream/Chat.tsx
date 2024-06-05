"use client";

import { useChatSidebar } from "@/store/useChatSidebar";
import {
    useChat,
    useConnectionState,
    useRemoteParticipant,
} from "@livekit/components-react";
import { ConnectionState } from "livekit-client";
import { useEffect, useMemo, useState } from "react";
import { useMediaQuery } from "usehooks-ts";

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
        <div className="flex flex-col bg-[#333333] border-0 border-b border-[#393939] pt-0 h-[calc(100vh-64px)]">
            Chat
        </div>
    );
}

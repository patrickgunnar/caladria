"use client";

import { useViewerToken } from "@/hooks/useViewerToken";
import { Stream, User } from "@prisma/client";
import { LiveKitRoom } from "@livekit/components-react";
import { cn } from "@/lib/utils";
import { useChatSidebar } from "@/store/useChatSidebar";
import Video, { VideoSkeleton } from "./Video";
import Chat, { ChatSkeleton } from "./Chat";
import ChatToggle from "./ChatToggle";
import Header, { HeaderSkeleton } from "./Header";

interface StreamPlayerProps {
    user: User;
    stream: Stream;
    isFollowing: boolean;
}

export default function StreamPlayer({
    user: { id, username, imageUrl },
    stream,
    isFollowing,
}: StreamPlayerProps) {
    const { token, name, identity } = useViewerToken(id);
    const { collapsed } = useChatSidebar((state) => state);

    if (!token || !name || !identity) {
        return <StreamPlayerSkeleton />;
    }

    return (
        <>
            <LiveKitRoom
                token={token}
                serverUrl={process.env.NEXT_PUBLIC_LIVEKIT_WS_URL}
                className={cn(
                    "grid grid-cols-1 pt-0 h-full lg:grid-cols-3 lg:gap-y-0 xl:grid-cols-3 2xl:grid-cols-6",
                    collapsed && "lg:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-2"
                )}
            >
                <div className="hidden-scrollbar col-span-1 pb-10 space-y-4 lg:overflow-y-auto lg:col-span-2 xl:col-span-2 2xl:col-span-5">
                    <Video hostName={username} hostIdentity={id} />
                    <Header
                        hostName={username}
                        hostIdentity={id}
                        viewerIdentity={identity}
                        imageUrl={imageUrl}
                        isFollowing={isFollowing}
                        name={stream.name}
                    />
                </div>
                {collapsed && (
                    <div className="hidden fixed top-20 right-8 z-50 lg:block">
                        <ChatToggle />
                    </div>
                )}
                <div className={cn("col-span-1", collapsed && "hidden")}>
                    <Chat
                        viewerName={name}
                        hostName={username}
                        hostIdentity={id}
                        isFollowing={isFollowing}
                        isChatEnabled={stream.isChatEnabled}
                        isChatDelayed={stream.isChatDelayed}
                        isChatFollowersOnly={stream.isChatFollowersOnly}
                    />
                </div>
            </LiveKitRoom>
        </>
    );
}

export function StreamPlayerSkeleton() {
    return (
        <div className="grid grid-cols-1 h-full lg:grid-cols-3 lg:gap-y-0 xl:grid-cols-3 2xl:grid-cols-6">
            <div className="hidden-scrollbar col-span-1 pb-10 space-y-4 lg:overflow-y-auto lg:col-span-2 xl:col-span-2 2xl:col-span-5">
                <VideoSkeleton />
                <HeaderSkeleton />
            </div>
            <div className="col-span-1 bg-[#333333]">
                <ChatSkeleton />
            </div>
        </div>
    );
}

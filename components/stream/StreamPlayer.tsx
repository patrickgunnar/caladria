"use client";

import { useViewerToken } from "@/hooks/useViewerToken";
import { Stream, User } from "@prisma/client";
import { LiveKitRoom } from "@livekit/components-react";
import Video from "./Video";

interface StreamPlayerProps {
    user: User;
    stream: Stream;
    isFollowing: boolean;
}

export default function StreamPlayer({
    user: { id, username },
    stream,
    isFollowing,
}: StreamPlayerProps) {
    const { token, name, identity } = useViewerToken(id);

    if (!token || !name || !identity) {
        return <div>Cannot access the streaming</div>;
    }

    return (
        <>
            <LiveKitRoom
                token={token}
                serverUrl={process.env.NEXT_PUBLIC_LIVEKIT_WS_URL}
                className="grid grid-cols-1 h-full lg:grid-cols-3 lg:gap-y-0 xl:grid-cols-3 2xl:grid-cols-6"
            >
                <div className="hidden-scrollbar col-span-1 pb-10 space-y-4 lg:overflow-y-auto lg:col-span-2 xl:col-span-2 2xl:col-span-5">
                    <Video hostName={username} hostIdentity={id} />
                </div>
            </LiveKitRoom>
        </>
    );
}

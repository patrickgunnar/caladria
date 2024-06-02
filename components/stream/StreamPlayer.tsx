"use client";

import { useViewerToken } from "@/hooks/useViewerToken";
import { Stream, User } from "@prisma/client";

interface StreamPlayerProps {
    user: User;
    stream: Stream;
    isFollowing: boolean;
}

export default function StreamPlayer({
    user: { id },
    stream,
    isFollowing,
}: StreamPlayerProps) {
    const { token, name, identity } = useViewerToken(id);

    if (!token || !name || !identity) {
        return <div>Cannot access the streaming</div>;
    }

    return <div>Allowed to access the stream</div>;
}

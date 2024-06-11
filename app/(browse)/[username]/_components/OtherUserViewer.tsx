"use client";

import UserAvatar from "@/components/avatar/UserAvatar";
import AboutCard from "@/components/stream/AboutCard";
import { useViewerToken } from "@/hooks/useViewerToken";

interface OtherUserViewerProps {
    id: string;
    bio: string | null;
    username: string;
    imageUrl: string;
    isLive: boolean;
    followedByCount: number;
}

export default function OtherUserViewer({
    id,
    bio,
    username,
    imageUrl,
    isLive,
    followedByCount,
}: OtherUserViewerProps) {
    const { identity } = useViewerToken(id);

    return (
        <div className="flex gap-y-3 flex-col w-full">
            <div className="flex items-center justify-center p-6 w-full">
                <UserAvatar
                    imageUrl={imageUrl}
                    username={username}
                    size="xl"
                    isLive={isLive}
                    showBadge
                />
            </div>
            <AboutCard
                hostName={username}
                hostIdentity={id}
                followedByCount={followedByCount}
                bio={bio}
                viewerIdentity={identity}
            />
        </div>
    );
}

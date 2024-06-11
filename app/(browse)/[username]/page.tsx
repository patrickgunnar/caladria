import { isFollowingUser } from "@/lib/followService";
import { getUserByUsername } from "@/lib/userService";
import { notFound } from "next/navigation";
import { isBlockedByUser } from "@/lib/blockService";
import OtherUserViewer from "./_components/OtherUserViewer";
import StreamPlayer from "@/components/stream/StreamPlayer";

interface PageProps {
    params: {
        username: string;
    };
}

export default async function Page({
    params: { username: receivedUsername },
}: PageProps) {
    const user = await getUserByUsername(receivedUsername);

    if (!user) {
        notFound();
    }

    const { id, username, stream, _count, bio, imageUrl } = user;
    const isFollowing = await isFollowingUser(id);
    const isBlocked = await isBlockedByUser(id);

    if (isBlocked) {
        notFound();
    }

    return (
        <div className="h-full">
            {stream ? (
                <StreamPlayer
                    user={user}
                    stream={stream}
                    isFollowing={isFollowing}
                    followedByCount={_count.followedBy}
                />
            ) : (
                <OtherUserViewer
                    id={id}
                    bio={bio}
                    username={username}
                    imageUrl={imageUrl}
                    isLive={false}
                    followedByCount={_count.followedBy}
                />
            )}
        </div>
    );
}

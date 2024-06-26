import StreamPlayer from "@/components/stream/StreamPlayer";
import { getUserByUsername } from "@/lib/userService";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

interface CreatorPageProps {
    params: { username: string };
}

export default async function CreatorPage({
    params: { username },
}: CreatorPageProps) {
    const externalUser = await currentUser();
    const user = await getUserByUsername(username);

    if (!user || user.externalUserId !== externalUser?.id || !user.stream) {
        redirect("/");
    }

    const { stream, _count } = user;

    return (
        <div className="h-full">
            <StreamPlayer
                user={user}
                stream={stream}
                followedByCount={_count.followedBy}
                isFollowing
            />
        </div>
    );
}

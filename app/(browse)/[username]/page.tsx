import { isFollowingUser } from "@/lib/followService";
import { getUserByUsername } from "@/lib/userService";
import { notFound } from "next/navigation";

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

    const { id, username } = user;
    const isFollowing = await isFollowingUser(id);

    return (
        <div className="flex gap-y-4 flex-col">
            <p>Username: {username}</p>
            <p>User ID: {id}</p>
            <p>Following: {JSON.stringify(isFollowing)}</p>
        </div>
    );
}

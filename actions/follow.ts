"use server";

import { followUser, unfollowUser } from "@/lib/followService";
import { revalidatePath } from "next/cache";

export const onFollow = async (id: string) => {
    try {
        const followedUser = await followUser(id);

        // refresh cache
        revalidatePath("/");

        if (followedUser) {
            revalidatePath(`/${followedUser.following.username}`);
        }

        return followedUser;
    } catch (_) {
        throw new Error("Internal Error");
    }
};

export const onUnfollow = async (id: string) => {
    try {
        const unfollowedUser = await unfollowUser(id);

        // refresh the cache
        revalidatePath("/");

        if (unfollowedUser) {
            revalidatePath(`/${unfollowedUser.following.username}`);
        }

        return unfollowedUser;
    } catch (_) {
        throw new Error("Internal Error");
    }
};

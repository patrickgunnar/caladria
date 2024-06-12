"use server";

import { getSelf } from "@/lib/authService";
import { blockUser, unblockUser } from "@/lib/blockService";
import { RoomServiceClient } from "livekit-server-sdk";
import { revalidatePath } from "next/cache";

const roomService = new RoomServiceClient(
    process.env.LIVEKIT_API_URL!,
    process.env.LIVEKIT_API_KEY!,
    process.env.LIVEKIT_API_SECRET!
);

export async function onBlock(id: string) {
    try {
        const self = await getSelf();

        if (!self) {
            throw new Error("Unauthorized");
        }

        let blockedUser: any = null;

        try {
            blockedUser = await blockUser(id);
        } catch (error: any) {
            // if error, means that the user is a guest
            console.log(error.message);
        }

        try {
            await roomService.removeParticipant(self.id, id);
        } catch (error: any) {
            // if error means the user is not in the room
            console.log(error.message);
        }

        // refresh cache
        revalidatePath("/");
        revalidatePath(`/u/${self.username}/community`);

        if (blockedUser) {
            revalidatePath(`/${blockedUser.blocked.username}`);
        }

        return blockedUser;
    } catch (_) {
        throw new Error("Internal Error");
    }
}

export async function onUnblock(id: string) {
    try {
        const self = await getSelf();

        if (!self) {
            throw new Error("Unauthorized");
        }

        const unblockedUser = await unblockUser(id);

        // refresh cache
        revalidatePath("/");

        if (unblockedUser) {
            revalidatePath(`/u/${self.username}`);
        }

        return unblockedUser;
    } catch (_) {
        throw new Error("Internal Error");
    }
}

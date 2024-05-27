"use server";

import { blockUser, unblockUser } from "@/lib/blockService";
import { revalidatePath } from "next/cache";

export async function onBlock(id: string) {
    // TO DO: Adapt to disconnect from livestrem.
    // To DO: Allow the ability to kick out the guest.
    try {
        const blockedUser = await blockUser(id);

        // refresh cache
        revalidatePath("/");

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
        const unblockedUser = await unblockUser(id);

        // refresh cache
        revalidatePath("/");

        if (unblockedUser) {
            revalidatePath(`/${unblockedUser.blocked.username}`);
        }

        return unblockedUser;
    } catch (_) {
        throw new Error("Internal Error");
    }
}

import { db } from "./db";
import { getSelf } from "./authService";
import {
    isFollowingUser,
    unfollowUser,
    unfollowUserByOtherUser,
} from "./followService";

export async function isBlockedByUser(id: string) {
    try {
        const self = await getSelf();

        if (!self) {
            throw new Error("You must be logged in to proceed");
        }

        const otherUser = await db.user.findUnique({
            where: { id },
        });

        if (!otherUser) {
            throw new Error("User not found");
        }

        if (otherUser.id === self.id) {
            return false;
        }

        const existingBlock = await db.block.findUnique({
            where: {
                blockerId_blockedId: {
                    blockerId: otherUser.id,
                    blockedId: self.id,
                },
            },
        });

        return !!existingBlock;
    } catch (err: any) {
        console.log(err);

        return false;
    }
}

export async function blockUser(id: string) {
    try {
        const self = await getSelf();

        if (!self) {
            throw new Error("You must be logged in to proceed");
        }

        const otherUser = await db.user.findUnique({
            where: { id },
        });

        if (!otherUser) {
            throw new Error("User not found");
        }

        if (otherUser.id === self.id) {
            throw new Error("Cannot block yourself");
        }

        const existingBlock = await db.block.findUnique({
            where: {
                blockerId_blockedId: {
                    blockerId: self.id,
                    blockedId: otherUser.id,
                },
            },
        });

        if (existingBlock) {
            throw new Error("User already blocked");
        }

        const block = await db.block.create({
            data: {
                blockerId: self.id,
                blockedId: otherUser.id,
            },
            include: {
                blocked: true,
            },
        });

        const isFollowing = await isFollowingUser(otherUser.id);

        if (isFollowing) {
            await unfollowUser(otherUser.id);
            await unfollowUserByOtherUser(otherUser.id);
        }

        return block;
    } catch (err: any) {
        console.log(err);

        return null;
    }
}

export async function unblockUser(id: string) {
    try {
        const self = await getSelf();

        if (!self) {
            throw new Error("You must be logged in to proceed");
        }

        const otherUser = await db.user.findUnique({
            where: { id },
        });

        if (!otherUser) {
            throw new Error("User not found");
        }

        if (otherUser.id === self.id) {
            throw new Error("Cannot unblock yourself");
        }

        const existingBlock = await db.block.findUnique({
            where: {
                blockerId_blockedId: {
                    blockerId: self.id,
                    blockedId: otherUser.id,
                },
            },
        });

        if (!existingBlock) {
            throw new Error("Not blocked");
        }

        const unblock = await db.block.delete({
            where: {
                id: existingBlock.id,
            },
            include: {
                blocked: true,
            },
        });

        return unblock;
    } catch (err: any) {
        console.log(err);

        return null;
    }
}

export async function getBlockedUsers() {
    try {
        const self = await getSelf();

        if (!self) {
            throw new Error("You must be logged in to proceed");
        }

        const blockedUsers = await db.block.findMany({
            where: {
                blockerId: self.id,
            },
            include: {
                blocked: true,
            },
        });

        return blockedUsers;
    } catch (error: any) {
        console.log(error);

        return null;
    }
}

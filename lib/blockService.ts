import { db } from "./db";
import { getSelf } from "./authService";

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
    } catch (_) {
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

        return block;
    } catch (_) {
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
    } catch (_) {
        return null;
    }
}

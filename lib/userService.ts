import { db } from "./db";

export type PartialStreamType = {
    id: string;
    name: string;
    isLive: boolean;
    thumbnailUrl: string | null;
    isChatDelayed: boolean;
    isChatEnabled: boolean;
    isChatFollowersOnly: boolean;
};

export type PartialUserType = {
    id: string;
    bio: string | null;
    username: string;
    imageUrl: string | null;
    externalUserId: string;
    stream: PartialStreamType | null;
    _count: { followedBy: number };
};

export const getUserByUsername = async (username: string) => {
    const user = await db.user.findUnique({
        where: { username },
        select: {
            id: true,
            bio: true,
            username: true,
            imageUrl: true,
            externalUserId: true,
            stream: {
                select: {
                    id: true,
                    name: true,
                    isLive: true,
                    thumbnailUrl: true,
                    isChatDelayed: true,
                    isChatEnabled: true,
                    isChatFollowersOnly: true,
                },
            },
            _count: {
                select: {
                    followedBy: true,
                },
            },
        },
    });

    return user;
};

export const getUserByID = async (id: string) => {
    const user = await db.user.findUnique({
        where: { id },
        include: {
            stream: true,
        },
    });

    return user;
};

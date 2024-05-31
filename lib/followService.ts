import { db } from "./db";
import { getSelf } from "./authService";

export const getFollowedUsers = async () => {
    try {
        const self = await getSelf();

        if (!self) {
            throw new Error("You must be logged in to follow");
        }

        const followedUser = await db.follow.findMany({
            where: {
                followerId: self.id,
                following: {
                    blocking: {
                        none: {
                            blockedId: self.id,
                        },
                    },
                },
            },
            include: {
                following: {
                    include: {
                        stream: true,
                    },
                },
            },
        });

        return followedUser;
    } catch (_) {
        return [];
    }
};

export const isFollowingUser = async (id: string) => {
    try {
        const self = await getSelf();

        if (!self) {
            throw new Error("You must be logged in to follow");
        }

        const otherUser = await db.user.findUnique({
            where: { id },
        });

        if (!otherUser) {
            throw new Error("User not found");
        }

        if (otherUser.id === self.id) {
            return true;
        }

        const existingFollow = await db.follow.findUnique({
            where: {
                followerId_followingId: {
                    followerId: self.id,
                    followingId: otherUser.id,
                },
            },
        });

        return !!existingFollow;
    } catch (_) {
        return false;
    }
};

export const followUser = async (id: string) => {
    const self = await getSelf();

    if (!self) {
        throw new Error("You must be logged in to follow");
    }

    const otherUser = await db.user.findUnique({
        where: { id },
    });

    if (!otherUser) {
        throw new Error("User not found");
    }

    if (otherUser.id === self?.id) {
        throw new Error("Cannot follow yourself");
    }

    const existingFollow = await db.follow.findFirst({
        where: {
            followerId: self.id,
            followingId: otherUser.id,
        },
    });

    if (existingFollow) {
        throw new Error("Already following");
    }

    const follow = await db.follow.create({
        data: {
            followerId: self.id,
            followingId: otherUser.id,
        },
        include: {
            follower: true,
            following: true,
        },
    });

    return follow;
};

export const unfollowUser = async (id: string) => {
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
        throw new Error("Cannot unfollow yourself");
    }

    const existingFollow = await db.follow.findFirst({
        where: {
            followerId: self.id,
            followingId: otherUser.id,
        },
    });

    if (!existingFollow) {
        throw new Error("Not following");
    }

    const follow = await db.follow.delete({
        where: {
            id: existingFollow.id,
        },
        include: {
            following: true,
        },
    });

    return follow;
};

export const unfollowUserByOtherUser = async (id: string) => {
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
        throw new Error("Cannot unfollow yourself");
    }

    const existingFollow = await db.follow.findFirst({
        where: {
            followerId: otherUser.id,
            followingId: self.id,
        },
    });

    if (!existingFollow) {
        throw new Error("Not following");
    }

    const follow = await db.follow.delete({
        where: {
            id: existingFollow.id,
        },
        include: {
            following: true,
        },
    });

    return follow;
};

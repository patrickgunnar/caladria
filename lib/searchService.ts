import { db } from "./db";
import { getSelf } from "./authService";
import { User } from "@prisma/client";

export type PartialStreamSearch = {
    id: string;
    name: string;
    isLive: boolean;
    thumbnailUrl: string | null;
    updatedAt: Date;
} & { user: User };

export async function getSearch(term?: string) {
    try {
        let userId: string | null = null;

        try {
            const self = await getSelf();

            if (!self) {
                throw new Error("Unauthorized");
            }

            userId = self.id;
        } catch (error) {
            userId = null;
        }

        let streams: PartialStreamSearch[] = [];

        if (userId) {
            streams = await db.stream.findMany({
                where: {
                    user: {
                        NOT: {
                            blocking: {
                                some: {
                                    blockedId: userId,
                                },
                            },
                        },
                    },
                    OR: [
                        {
                            name: {
                                contains: term,
                            },
                        },
                        {
                            user: {
                                username: {
                                    contains: term,
                                },
                            },
                        },
                    ],
                },
                select: {
                    id: true,
                    name: true,
                    isLive: true,
                    thumbnailUrl: true,
                    user: true,
                    updatedAt: true,
                },
                orderBy: [
                    {
                        isLive: "desc",
                    },
                    {
                        updatedAt: "desc",
                    },
                ],
            });
        } else {
            streams = await db.stream.findMany({
                where: {
                    OR: [
                        {
                            name: {
                                contains: term,
                            },
                        },
                        {
                            user: {
                                username: {
                                    contains: term,
                                },
                            },
                        },
                    ],
                },
                select: {
                    id: true,
                    name: true,
                    isLive: true,
                    thumbnailUrl: true,
                    user: true,
                    updatedAt: true,
                },
                orderBy: [
                    {
                        isLive: "desc",
                    },
                    {
                        updatedAt: "desc",
                    },
                ],
            });
        }

        return streams;
    } catch (error: any) {
        console.log(error.message);

        return [];
    }
}

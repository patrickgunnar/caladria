import { db } from "./db";
import { getSelf } from "./authService";
import { User } from "@prisma/client";

export type PartialStream = {
    id: string;
    name: string;
    isLive: boolean;
    thumbnailUrl: string | null;
} & { user: User };

export async function getStreams() {
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

        let streams: PartialStream[] = [];

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
                },
                select: {
                    id: true,
                    name: true,
                    isLive: true,
                    thumbnailUrl: true,
                    user: true,
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
                select: {
                    id: true,
                    name: true,
                    isLive: true,
                    thumbnailUrl: true,
                    user: true,
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

import { db } from "./db";
import { getSelf } from "./authService";

export const getRecommended = async () => {
    //await new Promise((resolve) => setTimeout(resolve, 5000));
    let userId: string | null;

    try {
        const self = await getSelf();

        userId = self?.id ?? null;
    } catch (_) {
        userId = null;
    }

    const users = await db.user.findMany({
        where: {
            AND: [
                {
                    NOT: {
                        id: userId ?? "",
                    },
                },
                {
                    NOT: {
                        followedBy: {
                            some: {
                                followerId: userId ?? "",
                            },
                        },
                    },
                },
            ],
        },
        orderBy: {
            createdAt: "desc",
        },
    });

    return users;
};

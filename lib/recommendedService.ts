import { db } from "./db";
import { getSelf } from "./authService";

export const getRecommended = async () => {
    //await new Promise((resolve) => setTimeout(resolve, 5000));
    let useId: string | null;

    try {
        const self = await getSelf();

        useId = self?.id ?? null;
    } catch (_) {
        useId = null;
    }

    const users = await db.user.findMany({
        where: {
            NOT: {
                id: useId ?? ""
            }
        },
        orderBy: {
            createdAt: "desc",
        },
    });

    return users;
};

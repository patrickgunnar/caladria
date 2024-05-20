import { db } from "./db";
import { getSelf } from "./authService";

export const getRecommended = async () => {
    await new Promise((resolve) => setTimeout(resolve, 5000));

    const users = await db.user.findMany({
        orderBy: {
            createdAt: "desc",
        },
    });

    return users;
};

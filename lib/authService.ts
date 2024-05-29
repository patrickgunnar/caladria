import { currentUser } from "@clerk/nextjs/server";
import { db } from "./db";

export const getSelf = async () => {
    try {
        const self = await currentUser();

        if (!self || !self.username) {
            throw new Error("Unauthorized");
        }

        const user = db.user.findUnique({
            where: {
                externalUserId: self.id,
            },
        });

        if (!user) {
            throw new Error("Not found");
        }

        return user;
    } catch (error: any) {
        console.log(error);

        return null;
    }
};

export const getSelfByUSername = async (username: string) => {
    try {
        const self = await currentUser();

        if (!self || !self.username) {
            throw new Error("Unauthorized");
        }

        const user = await db.user.findUnique({
            where: { username },
        });

        if (!user) {
            throw new Error("User not found");
        }

        if (self.username !== user.username) {
            throw new Error("Unauthorized");
        }

        return user;
    } catch (error: any) {
        console.log(error);

        return null;
    }
};

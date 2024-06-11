"use server";

import { getSelf } from "@/lib/authService";
import { db } from "@/lib/db";
import { User } from "@prisma/client";
import { revalidatePath } from "next/cache";

export async function updateUser(values: Partial<User>) {
    try {
        const self = await getSelf();

        if (!self) {
            throw new Error("Unauthorized");
        }

        const validData = {
            bio: values.bio,
        };

        const user = await db.user.update({
            where: { id: self.id },
            data: { ...validData },
        });

        revalidatePath(`/${self.username}`);
        revalidatePath(`/u/${self.username}`);

        return user;
    } catch (error: any) {
        console.log(error.message);

        throw new Error(error.message);
    }
}

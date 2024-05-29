"use server";

import { revalidatePath } from "next/cache";
import { db } from "@/lib/db";
import { Stream } from "@prisma/client";
import { getSelf } from "@/lib/authService";

export async function updateStream(values: Partial<Stream>) {
    try {
        const self = await getSelf();

        if (!self) {
            throw new Error("Anauthorized");
        }

        const selfStream = await db.stream.findUnique({
            where: {
                userId: self.id,
            },
        });

        if (!selfStream) {
            throw new Error("Stream not found");
        }

        const validData = {
            name: values.name,
            isChatEnabled: values.isChatEnabled,
            isChatDelayed: values.isChatDelayed,
            isChatFollowersOnly: values.isChatFollowersOnly,
        };

        const stream = await db.stream.update({
            where: {
                id: selfStream.id,
            },
            data: {
                ...validData,
            },
        });

        revalidatePath(`/${self.username}`);
        revalidatePath(`/u/${self.username}`);
        revalidatePath(`/u/${self.username}/chat`);

        return stream;
    } catch (error: any) {
        throw new Error(error.message);
    }
}

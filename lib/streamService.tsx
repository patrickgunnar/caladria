import { db } from "./db";

export async function getStreamByUserId(userId: string) {
    try {
        const stream = await db.stream.findUnique({
            where: { userId },
        });

        if (!stream) {
            throw new Error("Stream not found");
        }

        return stream;
    } catch (error: any) {
        console.log(error);

        return null;
    }
}

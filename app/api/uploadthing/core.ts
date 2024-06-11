import { getSelf } from "@/lib/authService";
import { db } from "@/lib/db";
import { createUploadthing, type FileRouter } from "uploadthing/next";

const f = createUploadthing();

// FileRouter for your app, can contain multiple FileRoutes
export const ourFileRouter = {
    thumbnailUploader: f({
        image: { maxFileSize: "4MB", maxFileCount: 1 },
    })
        .middleware(async () => {
            const self = await getSelf();

            return { user: self };
        })
        .onUploadComplete(async ({ metadata, file }) => {
            if (metadata && metadata.user) {
                await db.stream.update({
                    where: { userId: metadata.user.id },
                    data: {
                        thumbnailUrl: file.url,
                    },
                });

                return { fileUrl: file.url };
            }

            return { fileUrl: null };
        }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;

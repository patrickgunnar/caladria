"use server";

import { v4 } from "uuid";
import { AccessToken } from "livekit-server-sdk";
import { getSelf } from "@/lib/authService";
import { getUserByID } from "@/lib/userService";
import { isBlockedByUser } from "@/lib/blockService";
import { User } from "@prisma/client";

type SelfType = { id: string; username: string } | null;

export async function createViewerToken(hostIdentity: string) {
    try {
        let self: User | SelfType = await getSelf();

        if (!self) {
            self = {
                id: v4(),
                username: `guest#${Math.floor(Math.random() * 1000)}`,
            };
        }

        const host = await getUserByID(hostIdentity);

        if (!host) {
            throw new Error("User not found");
        }

        const isBlocked = await isBlockedByUser(host.id);

        if (isBlocked) {
            throw new Error("User is blocked");
        }

        const isHost = self.id === host.id;
        const token = new AccessToken(
            process.env.LIVEKIT_API_KEY!,
            process.env.LIVEKIT_API_SECRET!,
            {
                identity: isHost ? `host-${self.id}` : self.id,
                name: self.username,
            }
        );

        token.addGrant({
            room: host.id,
            roomJoin: true,
            canPublish: false,
            canPublishData: true,
        });

        return await Promise.resolve(token.toJwt());
    } catch (error: any) {
        console.log(error);

        return null;
    }
}

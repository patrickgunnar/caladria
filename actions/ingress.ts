"use server";

import {
    IngressAudioEncodingPreset,
    IngressInput,
    IngressClient,
    IngressVideoEncodingPreset,
    RoomServiceClient,
    type CreateIngressOptions,
    TrackSource,
    IngressVideoOptions,
    IngressAudioOptions,
} from "livekit-server-sdk";
import { db } from "@/lib/db";
import { getSelf } from "@/lib/authService";
import { revalidatePath } from "next/cache";

const roomService = new RoomServiceClient(
    process.env.LIVEKIT_API_URL!,
    process.env.LIVEKIT_API_KEY!,
    process.env.LIVEKIT_API_SECRET!
);

const ingressClient = new IngressClient(process.env.LIVEKIT_API_URL!);

export async function resetIngresses(hostIdentity: string) {
    try {
        const ingresses = await ingressClient.listIngress({
            roomName: hostIdentity,
        });

        const rooms = await roomService.listRooms([hostIdentity]);

        for (const room of rooms) {
            await roomService.deleteRoom(room.name);
        }

        for (const ingress of ingresses) {
            if (ingress.ingressId) {
                await ingressClient.deleteIngress(ingress.ingressId);
            }
        }
    } catch (error: any) {
        console.log(error.message);
    }
}

export async function createIngress(ingressType: IngressInput) {
    try {
        const self = await getSelf();

        if (!self) {
            throw new Error("Unauthorized");
        }

        // reset previous ingress
        await resetIngresses(self.id);

        const options: CreateIngressOptions = {
            name: self.username,
            roomName: self.id,
            participantName: self.username,
            participantIdentity: self.id,
        };

        if (ingressType === IngressInput.WHIP_INPUT) {
            options.enableTranscoding = true;
        } else {
            options.video = new IngressVideoOptions({
                source: TrackSource.SCREEN_SHARE,
                encodingOptions: {
                    case: "preset",
                    value: IngressVideoEncodingPreset.H264_1080P_30FPS_3_LAYERS,
                },
            });

            options.audio = new IngressAudioOptions({
                source: TrackSource.MICROPHONE,
                encodingOptions: {
                    case: "preset",
                    value: IngressAudioEncodingPreset.OPUS_STEREO_96KBPS,
                },
            });
        }

        const ingress = await ingressClient.createIngress(ingressType, options);

        if (!ingress || !ingress.url || !ingress.streamKey) {
            throw new Error("Failed to create ingress");
        }

        await db.stream.update({
            where: { userId: self.id },
            data: {
                ingressId: ingress.ingressId,
                serverUrl: ingress.url,
                streamKey: ingress.streamKey,
            },
        });

        revalidatePath(`/u/${self.username}/keys`);

        return JSON.stringify(ingress);
    } catch (error: any) {
        console.log(error.message);

        return null;
    }
}

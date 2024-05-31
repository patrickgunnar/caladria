import { headers } from "next/headers";
import { WebhookReceiver } from "livekit-server-sdk";
import { db } from "@/lib/db";

const receiver = new WebhookReceiver(
    process.env.LIVEKIT_API_KEY!,
    process.env.LIVEKIT_API_SECRET!
);

export async function POST(req: Request) {
    const body = await req.text();
    const headerPayload = headers();
    const authorization = headerPayload.get("Authorization");

    if (!authorization) {
        return new Response("No authorization header", { status: 400 });
    }

    try {
        const event = await receiver.receive(body, authorization);

        if (
            event.event === "ingress_ended" ||
            event.event === "ingress_started"
        ) {
            const isEventStarted = event.event === "ingress_started";

            await db.stream.update({
                where: {
                    ingressId: event.ingressInfo?.ingressId,
                },
                data: {
                    isLive: isEventStarted,
                },
            });
        }

        return new Response("Event processed successfully", { status: 200 });
    } catch (error: any) {
        console.log(error);

        return new Response(`Error processing event: ${error.message}`, {
            status: 500,
        });
    }
}

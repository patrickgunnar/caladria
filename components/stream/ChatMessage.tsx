"use client";

import { stringColor } from "@/lib/utils";
import { ReceivedChatMessage } from "@livekit/components-react";
import { format } from "date-fns";

interface ChatMessageProps {
    data: ReceivedChatMessage;
}

export default function ChatMessage({ data }: ChatMessageProps) {
    const color = stringColor(data.from?.name ?? "");

    return (
        <div className="flex gap-2 rounded-md p-2 hover:bg-white/5">
            <p className="text-sm text-white/40">
                {format(data.timestamp, "HH:MM")}
            </p>
            <div className="flex flex-wrap gap-1 items-baseline grow">
                <p className="font-semibold text-sm whitespace-nowrap">
                    <span className="truncate" style={{ color }}>
                        {data.from?.name}
                    </span>:
                </p>
                <p className="text-sm break-all">{data.message}</p>
            </div>
        </div>
    );
}

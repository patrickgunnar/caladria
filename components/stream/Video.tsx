"use client";

import { ConnectionState, Track } from "livekit-client";
import {
    useConnectionState,
    useRemoteParticipant,
    useTracks,
} from "@livekit/components-react";
import OfflineVideo from "./OfflineVideo";
import LoadingVideo from "./LoadingVideo";
import LiveVideo from "./LiveVideo";
import { Skeleton } from "../ui/skeleton";

interface VideoProps {
    hostName: string;
    hostIdentity: string;
}

export default function Video({ hostName, hostIdentity }: VideoProps) {
    const connectionState = useConnectionState();
    const participant = useRemoteParticipant(hostIdentity);
    const tracks = useTracks([
        Track.Source.ScreenShare,
        Track.Source.Microphone,
    ]).filter((t) => t.participant.identity === hostIdentity);

    let content: React.ReactNode;

    if (!participant && connectionState === ConnectionState.Connected) {
        content = <OfflineVideo username={hostName} />;
    } else if (!participant || tracks.length === 0) {
        content = <LoadingVideo label={connectionState} />;
    } else {
        content = <LiveVideo participant={participant} />;
    }

    return (
        <div className="relative group border-b border-[#393939] aspect-video">
            {content}
        </div>
    );
}

export function VideoSkeleton() {
    return (
        <div className="aspect-video border-x border border-[#393939]">
            <Skeleton className="rounded-none h-full w-full" />
        </div>
    );
}

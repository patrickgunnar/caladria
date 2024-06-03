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
        <div className="relative group border-b aspect-video">{content}</div>
    );
}

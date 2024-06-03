"use client";

import { Participant, Track } from "livekit-client";
import { useRef } from "react";
import { useTracks } from "@livekit/components-react";

interface LiveVideoProps {
    participant: Participant;
}

export default function LiveVideo({ participant }: LiveVideoProps) {
    const videoRef = useRef<HTMLVideoElement>(null);
    const wrapperRef = useRef<HTMLDivElement>(null);

    useTracks([
        Track.Source.ScreenShare,
        Track.Source.Microphone,
    ])
        .filter((t) => t.participant.identity === participant.identity)
        .forEach((t) => {
            if (videoRef.current) {
                t.publication.track?.attach(videoRef.current);
            }
        });

    return (
        <div ref={wrapperRef} className="relative flex h-full">
            <video ref={videoRef} playsInline autoPlay width="100%" />
        </div>
    );
}

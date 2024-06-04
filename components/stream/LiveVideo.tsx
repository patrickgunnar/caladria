"use client";

import { Participant, Track } from "livekit-client";
import { useEffect, useRef, useState } from "react";
import { useTracks } from "@livekit/components-react";
import FullScreenControl from "./FullScreenControl";
import { useEventListener } from "usehooks-ts";
import VolumeControl from "./VolumeControl";

interface LiveVideoProps {
    participant: Participant;
}

export default function LiveVideo({ participant }: LiveVideoProps) {
    const videoRef = useRef<HTMLVideoElement>(null);
    const wrapperRef = useRef<HTMLDivElement>(null);

    const [isFullScreen, setIsFullScreen] = useState<boolean>(false);
    const [volume, setVolume] = useState<number>(100);

    useTracks([Track.Source.ScreenShare, Track.Source.Microphone])
        .filter((t) => t.participant.identity === participant.identity)
        .forEach((t) => {
            if (videoRef.current) {
                t.publication.track?.attach(videoRef.current);
            }
        });

    const toggleFullScreen = () => {
        if (isFullScreen) {
            document.exitFullscreen();
        } else if (wrapperRef.current) {
            wrapperRef.current.requestFullscreen();
        }
    };

    const handleVolumeChange = (value: number) => {
        setVolume(+value);

        if (videoRef.current) {
            videoRef.current.muted = value === 0;
            videoRef.current.volume = +value * 0.01;
        }
    };

    const toggleMute = () => {
        const isMuted = volume === 0;

        setVolume(isMuted ? 50 : 0);

        if (videoRef.current) {
            videoRef.current.muted = !isMuted;
            videoRef.current.volume = isMuted ? 0.5 : 0;
        }
    };

    const handleFullScreenChange = () => {
        const isCurrentFullScreen = document.fullscreenElement !== null;
        setIsFullScreen(isCurrentFullScreen);
    };

    useEventListener("fullscreenchange", handleFullScreenChange, wrapperRef);

    useEffect(() => {
        handleVolumeChange(100);
    }, []);

    return (
        <div ref={wrapperRef} className="relative flex h-full">
            <video ref={videoRef} width="100%" />
            <div className="absolute opacity-0 top-0 h-full w-full hover:opacity-100 hover:transition-all">
                <div className="absolute flex items-center justify-between bg-gradient-to-t from-neutral-900 px-4 bottom-0 h-14 w-full">
                    <VolumeControl
                        value={volume}
                        onChange={handleVolumeChange}
                        onToggle={toggleMute}
                    />
                    <FullScreenControl
                        isFullScreen={isFullScreen}
                        onToggle={toggleFullScreen}
                    />
                </div>
            </div>
        </div>
    );
}

"use client";

import {
    useParticipants,
    useRemoteParticipant,
} from "@livekit/components-react";
import UserAvatar, { UserAvatarSkeleton } from "../avatar/UserAvatar";
import VerifiedMark from "../marks/VerifiedMark";
import { UserIcon } from "lucide-react";
import Actions, { ActionsSkeleton } from "./Actions";
import { Skeleton } from "../ui/skeleton";

interface HeaderProps {
    hostName: string;
    hostIdentity: string;
    viewerIdentity: string;
    imageUrl: string;
    isFollowing: boolean;
    name: string;
}

export default function Header({
    hostName,
    hostIdentity,
    imageUrl,
    viewerIdentity,
    isFollowing,
    name,
}: HeaderProps) {
    const participants = useParticipants();
    const participant = useRemoteParticipant(hostIdentity);
    const participantCount = participants.length - 1;
    const isLive = !!participant;
    const hostAsViewer = `host-${hostIdentity}`;
    const isHost = viewerIdentity === hostAsViewer;

    return (
        <div className="flex flex-col gap-y-4 items-start justify-between px-4 lg:flex-row lg:gap-y-0">
            <div className="flex items-center gap-x-3">
                <UserAvatar
                    imageUrl={imageUrl}
                    username={hostName}
                    size="lg"
                    isLive={isLive}
                    showBadge
                />
                <div className="space-y-1">
                    <div className="flex gap-x-2 items-center">
                        <h2 className="font-semibold text-lg">@{hostName}</h2>
                        <VerifiedMark />
                    </div>
                    <p className="font-semibold text-sm">{name}</p>
                    {isLive && (
                        <div className="flex gap-x-1 items-center font-semibold text-xs text-orange-500">
                            <UserIcon className="h-4 w-4" />
                            <p>
                                {participantCount}{" "}
                                {participantCount === 1 ? "viewer" : "viewer"}
                            </p>
                        </div>
                    )}
                    {!isLive && (
                        <p className="font-semibold text-xs text-muted-foreground">
                            Offline
                        </p>
                    )}
                </div>
            </div>
            <Actions
                hostIdentity={hostIdentity}
                isFollowing={isFollowing}
                isHost={isHost}
            />
        </div>
    );
}

export function HeaderSkeleton() {
    return (
        <div className="flex flex-col gap-y-4 items-start justify-between px-4 lg:flex-row lg:gap-y-0">
            <div className="flex items-center gap-x-3">
                <UserAvatarSkeleton size="lg" />
                <div className="space-y-2">
                    <Skeleton className="h-6 w-32" />
                    <Skeleton className="h-4 w-24" />
                </div>
            </div>
            <ActionsSkeleton />
        </div>
    );
}

"use client";

import VerifiedMark from "../marks/VerifiedMark";
import BioModel from "./BioModel";

interface AboutCardProps {
    hostName: string;
    hostIdentity: string;
    viewerIdentity: string;
    bio: string | null;
    followedByCount: number;
}

export default function AboutCard({
    hostName,
    hostIdentity,
    viewerIdentity,
    bio,
    followedByCount,
}: AboutCardProps) {
    const hostViewer = `host-${hostIdentity}`;
    const isHost = viewerIdentity === hostViewer;
    const followedByLabel = followedByCount === 1 ? "follower" : "followers";

    return (
        <div className="px-4">
            <div className="group flex gap-y-3 flex-col bg-[#333333] rounded-xl p-6 lg:p-10">
                <div className="flex items-center justify-between">
                    <div className="flex gap-x-2 items-center font-semibold text-lg lg:text-2xl">
                        About @{hostName}
                        <VerifiedMark />
                    </div>
                    {isHost && <BioModel initialValue={bio} />}
                </div>
                <div className="text-sm text-muted-foreground">
                    <span className="font-semibold text-inherit">
                        {followedByCount}
                    </span>{" "}
                    {followedByLabel}
                </div>
                <p className="text-sm">
                    {bio ?? "This user does not have a bio."}
                </p>
            </div>
        </div>
    );
}

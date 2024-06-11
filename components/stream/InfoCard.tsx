"use client";

import { Pencil } from "lucide-react";
import { Separator } from "../ui/separator";
import Image from "next/image";
import InfoModel from "./InfoModel";

interface InfoCardProps {
    hostIdentity: string;
    viewerIdentity: string;
    name: string;
    thumbnail: string | null;
}

export default function InfoCard({
    hostIdentity,
    name,
    thumbnail,
    viewerIdentity,
}: InfoCardProps) {
    const hostAsViewer = `host-${hostIdentity}`;
    const isHost = viewerIdentity === hostAsViewer;

    if (!isHost) {
        return null;
    }

    return (
        <div className="px-4">
            <div className="bg-[#333333] rounded-xl">
                <div className="flex gap-x-2.5 items-center p-4">
                    <div className="bg-[#FF7F00] rounded-md p-2 h-auto w-auto">
                        <Pencil className="h-5 w-5" />
                    </div>
                    <div>
                        <h2 className="font-semibold text-sm capitalize lg:text-lg">
                            Edit your stream info
                        </h2>
                        <p className="text-xs text-muted-foreground lg:text-sm">
                            Maximize your visibility
                        </p>
                    </div>
                    <InfoModel
                        initialName={name}
                        initialThumbnail={thumbnail}
                    />
                </div>
                <Separator className="bg-[#444444]" />
                <div className="space-y-4 p-4 lg:p-6">
                    <div>
                        <h3 className="text-sm text-muted-foreground mb-2">
                            Name
                        </h3>
                        <p className="font-semibold text-sm">{name}</p>
                    </div>
                    <div>
                        <h3 className="text-sm text-muted-foreground mb-2">
                            Thumbnail
                        </h3>
                        {thumbnail && (
                            <div className="relative aspect-video border border-[#393939] rounded-md overflow-hidden w-[200px]">
                                <Image
                                    src={thumbnail}
                                    alt={`${name} thumbnail`}
                                    className="object-cover"
                                    fill
                                />
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

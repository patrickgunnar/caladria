"use client";

import { useParticipants } from "@livekit/components-react";
import { useMemo, useState } from "react";
import { useDebounceValue } from "usehooks-ts";
import { Input } from "../ui/input";
import { ScrollArea } from "../ui/scroll-area";
import CommunityItem from "./CommunityItem";
import { LocalParticipant, RemoteParticipant } from "livekit-client";

interface ChatCommunityProps {
    viewerName: string;
    hostName: string;
    isHidden: boolean;
}

export default function ChatCommunity({
    viewerName,
    hostName,
    isHidden,
}: ChatCommunityProps) {
    const [value, setValue] = useState<string>("");

    const participants = useParticipants();
    const [debouncedValue] = useDebounceValue<string>(value, 500);

    const onChange = (val: string) => {
        setValue(val);
    };

    const filteredParticipants = useMemo(() => {
        const deduced = participants.reduce((acc, participant) => {
            const hostViewer = `host-${participant.identity}`;

            if (!acc.some((p) => p.identity === hostViewer)) {
                acc.push(participant);
            }

            return acc;
        }, [] as (RemoteParticipant | LocalParticipant)[]);

        return deduced.filter((participant) => {
            return participant.name
                ?.toLowerCase()
                .includes(debouncedValue.toLowerCase());
        });
    }, [participants, debouncedValue]);

    if (isHidden) {
        return (
            <div className="flex flex-1 items-center justify-center">
                <p className="text-sm text-muted-foreground">
                    Community is disabled
                </p>
            </div>
        );
    }

    return (
        <div className="p-4">
            <Input
                onChange={(e) => onChange(e.target.value)}
                placeholder="Search community"
                className="bg-[#333333] border border-white/10 text-inherit"
            />
            <ScrollArea className="gap-y-2 mt-4">
                <p className="hidden text-sm text-center text-muted-foreground p-2 last:block">
                    No results
                </p>
                {filteredParticipants.map(({ identity, name }) => {
                    return (
                        <CommunityItem
                            key={identity}
                            participantName={name}
                            participantIdentity={identity}
                            hostName={hostName}
                            viewerName={viewerName}
                        />
                    );
                })}
            </ScrollArea>
        </div>
    );
}

import { useMemo } from "react";
import { Info } from "lucide-react";
import Hint from "../hint/Hint";

interface ChatInfoProps {
    isDelayed: boolean;
    isFollowersOnly: boolean;
}

export default function ChatInfo({
    isDelayed,
    isFollowersOnly,
}: ChatInfoProps) {
    const hint = useMemo(() => {
        if (isFollowersOnly && !isDelayed) {
            return "Only followers can chat";
        } else if (isDelayed && !isFollowersOnly) {
            return "Messages are delayed by 5 seconds";
        } else if (isDelayed && isFollowersOnly) {
            return "Only followers can chat. Messages are delayed by 5 seconds";
        } else {
            return "";
        }
    }, [isDelayed, isFollowersOnly]);

    const label = useMemo(() => {
        if (isFollowersOnly && !isDelayed) {
            return "Followers only";
        } else if (isDelayed && !isFollowersOnly) {
            return "Slow mode";
        } else if (isDelayed && isFollowersOnly) {
            return "Followers only and slow mode";
        } else {
            return "";
        }
    }, [isDelayed, isFollowersOnly]);

    if (!isDelayed && !isFollowersOnly) return null;

    return (
        <div className="flex gap-x-2 items-center bg-[#444444] border border-white/5 rounded-t-md text-muted-foreground p-2 w-full">
            <Hint label={hint}>
                <Info className="h-4 w-4" />
            </Hint>
            <p className="font-semibold text-sm">{label}</p>
        </div>
    );
}

import { cn } from "@/lib/utils";

interface LiveBadgeProps {
    className?: string;
}

export default function LiveBadge({ className }: LiveBadgeProps) {
    return (
        <div
            className={cn(
                "bg-[#FF6600] border border-[#FF9900] font-medium text-center text-[#E8E8E8] text-[10px] rounded-md uppercase tracking-wide p-0.5 px-1.5",
                className
            )}
        >
            Live
        </div>
    );
}

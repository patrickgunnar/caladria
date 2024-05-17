import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "../ui/tooltip";

interface HintProps {
    children: React.ReactNode;
    label: string;
    asChild?: boolean;
    side?: "top" | "bottom" | "left" | "right";
    align?: "start" | "center" | "end";
}

export default function Hint({
    children,
    label,
    asChild,
    side,
    align,
}: HintProps) {
    return (
        <TooltipProvider>
            <Tooltip delayDuration={0}>
                <TooltipTrigger asChild={asChild}>{children}</TooltipTrigger>
                <TooltipContent
                    className="bg-[#111111a7] text-[#E8E8E8] border border-[#222222]"
                    side={side}
                    align={align}
                >
                    <p className="font-medium text-xs">{label}</p>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    );
}

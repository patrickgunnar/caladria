"use client";

import { ArrowLeft, ArrowRight } from "lucide-react";
import Hint from "../hint/Hint";
import { Button } from "../ui/button";
import { Skeleton } from "../ui/skeleton";

interface SidebarToggleProps {
    title: string;
    hintLabel: string;
    collapsedState: boolean;
    onExpand: () => void;
    onCollapsed: () => void;
}

export default function SidebarToggle({
    title,
    hintLabel,
    collapsedState,
    onCollapsed,
    onExpand,
}: SidebarToggleProps) {
    return (
        <>
            {collapsedState && (
                <div className="hidden lg:flex items-center justify-center text-[#E8E8E8] pt-4 mb-4 w-full">
                    <Hint label={hintLabel} side="right" asChild>
                        <Button
                            variant="orangeGhost"
                            className="p-2 h-auto"
                            onClick={onExpand}
                        >
                            <ArrowRight className="h-4 w-4" />
                        </Button>
                    </Hint>
                </div>
            )}
            {!collapsedState && (
                <div className="flex items-center text-[#E8E8E8] p-3 pl-6 mb-2 w-full">
                    <p className="font-medium text-xs text-left w-full">
                        {title}
                    </p>
                    <Hint label={hintLabel} side="right" asChild>
                        <Button
                            className="p-2 ml-auto h-auto"
                            variant="orangeGhost"
                            onClick={onCollapsed}
                        >
                            <ArrowLeft className="h-4 w-4" />
                        </Button>
                    </Hint>
                </div>
            )}
        </>
    );
}

export function SidebarToggleSkeleton() {
    return (
        <div className="hidden lg:flex items-center justify-between p-3 pl-6 mb-2 w-full">
            <Skeleton className="h-6 w-32" />
            <Skeleton className="h-6 w-6" />
        </div>
    );
}

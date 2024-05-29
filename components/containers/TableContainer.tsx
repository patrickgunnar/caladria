"use client";

import { cn } from "@/lib/utils";
import { useEffect } from "react";
import { useMediaQuery } from "usehooks-ts";

interface TableContainerProps {
    children: React.ReactNode;
    collapsedState: boolean;
    onCollapsed: () => void;
    onExpand: () => void;
}

export default function TableContainer({
    children,
    collapsedState,
    onCollapsed,
    onExpand,
}: TableContainerProps) {
    const matches = useMediaQuery("(max-width: 1024px)");

    useEffect(() => {
        if (matches) {
            onCollapsed();
        } else {
            onExpand();
        }
    }, [matches, onCollapsed, onExpand]);

    return (
        <div
            className={cn(
                "flex-1",
                collapsedState ? "ml-[70px]" : "ml-[70px] lg:ml-60"
            )}
        >
            {children}
        </div>
    );
}

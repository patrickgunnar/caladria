"use client";

import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

interface SidebarWrapperProps {
    children: React.ReactNode;
    collapsedState: boolean;
    Skeleton?: React.ComponentType;
}

export default function SidebarWrapper({
    children,
    collapsedState,
    Skeleton,
}: SidebarWrapperProps) {
    const [isClientSide, setIsClientSide] = useState<boolean>(false);

    useEffect(() => {
        setIsClientSide(true);
    }, []);

    if (!isClientSide) {
        return Skeleton ? <Skeleton /> : null;
    }

    return (
        <aside
            className={cn(
                "fixed flex flex-col bg-[#333333] border-0 border-r-[1px] border-[#393939] top-16 left-0 h-full z-50",
                collapsedState ? "w-[70px]" : "w-60"
            )}
        >
            {children}
        </aside>
    );
}

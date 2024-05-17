"use client";

import { cn } from "@/lib/utils";
import { useSidebar } from "@/store/useSidebar";
import { useEffect } from "react";
import { useMediaQuery } from "usehooks-ts";

interface ContainerProps {
    children: React.ReactNode;
}

export default function Container({ children }: ContainerProps) {
    const matches = useMediaQuery("(max-width: 1024px)");
    const { collapsed, onCollapsed, onExpand } = useSidebar((state) => state);

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
                collapsed ? "ml-[70px]" : "ml-[70px] lg:ml-60"
            )}
        >
            {children}
        </div>
    );
}

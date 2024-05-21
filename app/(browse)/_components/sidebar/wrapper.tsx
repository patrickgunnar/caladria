"use client";

import { cn } from "@/lib/utils";
import { useSidebar } from "@/store/useSidebar";
import { useEffect, useState } from "react";
import SidebarSkeleton from "./SidebarSkeleton";

interface WrapperProps {
    children: React.ReactNode;
}

export default function Wrapper({ children }: WrapperProps) {
    const [isClientSide, setIsClientSide] = useState<boolean>(false);
    const { collapsed } = useSidebar((state) => state);

    useEffect(() => {
        setIsClientSide(true);
    }, []);

    if (!isClientSide) {
        return <SidebarSkeleton />;
    }

    return (
        <aside
            className={cn(
                "fixed flex flex-col bg-[#333333] border-0 border-r-[1px] border-[#393939] top-16 left-0 h-full z-50",
                collapsed ? "w-[70px]" : "w-60"
            )}
        >
            {children}
        </aside>
    );
}

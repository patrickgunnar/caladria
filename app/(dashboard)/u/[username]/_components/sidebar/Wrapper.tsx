"use client";

import { useCreatorSidebar } from "@/store/useCreatorSidebar";
import { cn } from "@/lib/utils";

interface WrapperProps {
    children: React.ReactNode;
}

export default function Wrapper({ children }: WrapperProps) {
    const { collapsed } = useCreatorSidebar((state) => state);

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

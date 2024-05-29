"use client";

import SidebarWrapper from "@/components/wrappers/SidebarWrapper";
import { useSidebar } from "@/store/useSidebar";
import LocalSidebarSkeleton from "./LocalSidebarSkeleton";

interface WrapperProps {
    children: React.ReactNode;
}

export default function LocalWrapper({ children }: WrapperProps) {
    const { collapsed } = useSidebar((state) => state);

    return (
        <SidebarWrapper collapsedState={collapsed} Skeleton={LocalSidebarSkeleton}>
            {children}
        </SidebarWrapper>
    );
}

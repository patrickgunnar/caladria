"use client";

import { useCreatorSidebar } from "@/store/useCreatorSidebar";
import SidebarWrapper from "@/components/wrappers/SidebarWrapper";
import LocalSidebarSkeleton from "./LocalSidebarSkeleton";

interface WrapperProps {
    children: React.ReactNode;
}

export default function LocalWrapper({ children }: WrapperProps) {
    const { collapsed } = useCreatorSidebar((state) => state);

    return (
        <SidebarWrapper collapsedState={collapsed} Skeleton={LocalSidebarSkeleton}>{children}</SidebarWrapper>
    );
}

"use client";

import SidebarToggle, {
    SidebarToggleSkeleton,
} from "@/components/toggles/SidebarToggle";
import { useCreatorSidebar } from "@/store/useCreatorSidebar";

export default function LocalToggle() {
    const { collapsed, onExpand, onCollapsed } = useCreatorSidebar(
        (state) => state
    );

    const label = collapsed ? "Expand" : "Collapse";

    return (
        <SidebarToggle
            title="Dashboard"
            hintLabel={label}
            collapsedState={collapsed}
            onCollapsed={onCollapsed}
            onExpand={onExpand}
        />
    );
}

export function LocalToggleSkeleton() {
    return <SidebarToggleSkeleton />;
}

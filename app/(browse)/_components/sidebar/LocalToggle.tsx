"use client";

import SidebarToggle, {
    SidebarToggleSkeleton,
} from "@/components/toggles/SidebarToggle";
import { useSidebar } from "@/store/useSidebar";

export default function LocalToggle() {
    const { collapsed, onExpand, onCollapsed } = useSidebar((state) => state);

    const label = collapsed ? "Expand" : "Collapse";

    return (
        <SidebarToggle
            title="Recommended for you"
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

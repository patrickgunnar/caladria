"use client";

import TableContainer from "@/components/containers/TableContainer";
import { useSidebar } from "@/store/useSidebar";

interface ContainerProps {
    children: React.ReactNode;
}

export default function LocalContainer({ children }: ContainerProps) {
    const { collapsed, onCollapsed, onExpand } = useSidebar((state) => state);

    return (
        <TableContainer
            collapsedState={collapsed}
            onCollapsed={onCollapsed}
            onExpand={onExpand}
        >
            {children}
        </TableContainer>
    );
}

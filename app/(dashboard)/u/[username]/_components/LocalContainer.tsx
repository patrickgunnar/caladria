"use client";

import TableContainer from "@/components/containers/TableContainer";
import { useCreatorSidebar } from "@/store/useCreatorSidebar";

interface ContainerProps {
    children: React.ReactNode;
}

export default function LocalContainer({ children }: ContainerProps) {
    const { collapsed, onCollapsed, onExpand } = useCreatorSidebar(
        (state) => state
    );

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

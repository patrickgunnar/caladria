"use client";

import Hint from "@/components/hint/Hint";
import { Button } from "@/components/ui/button";
import { useCreatorSidebar } from "@/store/useCreatorSidebar";
import { ArrowLeft, ArrowRight } from "lucide-react";

export default function Toggle() {
    const { collapsed, onExpand, onCollapsed } = useCreatorSidebar(
        (state) => state
    );

    const label = collapsed ? "Expand" : "Collapse";

    return (
        <>
            {collapsed && (
                <div className="hidden lg:flex items-center justify-center pt-4 mb-4 w-full">
                    <Hint label={label} side="right" asChild>
                        <Button
                            onClick={onExpand}
                            variant="orangeGhost"
                            className="p-2 h-auto"
                        >
                            <ArrowRight className="h-4 w-4" />
                        </Button>
                    </Hint>
                </div>
            )}
            {!collapsed && (
                <div className="hidden lg:flex items-center text-[#E8E8E8] p-3 pl-6 mb-2 w-full">
                    <p className="font-medium text-xs text-left w-full">Dashboard</p>
                    <Hint label={label} side="right" asChild>
                        <Button
                            onClick={onCollapsed}
                            variant="orangeGhost"
                            className="p-2 h-auto"
                        >
                            <ArrowLeft className="h-4 w-4" />
                        </Button>
                    </Hint>
                </div>
            )}
        </>
    );
}

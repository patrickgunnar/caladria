"use client";

import Hint from "@/components/hint/Hint";
import { Button } from "@/components/ui/button";
import { useSidebar } from "@/store/useSidebar";
import { ArrowLeft, ArrowRight } from "lucide-react";

export default function Toggle() {
    const { collapsed, onExpand, onCollapsed } = useSidebar((state) => state);

    const label = collapsed ? "Expand" : "Collapse";

    return (
        <>
            {collapsed && (
                <div className="hidden lg:flex items-center justify-center text-[#E8E8E8] pt-4 mb-4 w-full">
                    <Hint label={label} side="right" asChild>
                        <Button
                            variant="orangeGhost"
                            className="p-2 h-auto"
                            onClick={onExpand}
                        >
                            <ArrowRight className="h-4 w-4" />
                        </Button>
                    </Hint>
                </div>
            )}
            {!collapsed && (
                <div className="flex items-center text-[#E8E8E8] p-3 pl-6 mb-2 w-full">
                    <p className="font-medium text-xs text-left w-full">
                        Recommended for you
                    </p>
                    <Hint label={label} side="right" asChild>
                        <Button
                            className="p-2 ml-auto h-auto"
                            variant="orangeGhost"
                            onClick={onCollapsed}
                        >
                            <ArrowLeft className="h-4 w-4" />
                        </Button>
                    </Hint>
                </div>
            )}
        </>
    );
}

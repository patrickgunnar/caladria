"use client";

import { ArrowLeft, ArrowRight } from "lucide-react";
import Hint from "../hint/Hint";
import { Button } from "../ui/button";
import { useChatSidebar } from "@/store/useChatSidebar";

export default function ChatToggle() {
    const { collapsed, onExpand, onCollapsed } = useChatSidebar(
        (state) => state
    );

    const Icon = collapsed ? ArrowLeft : ArrowRight;
    const label = collapsed ? "Expand" : "Collapse";

    const onToggle = () => {
        collapsed ? onExpand() : onCollapsed();
    };

    return (
        <Hint label={label} side="left" asChild>
            <Button
                onClick={onToggle}
                variant="orangeGhost"
                className="p-2 h-auto"
            >
                <Icon className="h-4 w-4" />
            </Button>
        </Hint>
    );
}

"use client";

import { MessageSquare, Users } from "lucide-react";
import Hint from "../hint/Hint";
import { Button } from "../ui/button";
import { ChatVariant, useChatSidebar } from "@/store/useChatSidebar";

export default function VariantToggle() {
    const { variant, onChangeVariant } = useChatSidebar((state) => state);

    const isChat = variant === ChatVariant.CHAT;
    const Icon = isChat ? Users : MessageSquare;
    const label = isChat ? "Community" : "Back to chat";

    const onToggle = () => {
        const newVariant = isChat ? ChatVariant.COMMUNITY : ChatVariant.CHAT;

        onChangeVariant(newVariant);
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

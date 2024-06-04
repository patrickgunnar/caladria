"use client";

import { Maximize, Minimize } from "lucide-react";
import Hint from "../hint/Hint";

interface FullScreenControlProp {
    isFullScreen: boolean;
    onToggle: () => void;
}

export default function FullScreenControl({
    isFullScreen,
    onToggle,
}: FullScreenControlProp) {
    const Icon = isFullScreen ? Minimize : Maximize;
    const label = isFullScreen ? "Exit fullscreen" : "Enter fullscreen";

    return (
        <div className="flex gap-4 items-center justify-center">
            <Hint label={label} asChild>
                <button
                    title={label}
                    type="button"
                    className="text-white rounded-lg p-1.5 hover:bg-white/10"
                    onClick={onToggle}
                >
                    <Icon className="h-4 w-4" />
                </button>
            </Hint>
        </div>
    );
}

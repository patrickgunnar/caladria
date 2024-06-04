"use client";

import { Volume1, Volume2, VolumeX } from "lucide-react";
import Hint from "../hint/Hint";
import { Slider } from "../ui/slider";

interface VolumeControlProps {
    value: number;
    onToggle: () => void;
    onChange: (value: number) => void;
}

export default function VolumeControl({
    value,
    onToggle,
    onChange,
}: VolumeControlProps) {
    const isMuted = value === 0;
    const isAboveHalf = value > 50;
    const Icon = isMuted ? VolumeX : isAboveHalf ? Volume2 : Volume1;
    const label = isMuted ? "Unmute" : "Mute";

    const handleChange = (value: number[]) => {
        onChange(value[0]);
    };

    return (
        <div className="flex gap-2 items-center">
            <Hint label={label} asChild>
                <button
                    title={label}
                    type="button"
                    className="text-white rounded-lg p-1.5 hover:bg-white/10"
                    onClick={onToggle}
                >
                    <Icon className="h-6 w-6" />
                </button>
            </Hint>
            <Slider
                value={[value]}
                max={100}
                step={1}
                className="cursor-pointer w-[8rem]"
                onValueChange={handleChange}
            />
        </div>
    );
}

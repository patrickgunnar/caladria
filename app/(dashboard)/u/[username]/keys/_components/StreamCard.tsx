"use client";

import CopyButton from "@/components/buttons/CopyButton";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { HTMLInputTypeAttribute, useState } from "react";

interface StreamCardProps {
    title: string;
    placeholder: string;
    type?: HTMLInputTypeAttribute;
    value: string | null;
}

export default function StreamCardCard({
    title,
    placeholder,
    value,
    type = "text",
}: StreamCardProps) {
    const [showPassword, setShowPassword] = useState<boolean>(false);

    const onShowPassword = () => {
        setShowPassword((prev) => !prev);
    };

    return (
        <div className="bg-[#444444] rounded-xl p-6">
            <div className="flex gap-x-10 items-center">
                <p className="font-semibold shrink-0">{title}</p>
                <div className="space-y-2 w-full">
                    <div className="flex gap-x-2 items-center w-full">
                        <Input
                            value={value || ""}
                            placeholder={placeholder}
                            type={
                                type === "password"
                                    ? showPassword
                                        ? "text"
                                        : type
                                    : type
                            }
                            className="border-[#222222] text-[#e8e8e8] disabled:bg-[#333333]"
                            disabled
                        />
                        <CopyButton value={value || ""} />
                    </div>
                    {type === "password" && (
                        <Button
                            size="sm"
                            variant="grayGhost"
                            onClick={onShowPassword}
                        >
                            {showPassword ? "Hide" : "Show"}
                        </Button>
                    )}
                </div>
            </div>
        </div>
    );
}

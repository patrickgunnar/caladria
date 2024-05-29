"use client";

import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import { useTransition } from "react";
import { updateStream } from "@/actions/stream";

type FieldType = "isChatEnabled" | "isChatDelayed" | "isChatFollowersOnly";

interface ToggleCardProps {
    field: FieldType;
    label: string;
    value: boolean;
}

export default function ToggleCard({ field, label, value }: ToggleCardProps) {
    const [isPending, startTransition] = useTransition();

    const onChange = () => {
        startTransition(() => {
            updateStream({ [field]: !value })
                .then(() => toast.success("Chat settings updated!"))
                .catch((err: any) => toast.error(err.massage));
        });
    };

    return (
        <div className="bg-[#de8f5a62] rounded-xl p-6">
            <div className="flex items-center justify-between">
                <p className="font-medium shrink-0">{label}</p>
                <div className="space-y-2">
                    <Switch
                        checked={value}
                        onCheckedChange={onChange}
                        disabled={isPending}
                    >
                        {value ? "On" : "Off"}
                    </Switch>
                </div>
            </div>
        </div>
    );
}

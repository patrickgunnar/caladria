import { CheckCircle2 } from "lucide-react";

export default function VerifiedMark() {
    return (
        <div className="flex items-center justify-between p-0.5 h-5 w-5">
            <CheckCircle2 className="text-inherit stroke-[2px] h-full w-full" />
        </div>
    );
}

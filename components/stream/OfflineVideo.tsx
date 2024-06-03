import { WifiOff } from "lucide-react";

interface OfflineVideoProps {
    username: string;
}

export default function OfflineVideo({ username }: OfflineVideoProps) {
    return (
        <div className="flex flex-col items-center justify-center space-y-4 h-full">
            <WifiOff className="text-muted-foreground h-10 w-10" />
            <p className="text-muted-foreground">
                @<span className="font-semibold">{username}</span> is offline
            </p>
        </div>
    );
}

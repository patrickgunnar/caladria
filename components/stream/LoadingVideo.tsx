import { Loader } from "lucide-react";

interface LoadingVideoProps {
    label: string;
}

export default function LoadingVideo({ label }: LoadingVideoProps) {
    return (
        <div className="flex flex-col items-center justify-center space-y-4 h-full">
            <Loader className="animate-spin text-muted-foreground h-10 w-10" />
            <p className="capitalize text-muted-foreground">{label}</p>
        </div>
    );
}

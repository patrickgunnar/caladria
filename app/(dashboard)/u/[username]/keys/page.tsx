import StreamCard from "./_components/StreamCard";
import { getSelf } from "@/lib/authService";
import { redirect } from "next/navigation";
import { getStreamByUserId } from "@/lib/streamService";
import ConnectModal from "./_components/ConnectModal";

export default async function Page() {
    const self = await getSelf();

    if (!self) {
        redirect("/");
    }

    const stream = await getStreamByUserId(self.id);

    if (!stream) {
        redirect("/");
    }

    return (
        <div className="p-6">
            <div className="flex items-center justify-between mb-4">
                <h1 className="font-bold text-2xl">Keys & URLs</h1>
                <ConnectModal />
            </div>
            <div className="space-y-4">
                <StreamCard
                    title="Server URL"
                    placeholder="Server URL"
                    value={stream.serverUrl}
                />
                <StreamCard
                    title="Stream Key"
                    placeholder="Stream Key"
                    type="password"
                    value={stream.streamKey}
                />
            </div>
        </div>
    );
}

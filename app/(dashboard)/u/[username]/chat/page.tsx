import { getSelf } from "@/lib/authService";
import { getStreamByUserId } from "@/lib/streamService";
import { redirect } from "next/navigation";
import ToggleCard from "./_components/ToggleCard";

export default async function Page() {
    const self = await getSelf();

    if (!self) {
        redirect("/");
    }

    const stream = await getStreamByUserId(self.id);

    if (!stream) {
        redirect("/");
    }

    const { isChatEnabled, isChatDelayed, isChatFollowersOnly } = stream;

    return (
        <div className="p-6">
            <div className="mb-4 w-full">
                <h1 className="font-bold text-2xl">Chat Settings</h1>
            </div>
            <div className="space-y-4">
                <ToggleCard
                    field="isChatEnabled"
                    label="Enable chat"
                    value={isChatEnabled}
                />
                <ToggleCard
                    field="isChatDelayed"
                    label="Delay chat"
                    value={isChatDelayed}
                />
                <ToggleCard
                    field="isChatFollowersOnly"
                    label="Must be following to chat"
                    value={isChatFollowersOnly}
                />
            </div>
        </div>
    );
}

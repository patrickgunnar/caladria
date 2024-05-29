import { getRecommended } from "@/lib/recommendedService";
import Recommended from "./Recommended";
import { getFollowedUsers } from "@/lib/followService";
import Following from "./Following";
import LocalWrapper from "./LocalWrapper";
import LocalToggle from "./LocalToggle";

export default async function Sidebar() {
    const recommended = await getRecommended();
    const follows = await getFollowedUsers();

    return (
        <LocalWrapper>
            <LocalToggle />
            <div className="pt-4 space-y-4 lg:pt-0">
                <Following data={follows} />
                <Recommended data={recommended} />
            </div>
        </LocalWrapper>
    );
}

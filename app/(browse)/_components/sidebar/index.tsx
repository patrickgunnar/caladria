import { getRecommended } from "@/lib/recommendedService";
import Recommended from "./Recommended";
import Toggle from "./Toggle";
import Wrapper from "./wrapper";
import { getFollowedUsers } from "@/lib/followService";
import Following from "./Following";

export default async function Sidebar() {
    const recommended = await getRecommended();
    const follows = await getFollowedUsers();

    return (
        <Wrapper>
            <Toggle />
            <div className="pt-4 space-y-4 lg:pt-0">
                <Following data={follows} />
                <Recommended data={recommended} />
            </div>
        </Wrapper>
    );
}

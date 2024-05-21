import { getRecommended } from "@/lib/recommendedService";
import Recommended from "./Recommended";
import Toggle from "./Toggle";
import Wrapper from "./wrapper";

export default async function Sidebar() {
    const recommended = await getRecommended();

    return (
        <Wrapper>
            <Toggle />
            <div className="pt-4 space-y-4 lg:pt-0">
                <Recommended data={recommended} />
            </div>
        </Wrapper>
    );
}

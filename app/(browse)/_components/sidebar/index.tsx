import { getRecommended } from "@/lib/recommendedService";
import Recommended, { RecommendedSkeleton } from "./Recommended";
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

export const SidebarSkeleton = () => {
    return (
        <aside className="fixed flex flex-col bg-[#333333] border-r border-[#393939] top-16 left-0 h-full w-[70px] z-50 lg:w-60">
            <RecommendedSkeleton />
        </aside>
    );
};

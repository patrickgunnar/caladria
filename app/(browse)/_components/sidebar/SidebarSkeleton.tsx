import { RecommendedSkeleton } from "./Recommended";
import { ToggleSkeleton } from "./Toggle";

export default function SidebarSkeleton() {
    return (
        <aside className="fixed flex flex-col bg-[#333333] border-r border-[#393939] top-16 left-0 h-full w-[70px] z-50 lg:w-60">
            <ToggleSkeleton />
            <RecommendedSkeleton />
        </aside>
    );
}

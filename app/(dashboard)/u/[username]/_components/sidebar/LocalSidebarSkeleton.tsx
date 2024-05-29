import { LocalToggleSkeleton } from "./LocalToggle";

export default function LocalSidebarSkeleton() {
    return (
        <aside className="fixed flex flex-col bg-[#333333] border-r border-[#393939] top-16 left-0 h-full w-[70px] z-50 lg:w-60">
            <LocalToggleSkeleton />
        </aside>
    );
}

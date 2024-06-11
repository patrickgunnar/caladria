import { Suspense } from "react";
import LocalContainer from "./_components/LocalContainer";
import Navbar from "./_components/navbar";
import Sidebar from "./_components/sidebar";
import LocalSidebarSkeleton from "./_components/sidebar/LocalSidebarSkeleton";

export default function BrowseLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <>
            <Navbar />
            <div className="flex pt-16 h-full">
                <Suspense fallback={<LocalSidebarSkeleton />}>
                    <Sidebar />
                </Suspense>
                <LocalContainer>{children}</LocalContainer>
            </div>
        </>
    );
}

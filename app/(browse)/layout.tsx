import { Suspense } from "react";
import Container from "./_components/Container";
import Navbar from "./_components/navbar";
import Sidebar, { SidebarSkeleton } from "./_components/sidebar";

export default function BrowseLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <>
            <Navbar />
            <div className="flex pt-20 h-full">
                <Suspense fallback={<SidebarSkeleton />}>
                    <Sidebar />
                </Suspense>
                <Container>{children}</Container>
            </div>
        </>
    );
}

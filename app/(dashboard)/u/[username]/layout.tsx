import { getSelfByUSername } from "@/lib/authService";
import { redirect } from "next/navigation";
import Navbar from "./_components/navbar";
import Sidebar from "./_components/sidebar";
import LocalContainer from "./_components/LocalContainer";
import { Suspense } from "react";
import LocalSidebarSkeleton from "./_components/sidebar/LocalSidebarSkeleton";

interface CreatorLayoutProps {
    params: { username: string };
    children: React.ReactNode;
}

export default async function CreatorLayout({
    children,
    params: { username },
}: CreatorLayoutProps) {
    const self = await getSelfByUSername(username);

    if (!self) {
        redirect("/");
    }

    return (
        <>
            <Navbar />
            <div className="flex pt-0 h-full">
                <Suspense fallback={<LocalSidebarSkeleton />}>
                    <Sidebar />
                </Suspense>
                <LocalContainer>{children}</LocalContainer>
            </div>
        </>
    );
}

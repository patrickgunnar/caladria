import Container from "./_components/Container";
import Navbar from "./_components/navbar";
import Sidebar from "./_components/sidebar";

export default function BrowseLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <>
            <Navbar />
            <div className="flex pt-20 h-full">
                <Sidebar />
                <Container>{children}</Container>
            </div>
        </>
    );
}

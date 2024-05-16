import { LogoWithRoute } from "@/components/logo/LogoWithRoute";
import Search from "./Search";
import Actions from "./Actions";

export default function Navbar() {
    return (
        <nav className="fixed flex items-center justify-between bg-[#444444] shadow-sm top-0 p-2 h-16 w-full z-[49] lg:p-4">
            <LogoWithRoute />
            <Search />
            <Actions />
        </nav>
    );
}

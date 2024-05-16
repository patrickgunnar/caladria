import { GiElfEar } from "react-icons/gi";
import { Poppins } from "next/font/google";
import { cn } from "@/lib/utils";
import Link from "next/link";

const fontFamily = Poppins({
    subsets: ["latin"],
    weight: ["200", "300", "400", "500", "600", "700", "800"],
});

export function LogoWithRoute() {
    return (
        <Link href="/">
            <div className="flex flex-row items-center m-2 p-1 transition hover:opacity-75">
                <GiElfEar size={50} className="text-[#FF7F00] drop-shadow-sm" />
                <p
                    className={cn(
                        "hidden lg:block font-semibold text-lg text-black pr-5",
                        fontFamily.className
                    )}
                >
                    Caladria
                </p>
            </div>
        </Link>
    );
}

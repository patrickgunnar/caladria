import { GiElfEar } from "react-icons/gi";
import { Poppins } from "next/font/google";
import { cn } from "@/lib/utils";
import Link from "next/link";

const fontFamily = Poppins({
    subsets: ["latin"],
    weight: ["200", "300", "400", "500", "600", "700", "800"],
});

interface LogoWithRouteProps {
    label?: string;
}

export function LogoWithRoute({ label }: LogoWithRouteProps) {
    return (
        <Link href="/">
            <div
                className={cn(
                    "flex flex-row items-center m-2 p-1 transition hover:opacity-75",
                    fontFamily.className
                )}
            >
                <GiElfEar size={50} className="text-[#FF7F00] drop-shadow-sm" />
                <div className="hidden lg:flex gap-y-0 flex-col">
                    <p className="block font-semibold text-lg text-black pr-5">
                        Caladria
                    </p>
                    {label && (
                        <p className="text-xs text-inherit">
                            {label}
                        </p>
                    )}
                </div>
            </div>
        </Link>
    );
}

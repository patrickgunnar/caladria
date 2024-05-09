import { GiElfEar } from "react-icons/gi";
import { Poppins } from "next/font/google";
import { cn } from "@/lib/utils";

const fontFamily = Poppins({
    subsets: ["latin"],
    weight: ["200", "300", "400", "500", "600", "700", "800"],
});

export function Logo() {
    return (
        <div className="flex flex-row items-center bg-[#444444] rounded-2xl shadow-sm shadow-[#00000080] m-2 p-1">
            <div className="">
                <GiElfEar size={60} className="text-[#FF7F00] drop-shadow-sm" />
            </div>
            <div
                className={cn(
                    "flex flex-col items-start text-black pr-5",
                    fontFamily.className
                )}
            >
                <p className="font-semibold text-xl">Caladria</p>
                <p className="text-sm text-muted-foreground">
                    Are you ready to play?
                </p>
            </div>
        </div>
    );
}

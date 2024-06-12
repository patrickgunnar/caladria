import { Logo } from "@/components/logo/Logo";

export default function Loading() {
    return (
        <div className="flex gap-x-3 items-center justify-center h-full">
            <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-[#FF6600]"></div>
            <Logo />
        </div>
    );
}

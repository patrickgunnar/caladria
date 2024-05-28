import { Button } from "@/components/ui/button";
import { UserButton } from "@clerk/nextjs";
import { LogOut } from "lucide-react";
import Link from "next/link";

export default function Actions() {
    return (
        <div className="flex gap-x-2 items-center justify-center">
            <Button
                size="sm"
                variant="ghost"
                className="text-muted-foreground  hover:bg-transparent hover:text-[#E8E8E8]"
            >
                <Link
                    href="/"
                    className="flex gap-x-2 flex-row items-center justify-center"
                >
                    <LogOut className="h-5 w-5" />
                    Exit
                </Link>
            </Button>
            <UserButton afterSignOutUrl="/" />
        </div>
    );
}

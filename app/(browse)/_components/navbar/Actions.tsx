import { Button } from "@/components/ui/button";
import { SignInButton, UserButton } from "@clerk/nextjs";
import { currentUser } from "@clerk/nextjs/server";
import { Clapperboard } from "lucide-react";
import Link from "next/link";

export default async function Actions() {
    const user = await currentUser();

    return (
        <div className="flex gap-x-4 items-center justify-end ml-4 lg:ml-0">
            {!user && (
                <SignInButton>
                    <Button size="sm" variant="orange">
                        Login
                    </Button>
                </SignInButton>
            )}
            {!!user && (
                <div className="flex gap-x-4 items-center">
                    <Button
                        size="sm"
                        variant="ghost"
                        className="text-muted-foreground hover:bg-transparent hover:text-white"
                        asChild
                    >
                        <Link href={`/u/${user.username}`}>
                            <Clapperboard className="h-5 w-5 lg:mr-2" />
                            <span className="hidden lg:block">Dashboard</span>
                        </Link>
                    </Button>
                    <UserButton afterSignOutUrl="/" />
                </div>
            )}
        </div>
    );
}

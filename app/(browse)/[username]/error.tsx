"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function ErrorPage() {
    return (
        <div className="flex flex-col items-center justify-center text-muted-foreground space-y-4 h-full">
            <p>Something went wrong!</p>
            <Button variant="orange">
                <Link href="/">Go back home</Link>
            </Button>
        </div>
    );
}

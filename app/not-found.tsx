import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function NotFound() {
    return (
        <div className="flex flex-col items-center justify-center text-muted-foreground space-y-4 h-full">
            <h1 className="text-4xl">404</h1>
            <p>Not found!</p>
            <Button variant="orange">
                <Link href="/">Go back home</Link>
            </Button>
        </div>
    );
}

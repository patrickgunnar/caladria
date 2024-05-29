"use client";

import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { useCreatorSidebar } from "@/store/useCreatorSidebar";
import { LucideIcon } from "lucide-react";
import Link from "next/link";

interface NavItemProps {
    label: string;
    icon: LucideIcon;
    href: string;
    isActive: boolean;
}

export default function NavItem({
    label,
    icon: Icon,
    href,
    isActive,
}: NavItemProps) {
    const { collapsed } = useCreatorSidebar((state) => state);

    return (
        <Button
            variant="orangeGhost"
            className={cn(
                "h-12 w-full",
                collapsed ? "justify-center" : "justify-start",
                isActive && "bg-[#FF7F00]"
            )}
            asChild
        >
            <Link href={href}>
                <div
                    className={cn(
                        "flex gap-x-4 items-center text-[#E8E8E8] w-full",
                        collapsed && "justify-center"
                    )}
                >
                    <Icon
                        className={cn("h-4 w-4", collapsed ? "mr-0" : "mr-2")}
                    />
                    {!collapsed && <span className="truncate">{label}</span>}
                </div>
            </Link>
        </Button>
    );
}

export function NavItemSkeleton() {
    return (
        <li className="flex gap-x-4 items-center">
            <Skeleton className="rounded-md min-h-[48px] min-w-[48px]" />
            <div className="hidden flex-1 lg:block">
                <Skeleton className="h-6" />
            </div>
        </li>
    );
}

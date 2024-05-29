"use client";

import { useUser } from "@clerk/nextjs";
import { usePathname } from "next/navigation";
import {
    Fullscreen,
    KeyRound,
    LucideIcon,
    MessageSquare,
    Users,
} from "lucide-react";
import NavItem, { NavItemSkeleton } from "./NavItem";

export type RouteType = {
    label: string;
    href: string;
    icon: LucideIcon;
};

export default function Navigation() {
    const pathname = usePathname();
    const { user } = useUser();

    const routes: RouteType[] = [
        {
            label: "Stream",
            icon: Fullscreen,
            href: `/u/${user?.username}`,
        },
        {
            label: "Keys",
            icon: KeyRound,
            href: `/u/${user?.username}/keys`,
        },
        {
            label: "Chat",
            icon: MessageSquare,
            href: `/u/${user?.username}/chat`,
        },
        {
            label: "Community",
            icon: Users,
            href: `/u/${user?.username}/community`,
        },
    ];

    return (
        <ul className="px-2 pt-4 space-y-2 lg:pt-0">
            {routes.map(({ label, href, icon }) => {
                return (
                    <NavItem
                        key={href}
                        label={label}
                        icon={icon}
                        href={href}
                        isActive={pathname === href}
                    />
                );
            })}
        </ul>
    );
}

export function NavigationSkeleton() {
    return (
        <ul className="px-2 pt-4 space-y-2 lg:pt-0">
            {[...Array(3)].map((_, idx) => {
                return <NavItemSkeleton key={idx} />;
            })}
        </ul>
    );
}

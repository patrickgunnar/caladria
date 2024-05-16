"use client";

import qs from "query-string";
import { useState } from "react";
import { SearchIcon, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function Search() {
    const router = useRouter();
    const [value, setValue] = useState<string>("");

    const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (!value) return;

        const url = qs.stringifyUrl(
            {
                url: "/search",
                query: { term: value },
            },
            {
                skipEmptyString: true,
            }
        );

        router.push(url);
    };

    const onClear = () => setValue("");

    return (
        <form
            className="relative flex items-center w-full lg:w-[400px]"
            onSubmit={onSubmit}
        >
            <Input
                value={value}
                onChange={(ev) => setValue(ev.target.value)}
                placeholder="Search..."
                className="font-light text-white bg-[#333333] border border-r-0 border-[#555555] pr-6 rounded-r-none focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0"
            />
            {value && (
                <div className="absolute flex items-center justify-center right-[53px] h-full">
                    <X
                        className="text-muted-foreground cursor-pointer transition h-4 w-6 hover:opacity-75"
                        onClick={onClear}
                    />
                </div>
            )}
            <Button
                type="submit"
                size="default"
                variant="default"
                className="bg-[#2C2C2C] border border-l-0 border-[#555555] rounded-l-none hover:bg-[#1b1b1b]"
            >
                <SearchIcon className="text-muted-foreground h-5 w-5" />
            </Button>
        </form>
    );
}

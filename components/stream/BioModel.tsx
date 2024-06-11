"use client";

import { ElementRef, useRef, useState, useTransition } from "react";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { updateUser } from "@/actions/user";
import { toast } from "sonner";
import { Textarea } from "../ui/textarea";

interface BioModelProps {
    initialValue: string | null;
}

export default function BioModel({ initialValue }: BioModelProps) {
    const closeRef = useRef<ElementRef<"button">>(null);

    const [isPending, startTransition] = useTransition();
    const [bio, setBio] = useState<string | null>(initialValue);

    const handleChange = (ev: React.ChangeEvent<HTMLTextAreaElement>) => {
        setBio(ev.target.value);
    };

    const handleSubmit = (ev: React.FormEvent<HTMLFormElement>) => {
        ev.preventDefault();

        startTransition(() => {
            updateUser({ bio })
                .then(() => {
                    toast.success("Bio updated");
                    closeRef.current?.click();
                })
                .catch((err: any) =>
                    toast.error(err.message ?? "Something went wrong!")
                );
        });
    };

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="orange" size="sm" className="ml-auto">
                    Edit
                </Button>
            </DialogTrigger>
            <DialogContent className="bg-[#333333] border border-[#2C2C2C]">
                <DialogHeader>
                    <DialogTitle>Edit your bio</DialogTitle>
                </DialogHeader>
                <form className="space-y-14" onSubmit={handleSubmit}>
                    <Textarea
                        placeholder="User bio"
                        onChange={handleChange}
                        disabled={isPending}
                        value={bio ?? ""}
                        className="bg-[#444444] border-[#333333] resize-none outline-none h-[200px]"
                    />
                    <div className="flex justify-between">
                        <DialogClose ref={closeRef} asChild>
                            <Button
                                type="button"
                                variant="grayGhost"
                                disabled={isPending}
                            >
                                Cancel
                            </Button>
                        </DialogClose>
                        <Button
                            variant="orange"
                            type="submit"
                            disabled={isPending}
                        >
                            Save
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
}

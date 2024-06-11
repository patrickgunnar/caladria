"use client";

import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { ElementRef, useRef, useState, useTransition } from "react";
import { updateStream } from "@/actions/stream";
import { toast } from "sonner";
import { UploadDropzone } from "@/lib/uploadthing";
import { useRouter } from "next/navigation";
import Hint from "../hint/Hint";
import { TrashIcon } from "lucide-react";
import Image from "next/image";

interface InfoModelProps {
    initialName: string;
    initialThumbnail: string | null;
}

export default function InfoModel({
    initialName,
    initialThumbnail,
}: InfoModelProps) {
    const router = useRouter();
    const closeRef = useRef<ElementRef<"button">>(null);

    const [isPending, startTransition] = useTransition();
    const [name, setName] = useState<string>(initialName);
    const [thumbnail, setThumbnail] = useState<string | null>(initialThumbnail);

    const handleChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
        setName(ev.target.value);
    };

    const handleRemove = () => {
        startTransition(() => {
            updateStream({ thumbnailUrl: null })
                .then(() => {
                    toast.success("Thumbnail removed");
                    setThumbnail(null);
                    closeRef.current?.click();
                })
                .catch(() => toast.error("Something went wrong"));
        });
    };

    const handleSubmit = (ev: React.FormEvent<HTMLFormElement>) => {
        ev.preventDefault();

        startTransition(() => {
            updateStream({ name })
                .then(() => {
                    toast.success("Stream updated");
                    closeRef.current?.click();
                })
                .catch(() => toast.error("Something went wrong"));
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
                    <DialogTitle>Edit stream info</DialogTitle>
                </DialogHeader>
                <form className="space-y-14" onSubmit={handleSubmit}>
                    <div className="space-y-2">
                        <Label>Name</Label>
                        <Input
                            value={name}
                            disabled={isPending}
                            placeholder="Stream name"
                            onChange={handleChange}
                            className="bg-[#444444] border-[#333333]"
                        />
                    </div>
                    <div className="space-y-2">
                        <Label>Thumbnail</Label>
                        {thumbnail ? (
                            <div className="relative aspect-video border border-[#393939] rounded-md overflow-hidden">
                                <div className="absolute top-2 right-2 z-[10]">
                                    <Hint
                                        label="Remove thumbnail"
                                        side="left"
                                        asChild
                                    >
                                        <Button
                                            type="button"
                                            variant="orange"
                                            disabled={isPending}
                                            onClick={handleRemove}
                                            className="p-1.5 h-auto w-auto"
                                        >
                                            <TrashIcon className="h-4 w-5" />
                                        </Button>
                                    </Hint>
                                </div>
                                <Image
                                    src={thumbnail}
                                    alt={`${name} thumbnail`}
                                    className="object-cover"
                                    fill
                                />
                            </div>
                        ) : (
                            <div>
                                <UploadDropzone
                                    endpoint="thumbnailUploader"
                                    className="rounded-xl outline-[#444444] outline-dashed outline-1"
                                    appearance={{
                                        button: {
                                            background: "#FF7F00",
                                            color: "black",
                                        },
                                        label: {
                                            color: "inherit",
                                        },
                                        allowedContent: {
                                            color: "inherit",
                                        },
                                    }}
                                    onClientUploadComplete={(res) => {
                                        setThumbnail(res?.[0]?.url);
                                        router.refresh();
                                        closeRef.current?.click();
                                    }}
                                />
                            </div>
                        )}
                    </div>
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

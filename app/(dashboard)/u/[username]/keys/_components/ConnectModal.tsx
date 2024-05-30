"use client";

import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertTriangle } from "lucide-react";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

function MySelectItem({ label, value }: { value: string; label: string }) {
    return (
        <SelectItem value={value} className="text-[#e8e8e8]">
            {label}
        </SelectItem>
    );
}

export default function ConnectModal() {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="orange">Generate Connection</Button>
            </DialogTrigger>
            <DialogContent className="bg-[#333333] border border-[#2C2C2C]">
                <DialogHeader>
                    <DialogTitle>Generate Connection</DialogTitle>
                </DialogHeader>
                <Select>
                    <SelectTrigger className="bg-[#444444] border border-[#333333] w-full">
                        <SelectValue placeholder={"Ingress Type"} />
                    </SelectTrigger>
                    <SelectContent className="bg-[#444444] border-[#333333]">
                        <MySelectItem value="RTMP" label="RTMP" />
                        <MySelectItem value="WHIP" label="WHIP" />
                    </SelectContent>
                </Select>
                <Alert className="bg-[#2C2C2C] border border-[#222222] text-inherit">
                    <AlertTriangle color="#e8e8e8" className="h-4 w-4" />
                    <AlertTitle>Warning!</AlertTitle>
                    <AlertDescription>
                        This action will reset all the active streams using
                        current connection
                    </AlertDescription>
                </Alert>
                <div className="flex justify-between">
                    <DialogClose>
                        <Button variant="grayGhost">Cancel</Button>
                    </DialogClose>
                    <Button variant="orange" onClick={() => {}}>
                        Generate
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
}

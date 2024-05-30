"use client";

import { useState } from "react";
import { Button } from "../ui/button";
import { Copy, CopyCheck } from "lucide-react";

interface CopyButtonProps {
    value: string;
}

export default function CopyButton({ value }: CopyButtonProps) {
    const [isCopied, setIsCopied] = useState<boolean>(false);

    const onCopy = () => {
        if (!value) return;

        setIsCopied(true);
        navigator.clipboard.writeText(value);
        setTimeout(() => {
            setIsCopied(false);
        }, 2000);
    };

    return (
        <Button size="sm" variant="grayGhost" disabled={!value || isCopied} onClick={onCopy}>
            {isCopied ? (
                <CopyCheck className="h-4 w-4" />
            ) : (
                <Copy className="h-4 w-4" />
            )}
        </Button>
    );
}

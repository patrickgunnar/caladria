import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import { Toaster } from "sonner";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Caladria",
    description: "Elevating Live Streams to Legendary Moments!",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <ClerkProvider appearance={{ baseTheme: dark }}>
            <html lang="en">
                <body className={inter.className}>
                    {children}
                    <Toaster
                        theme="light"
                        position="top-right"
                        className="mt-14"
                    />
                </body>
            </html>
        </ClerkProvider>
    );
}

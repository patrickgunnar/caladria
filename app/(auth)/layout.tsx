import { Logo } from "../../components/logo/Logo";

interface AuthLayoutProps {
    children: React.ReactNode;
}

export default function AuthLayout({ children }: AuthLayoutProps) {
    return (
        <div className="flex flex-col items-center justify-center space-y-6 min-h-full">
            <Logo />
            {children}
        </div>
    );
}

import { toast } from "sonner";
import { useEffect, useState } from "react";
import { JwtPayload, jwtDecode } from "jwt-decode";
import { createViewerToken } from "@/actions/token";

export const useViewerToken = (hostIdentity: string) => {
    const [token, setToken] = useState<string>("");
    const [name, setName] = useState<string>("");
    const [identity, setIdentity] = useState<string>("");

    useEffect(() => {
        const createToken = async () => {
            try {
                const viewerToken = await createViewerToken(hostIdentity);

                if (viewerToken) {
                    setToken(viewerToken);

                    const decodedToken = jwtDecode(
                        viewerToken
                    ) as JwtPayload & {
                        name?: string;
                    };

                    const { name, sub: identity } = decodedToken;

                    if (identity) setIdentity(identity);
                    if (name) setName(name);
                }
            } catch (error: any) {
                console.log(error);
                toast.error(error.message);
            }
        };

        createToken();
    }, [hostIdentity]);

    return {
        token,
        name,
        identity,
    };
};

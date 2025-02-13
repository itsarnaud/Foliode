"use client";

import {getDecodedToken} from "@/utils/jwtUtils";
import {Image} from "@heroui/react";
import {useUser} from "@/utils/store";
import {useEffect, useState} from "react";
import { generateAvatar } from "@/utils/generateAvatar";

interface AvatarProps {
    size: number;
}

export const Avatar = ({size}: AvatarProps) => {
    const {user, setUser} = useUser();
    const [avatarUri, setAvatarUri] = useState<string | null>(null);

    useEffect(() => {
        const getUser = async () => {
            const token = getDecodedToken();
            if (user === null && token !== null) {
                setUser(token);
            }
        };
        getUser();
    }, [user, setUser]);

    useEffect(() => {
        if (user && !user.avatar_url) {
            setAvatarUri(generateAvatar(size, user.email));
        }
    }, [user, size]);

    if (!user) return null;

    const avatarSrc = user.avatar_url || avatarUri;

    return (
        <div>
            {avatarSrc && (
                <Image
                    src={avatarSrc}
                    alt={user.email || "Avatar"}
                    width={size}
                    height={size}
                    style={{ borderRadius: "50%" }}
                />
            )}
        </div>
    );
};


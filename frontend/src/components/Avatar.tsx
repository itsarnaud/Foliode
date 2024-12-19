"use client";
import {createAvatar} from "@dicebear/core";
import {bigSmile} from "@dicebear/collection";
import {getDecodedToken} from "@/utils/jwtUtils";
import {Image} from "@nextui-org/react";
import {useUser} from "@/utils/store";
import {useEffect, useState} from "react";
import Link from "next/link";

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
            const generateAvatar = () => {
                const avatar = createAvatar(bigSmile, {
                    seed: user.email,
                    size: size,
                    backgroundColor: ["b6e3f4", "c0aede", "ffdfbf"],
                });
                return avatar.toDataUri();
            };

            setAvatarUri(generateAvatar());
        }
    }, [user, size]);

    if (!user) return null;

    return (
        < Link href="/dashboard/profile">
            {user.avatar_url ? (
                <Image
                    src={user.avatar_url}
                    alt={user.email || "Avatar"}
                    width={size}
                    height={size}
                    style={{borderRadius: "50%"}}
                />
            ) : avatarUri ? (
                <Image
                    src={avatarUri}
                    width={size}
                    height={size}
                    alt="Avatar"
                    style={{borderRadius: "50%"}}
                />
            ) : null}
        </Link>
    )
};


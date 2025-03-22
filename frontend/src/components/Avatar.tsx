"use client";
import {createAvatar} from "@dicebear/core";
import {bigSmile} from "@dicebear/collection";
import {Image} from "@heroui/react";
import {useUserStore} from "@/store/user.store";
import {useEffect, useState} from "react";
import Link from "next/link";
import {formatImage} from "@/utils/formatImage";

interface AvatarProps {
    size: number;
}

export const Avatar = ({size}: AvatarProps) => {
    const [avatarUri, setAvatarUri] = useState<string | null>(null);
    const {user, fetchFromJwt} = useUserStore();

    useEffect(() => {
        fetchFromJwt();
    }, []);


    useEffect(() => {
        if (user && !user.avatar_url) {
            const generateAvatar = () => {
                const avatar = createAvatar(bigSmile, {
                    seed: user.email,
                    size: size,
                    backgroundColor: ["b6e3f4", "c0aede", "ffdfbf"],
                    skinColor: ["8c5a2b", "643d19", "a47539", "c99c62", "e2ba87", "efcc9f", "f5d7b1", "ffe4c0"],
                    hair: ["bangs", "braids", "halfShavedHead", "froBun", "wavyBob", "mohawk", "curlyShortHair", "bowlCutHair", "shortHair"]
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
                    src={ formatImage(user.avatar_url)}
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
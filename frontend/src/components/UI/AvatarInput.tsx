"use client"

import type React from "react"

import { getDecodedToken } from "@/utils/jwtUtils"
import { Image } from "@heroui/react"
import { useUser } from "@/utils/store"
import { useEffect, useState, useCallback } from "react"
import { generateAvatar } from "@/utils/generateAvatar"
import { apiPut} from "@/utils/apiRequester";

interface AvatarProps {
    size: number
}

export const AvatarInput = ({ size }: AvatarProps) => {
    const { user, setUser } = useUser()
    const [avatarUri, setAvatarUri] = useState<string | null>(null)
    const [isDragging, setIsDragging] = useState(false)

    useEffect(() => {
        const getUser = async () => {
            const token = getDecodedToken()
            if (user === null && token !== null) {
                setUser(token)
            }
        }
        getUser()
    }, [user, setUser])

    useEffect(() => {
        if (user && !user.avatar_url) {
            setAvatarUri(generateAvatar(size, user.email))
        }
    }, [user, size])

    const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault()
        setIsDragging(true)
    }, [])

    const handleDragLeave = useCallback((e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault()
        setIsDragging(false)
    }, [])

    const handleDrop = async (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setIsDragging(false);

        if (e.dataTransfer.files.length === 0) return;

        const file = e.dataTransfer.files[0];
        const formData = new FormData();
        formData.append("images", file);


        const response = await apiPut("user/avatar", formData, "multipart/form-data");
        if (response.status === 200) {
            document.cookie = `token_auth=${encodeURIComponent(response.data.token)}; path=/`;
        }

    }

    if (!user) return null

    const avatarSrc = user.avatar_url || avatarUri

    return (
        <div
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            className={`relative cursor-pointer ${isDragging ? "border-2 border-dashed border-blue-500" : ""}`}
            style={{ width: size, height: size, borderRadius: "50%" }}
        >
            {avatarSrc && (
                <Image
                    src={avatarSrc || "/placeholder.svg"}
                    alt={user.email || "Avatar"}
                    width={size}
                    height={size}
                    style={{ borderRadius: "50%" }}
                />
            )}
            <input
                type="file"
                accept="image/*"

                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            />
            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 hover:opacity-100 transition-opacity duration-200 rounded-full">
                <span className="text-white text-sm">Change Avatar</span>
            </div>
        </div>
    )
}


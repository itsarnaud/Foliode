"use client"
import axios from "axios";
import {getCookie} from "@/utils/cookiesHelpers";

export const apiPost = async (url: string, data: object, contentType: 'multipart/form-data' | 'application/json') => {
    const token = getCookie('token_auth')

    const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/${url}`,
        data,
        {
            headers: {
                "Content-Type": contentType,
                Authorization: `Bearer ${token}`,
            },
        }
    );


    return response
}


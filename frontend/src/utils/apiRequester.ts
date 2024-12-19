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

export const apiGet = async (url: string) => {
    const token = getCookie('token_auth')
    const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/${url}`)
    return response
}

export const apiAuth = async (url: string, data: object) => {
    try {
        const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/${url}`, data, {
            headers: {
                "Content-Type": "application/json",
            },
        });
        return response
    } catch (err) {
        return err
    }
}


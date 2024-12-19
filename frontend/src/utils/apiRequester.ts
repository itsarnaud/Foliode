"use client"
import axios from "axios";
import {getCookie} from "@/utils/cookiesHelpers";

export const apiPost = async (url: string, data: object, contentType: 'multipart/form-data' | 'application/json') => {
    const token = getCookie('token_auth')

    const response = await axios.post(
        `http://localhost:8080/api/${url}`,
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

    const response = await axios.get(`http://localhost:8080/api/${url}`)

    return response
}

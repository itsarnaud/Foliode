"use client"
import axios from "axios";
import {getCookie} from "@/utils/cookiesHelpers";

export const apiPost = async (url: string, data: object) => {
    const token = getCookie('token_auth')

    const response = await axios.post(
        `http://localhost:8080/api/${url}`,
        data,
        {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        }
    );
    return response
}



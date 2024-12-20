"use client"
import axios from "axios";
import {getCookie} from "@/utils/cookiesHelpers";
import {Repository} from "@/interfaces/Repository";

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
        return response.data
    } catch (err) {
        return err
    }
}

export const githubApiGetRepos = async (login: string): Promise<Repository[] | null> => {
    try {
        const response = await axios.get(`https://api.github.com/users/${login}/repos`);
        return response.data;
    } catch (err) {
        console.error('Error fetching repositories:', err);
        return null;
    }
};
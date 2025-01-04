"use client"
import axios from "axios";
import {AxiosResponse, AxiosError} from 'axios';
import {getCookie} from "@/utils/cookiesHelpers";

const apiUrl = process.env.NEXT_PUBLIC_API_URL

export const apiPost = async (url: string, data: object, contentType: 'multipart/form-data' | 'application/json') => {
    const token = getCookie('token_auth')
    const response = await axios.post(
        `${apiUrl}/api/${url}`,
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
    const response = await axios.get(`${apiUrl}/api/${url}`)
    return response
}

export const apiAuth = async (url: string, data: object): Promise<AxiosResponse | null> => {
    try {
        const response = await axios.post(`${apiUrl}/api/${url}`, data, {
            headers: {
                "Content-Type": "application/json",
            },
        });
        return response
    } catch (err) {
        console.log(err)
        return null
    }
}

export const apiPut = async (url: string, data: object) => {
    const token = getCookie('token_auth')
    try {
      const response = await axios.put(
        `${apiUrl}/api/${url}`,
        data,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response
    } catch (err) {
      console.log(err)
      return null
    }
  }

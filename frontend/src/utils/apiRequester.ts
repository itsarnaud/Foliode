"use client";
import axios from "axios";
import { AxiosResponse } from "axios";
import { getCookie } from "@/utils/cookiesHelpers";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export const apiPost = async (
  url: string,
  data: object,
  contentType: "multipart/form-data" | "application/json"
) => {
  const token = getCookie("token_auth");
  const response = await axios.post(`${apiUrl}/api/${url}`, data, {
    headers: {
      "Content-Type": contentType,
      Authorization: `Bearer ${token}`,
    },
  });
  return response;
};

export const apiDelete = async (url: string) => {
  const token = getCookie("token_auth");
  const response = await axios.delete(`${apiUrl}/api/${url}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response
}

export const apiGetWithAuth = async (url: string) => {
  const token = getCookie("token_auth");
  const response = await axios.get(`${apiUrl}/api/${url}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response
};

export const apiGet = async (url: string) => {
  const response = await axios.get(`${apiUrl}/api/${url}`);
  return response;
};

export const apiAuth = async (
  url: string,
  data: object
): Promise<AxiosResponse | null> => {
  try {
    const response = await axios.post(`${apiUrl}/api/${url}`, data, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response;
  } catch (error) {
    return axios.isAxiosError(error) && error.response ? error.response : null;
  }
};

export const apiPut = async (url: string, data: object, contentType: "multipart/form-data" | "application/json") => {
    const token = getCookie('token_auth')
    try {
      const response: AxiosResponse = await axios.put(
        `${apiUrl}/api/${url}`,
        data,
        {
          headers: {
            "Content-Type": contentType,
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        return error.response.data;
      }
      throw error;
    }
  }

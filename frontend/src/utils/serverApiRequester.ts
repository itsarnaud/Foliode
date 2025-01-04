import axios from "axios";

const apiURL: string = `${process.env.API_CLIENT_URL}`

export const apiGet = async (url: string) => {
    const response = await axios.get(`${apiURL}/api/${url}`)
    return response
}
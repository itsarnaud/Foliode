import {jwtDecode} from 'jwt-decode';
import {getCookie} from "@/utils/cookiesHelpers";
import {User} from "@/interfaces/User";



export const getDecodedToken = (): null | User => {
    const token = getCookie('token_auth')
    if (!token) {
        return null
    }
    return jwtDecode(token);
}
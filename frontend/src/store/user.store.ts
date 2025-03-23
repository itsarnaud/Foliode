import {create} from "zustand";
import {apiPost, apiPut} from "@/utils/apiRequester";
import {User} from "@/interfaces/User";
import {getCookie} from "@/utils/cookiesHelpers";
import {jwtDecode} from "jwt-decode";


interface UserState {
    user: User | null;
    setUser: (user: User) => void;
    updateUser: () => void;
    fetchFromJwt: () => void;
    updateProfilPicture: (file: File) => void;
}

export const useUserStore = create<UserState>((set, get) => ({
    user: null,

    fetchFromJwt: async () => {
        try {
            const token = getCookie('token_auth')
            if (!token) {
                return null
            }
            const user: User | null = jwtDecode(token);

            if (user) {
                set({user});
            }

        } catch (error) {
            console.log("Error fetching user from jwt", error);
        }
    },

    setUser: (user) => {
        if (!user) return;
        set((state) => ({
            user: {
                ...state.user,
                ...user,
            }
        }));
    },

    updateProfilPicture: async (image: File) => {
        const profilPicture = new FormData();
        profilPicture.append("image", image);
        const response =  await apiPost("user/profil", profilPicture, "multipart/form-data");
        document.cookie = `token_auth=${response.data.token}; path=/`;


    },

    updateUser: async () => {
        const user = get().user;
        if (!user) throw new Error("No user data available");
        const response = await apiPut("user", user, "application/json");
        document.cookie = `token_auth=${response.token}; path=/`;

    },


}));
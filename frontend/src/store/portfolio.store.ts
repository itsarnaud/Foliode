import {create} from "zustand";
import {Portfolio} from "@/interfaces/Portfolio";
import {apiGetWithAuth, apiPost, apiPut} from "@/utils/apiRequester";


interface PortfolioState {
    portfolio: Portfolio | null;
    updatePortfolio: () => void;
    postPortfolio: () => void;
    fetchPortfolio: () => void;
    setPortfolio: (portfolio: Portfolio) => void;
}


export const usePortfolioStore = create<PortfolioState>((set, get) => ({
    portfolio: null,

    fetchPortfolio: async () => {
        try {
            const response = await apiGetWithAuth("portfolio");
            if (response.status === 200) {
                set({portfolio: response.data});
            }
        } catch (error) {
            console.log("Error fetching portfolio", error);
        }
    },

    updatePortfolio: async () => {


        const portfolio = get().portfolio;

        if (!portfolio) throw new Error("No portfolio data available");

        const response = await apiPut("portfolio", portfolio, "application/json");

        console.log(response);

    },

    setPortfolio: (portfolio) => {
        if (!portfolio) return;
        set((state) => ({
            portfolio: {
                ...state.portfolio,
                ...portfolio,
                projects: [],
                tools: [],
            }
        }));
    },

    postPortfolio: async () => {
        try {
            const portfolio = get().portfolio;
            if (!portfolio) throw new Error("No portfolio data available");

            const response = await apiPost("portfolio", portfolio, "application/json");
            set({portfolio: response.data});

        } catch (error) {
            console.log("Error setting portfolio", error);
        }
    },

}));
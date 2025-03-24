import {create} from "zustand";
import {Portfolio} from "@/interfaces/Portfolio";
import {apiGetWithAuth, apiPost, apiPut} from "@/utils/apiRequester";
import {PortfolioStat} from "@/interfaces/PortfolioStat";


interface PortfolioState {
    portfolio: Portfolio | null;
    portfolioStats: PortfolioStat[];
    updatePortfolio: () => void;
    postPortfolio: () => void;
    fetchPortfolio: () => void;
    fetchPortfolioStats: () => void;
    setPortfolio: (portfolio: Portfolio) => void;

}


export const usePortfolioStore = create<PortfolioState>((set, get) => ({
    portfolio: null,
    portfolioStats: [],

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

    fetchPortfolioStats : async () => {
        try {
            const response = await apiGetWithAuth("portfolio/stat");
            if (response.status === 200) {
                set({portfolioStats: response.data});
            }
        } catch (error) {
            console.log("Error fetching portfolio stats", error);
        }
    },

    updatePortfolio: async () => {


        const portfolio = get().portfolio;

        if (!portfolio) throw new Error("No portfolio data available");

        const {users, projects, tools, ...portfolioWithoutUser} = portfolio;

        await apiPut("portfolio", portfolioWithoutUser, "application/json");

    },

    setPortfolio: (portfolio) => {
        if (!portfolio) return;
        set((state) => ({
            portfolio: {
                ...state.portfolio,
                ...portfolio,
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
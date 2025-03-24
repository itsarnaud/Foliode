"use client";

import React, {useEffect} from "react";
import {usePortfolioStore} from "@/store/portfolio.store";
import {Line} from "react-chartjs-2";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

const PortfolioCharts: React.FC = () => {
    const {portfolioStats, fetchPortfolioStats} = usePortfolioStore();

    useEffect(() => {
        fetchPortfolioStats();
    }, [fetchPortfolioStats]);

    if (!portfolioStats || portfolioStats.length === 0) {
        return <span className="text-sm">Suivez les vues et l'engagement de votre portfolio !</span>;
    }
    const formatDate = (date: string) => {
        const dateObj = new Date(date);
        return `${dateObj.getDate()}/${dateObj.getMonth() + 1}/${dateObj.getFullYear()}`;
    }

    const labels = portfolioStats.map((stat) => formatDate(stat.view_date));
    const dataValues = portfolioStats.map((stat) => stat.view_count);



    const data = {
        labels,
        datasets: [
            {
                label: "Vus du portfolio par jour",
                data: dataValues,
                backgroundColor: "rgba(75, 192, 192, 0.5)",
                borderColor: "rgba(75, 192, 192, 1)",
                borderWidth: 2,
            },
        ],
    };

    const options: ChartJS.ChartOptions = {
        responsive: true,
        plugins: {
            legend: {position: "top"},
            title: {display: true, text: "vues du portfolio"},
        },
    };

    return <div className='w-3/4 m-auto '><Line data={data} options={options}/></div>
};

export default PortfolioCharts;
"use client";

import DashboardTitle from "@/components/DashboardTitle";


import CustomCard, {LargeCard, GrandeCard} from "@/components/UI/card";
import {getDecodedToken} from "@/utils/jwtUtils";
import { useUser } from "@/utils/store";
import { useEffect } from "react";
import { Colors as ColorsInterface } from "@/interfaces/Colors";
import { Promotion } from "@/interfaces/Promotion";
import { usePortfolioStore } from "@/store/portfolio.store";

import {
    FaGithub,
    FaDribbble,
    FaGraduationCap,
    FaProjectDiagram,
} from "react-icons/fa";
import {CiDatabase} from "react-icons/ci";

export default function Dashboard() {
    const {user, setUser} = useUser();
    const {fetchPortfolio, portfolio} = usePortfolioStore();
    const projects = portfolio?.projects || [];
    const portfolioColors = portfolio?.config.colors;
    const portfolioPromotion = portfolio?.users.promotion as Promotion;

    // const router = useRouter();

    useEffect(() => {
        const token = getDecodedToken();
        if (!user && token) {
            setUser(token);
        }
        fetchPortfolio();


    }, [user]);

    return (
        <>
            <DashboardTitle title="Tableau de bord"/>

            <div className="min-h-screen w-full bg-background text-foreground p-4 md:p-6 lg:p-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 mb-6">
                    <CustomCard
                        variant="gradient"
                        title="Votre note"
                        description=".../20"
                        iconComponent={<CiDatabase size={40}/>}
                        isLargeDescription={true}
                        subDescription="Moyenne de la classe : ..."
                    />
                    <CustomCard
                        variant="default"
                        title="Votre compte GitHub"
                        description="Statut : "
                        status={Boolean(user?.github_login)}
                        iconComponent={<FaGithub size={40}/>}
                        buttonText="Lier"
                    />
                    <CustomCard
                        variant="default"
                        title="Votre compte Dribbble"
                        description="Statut : "
                        status={Boolean(user?.dribbble_login)}
                        iconComponent={<FaDribbble size={40}/>}
                        buttonText="Lier"
                    />
                    <CustomCard
                        variant="default"
                        title="Votre formation"
                        description={
                            portfolioPromotion
                                ? ` ${portfolioPromotion.formation.type} - ${portfolioPromotion.formation.name}`
                                : "aucune Formation"
                        }
                        iconComponent={<FaGraduationCap size={40}/>}
                    />
                    <CustomCard
                        variant="default"
                        title="Nombre de projet"
                        description={String(projects.length)}
                        iconComponent={<FaProjectDiagram size={40}/>}
                        isLargeDescription={true}
                    />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    <LargeCard
                        description="Couleur de votre portfolio"
                        variant="default"
                        onClick={() => console.log("clicked")}
                        className="w-full h-auto min-h-[275px] relative"
                    >
                        <div className="p4 mt-6 ">
                            {portfolioColors ? (
                                <div className="space-y-4">
                                    {Object.keys(portfolioColors).map((colorKey) => (
                                        <div
                                            key={colorKey}
                                            className="text-xl font-bold flex space-x-3"
                                        >
                                            {colorKey.charAt(0).toUpperCase() + colorKey.slice(1)} :
                                            <div
                                                className="p-4 ml-2 rounded-sm w-4"
                                                style={{
                                                    backgroundColor:
                                                        portfolioColors[colorKey as keyof ColorsInterface],
                                                }}
                                            ></div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                " "
                            )}
                        </div>
                    </LargeCard>

                    <LargeCard
                        description="Typographie de votre portfolio"
                        variant="default"
                        onClick={() => console.log("clicked")}
                        className="w-full h-auto min-h-[275px] relative"
                    >
                        <div></div>
                    </LargeCard>
                </div>
                <div className="flex justify-center items-center mt-6 w-full">
                    <GrandeCard
                        variant="default"
                        title=""
                        description="Apprentissage critique choisie"
                        className="w-full h-auto min-h-[275px] relative"
                    />
                </div>
            </div>
        </>
    );
}

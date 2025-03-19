"use client";

import DashboardTitle from "@/components/DashboardTitle";
import {usePortfolioStore} from "@/store/portfolio.store";
import React, {useEffect} from "react";
import Link from "next/link";
import {Button, Input, Textarea} from "@heroui/react";
import {URLInput} from "@/components/UI/URLInput";

export default function Edit() {
    const {portfolio, setPortfolio, fetchPortfolio, updatePortfolio} = usePortfolioStore();

    useEffect(() => {
        fetchPortfolio();
    }, []);

    const inputStyles = {
        inputWrapper: [
            "border-gray-500",
            "hover:border-gray-300",
            "focus:border-primary"
        ],
        input: ["dark:text-gray-400", "placeholder:text-gray-400", "focus:text-blue-500", "bg-[#f5f5f5]", "dark:bg-[#191919]"],
        label: "dark:text-gray-400",
        clearButton: "text-primary",
    };


    return (
        <>
            <DashboardTitle title="Modifier votre portfolio"/>
            <Link href={`/${portfolio?.url}`} className={`text-blue-600 `}> voir mon portfolio</Link>
            <div className="p-2 w-1/2 space-y-4">
                {portfolio && (
                    <>
                        <Input
                            label="Titre du portfolio "
                            value={portfolio?.title}
                            onChange={(e) =>
                                setPortfolio({...portfolio, title: e.target.value})
                            }
                            isRequired
                            classNames={inputStyles}
                        />
                        <Input
                            label="Soutitre du portfolio "
                            value={portfolio?.subtitle}
                            onChange={(e) =>
                                setPortfolio({...portfolio, subtitle: e.target.value})
                            }
                            isRequired
                            classNames={inputStyles}
                        />
                        <Textarea
                            label="Présentation"
                            placeholder="Présentez-vous en quelques lignes..."
                            onChange={(e) => setPortfolio({...portfolio, bio: e.target.value})}
                            minRows={3}
                            value={portfolio?.bio}
                            isRequired
                        />
                        < URLInput onChange={value => setPortfolio({...portfolio, bio: value})} value={portfolio?.url}/>
                        <Button
                            onPress={() => updatePortfolio()}
                            className="dayMode bg-primary text-white"
                        >
                            Modifier
                        </Button>


                    </>
                )}

            </div>

        </>
    );
}
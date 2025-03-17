"use client";

import DashboardTitle from "@/components/DashboardTitle";
import {Template} from "@/interfaces/Templates";
import {Card, CardHeader, Image} from "@heroui/react";
import ColorPicker from "@/components/UI/ColorPicker";
import {Colors} from "@/interfaces/Colors";
import {templates} from "@/constants";
import {usePortfolioStore} from "@/store/portfolio.store";
import {useCallback, useEffect} from "react";
import Link from "next/link";

export default function Edit() {
    const {portfolio, updatePortfolio, setPortfolio, fetchPortfolio} = usePortfolioStore();
    const chooseTemplate = portfolio?.template;
    const chooseColor = portfolio?.config.colors;

    useEffect(() => {
        fetchPortfolio();
    }, []);

    const handleChange = useCallback((value: Template) => {
        if (!portfolio) return;

        setPortfolio({
            ...portfolio,
            template: value.id,
        });
        updatePortfolio();
    }, [portfolio, setPortfolio, updatePortfolio]);

    const handleColorChange = useCallback((value: Colors) => {
        if (!portfolio) return;

        setPortfolio({
            ...portfolio,
            config: {
                ...portfolio.config,
                colors: value,
            },
        });
        updatePortfolio();
    }, [portfolio, setPortfolio, updatePortfolio]);

    return (
        <>
            <DashboardTitle title="Modifier le template"/>
            <Link href={`/${portfolio?.url}`}> voir mon portfolio</Link>
            <div className="p-4 grid grid-cols-1 md:grid-cols-3 gap-4">
                {templates.map((template) => (
                    <Card
                        key={template.id}
                        isPressable
                        onPress={() => handleChange(template)}
                        className={`h-[300px] ${
                            chooseTemplate === template.id
                                ? "border-4 border-primary"
                                : ""
                        }`}
                    >
                        <CardHeader
                            className="absolute z-10 top-0 flex-col !items-start bg-black/40 rounded-t-xl w-full">
                            <h4 className="text-white font-medium text-large">
                                {template.name}
                            </h4>
                        </CardHeader>
                        <Image
                            removeWrapper
                            alt={`Template ${template.name}`}
                            className="z-0 w-full h-full object-cover"
                            src={template.preview}
                        />
                    </Card>
                ))}
            </div>
            <ColorPicker
                onChange={(value) => handleColorChange(value)}
                colors={chooseColor}
            />
        </>
    );
}
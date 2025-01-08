"use client";

import React, {useState} from "react";

import {Button, Card, Progress} from "@nextui-org/react";

import FirstStepForm from "@/components/form/multistepform/FirstStepForm";
import SecondStepForm from "@/components/form/multistepform/SecondStepForm";
import {useMultiStep} from "@/utils/store";
import ThirdStepForm from "@/components/form/multistepform/ThirdStepForm";
import FourStepForm from "@/components/form/multistepform/FourStepForm";
import {apiPost} from "@/utils/apiRequester";
import {formatProjectsData, formatToolsData} from "@/utils/formatData";
import {useRouter} from "next/navigation";


export default function MultiStepForm() {
    const [currentStep, setCurrentStep] = useState(0)
    const totalSteps = 3
    const progress = (currentStep / totalSteps) * 100
    const {multiStep} = useMultiStep()
    const router = useRouter()

    const handleNext = () => {
        setCurrentStep(currentStep + 1)
    }

    const handlePrevious = () => {
        setCurrentStep(currentStep - 1)
    }

    const postData = async () => {
       const response = await apiPost("portfolio", multiStep.portfolio, 'application/json')

        if (response !== null && response.status === 201) {
            const tools = formatToolsData(multiStep.tools)
            const projects = formatProjectsData(multiStep.projects)

            await apiPost("portfolio/tools", tools, 'multipart/form-data')
            await apiPost("projects", projects, 'multipart/form-data')
        }

        router.push("/dashboard")
    }

    return (
        <div className="max-w-2xl py-8 mx-auto">
            <Card className="p-6">
                <h2 className="text-xl font-bold mb-4">
                    Étape {currentStep + 1}: {getStepTitle(currentStep)}
                </h2>

                <div className="flex items-center justify-between mb-6 relative">
                    {[1, 2, 3, 4].map((step) => (
                        <div key={step} className="flex items-center z-10">
                            <div
                                className={`w-8 h-8 rounded-full flex items-center justify-center ${
                                    step <= currentStep
                                        ? "dayMode bg-primary text-white"
                                        : "bg-gray-500"
                                }`}
                            >
                                {step}
                            </div>
                        </div>
                    ))}
                    <Progress
                        value={progress}
                        className="dayMode absolute top-1/2 left-0 -translate-y-1/2 w-full h-1"
                        aria-labelledby="progress-header"
                    />
                </div>

                <div>
                    {currentStep === 0 && (
                        <FirstStepForm/>
                    )}

                    {currentStep === 1 && (
                        <SecondStepForm/>
                    )}

                    {currentStep === 2 && (
                        <ThirdStepForm/>
                    )}

                    {currentStep === 3 && (
                        <FourStepForm/>
                    )}
                    <div className="flex justify-between mt-6">
                        <Button onPress={handlePrevious} disabled={currentStep === 0}>
                            Précédent
                        </Button>
                        {currentStep < totalSteps ? (
                            <Button
                            onPress={handleNext}
                                className="dayMode bg-primary text-white"
                            >
                                Suivant
                            </Button>
                        ) : (
                            <Button onPress={postData} className="dayMode bg-primary text-white">
                                Publier
                            </Button>
                        )}
                    </div>
                </div>
            </Card>
        </div>
    );
}

function getStepTitle(step: number): string {
    switch (step) {
        case 0:
            return "Informations Personnelles";
        case 1:
            return "Compétences";
        case 2:
            return "Projets";
        case 3:
            return "Personnalisation";

        default:
            return "";
    }
}

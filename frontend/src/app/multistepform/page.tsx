"use client";
import React, {useState} from "react";
import {
    Button,
    Card,
    Progress,
} from "@nextui-org/react";

import FirstStepForm, { StepOneData } from "@/components/form/multistepform/FirstStepForm";
import SecondStepForm, { StepTwoData } from "@/components/form/multistepform/SecondStepForm";
import ThirdStepForm, { StepThreeData } from "@/components/form/multistepform/ThirdStepForm";
import { useMultiStep } from "@/utils/store";


export default function MultiStepForm() {
    const [currentStep, setCurrentStep] = useState(1);
    const totalSteps = 4;
    const progress = (currentStep / totalSteps) * 100;
    const {multiStep, setMultiStep} = useMultiStep();
    const handleNext = () => {
        if (currentStep < 4) {
            setCurrentStep(currentStep + 1);
        }
    }

    const handlePrevious = () => {
        if (currentStep > 1) {
            setCurrentStep(currentStep - 1);
        }
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Form submitted:", multiStep);

    }


    return (
        <div className="max-w-2xl py-8 mx-auto">
            <Card className="p-6">
                <h2 className="text-xl font-bold mb-4">
                    Étape {currentStep}: {getStepTitle(currentStep)}
                </h2>

                <div className="flex items-center justify-between mb-6 relative">
                    {[1, 2, 3, 4].map((step) => (
                        <div key={step} className="flex items-center z-10">
                            <div
                                className={`w-8 h-8 rounded-full flex items-center justify-center ${
                                    step <= currentStep && !(currentStep === 3 && step > 2)
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

                <form onSubmit={handleSubmit}>
                    {currentStep === 1 && (
                        <FirstStepForm />
                    )}

                    {currentStep === 2 && (
                        <SecondStepForm />
                    )}




                    <div className="flex justify-between mt-6">
                        <Button onClick={handlePrevious} disabled={currentStep === 1}>
                            Précédent
                        </Button>
                        {currentStep < totalSteps ? (
                            <Button
                                onClick={handleNext}
                                className="dayMode bg-primary text-white"
                            >
                                Suivant
                            </Button>
                        ) : (
                            <Button type="submit" className="dayMode bg-primary text-white">
                                Publier
                            </Button>
                        )}
                    </div>
                </form>
            </Card>
        </div>
    );
}

function getStepTitle(step: number): string {
    switch (step) {
        case 1:
            return "Informations Personnelles";
        case 2:
            return "Compétences";
        case 3:
            return "Projets";
        case 4:
            return "Personnalisation";
        case 5:
            return "Déploiement";
        default:
            return "";
    }
}

"use client";

import FirstStepForm from "@/components/form/multistepform/FirstStepForm";
import SecondStepForm from "@/components/form/multistepform/SecondStepForm";
import ThirdStepForm from "@/components/form/multistepform/ThirdStepForm";
import FourStepForm from "@/components/form/multistepform/FourStepForm";
import MulstiStepLoader from "@/components/UI/MulstiStepLoader";

import React, { useState, useRef } from "react";
import { Button, Card, Progress } from "@heroui/react";
import { useMultiStep } from "@/utils/store";
import { apiPost } from "@/utils/apiRequester";
import { useRouter } from "next/navigation";
import { formatProjectsData, formatToolsData } from "@/utils/formatData";


export default function MultiStepForm() {
  const [currentStep, setCurrentStep] = useState(0);
  const [loaderText, setLoaderText] = useState("Création de votre portfolio en cours ...");
  const totalSteps = 3;
  const progress = (currentStep / totalSteps) * 100;
  const { portfolio, tools, projects } = useMultiStep();
  const router = useRouter();
  const formRef = useRef<HTMLFormElement>(null);

  const handleNext = (event: React.FormEvent) => {
    event.preventDefault();
    setCurrentStep(currentStep + 1);
  };

  const handlePrevious = () => {
    setCurrentStep(currentStep - 1);
  };

  const postData = async () => {
    setCurrentStep(currentStep + 1);
    try {
      const response = await apiPost("portfolio", portfolio, "application/json");

      if (response.status !== 201) return;
  
      if (tools.length !== 0) {
        setLoaderText("Ajout des compétences ...");
        const formatTools = formatToolsData(tools);
        await apiPost("portfolio/tools", formatTools, "multipart/form-data");
      }
  
      if (projects.length !== 0) {
        setLoaderText("Ajout de vos projets ...");
        const formatProjects = formatProjectsData(projects);
        await apiPost("projects", formatProjects, "multipart/form-data");
      }
    } catch(e) {
      console.log(e)
    }
    router.push("/dashboard");
  }

  return (
    <div className="max-w-2xl py-8 mx-auto">
      <form ref={formRef} onSubmit={(e) => handleNext(e)}>
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
            {currentStep === 0 && <FirstStepForm />}

            {currentStep === 1 && <SecondStepForm />}

            {currentStep === 2 && <ThirdStepForm />}

            {currentStep === 3 && <FourStepForm />}

            {currentStep === 4 && <MulstiStepLoader text={loaderText} />}

            <div className="flex justify-between mt-6">
              {currentStep > 0 && currentStep < 4 ? (
                <Button onPress={handlePrevious} disabled={currentStep === 0}>
                  Précédent
                </Button>
              ) : (<div></div>)
              }
              {currentStep < totalSteps ? (
                <Button
                  onPress={() => formRef.current?.requestSubmit()}
                  className="dayMode bg-primary text-white"
                >
                  Suivant
                </Button>
              ) : currentStep < 4 ? (
                <Button
                  onPress={postData}
                  className="dayMode bg-primary text-white"
                  isDisabled={portfolio.config.colors ? false : true}
                >
                  Publier
                </Button>
              ) : null}
            </div>
          </div>
        </Card>
      </form>
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
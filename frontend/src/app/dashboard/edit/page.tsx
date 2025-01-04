"use client";
import DashboardTitle from "@/components/DashboardTitle";
import FourStepForm from "@/components/form/multistepform/FourStepForm";
import { useEffect } from "react";
import { useMultiStep } from "@/utils/store";
import { apiPut } from "@/utils/apiRequester";

export default function Projects() {
  const { multiStep, setMultiStep } = useMultiStep();

  const handleTemplateChange = async () => {
    try {
      await apiPut("portfolio", {
        template: multiStep.portfolio.template,
        config: multiStep.portfolio.config
      });
    } catch (error) {
      console.error("Erreur lors de la mise à jour du template:", error);
    }
  };

  // Écouter les changements de template pour faire la requête API
  useEffect(() => {
    if (multiStep.portfolio.template) {
      handleTemplateChange();
    }
  }, [multiStep.portfolio.template, multiStep.portfolio.config]);

  return (
    <>
      <DashboardTitle title="Modifier le template" />
      <div className="p-4">
        <FourStepForm />
      </div>
    </>
  );
}
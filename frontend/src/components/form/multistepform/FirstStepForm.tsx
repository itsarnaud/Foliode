"use client";

import { Input, Textarea } from "@heroui/react";
import { useMultiStep } from "@/utils/store";
import { Portfolio } from "@/interfaces/Portfolio";
import { URLInput } from "@/components/UI/URLInput";
import { MsPortfolio } from "@/interfaces/MultiStep";


function FirstStepForm() {
  const { portfolio, setPortfolio } = useMultiStep();

  const handleChange = (field: keyof MsPortfolio, value: string) => {
    setPortfolio({ ...portfolio, [field]: value });
  };

  return (
    <div className="space-y-4 w-full">
      <URLInput
        onChange={(value) => handleChange("url", value)}
        value={portfolio.url}
      />

      <Input
        label="Titre du portfolio"
        placeholder="Ex: Lucie Maillet"
        onChange={(e) => handleChange("title", e.target.value)}
        value={portfolio.title}
        isRequired
      />

      <Input
        label="Sous-titre"
        placeholder="Ex: Étudiant en BUT Informatique"
        onChange={(e) => handleChange("subtitle", e.target.value)}
        value={portfolio.subtitle}
        isRequired
      />

      <Textarea
        label="Présentation"
        placeholder="Présentez-vous en quelques lignes..."
        onChange={(e) => handleChange("bio", e.target.value)}
        minRows={3}
        value={portfolio.bio}
        isRequired
      />
    </div>
  );
}

export default FirstStepForm;

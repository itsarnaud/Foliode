"use client";

import { useState } from "react";
import { Input, Textarea } from "@nextui-org/react";
import FileInput from "@/components/UI/FileInput";

export interface StepOneData {
  titre: string;
  sousTitre: string;
  presentation: string;
  logo: File | null;
}

interface FirstStepFormProps {
  onDataChange: (data: StepOneData) => void;
}

function FirstStepForm({ onDataChange }: FirstStepFormProps) {
  const [formData, setFormData] = useState<StepOneData>({
      titre: "",
      sousTitre: "",
      presentation: "",
      logo: null
  });

  const handleChange = (field: keyof StepOneData, value: string) => {
    const newData = { ...formData, [field]: value };
    setFormData(newData);
    onDataChange(newData);
  };

  return (
    <div className="space-y-4 w-full">
        <Input
            label="Titre du portfolio"
            placeholder="Ex: Lucie Maillet"
            value={formData.titre}
            onChange={(e) => handleChange("titre", e.target.value)}
        />
        
        <Input
            label="Sous-titre"
            placeholder="Ex: Étudiant en BUT Informatique"
            value={formData.sousTitre}
            onChange={(e) => handleChange("sousTitre", e.target.value)}
        />

        <Textarea
            label="Présentation"
            placeholder="Présentez-vous en quelques lignes..."
            value={formData.presentation}
            onChange={(e) => handleChange("presentation", e.target.value)}
            minRows={3}
        />

        {/* <div>
            <label className="block text-sm font-medium mb-1">Logo ou bannière</label>
            <FileInput 
                onChange={(files) => {
                    if (files.length > 0) {
                        handleChange("logo", files[0]);
                    }
                }}
            />
            <p className="text-sm text-gray-500 mt-1">Format recommandé : PNG ou JPG, max 2MB</p>
        </div> */}
    </div>
);
}

export default FirstStepForm;
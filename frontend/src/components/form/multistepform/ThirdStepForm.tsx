"use client";

import { useState } from "react";
import { Input, Select, SelectItem, Textarea } from "@nextui-org/react";
import FileInput from "@/components/UI/FileInput";

export interface StepThreeData {
    template: string;
    couleurs: string;
    presentation: string;
    logo: File | null;
}

interface ThirdStepFormProps {
    onDataChange: (data: StepThreeData) => void;
}

function ThirdStepForm({ onDataChange }: ThirdStepFormProps) {
    const [formData, setFormData] = useState<StepThreeData>({
        template: "",
        couleurs: "",
        presentation: "",
        logo: null
    });

    const handleChange = (field: keyof StepThreeData, value: string | File | null) => {
        const newData = { ...formData, [field]: value };
        setFormData(newData);
        onDataChange(newData);
    };

    return (
        <div className="space-y-4">
            <h3 className="text-lg font-semibold">Personnalisation</h3>
            
            <Select 
                label="Template"
                placeholder="Choisissez votre template"
                value={formData.template}
                onChange={(e) => handleChange('template', e.target.value)}
            >
                <SelectItem key="modern" value="modern">Modern</SelectItem>
                <SelectItem key="classic" value="classic">Classic</SelectItem>
                <SelectItem key="minimal" value="minimal">Minimal</SelectItem>
            </Select>

            <Select 
                label="Palette de couleurs"
                placeholder="Choisissez vos couleurs"
                value={formData.couleurs}
                onChange={(e) => handleChange('couleurs', e.target.value)}
            >
                <SelectItem key="light" value="light">Claire</SelectItem>
                <SelectItem key="dark" value="dark">Sombre</SelectItem>
                <SelectItem key="colorful" value="colorful">Colorée</SelectItem>
            </Select>

            <Textarea
                label="Présentation"
                placeholder="Présentez-vous en quelques lignes..."
                value={formData.presentation}
                onChange={(e) => handleChange('presentation', e.target.value)}
                minRows={3}
                className="min-h-[100px]"
            />

<div>
                <label className="block text-sm font-medium mb-1">Logo ou bannière</label>
                <FileInput 
                    onChange={(files) => {
                        if (files.length > 0) {
                            handleChange('logo', files[0]);
                        }
                    }}
                />
                <p className="text-sm text-gray-500 mt-1">Format recommandé : PNG ou JPG, max 2MB</p>
            </div>
        </div>
    );
}

export default ThirdStepForm;
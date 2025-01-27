"use client";

import { Input, Textarea } from "@nextui-org/react";
import { useMultiStep, useUsername }    from "@/utils/store";
import { useState }        from "react";
import { Portfolio }       from "@/interfaces/Portfolio";

function FirstStepForm() {
    const { multiStep, setMultiStep } = useMultiStep()
    const { username, setUsername } = useUsername() as { username: string, setUsername: (value: string) => void };

    const handleChange = (field: keyof Portfolio, value: string) => {
        const portfolio = {...multiStep.portfolio, [field]: value}
        setMultiStep({...multiStep, portfolio: portfolio})
    }

    const handleUsernameChange = (value: string) => {
        const sanitizedValue = value.toLowerCase().replace(/[^a-z0-9-_]/g, "");
        setUsername(sanitizedValue);
    };

    return (
        <div className="space-y-4 w-full">
            <Input
                label="Nom d'utilisateur"
                placeholder="Ex: john_doe"
                value={username || ''}
                description="Utilisez uniquement des lettres, chiffres, - et _"
                onChange={(e) => handleUsernameChange(e.target.value)}
            />

            <Input
                label="Titre du portfolio"
                placeholder="Ex: Lucie Maillet"
                value={multiStep.portfolio.title || ''}
                onChange={(e) => handleChange("title", e.target.value)}
            />

            <Input
                label="Sous-titre"
                placeholder="Ex: Étudiant en BUT Informatique"
                value={multiStep.portfolio.subtitle || ''}
                onChange={(e) => handleChange("subtitle", e.target.value)}
            />

            <Textarea
                label="Présentation"
                placeholder="Présentez-vous en quelques lignes..."
                value={multiStep.portfolio.bio || ''}
                onChange={(e) => handleChange("bio", e.target.value)}
                minRows={3}
            />
        </div>
    );
}

export default FirstStepForm;
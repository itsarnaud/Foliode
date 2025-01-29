"use client";

import { Input, Textarea } from "@nextui-org/react";
import { useMultiStep, useUsername }    from "@/utils/store";
import { Portfolio }       from "@/interfaces/Portfolio";

interface FirstStepFormProps {
    isValid: boolean
}

function FirstStepForm() {
    const { portfolio, setPortfolio} = useMultiStep()
    const { username, setUsername } = useUsername() as { username: string, setUsername: (value: string) => void };

    const handleChange = (field: keyof Portfolio, value: string) => {
        setPortfolio({...portfolio, [field]: value})
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
                isRequired
                
            />

            <Input
                label="Titre du portfolio"
                placeholder="Ex: Lucie Maillet"
                onChange={(e) => handleChange("title", e.target.value)}
                isRequired
            />

            <Input
                label="Sous-titre"
                placeholder="Ex: Étudiant en BUT Informatique"
                onChange={(e) => handleChange("subtitle", e.target.value)}
                isRequired
            />

            <Textarea
                label="Présentation"
                placeholder="Présentez-vous en quelques lignes..."
                onChange={(e) => handleChange("bio", e.target.value)}
                minRows={3}
                isRequired
            />
        </div>
    );
}

export default FirstStepForm;
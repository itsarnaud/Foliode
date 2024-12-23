"use client";

import {useMultiStep} from "@/utils/store";
import {
    Select,
    SelectItem,
    Card,
    CardHeader,
    Image,
} from "@nextui-org/react";

export interface StepThreeData {
    template: string;
    couleurs: string;
    typo: string;
}


function FourStepForm() {
    const {multiStep, setMultiStep} = useMultiStep();


    const templates = [
        {
            id: "modern",
            name: "Modern",
            preview: "/dashboard.png",
        },
        {
            id: "classic",
            name: "Classic",
            preview: "/previews/classic-template.png",
        },
        {
            id: "minimal",
            name: "Minimal",
            preview: "/previews/minimal-template.png",
        },
    ];

    const handleChange = (key: string, value: string) => {
        const newData = {...multiStep.style, key: value}
        setMultiStep({...multiStep, style: newData})
    }

    return (
        <div className="w-full">
            <h3 className="text-lg font-semibold mb-4">Choisissez votre template</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {templates.map((template) => (
                    <Card
                        key={template.id}
                        isPressable
                        onPress={() => handleChange('templette', template.id)}
                        className={`h-[300px] ${
                            multiStep.style.template === template.id ? "border-4 border-primary" : ""
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

            <div className="space-y-4">
                <Select
                    label="Palette de couleurs"
                    placeholder="Choisissez vos couleurs"
                    value={multiStep.style.couleurs}
                    onChange={(e) => handleChange("couleurs", e.target.value)}
                    className="mt-6"
                >
                    <SelectItem key="light" value="light">
                        Claire
                    </SelectItem>
                    <SelectItem key="dark" value="dark">
                        Sombre
                    </SelectItem>
                    <SelectItem key="colorful" value="colorful">
                        Colorée
                    </SelectItem>
                </Select>

                <Select
                    label="Typographie"
                    placeholder="Choisissez votre typographie"
                    value={multiStep.style.typo}
                    onChange={(e) => handleChange("typo", e.target.value)}
                >
                    <SelectItem key="poppins" value="poppins">
                        Poppins
                    </SelectItem>
                    <SelectItem key="roboto" value="roboto">
                        Roboto
                    </SelectItem>
                    <SelectItem key="openSans" value="openSans">
                        Open Sans
                    </SelectItem>
                    <SelectItem key="montserrat" value="montserrat">
                        Montserrat
                    </SelectItem>
                    <SelectItem key="lato" value="lato">
                        Lato
                    </SelectItem>
                </Select>
            </div>
        </div>
    );
}

export default FourStepForm;

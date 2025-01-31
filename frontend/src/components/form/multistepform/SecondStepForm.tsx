"use client";

import FileInput from "@/components/UI/FileInput";
import { Button, Input } from "@heroui/react";
import { LuX } from "react-icons/lu";
import { useMultiStep } from "@/utils/store";

function SecondStepForm() {
  const { tools, setTools } = useMultiStep();

  const handleCompetenceChange = (index: number, field: string, value: any) => {
    const newTools = [...tools];
    newTools[index] = {
      ...newTools[index],
      [field]: value,
    };
    setTools(newTools);
  };

  const addCompetence = () => {
    const newCompetence = { name: "", image: null };
    setTools([...tools, newCompetence]);
  };

  const handleDeleteCompetence = (index: number) => {
    const newTools = tools.filter((_, i) => i !== index);
    setTools(newTools);
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Compétences</h3>
      {tools.map((tool, index) => (
        <div
          key={index}
          className="p-5 pt-9 border rounded-lg space-y-2 relative"
        >
          <div
            onClick={() => handleDeleteCompetence(index)}
            className="absolute top-4 right-4 cursor-pointer "
          >
            <LuX
              className="text-red-500 hover:text-red-800  text-2xl font-bold"
              strokeWidth={3}
            />
          </div>
          <Input
            label="Nom de la compétence"
            value={tool.name}
            onChange={(e) =>
              handleCompetenceChange(index, "name", e.target.value)
            }
            isRequired
          />

          <div>
            <label className="block text-sm font-medium mb-1">
              Images de la compétence
            </label>
            <FileInput
              onChange={(files) =>
                handleCompetenceChange(index, "image", files[0])
              }
              files={tool.image ? [tool.image] : []}
            />
            <p className="text-sm text-gray-500 mt-1">
              Format recommandé : PNG ou JPG, max 2MB
            </p>
          </div>
        </div>
      ))}
      <Button
        onPress={addCompetence}
        className="dayMode bg-primary text-white"
        variant="flat"
      >
        Ajouter une compétence
      </Button>
    </div>
  );
}

export default SecondStepForm;

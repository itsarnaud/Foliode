"use client";

import FileInput from "@/components/UI/FileInput";
import { Button, Input } from "@nextui-org/react";
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

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Compétences</h3>
      {tools.map((tool, index) => (
        <div key={index} className="p-4 border rounded-lg space-y-2">
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

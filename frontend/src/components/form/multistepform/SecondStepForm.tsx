'use client';

import FileInput         from '@/components/UI/FileInput';
import { Button, Input } from '@heroui/react';
import { useMultiStep }  from '@/utils/store';


function SecondStepForm() {
  const { tools, setTools } = useMultiStep();

  const handleCompetenceChange = (index: number, field: string, value: string | File) => {
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
        <div key={index} className="border p-3 rounded-md space-y-3">

          <Input 
            label="Nom de la compétence" 
            value={tool.name}
            onChange={(e) => handleCompetenceChange(index, "name", e.target.value)}
            isRequired
          />
          <div>
            <label className="block text-sm font-medium mb-1">Image de la compétence</label>
            <FileInput
                onChange={(files) =>
                  handleCompetenceChange(index, "image", files[0])
                }
                files={tool.image ? [tool.image] : []}
                id={`file-${index}`}
                isRequired
              />
              <span className="text-sm text-gray-500 mt-1">Format recommandé : PNG ou JPG, max 2MB</span>
          </div>

          <Button variant="flat" onPress={() => handleDeleteCompetence(index)} className="w-full bg-danger">Supprimer la compétence</Button>

        </div>
      ))}
      <Button variant="flat" onPress={addCompetence} className='dayMode bg-primary text-white w-full'>Ajouter une compétence</Button>
    </div>
  );
}

export default SecondStepForm;

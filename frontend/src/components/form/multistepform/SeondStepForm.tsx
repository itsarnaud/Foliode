"use client";

import { useState } from "react";
import { Input, Button, Textarea } from "@nextui-org/react";
import FileInput from "@/components/UI/FileInput";
export interface StepTwoData {
  competences: Array<{
    nom: string;
    description: string;
    lienProjet: string;
  }>;
  projets: Array<{
    titre: string;
    description: string;
    technologies: string[];
    date: string;
    medias: string[];
  }>;
}

interface SecondStepFormProps {
  onDataChange: (data: StepTwoData) => void;
  showCompetences: boolean;
}

function SecondStepForm({
  onDataChange,
  showCompetences,
}: SecondStepFormProps) {
  const [formData, setFormData] = useState<StepTwoData>({
    competences: [],
    projets: [],
  });

  const handleCompetenceChange = (
    index: number,
    field: string,
    value: string
  ) => {
    const newCompetences = [...formData.competences];
    newCompetences[index] = {
      ...newCompetences[index],
      [field]: value,
    };
    const newData = { ...formData, competences: newCompetences };
    setFormData(newData);
    onDataChange(newData);
  };

  const handleProjetChange = (index: number, field: string, value: any) => {
    const newProjets = [...formData.projets];
    if (field === "medias") {
      newProjets[index] = {
        ...newProjets[index],
        medias: value.map((file: File) => URL.createObjectURL(file)),
      };
    } else {
      newProjets[index] = {
        ...newProjets[index],
        [field]: value,
      };
    }
    const newData = { ...formData, projets: newProjets };
    setFormData(newData);
    onDataChange(newData);
  };

  const addCompetence = () => {
    const newData = {
      ...formData,
      competences: [
        ...formData.competences,
        { nom: "", description: "", lienProjet: "" },
      ],
    };
    setFormData(newData);
    onDataChange(newData);
  };

  const addProjet = () => {
    const newData = {
      ...formData,
      projets: [
        ...formData.projets,
        { titre: "", description: "", technologies: [], date: "", medias: [] },
      ],
    };
    setFormData(newData);
    onDataChange(newData);
  };

  if (showCompetences) {
    return (
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Compétences</h3>
        {formData.competences.map((comp, index) => (
          <div key={index} className="p-4 border rounded-lg space-y-2">
            <Input
              label="Nom de la compétence"
              value={comp.nom}
              onChange={(e) =>
                handleCompetenceChange(index, "nom", e.target.value)
              }
            />
            <Textarea
              label="Description"
              value={comp.description}
              onChange={(e) =>
                handleCompetenceChange(index, "description", e.target.value)
              }
            />
            <Input
              label="Lien vers le projet"
              value={comp.lienProjet}
              onChange={(e) =>
                handleCompetenceChange(index, "lienProjet", e.target.value)
              }
            />
          </div>
        ))}
        <Button
          onClick={addCompetence}
          className="nightMode bg-primary text-white"
          variant="flat"
        >
          Ajouter une compétence
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Projets</h3>
      {formData.projets.map((projet, index) => (
        <div key={index} className="p-4 border rounded-lg space-y-2">
          <Input
            label="Titre du projet"
            value={projet.titre}
            onChange={(e) => handleProjetChange(index, "titre", e.target.value)}
          />
          <Textarea
            label="Description"
            value={projet.description}
            onChange={(e) =>
              handleProjetChange(index, "description", e.target.value)
            }
          />
          <Input
            label="Technologies utilisées (séparées par des virgules)"
            value={projet.technologies.join(", ")}
            onChange={(e) =>
              handleProjetChange(
                index,
                "technologies",
                e.target.value.split(",").map((t) => t.trim())
              )
            }
          />
          <Input
            type="date"
            label="Date de réalisation"
            value={projet.date}
            onChange={(e) => handleProjetChange(index, "date", e.target.value)}
          />
          <FileInput
            onChange={(files) => handleProjetChange(index, "medias", files)}
          />
        </div>
      ))}
      <Button
        onClick={addProjet}
        className="nightMode bg-primary text-white"
        variant="flat"
      >
        Ajouter un projet
      </Button>
    </div>
  );
}

export default SecondStepForm;

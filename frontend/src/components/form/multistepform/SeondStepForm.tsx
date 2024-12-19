"use client";

import { useState } from "react";
import { Input, Button, Textarea, Select, SelectItem } from "@nextui-org/react";
import FileInput from "@/components/UI/FileInput";
import LinkInput from "@/components/UI/LinkInput";
export interface StepTwoData {
  competences: Array<{
    nom: string;
    description: string;
    medias: string[];
  }>;
  projets: Array<{
    titre: string;
    description: string;
    technologies: string[];
    date: string;
    dateFin: string;
    medias: string[];
    links: string[];
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

  const handleCompetenceChange = (index: number, field: string, value: any) => {
    const newCompetences = [...formData.competences];
    if (field === "medias") {
      newCompetences[index] = {
        ...newCompetences[index],
        medias: value.map((file: File) => URL.createObjectURL(file)),
      };
    } else {
      newCompetences[index] = {
        ...newCompetences[index],
        [field]: value,
      };
    }
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
        { nom: "", description: "", medias: [] },
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
        {
          titre: "",
          description: "",
          technologies: [],
          date: "",
          dateFin: "",
          medias: [],
          links: []
        },
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
            <div>
              <label className="block text-sm font-medium mb-1">
                Images de la compétence
              </label>
              <FileInput
                onChange={(files) =>
                  handleCompetenceChange(index, "medias", files)
                }
              />
              <p className="text-sm text-gray-500 mt-1">
                Format recommandé : PNG ou JPG, max 2MB
              </p>
            </div>
          </div>
        ))}
        <Button
          onClick={addCompetence}
          className="dayMode bg-primary text-white"
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
          <div className="flex gap-4">
            <Input
              type="date"
              label="Date de début"
              value={projet.date}
              onChange={(e) =>
                handleProjetChange(index, "date", e.target.value)
              }
            />
            <Input
              type="date"
              label="Date de fin"
              value={projet.dateFin}
              onChange={(e) =>
                handleProjetChange(index, "dateFin", e.target.value)
              }
            />
          </div>
          <LinkInput
            placeholder="Liens vers le projet"
            name="links"
            onChange={(value) => handleProjetChange(index, "links", value)}
          />
          <div>
            <label className="block text-sm font-medium mb-1">
              Images du projet
            </label>
            <FileInput
              onChange={(files) => handleProjetChange(index, "medias", files)}
            />
            <p className="text-sm text-gray-500 mt-1">
              Format recommandé : PNG ou JPG, max 2MB
            </p>
          </div>
        </div>
      ))}
      <Button
        onClick={addProjet}
        className="dayMode bg-primary text-white"
        variant="flat"
      >
        Ajouter un projet
      </Button>
    </div>
  );
}

export default SecondStepForm;

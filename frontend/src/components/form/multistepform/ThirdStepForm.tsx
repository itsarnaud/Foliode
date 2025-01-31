"use client";

import React     from "react";
import FileInput from "@/components/UI/FileInput";
import LinkAdder from "@/components/UI/LinkAdder";

import { Button, Input, Textarea } from "@heroui/react";
import { useMultiStep }            from "@/utils/store";

function ThirdStepForm() {
  const { multiStep, setMultiStep } = useMultiStep();

  const handleProjectChange = (index: number, field: string, value: any) => {
    const newProjects = [...multiStep.projects];
    newProjects[index] = {
      ...newProjects[index],
      [field]: value,
    };
    setMultiStep({
      ...multiStep,
      projects: newProjects,
    });
  };

  const addProject = () => {
    const newProject = {
      title: "",
      description: "",
      projectsLinks: [],
      images: [],
      projectsImages: [],
      links: []
    };
    const updatedProjects = [...multiStep.projects, newProject];
    setMultiStep({
      ...multiStep,
      projects: updatedProjects,
    });
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Projets</h3>
      {multiStep.projects.map((project, index) => (
        <div key={index} className="p-4 border rounded-lg space-y-2">
          <Input
            label="Titre du projet"
            value={project.title}
            onChange={(e) =>
              handleProjectChange(index, "title", e.target.value)
            }
          />
          <Textarea
            label="Description"
            value={project.description}
            onChange={(e) =>
              handleProjectChange(index, "description", e.target.value)
            }
          />
          <LinkAdder
            onChange={(links) => handleProjectChange(index, "projectsLinks", links)}
          />
          <div>
            <label className="block text-sm font-medium mb-1">
              Images du projet
            </label>
            <FileInput
              onChange={(files) =>
                handleProjectChange(
                  index,
                  "images",
                  files.map((file) => file)
                )
              }
              files={project.images}
            />
            <p className="text-sm text-gray-500 mt-1">
              Format recommandé : PNG ou JPG, max 2MB
            </p>
          </div>
        </div>
      ))}
      <Button
        onPress={addProject}
        className="dayMode bg-primary text-white"
        variant="flat"
      >
        Ajouter un projet
      </Button>
    </div>
  );
}

export default ThirdStepForm;

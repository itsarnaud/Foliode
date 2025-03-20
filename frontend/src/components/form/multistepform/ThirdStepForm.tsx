'use client';

import React     from 'react';
import FileInput from '@/components/UI/FileInput';
import LinkAdder from '@/components/UI/LinkAdder';

import { Button, Input, Textarea } from "@heroui/react";
import { useMultiStep }            from "@/utils/store";


export default function ThirdStepForm() {
  const { projects, setProject } = useMultiStep();

  const handleProjectChange = (index: number, field: string, value: string | object | File) => {
    const newProject = [...projects];
    newProject[index] = {
      ...newProject[index],
      [field]: value,
    };
    setProject(newProject);
  };

  const addProject = () => {
    const newProject = {
      title: "",
      description: "",
      projectsLinks: [],
      images: [],
      projectsImages: [],
      links: [],
    };
    setProject([...projects, newProject]);
  };

  const handleDeleteProject = (index: number) => {
    const newProject = projects.filter((_, i) => i !== index);
    setProject(newProject);
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Projets</h3>
      {projects.map((project, index) => (
        <div key={index} className="border p-3 rounded-md space-y-3">

          <Input 
            label="Titre du projet" 
            value={project.title}
            onChange={(e) => handleProjectChange(index, 'title', e.target.value)}
            isRequired
          />
          <Textarea
            label="Description"
            value={project.description}
            onChange={(e) =>
              handleProjectChange(index, "description", e.target.value)
            }
            isRequired
          />
          <LinkAdder onChange={(links) =>
              handleProjectChange(index, "projectsLinks", links)
          }/>

          <div>
            <label className="block text-sm font-medium mb-1">Images du projet</label>
            <FileInput
              onChange={(files) => handleProjectChange(index, "images", files.map((file) => file))}
              files={project.images || []}
              id={`file-${index}`}
              isRequired
            />
            <span className="text-sm text-gray-500 mt-1">Format recommandé : PNG ou JPG, max 2MB</span>
          </div>

          <Button variant="flat" onPress={() => handleDeleteProject(index)} className="w-full bg-danger">Supprimer le projet</Button>

        </div>
      ))}
      <Button variant="flat" onPress={addProject} className='dayMode bg-primary text-white w-full'>Ajouter un projet</Button>
    </div>
  );
}

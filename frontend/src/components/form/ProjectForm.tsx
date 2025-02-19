"use client";

import FileInput  from "@/components/UI/FileInput";
import Buttons    from "@/components/UI/button";
import LinkAdder  from "../UI/LinkAdder";

import { 
  Input, 
  Textarea, 
  Card } from "@heroui/react";

import { useState }             from "react";
import { Project }              from "@/interfaces/Project";
import { apiPost }              from "@/utils/apiRequester";
import { useProjects }          from "@/utils/store";

function ProjectForm() {
  const { projects, setProjects } = useProjects();
  const [project, setProject] = useState<Project>({
    title: "",
    description: "",
    projectsLinks: [],
    images: [],
    projectsImages: []
  });
  const [images, setImages] = useState<File[]>([]);

  const createProject = async (e: React.FormEvent) => {
    e.preventDefault();
    const data = new FormData();
    data.append("json", JSON.stringify(project));

    images.forEach((image, index) => {
      data.append(`images[${index}]`, image);
    });

    try {
      const response = await apiPost("project", data, "multipart/form-data");
      if (response.status === 201) {
        setProjects([...projects, response.data]);
        setProject({
          title: "",
          description: "",
          projectsLinks: [],
          images: [],
          projectsImages: [],
        })
        setImages([])
      }
    } catch (error) {
      console.log("Erreur lors de la création du projet :", error);
    }
  };

  const inputStyles = {
    inputWrapper: [
      "border-gray-500",
      "hover:border-gray-300",
      "focus:border-primary"
    ],
    input: ["dark:text-gray-400", "placeholder:text-gray-400", "focus:text-blue-500", "bg-[#f5f5f5]", "dark:bg-[#191919]"],
    label: "dark:text-gray-400",
    clearButton: "text-primary",
  };

  return (
    <Card className="py-4 relative w-full sm:w-[300px] h-max">
      <form onSubmit={createProject} method="POST" className="pb-0 pt-2 px-4 flex-col space-y-2">
        <Input
          label="Titre du projet"
          value={project.title}
          onChange={(e) =>
            setProject({ ...project, title: e.target.value })
          }
          isRequired
          classNames={inputStyles}
        />

        <LinkAdder
          onChange={(links) =>
            setProject({ ...project, projectsLinks: links })
          }
        />

        <Textarea
          label="Description"
          value={project.description}
          onChange={(e) =>
            setProject({ ...project, description: e.target.value })
          }
          isRequired
          classNames={inputStyles}
        />

        <FileInput
          files={images}
          onChange={(files) => setImages(files)}
          isRequired
        />

        <Buttons
          text="Créer un projet"
          className="bg-primary w-full text-sm"
          style="form"
          type="submit"
        />
      </form>
    </Card>
  );
}

export default ProjectForm;

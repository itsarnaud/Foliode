"use client";

import FileInput  from "@/components/UI/FileInput";
import Buttons    from "@/components/UI/button";
import LinkAdder  from "../UI/LinkAdder";

import { 
  Input, 
  Textarea, 
  Card
} from "@heroui/react";

import { useState }             from "react";
import { Project }              from "@/interfaces/Project";
import { apiPost }              from "@/utils/apiRequester";
import { RiDeleteBin5Fill }     from "react-icons/ri";

interface ProjectUpdateProps {
  project: Project;
  onFinish?: () => void;
}

export default function ProjectUpdate({ project: initialProject, onFinish }: ProjectUpdateProps) {
  const [project, setProject] = useState<Project>(initialProject);

  const [images, setImages] = useState<File[]>([]);

  const createProject = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("json", JSON.stringify({ ...project }));

    images.forEach((file) => {
      formData.append("images[]", file);
    });
    
    try {
      await apiPost(`project/${project.id}`, formData, "multipart/form-data");
      if (onFinish) onFinish();
    } catch (error) {
      console.log("Erreur lors de la modification du projet :", error);
    }
  };

  const deleteFile = (index: number) => {
    setProject({ ...project, projectsImages: project.projectsImages?.filter((_, i) => i !== index) });
  }

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
          value={project.projectsLinks}
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

        {project.projectsImages && project.projectsImages.map((image, index) => (
          <div className="w-full relative" key={index}>
            {/* eslint-disable @next/next/no-img-element */}
            <img
              key={index}
              src={`/${image.img_src}`}
              alt={image.img_alt}
              className="w-full rounded-xl"
            />

            <div onClick={() => deleteFile(index)} className="absolute top-2 right-2 text-red-500 cursor-pointer duration-200 hover:text-red-700 hover:scale-110">
              <RiDeleteBin5Fill />
            </div>
          </div>
        ))}

        <FileInput
          files={images}
          onChange={(files) => setImages(files)}
          id={`file-${project.id}`}
        />

        <Buttons
          text="Modifier le projet"
          className="bg-primary w-full text-sm"
          style="form"
          type="submit"
        />
        <Buttons
          text="Annuler la modification"
          className="bg-red-600 border-red-800 w-full text-sm"
          style="form"
          onClick={() => onFinish && onFinish()}
        />
      </form>
    </Card>
  );
}

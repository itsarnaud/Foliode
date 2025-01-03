"use client";

import { useEffect, useState } from "react";
import { Input, Textarea, DateRangePicker } from "@nextui-org/react";
import { FaExpand, FaCompress } from "react-icons/fa";
import FileInput from "@/components/UI/FileInput";
import LinkInput from "@/components/UI/LinkInput";
import Buttons from "@/components/UI/button";
import { Project } from "@/interfaces/Project";
import { apiPost } from "@/utils/apiRequester";
import LinkAdder from "../UI/LinkAdder";

function ProjectForm() {
  const [project, setProject] = useState<Project>({
    title: "",
    description: "",
    projectsLinks: [],
    images: [],

    projectsImages: [],
  });
  const [images, setImages] = useState<File[]>([]);
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    console.log(project);
  }, [project]);

  const createProject = async () => {
    const data = new FormData();
    data.append("json", JSON.stringify(project));

    images.forEach((image, index) => {
      data.append(`images[${index}]`, image);
    });

    try {
      await apiPost("project", data, "multipart/form-data");
    } catch (error) {
      console.log("Erreur lors de la création du projet :", error);
    }
  };

  const inputStyles = {
    input: "px-2 py-1 text-gray-400 bg-foreground focus:gray-blue-800",
    inputWrapper:
      "bg-transparent border-2 border-gray-500 hover:border-gray-300 focus-within:border-primary rounded-md transition-all duration-300 ease-in-out",
  };

  const toggleExpand = () => setIsExpanded(!isExpanded);

  return (
    <div
      className={`nightMode bg-foreground rounded-md p-5 flex flex-col transition-all duration-300 ease-in-out ${
        isExpanded
          ? "fixed inset-0 z-50 overflow-auto bg-black bg-opacity-50 backdrop-blur-sm"
          : "relative w-full "
      }`}
    >
      <div className="absolute bottom-2 right-5 z-10">
        <button
          onClick={toggleExpand}
          className="text-primary hover:text-primary-dark transition-colors duration-200"
          aria-label={
            isExpanded ? "Réduire le formulaire" : "Agrandir le formulaire"
          }
        >
          {isExpanded ? <FaCompress size={24} /> : <FaExpand size={24} />}
        </button>
      </div>
      <div
        className={`flex flex-col gap-4 ${
          isExpanded ? "h-full" : "lg:flex-row"
        }`}
      >
        <div className={`${isExpanded ? "flex-grow" : "lg:w-1/3"}`}>
          <FileInput onChange={(files) => setImages(files)} />
        </div>
        <div
          className={`space-y-4 ${
            isExpanded ? "flex-grow flex flex-col" : "lg:w-2/3"
          }`}
        >
          <Input
            type="text"
            placeholder="Titre du projet"
            onChange={(e) => setProject({ ...project, title: e.target.value })}
            name="title"
            classNames={inputStyles}
            variant="bordered"
            className={isExpanded ? "flex-grow" : ""}
          />
          <Textarea
            placeholder="Description du projet"
            name="content"
            onChange={(e) =>
              setProject({ ...project, description: e.target.value })
            }
            classNames={inputStyles}
            variant="bordered"
            minRows={isExpanded ? 10 : 3}
            maxRows={isExpanded ? 20 : 10}
            className={isExpanded ? "flex-grow" : ""}
          />
         < LinkAdder onChange={links => setProject({...project, projectsLinks: links})} />
          <div className="flex justify-start mt-5">
            <Buttons
              text="Créer un projet"
              style="form"
              className="bg-primary w-auto"
              onClick={createProject}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProjectForm;

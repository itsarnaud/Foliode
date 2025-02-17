"use client";

import FileInput  from "@/components/UI/FileInput";
import Buttons    from "@/components/UI/button";
import LinkAdder  from "../UI/LinkAdder";

import { useState }             from "react";
import { Input, Textarea }      from "@heroui/react";
import { Project }              from "@/interfaces/Project";
import { apiPost }              from "@/utils/apiRequester";
import { useProjects }          from "@/utils/store";
import { FaExpand, FaCompress } from "react-icons/fa";

function ProjectForm() {
  const { projects, setProjects } = useProjects();
  const [project, setProject] = useState<Project>({
    title: "",
    description: "",
    projectsLinks: [],
    images: [],
    projectsImages: [],
    links: []
  });
  const [images, setImages] = useState<File[]>([]);
  const [isExpanded, setIsExpanded] = useState(false);

  const createProject = async () => {
    const data = new FormData();
    data.append("json", JSON.stringify(project));

    images.forEach((image, index) => {
      data.append(`images[${index}]`, image);
    });

    try {
      const response = await apiPost("project", data, "multipart/form-data");
      if (response.status === 201) {
        setProjects([...projects, response.data]);
      }
    } catch (error) {
      console.log("Erreur lors de la création du projet :", error);
    }
  };

  const toggleExpand = () => setIsExpanded(!isExpanded);

  const inputStyles = {
    input: "px-2 py-1 text-gray-400 bg-[#f5f5f5] dark:bg-[#191919]",
    inputWrapper:
      "bg-transparent border-2 border-gray-500 hover:border-gray-300 focus:border-primary rounded-md transition-all duration-300 ease-in-out",
  };

  return (
    <div
      className={`bg-[#f5f5f5] dark:bg-[#191919] rounded-md p-5 flex flex-col transition-all duration-300 ease-in-out ${
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

      <>
        {isExpanded ? (
          <div className="space-y-4  lg:w-1/2 m-auto ">
            <div className="p-4 border bg-[#FFFF] dark:bg-[#191919] rounded-lg space-y-2 m-8 p4">
              <div className="space-y-5">
                <Input
                  label="Titre du projet"
                  value={project.title}
                  onChange={(e) =>
                    setProject({ ...project, title: e.target.value })
                  }
                  classNames={inputStyles}
                  variant="bordered"
                  className={isExpanded ? "flex-grow" : ""}
                />
                <Textarea
                  label="Description"
                  value={project.description}
                  onChange={(e) =>
                    setProject({ ...project, description: e.target.value })
                  }
                  classNames={inputStyles}
                  variant="bordered"
                  className={isExpanded ? "flex-grow" : ""}
                />
                <LinkAdder
                  onChange={(links) =>
                    setProject({ ...project, projectsLinks: links })
                  }
                />
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Images du projet
                  </label>
                  <FileInput
                    files={images}
                    onChange={(files) => setImages(files)}
                  />
                  <p className="text-sm text-ray-500 mt-1">
                    Format recommandé : PNG ou JPG, max 2MB
                  </p>
                </div>

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
        ) : (
          <div
            className={`flex flex-col gap-4 ${
              isExpanded ? "h-full" : "lg:flex-row"
            }`}
          >
            <div className={`${isExpanded ? "flex-grow" : "lg:w-1/3"}`}>
              <FileInput
                files={images}
                onChange={(files) => setImages(files)}
              />
            </div>
            <div
              className={`space-y-4 ${
                isExpanded ? "flex-grow flex flex-col" : "lg:w-2/3"
              }`}
            >
              <Input
                type="text"
                placeholder="Titre du projet"
                onChange={(e) =>
                  setProject({ ...project, title: e.target.value })
                }
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
              <LinkAdder
                onChange={(links) =>
                  setProject({ ...project, projectsLinks: links })
                }
              />
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
        )}
      </>
    </div>
  );
}

export default ProjectForm;

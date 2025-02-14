"use client";
import { apiDelete, apiGetWithAuth } from "@/utils/apiRequester";
import { formatImage }               from "@/utils/formatImage";
import { useProjects }               from "@/utils/store";
import { RiDeleteBin5Fill }          from "react-icons/ri";
import { FaPencilAlt }               from "react-icons/fa";
import { useState }                  from "react";

import {
  Card,
  CardBody,
  CardHeader,
  Image,
  Link,
  Divider
} from "@heroui/react";

import React, { useEffect} from "react";
import ProjectUpdate       from "../form/ProjectUpdate";

function Projects() {
  const { projects, setProjects } = useProjects();

  const [editionMode, setEditionMode] = useState<{ [key: string]: boolean }>({});

  useEffect(() => {
    fetchProjects();
  }, []);

  const deleteProject = async (id: string) => {
  const isConfirmed = window.confirm("Êtes-vous sûr de vouloir supprimer ce projet ?");
  if (isConfirmed) {
    await apiDelete(`project/${id}`);
    setProjects(projects.filter((project) => project.id !== id));
  }
};

  const fetchProjects = async () => {
    const response = await apiGetWithAuth("projects");

    if (response.status == 200) {
      setProjects(response.data);
    }
  };

  const toggleEdition = (projectId: string) => {
    setEditionMode((prev) => ({
      ...prev,
      [projectId]: !prev[projectId]
    }));
  };
  return (
    <>

      {projects.length !== 0 &&
        projects.map((project, key) => (
          <div key={key}>
            {editionMode[project.id] ? (
              <ProjectUpdate project={project} />
            ) : (
            <>
            <Card className="py-4 relative w-full sm:w-[300px] h-max" key={key}>
              <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
                <div className="flex w-full items-center justify-between mb-1">
                  <h4 className="text-large uppercase font-bold">{project.title}</h4>
                  <div className="flex items-center gap-2">
                    <button onClick={() => toggleEdition(project.id)}>
                      <FaPencilAlt className="text-primary duration-200 hover:text-primary-200 hover:scale-110" />
                    </button>
                    <button onClick={() => deleteProject(project.id)}>
                      <RiDeleteBin5Fill className="text-red-500 duration-200 hover:text-red-700 hover:scale-110" />
                    </button>
                  </div>
                </div>
                <Divider />
                <div className="my-1 w-full flex flex-col">
                  {project.projectsLinks.map((link, index) => (
                    <Link key={index} showAnchorIcon href={`${link.url}`} className="!text-primary !text-sm">
                      {link.name}
                    </Link>
                  ))}
                </div>
                <p className="text-tiny break-all">{project.description}</p>
              </CardHeader>
              {project.projectsImages && project.projectsImages.length > 0 && (
                <CardBody className="overflow-visible py-2">
                  <Image
                    src={formatImage(project.projectsImages[0].img_src)}
                    className="object-cover rounded-xl w-full sm:w-[270px]"
                  />
                </CardBody>
              )}
              </Card>
            </>
            )}
          </div>
        ))}
    </>
  );
}

export default Projects;

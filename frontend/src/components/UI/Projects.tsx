"use client";
import { apiDelete, apiGetWithAuth } from "@/utils/apiRequester";
import { formatImage } from "@/utils/formatImage";
import { useProjects } from "@/utils/store";
import { RiDeleteBin5Fill } from "react-icons/ri";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Image,
} from "@nextui-org/react";
import React, { useEffect} from "react";

function Projects() {
  const { projects, setProjects } = useProjects();
  useEffect(() => {
    fetchProjects();
  }, []);

  const deleteProject = async (id: string) => {
    await apiDelete(`project/${id}`);
    setProjects(projects.filter((project) => project.id !== id));
  };

  const fetchProjects = async () => {
    const response = await apiGetWithAuth("projects");

    if (response.status == 200) {
      setProjects(response.data);
    }
  };
  return (
    <>
      {projects.length !== 0 &&
        projects.map((project, key) => (
          <Card key={key}>
            {" "}
            <CardHeader>
              {" "}
              <h1 className="text-xl text-white font-bold">{project.title}</h1>
            </CardHeader>
            <CardBody>
              <div className="flex space-x-2">
                <div
                  className={`w-1/2 grid gap-1 ${
                    project.projectsImages?.length == 1
                      ? ""
                      : " grid-cols-2 grid-rows-2"
                  }`}
                >
                  {project.projectsImages !== undefined &&
                    project.projectsImages.map((image, key) => (
                      <Image
                        key={key}
                        src={formatImage(image.img_src)}
                        width={150}
                        height={100}
                        className="object-cover w-full rounded-none"
                      />
                    ))}
                </div>
                <p className="text-sm w-1/2 line-clamp-2 ">
                  {project.description}
                </p>
              </div>
            </CardBody>
            <CardFooter>
              <Button
                className="bg-red-700"
                onPress={() => deleteProject(project.id)}
              >
                <RiDeleteBin5Fill />
              </Button>
            </CardFooter>
          </Card>
        ))}
    </>
  );
}

export default Projects;

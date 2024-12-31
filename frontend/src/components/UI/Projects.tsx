"use client";
import { Project } from "@/interfaces/Project";
import { apiGetWithAuth } from "@/utils/apiRequester";
import { formatImage } from "@/utils/formatImage";
import { RiDeleteBin5Fill } from "react-icons/ri";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Image,
} from "@nextui-org/react";
import React, { useEffect, useState } from "react";

function Projects() {
  const [projects, setProjects] = useState<Project[]>([]);
  useEffect(() => {
    fetchProjects();
  }, []);

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
                  {project.projectsImages !== null &&
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
              <Button  className="bg-red-700">
                <RiDeleteBin5Fill />
              </Button>
            </CardFooter>
          </Card>
        ))}
    </>
  );
}

export default Projects;

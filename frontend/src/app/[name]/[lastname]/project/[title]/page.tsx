import React from "react";
import { apiGet } from "@/utils/serverApiRequester";
import { Portfolio } from "@/interfaces/Portfolio";
import ProjectPage from "@/components/template/banto/ProjectPage";
async function page({
  params,
}: {
  params: { name: string; lastname: string; title: string };
}) {
  const response = await apiGet(
    `public/portfolio/${params.name}/${params.lastname}`
  );
  const portfolio: Portfolio = response.data;
  const project = portfolio.projects.find(
    (project) => project.title === params.title
  );

  if (!project) {
    return <div>Project not found</div>;
  }

  if (portfolio.template === "banto") {
    return <ProjectPage project={project} portfolio={portfolio} />;
  }
}

export default page;

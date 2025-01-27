import React       from "react";
import ProjectPage from "@/components/template/banto/ProjectPage";

import { apiGet }     from "@/utils/serverApiRequester";
import { Portfolio }  from "@/interfaces/Portfolio";

async function Page({
  params,
}: {
  params: { username: string; title: string };
}) {
  const response = await apiGet(
    `public/portfolio/${params.username}`
  );
  const portfolio: Portfolio = response.data;
  const project = portfolio.projects.find(
    (project) => project.title === params.title
  );

  if (!project) {
    return <div>Project not found</div>;
  }

  if (portfolio.template === "banto") {
    return <ProjectPage 
    project={{ 
      ...project, 
      projectsImages: project.projectsImages || [] 
    }} 
    portfolio={portfolio} 
  />;
  }
}

export default Page;

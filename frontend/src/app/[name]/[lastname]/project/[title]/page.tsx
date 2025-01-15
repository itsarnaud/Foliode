import React from "react";
import { apiGet } from "@/utils/serverApiRequester";
import { Portfolio } from "@/interfaces/Portfolio";
import BantoProjectPage from "@/components/template/banto/ProjectPage";
import EmeraldProjectPage from "@/components/template/emerald/ProjectPage";
import PrestigeNoirProjectPage from "@/components/template/PrestigeNoir/ProjectPage";

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

  switch (portfolio.template) {
    case "banto":
      return <BantoProjectPage project={project} portfolio={portfolio} />;
    case "emerald":
      return <EmeraldProjectPage project={project} portfolio={portfolio} />;
    case "prestige":
      return <PrestigeNoirProjectPage project={project} portfolio={portfolio} />;
    default:
      return <div>Template non supporté</div>;
  }
}

export default page;
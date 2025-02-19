"use client";

import DashboardTitle from "@/components/DashboardTitle";
import FourStepForm   from "@/components/form/multistepform/FourStepForm";

import { useEffect }    from "react";
import { useMultiStep } from "@/utils/store";
import { apiPut }       from "@/utils/apiRequester";
import {Link} from "@heroui/react";

export default function Projects() {
  const { portfolio, setPortfolio } = useMultiStep();

  const handleTemplateChange = async () => {
    try {
      await apiPut("portfolio", {
        template: portfolio.template,
        config: portfolio.config,
      }, "application/json");
    } catch (error) {
      console.error("Erreur lors de la mise à jour du template:", error);
    }
  };

  useEffect(() => {
    if (portfolio.template) {
      handleTemplateChange();
    }
  }, [portfolio.template, portfolio.config]);

  return (
    <>

      <DashboardTitle title="Portfolio " />
      <div className="p-4">
        <Link href={portfolio.url} >{portfolio.title}</Link>
      </div>

      <div className="p-4">
        <FourStepForm />
      </div>
    </>
  );
}
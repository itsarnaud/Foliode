"use client";
import DashboardTitle from "@/components/DashboardTitle";
import FourStepForm from "@/components/form/multistepform/FourStepForm";
import { useEffect } from "react";
import { useMultiStep } from "@/utils/store";
import { apiPut } from "@/utils/apiRequester";
import NavbarEdit from "@/components/NavbarEdit";
import { useRouter } from 'next/router';
import PortfolioPage from "@/app/[name]/[lastname]/page";
import Interface1 from "@/app/dashboard/edit/portfolioPres/Interface1";
import Interface2 from "@/app/dashboard/edit/portfolioWeb/Interface2";


export default function Projects() {
  
  /*const router = useRouter();
  const { pathname } = router;

  const renderContent = () => {
    switch (pathname) {
      case '/dashboard/edit/portfolioPres':
        return <Interface1/>;
      case '/dashboard/edit/portfolioWeb':
        return <Interface2 />;
      default:
        return <FourStepForm />;
    }
  };*/

 

  return (
    <>
    
     <DashboardTitle title="Modifier le template" />

     <NavbarEdit/>

     
    </>




     
     
    
  );
}
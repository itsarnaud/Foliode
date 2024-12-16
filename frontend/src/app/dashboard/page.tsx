'use client';

import { Card } from "@nextui-org/react";
import { CiDatabase } from "react-icons/ci";
import { FaGithub, FaDribbble, FaGraduationCap, FaProjectDiagram } from "react-icons/fa";
import CustomCard from "../../components/UI/card";
import LargeCard from "../../components/UI/card";
import GrandeCard from "../../components/UI/card";
import DashboardTitle  from "@/components/DashboardTitle"
type LocalCardVariant = 'gradient' | 'default';

export default function Dashboard() {
  const cardData: { 
    title: string; 
    description: string; 
    iconComponent: React.ReactNode; 
    variant: LocalCardVariant; 
    isLargeDescription?: boolean;
    buttonText?: string;
    subDescription?: string;
  }[] = [
    {
      title: "Votre note",
      description: "18/20",
      iconComponent: <CiDatabase size={40} />,
      variant: 'gradient',
      isLargeDescription: true,
      subDescription: "Moyenne de la classe : ..." 
    },
    {
      title: "Votre compte GitHub", 
      description: "Statut : ",
      iconComponent: <FaGithub size={40} />,
      variant: 'default',
      buttonText: "Lier" 
    },
    {
      title: "Votre compte Dribble",
      description: "Statut : ",
      iconComponent: <FaDribbble size={40} />,
      variant: 'default',
      buttonText: "Lier" 
    },
    {
      title: "Votre formation",
      description: "MMI3",
      iconComponent: <FaGraduationCap size={40} />,
      variant: 'default',
      isLargeDescription: true,
      subDescription: "classe" 

    },
    {
      title: "Nombre de projet",
      description: "4",
      iconComponent: <FaProjectDiagram size={40} />,
      variant: 'default',
      isLargeDescription: true
    }
  ];

  return (
    <>
    <DashboardTitle title="Tableau de bord" email="john.doe@example.com" />

    <div className="min-h-screen w-full bg-background text-foreground p-4 md:p-6 lg:p-8">

      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 mb-6">
        {cardData.map((card, index) => (
          <CustomCard
            key={index}
            variant={card.variant}
            title={card.title}
            description={card.description}
            iconComponent={card.iconComponent}
            isLargeDescription={card.isLargeDescription}
            buttonText={card.buttonText}
            subDescription={card.subDescription} 
          />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
    <LargeCard
        title=""
        description="Couleur de votre portofolio"
        variant="default"
        onClick={() => console.log('clicked')}
        className="w-full h-auto min-h-[275px] relative"
    />

    <LargeCard
        title=""
        description="Typographie de votre portfolio"
        variant="default"
        onClick={() => console.log('clicked')}
        className="w-full h-auto min-h-[275px] relative"
    />
</div>
      <div className="flex justify-center items-center mt-6 w-full">
        <GrandeCard
        variant="default"
        title=""
        description="Apprentissage critique choisie"
        className="w-full lg:w-[100%] h-auto min-h-[275px]"
        />
          </div>
    </div>
    </>
  );
}
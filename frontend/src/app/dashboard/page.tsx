'use client';

import { Card } from "@nextui-org/react";
import { CiDatabase } from "react-icons/ci";
import { FaGithub, FaDribbble, FaGraduationCap, FaProjectDiagram } from "react-icons/fa";
import CustomCard from "../../components/UI/card";
import LargeCard from "../../components/UI/card";
import GrandeCard from "../../components/UI/card";
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
    <div className="min-h-screen w-full bg-background text-foreground p-4 md:p-6 lg:p-8">
      <h1 className="text-xl md:text-2xl lg:text-3xl font-bold mb-6">
        Tableau de bord
      </h1>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 lg:gap-6 mb-6">
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

      <div className="flex flex-col lg:flex-row gap-4 lg:gap-6">
        <LargeCard
          title=""
          description="Couleur de votre portofolio"
          variant="default"
          onClick={() => console.log('clicked')}
          className="w-full lg:w-[55%] h-auto min-h-[275px]"
        />

        <LargeCard
          title=""
          description="Typographie de votre portfolio"
          variant="default"
          onClick={() => console.log('clicked')}
          className="w-full lg:w-[45%] h-auto min-h-[275px]"
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
  );
}
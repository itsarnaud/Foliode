

'use client';

import { Card } from "@nextui-org/react";
import { CiDatabase } from "react-icons/ci";
import { FaGithub, FaDribbble, FaGraduationCap, FaProjectDiagram } from "react-icons/fa";
import CustomCard, { LargeCard, GrandeCard } from "../../components/UI/card";
import DashboardTitle from "@/components/DashboardTitle";
import { getDecodedToken } from "@/utils/jwtUtils";
import { useUser } from "@/utils/store";
import { useEffect } from "react";

type LocalCardVariant = 'gradient' | 'default';

export default function Dashboard() {
  const { user, setUser } = useUser();

  useEffect(() => {
    const token = getDecodedToken();
    if (user === null && token !== null) {
      setUser(token);
    }
  }, [user]);

  const cardData: {
    title: string;
    description: string;
    iconComponent: React.ReactNode;
    variant: LocalCardVariant;
    isLargeDescription?: boolean;
    buttonText?: string;
    subDescription?: string;
    status?: boolean;
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
      status: Boolean(user?.github_login),
      iconComponent: <FaGithub size={40} />,
      variant: 'default',
      buttonText: "Lier",
    },
    {
      title: "Votre compte Dribbble",
      description: "Statut : ",
      status: Boolean(user?.dribbble_login),
      iconComponent: <FaDribbble size={40} />,
      variant: 'default',
      buttonText: "Lier",
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
      <DashboardTitle title="Tableau de bord" />

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
              status={card.status}
            />
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <LargeCard
            description="Couleur de votre portofolio"
            variant="default"
            onClick={() => console.log('clicked')}
            className="w-full h-auto min-h-[275px] relative"
          />

          <LargeCard
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
            className="w-full h-auto min-h-[275px] relative"
          />
        </div>
      </div>
    </>
  );
}
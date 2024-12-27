import React from "react";
import Image from "next/image";
import NavPortfolio from "@/components/UI/navportfolio";
import { Portfolio } from "@/interfaces/Portfolio";

const EmeraldFlow = ({ portfolio }: { portfolio: Portfolio }) => {
  return (
    <main className="min-h-screen bg-portfolio-green-primary text-portfolio-green-text-primary">
      <NavPortfolio className="custom-navbar-class" justify="end" />
      {/* Hero Section */}
      <section className="h-screen flex items-center justify-center">
        <h1 className="font-bold text-9xl">{portfolio.title}</h1>
      </section>

      {/* About Section */}
      <section
        id="quiJeSuis"
        className="py-20 px-4 bg-portfolio-green-secondary"
      >
        <div className="flex  flex-col md:flex-row gap-6">
          <div className="flex-1">
            <h2 className="text-6xl font-bold text-portfolio-green-text-secondary">
              Bonjour,je suis  {portfolio.users.firstName} 
            </h2>
            <h3 className="text-2xl mt-4 text-portfolio-green-text-secondary">
              {portfolio.subtitle}
            </h3>
            <p className="mt-4 text-base text-portfolio-green-text-secondary">
              {portfolio.bio}
            </p>
          </div>
          <div className="w-full md:w-1/2">
            <div className="aspect-video bg-gray-200 rounded">
              < Image src={portfolio.users.avatar_url ? portfolio.users.avatar_url : ''} alt={`avatar of ${portfolio.users.firstName}`} width={200} height={200}/>
            </div> 
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section className="py-20 px-4 ">
        <h2 className="text-3xl font-bold mb-10 text-portfolio-green-text-primary">
          Mes Projets
        </h2>

        <div className=" gap-8">
          {portfolio.projects.map((project) => (
            <div className="flex flex-col md:flex-row gap-6 bg-portfolio-green-accent p-6 rounded-lg shadow">
              <div className="flex-1">
                <h3 className="text-2xl font-semibold text-portfolio-green-text-secondary">
                  {project.title}
                </h3>
                
                <p className="mt-4 text-portfolio-green-text-secondary">
                  
                {project.description}
                </p>
                <a
                  href="#"
                  className=" hover:underline mt-4 inline-block bg-portfolio-green-text-secondary text-portfolio-green-text-primary py-2.5 px-6 rounded-full underline"
                >
                  Voir le Projet
                </a>
              </div>
              <div className="w-full md:w-1/2">
                <div className="aspect-video bg-gray-200 rounded">
                
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Skills Section */}
      <section className="py-20 px-4 bg-portfolio-green-secondary">
        <h2 className="text-5xl font-bold mb-10 text-portfolio-green-text-secondary">
          Compétences
        </h2>
        <div className="flex flex-wrap gap-6">
          <div className="p-4 bg-portfolio-green-primary shadow rounded-xl flex items-center gap-4">
            <div className=" p-1 rounded-lg bg-white">
              {/* Correction ici: ajout du = manquant */}
              <Image
                src="/next.svg"
                width={0}
                height={0}
                alt=""
                style={{ width: "35px", height: "35px" }}
              />
            </div>
            <div>
              <h3 className="font-semibold text-base">Figma</h3>
              <p className="text-portfolio-green-accent text-base">
                Graphisme, maquetage, webdesign.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default EmeraldFlow;

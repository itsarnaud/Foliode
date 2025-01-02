import React from "react";
import { Image } from "@nextui-org/react";
import { Portfolio } from "@/interfaces/Portfolio";
import { generateAvatar } from "@/utils/generateAvatar";
import { formatImage } from "@/utils/formatImage";
import Link from "next/link";

const PrestigeNoir = ({ portfolio }: { portfolio: Portfolio }) => {
  const { primary, secondary, warning, success, info, light } =
    portfolio.config.colors;
  const avatar = portfolio.users.avatar_url;
  const email = portfolio.users.email;

  return (
    <main
      className="min-h-screen bg-portfolio-gold-primary text-portfolio-gold-text-primary"
      style={{
        background: `linear-gradient(to bottom right, ${light}, ${primary})`,
      }}
    >
      {/* Hero Section */}
      <section className="h-screen flex items-center justify-center">
        <h1 className="font-bold text-9xl" style={{ color: secondary }}>
          {" "}
          {portfolio.title}
        </h1>
      </section>

      {/* About Section */}
      <section
        id="quiJeSuis"
        className="py-20 px-4"
        style={{ backgroundColor: secondary }}
      >
        <div className="flex  flex-col md:flex-row gap-6">
          <div className="flex-1">
            <h2
              className="text-6xl font-bold text-portfolio-gold-text-primary  text-center"
              style={{ color: light }}
            >
              Bonjour,je suis{" "}
              <span className="uppercase">{portfolio.users.firstname}</span>
            </h2>
            {/* <h3 className="text-2xl mt-8 text-portfolio-gold-text-primary  text-center">
              Etudiant en BUT métiers du multimédia et de l'internet
            </h3> */}
            <p
              className="mt-8 text-base text-portfolio-gold-text-primary max-w-[832px] text-center mx-auto"
              style={{ color: light }}
            >
              {portfolio.bio}
            </p>
          </div>

          <Image
            src={avatar ? avatar : generateAvatar(50, email)}
            alt={`avatar of ${portfolio.users.firstname}`}
            width={256}
            height={256}
            className="object-cover"
          />
        </div>
      </section>

      {/* Projects Section */}
      <section className="py-20 px-4">
        <h2
          className="text-3xl font-bold mb-10 text-center"
          style={{ color: secondary }}
        >
          Mes Projets
        </h2>

        {/* Timeline container */}
        <div className="relative max-w-6xl mx-auto">
          {/* Ligne centrale */}
          <div className="absolute left-4 md:left-1/2 h-full w-px bg-portfolio-gold-accent transform -translate-x-1/2"></div>

          {/* Premier projet */}
          <div className="relative mb-16">
            <div className="absolute  md:left-1/2 -mt-2 px-3 py-1 rounded-full bg-portfolio-gold-secondary border border-portfolio-gold-accent transform -translate-x-1/2">
              1
            </div>
            <div className="ml-12 md:w-5/12 md:ml-0">
              <div className="bg-portfolio-gold-secondary border border-portfolio-gold-accent p-6 ">
                <h3 className="text-xl font-bold">Projet 1</h3>
                <div className="text-sm text-portfolio-gold-text-primary mt-2">
                  <span>Début: 01/2023</span> - <span>Fin: 06/2023</span>
                </div>
                <p className="mt-4">Description du projet 1</p>
                <a
                  href="#"
                  className="mt-4 inline-block px-6 py-2 bg-portfolio-gold-primary text-portfolio-gold-text-primary hover:bg-opacity-90"
                >
                  Voir le projet
                </a>
              </div>
            </div>
          </div>

          {/* Deuxième projet */}
          <div className="relative mb-16">
            <div className="absolute  md:left-1/2 -mt-2 px-3 py-1 rounded-full bg-portfolio-gold-secondary border border-portfolio-gold-accent transform -translate-x-1/2">
              2
            </div>
            <div className="ml-12 md:w-5/12 md:ml-auto">
              <div className="bg-portfolio-gold-secondary border border-portfolio-gold-accent p-6 shadow-lg">
                <h3 className="text-xl font-bold">Projet 2</h3>
                <div className="text-sm text-portfolio-gold-text-primary mt-2">
                  <span>Début: 07/2023</span> - <span>Fin: 12/2023</span>
                </div>
                <p className="mt-4">Description du projet 2</p>
                <a
                  href="#"
                  className="mt-4 inline-block px-6 py-2 bg-portfolio-gold-primary text-portfolio-gold-text-primary hover:bg-opacity-90"
                >
                  Voir le projet
                </a>
              </div>
            </div>
          </div>

          {/* Troisième projet */}
          <div className="relative mb-16">
            <div className="absolute  md:left-1/2 -mt-2 px-3 py-1 rounded-full bg-portfolio-gold-secondary border border-portfolio-gold-accent transform -translate-x-1/2">
              3
            </div>
            <div className="ml-12 md:w-5/12 md:ml-0">
              <div className="bg-portfolio-gold-secondary border border-portfolio-gold-accent p-6 ">
                <h3 className="text-xl font-bold">Projet 3</h3>
                <div className="text-sm text-portfolio-gold-text-primary mt-2">
                  <span>Début: 01/2023</span> - <span>Fin: 06/2023</span>
                </div>
                <p className="mt-4">Description du projet 1</p>
                <a
                  href="#"
                  className="mt-4 inline-block px-6 py-2 bg-portfolio-gold-primary text-portfolio-gold-text-primary hover:bg-opacity-90"
                >
                  Voir le projet
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section className="py-20 px-4 bg-portfolio-gold-secondary">
        <h2
          className="text-7xl  mb-10 text-portfolio-gold-text-primary text-center "
          style={{ color: light }}
        >
          Compétences
        </h2>
        <div className="flex flex-wrap gap-6 justify-center">
          {portfolio.tools.map((tool) => (
            <div className="p-4 bg-portfolio-gold-text-primary shadow  flex items-center gap-4" style={{ backgroundColor: light, opacity: 0.75 }}>
              <div
                className=" p-1 rounded-lg bg-white"
                style={{ backgroundColor: secondary }}
              >
                {/* Correction ici: ajout du = manquant */}
                <Image
                  src={formatImage(tool.picto)}
                  width={40}
                  height={40}
                  alt="Figma logo"
                />
              </div>
              <div>
                <h3
                  className="font-semibold text-portfolio-gold-secondary"
                  style={{ color: secondary }}
                >
                  {tool.name}
                </h3>
                {/* <p className=" text-portfolio-gold-accent">
                Graphisme, maquetage, webdesign.
              </p> */}
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
};

export default PrestigeNoir;

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
        background: `linear-gradient(to bottom right, ${primary}, ${primary})`,
      }}
    >
      {/* Hero Section */}
      <section className="h-screen flex items-center justify-center">
        <h1
          className="font-bold text-7xl md:text-9xl"
          style={{ color: secondary }}
        >
          {" "}
          {portfolio.title}
        </h1>
      </section>

      {/* About Section */}
      <section
        id="quiJeSuis"
        className="py-20 px-4"
        style={{ backgroundColor: primary }}
      >
        <div className="flex  flex-col items-center gap-6">
          <div className="flex-1">
            <h2
              className="text-6xl font-bold text-portfolio-gold-text-primary  text-center"
              style={{ color: success }}
            >
              Bonjour,je suis{" "}
              <span className="uppercase">{portfolio.users.firstname}</span>
            </h2>
            {/* <h3 className="text-2xl mt-8 text-portfolio-gold-text-primary  text-center">
              Etudiant en BUT métiers du multimédia et de l'internet
            </h3> */}
            <p
              className="mt-8 text-base text-portfolio-gold-text-primary max-w-[832px] text-center mx-auto"
              style={{ color: success }}
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
        <div className="max-w-6xl mx-auto">
          <h2
            className="text-5xl md:text-7xl mb-12 text-center"
            style={{ color: secondary }}
          >
            Mes Projets
          </h2>
          <div className="space-y-16">
            {portfolio.projects.map((project, index) => (
              <div key={index} className="relative">
                {" "}
                {/* Changement ici: key={index} au lieu de key={project.id} */}
                <div
                  className="absolute md:left-1/2 -mt-2 px-3 py-1 rounded-full border transform -translate-x-1/2 z-10"
                  style={{
                    backgroundColor: light,
                    borderColor: info,
                    color: secondary,
                  }}
                >
                  {index + 1}
                </div>
                <div
                  className="absolute left-4 md:left-1/2 h-[120%] w-px bg-portfolio-gold-secondary transform -translate-x-1/2 z-0"
                  style={{ backgroundColor: info }}
                ></div>
                <div
                  className={`flex flex-col md:w-5/12 ${
                    index % 2 === 0 ? "ml-12 md:ml-0" : "ml-12 md:ml-auto"
                  }`}
                >
                  <div
                    className="p-6 border"
                    style={{ backgroundColor: light, borderColor: info }}
                  >
                    <h3
                      className="text-xl font-bold"
                      style={{ color: secondary }}
                    >
                      {project.title}
                    </h3>
                    <p className="mt-4" style={{ color: secondary }}>
                      {project.description}
                    </p>
                    <Link
                      href={`/${portfolio.users.firstname}/${portfolio.users.name}/project/${project.title}`}
                      className="mt-4 inline-block px-6 py-2 hover:bg-opacity-90"
                      style={{ backgroundColor: primary, color: secondary }}
                    >
                      Voir le projet
                    </Link>
                    <div className="mt-4 aspect-video rounded-xl overflow-hidden shadow-md">
                      <Image
                        src={formatImage(project.projectsImages[0].img_src)}
                        alt={project.title}
                        width={1000}
                        height={500}
                        className="object-cover w-full h-full transform hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section className="py-20 px-4 mt-10" style={{ backgroundColor: light }}>
        <h2
          className="text-5xl md:text-7xl  mb-10 text-portfolio-gold-text-primary text-center "
          style={{ color: secondary }}
        >
          Compétences
        </h2>
        <div className="flex flex-wrap gap-6 justify-center">
          {portfolio.tools.map((tool, index) => (
            <div
              key={index} // Ajout de la prop key
              className="p-4 bg-portfolio-gold-text-primary shadow flex items-center gap-4"
              style={{ backgroundColor: secondary }}
            >
              <div>
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
                  style={{ color: light }}
                >
                  {tool.name}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
};

export default PrestigeNoir;

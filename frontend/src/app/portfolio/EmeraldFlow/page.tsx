import React from "react";
import Image from "next/image";
import NavPortfolio from "@/components/UI/navportfolio";

const PortfolioLayout = () => {
  return (
    <main className="min-h-screen bg-portfolio-green-primary text-portfolio-green-text-primary">
     <NavPortfolio className="custom-navbar-class" justify="end" />
      {/* Hero Section */}
      <section className="h-screen flex items-center justify-center">
        <h1 className="font-bold text-9xl">Portfolio</h1>
      </section>

      {/* About Section */}
      <section id="quiJeSuis" className="py-20 px-4 bg-portfolio-green-secondary">
        <div className="flex  flex-col md:flex-row gap-6">
          <div className="flex-1">
            <h2 className="text-6xl font-bold text-portfolio-green-text-secondary">
              Bonjour,je suis Timothé Hege{" "}
            </h2>
            <h3 className="text-2xl mt-4 text-portfolio-green-text-secondary">
              Etudiant en BUT métiers du multimédia et de l'internet
            </h3>
            <p className="mt-4 text-base text-portfolio-green-text-secondary">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime
              mollitia, molestiae quas vel sint commodi repudiandae consequuntur
              voluptatum laborum numquam blanditiis harum quisquam eius sed odit
              fugiat iusto fuga praesentium optio, eaque rerum! Provident
              similique accusantium nemo autem. Veritatis obcaecati tenetur iure
              eius earum ut molestias architecto voluptate aliquam nihil,
              eveniet aliquid culpa officia aut! Impedit sit sunt quaerat, odit,
            </p>
          </div>
          <div className="w-full md:w-1/2">
            <div className="aspect-video bg-gray-200 rounded">
              {/* Project Image */}
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section className="py-20 px-4 ">
        <h2 className="text-3xl font-bold mb-10 text-portfolio-green-text-primary">
          My Projects
        </h2>
        <div className=" gap-8">
          {/* Project Card */}
          <div className="flex flex-col md:flex-row gap-6 bg-portfolio-green-accent p-6 rounded-lg shadow">
            <div className="flex-1">
              <h3 className="text-2xl font-semibold text-portfolio-green-text-secondary">
                Project Title
              </h3>
              <div className="text-portfolio-green-text-secondary mt-2">
                <span>Start: 01/2023</span> - <span>End: 06/2023</span>
              </div>
              <p className="mt-4 text-portfolio-green-text-secondary">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime
                mollitia, molestiae quas vel sint commodi repudiandae
                consequuntur voluptatum laborum numquam blanditiis harum
                quisquam eius sed odit fugiat iusto fuga praesentium optio,
                eaque rerum! Provident similique accusantium nemo autem.
                Veritatis obcaecati tenetur iure eius earum ut molestias
                architecto voluptate aliquam nihil, eveniet aliquid culpa
                officia aut! Impedit sit sunt quaerat, odit,
              </p>
              <a
                href="#"
                className=" hover:underline mt-4 inline-block bg-portfolio-green-text-secondary text-portfolio-green-text-primary py-2.5 px-6 rounded-full underline"
              >
                View Project
              </a>
            </div>
            <div className="w-full md:w-1/2">
              <div className="aspect-video bg-gray-200 rounded">
                {/* Project Image */}
              </div>
            </div>
          </div>
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

export default PortfolioLayout;

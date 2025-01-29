import { Portfolio } from "@/interfaces/Portfolio";
import { Card, Image } from "@heroui/react";
import { formatImage } from "@/utils/formatImage";
import { generateAvatar } from "@/utils/generateAvatar";
import Link from "next/link";

function BantoFlow({ portfolio }: { portfolio: Portfolio }) {
  const { primary, secondary, warning, success, info, light } =
    portfolio.config.colors;

  return (
    <div
      className="bg-gradient-to-br min-h-screen font-sans p-8"
      style={{
        background: `linear-gradient(to bottom right, ${light}, ${primary})`,
      }}
    >
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 2xl:w-3/4 xl:w-5/6 m-auto">
        <Card
          className="shadow-xl rounded-xl overflow-hidden col-span-2"
          style={{ backgroundColor: secondary }}
        >
          <div className="p-6" style={{ backgroundColor: primary }}>
            <h1
              className="text-4xl font-bold mb-2 transition-colors duration-300"
              style={{ color: secondary }}
            >
              {portfolio.title}
            </h1>
            <h3
              className="text-xl transition-colors duration-300"
              style={{ color: secondary }}
            >
              {portfolio.subtitle}
            </h3>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
              <div className="w-full flex justify-center">
                <Image
                  src={
                    portfolio.users.avatar_url ||
                    generateAvatar(50, portfolio.users.email)
                  }
                  alt={portfolio.title}
                  width={250}
                  height={250}
                  className="rounded-lg  object-cover"
                />
              </div>
              <p
                className="text-lg col-span-2 leading-relaxed p-4"
                style={{ color: light }}
              >
                {portfolio.bio}
              </p>
            </div>
          </div>
        </Card>

        <Card
          className="shadow-xl rounded-xl overflow-hidden transition-all duration-300 hover:shadow-2xl"
          style={{ backgroundColor: secondary }}
        >
          <div className="p-6">
            <h2 className="text-2xl font-bold mb-4" style={{ color: light }}>
              Compétences
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {portfolio.tools.map((tool, index) => (
                <div
                  key={index}
                  className="flex flex-col items-center space-y-2 p-3"
                >
                  <Image
                    width={40}
                    height={40}
                    src={formatImage(tool.picto)}
                    className="rounded-sm"
                  />
                  <p
                    className="text-sm font-semibold text-center"
                    style={{ color: light }}
                  >
                    {tool.name}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </Card>

        {portfolio.projects.map((project, index) => (
          <Link
            href={`/${portfolio.users.username}/project/${project.title}`}
            key={index}
          >
            <Card
              className={`shadow-lg rounded-xl overflow-hidden transition-all duration-300 hover:shadow-2xl cursor-pointer ${
                index == 3 && "col-span-2 row-span-2"
              }`}
              style={{ backgroundColor: light, color: primary }}
            >
              <div className="flex flex-col h-full justify-between">
                {project.projectsImages.length !== 0 ? (
                  <Image
                    src={formatImage(project.projectsImages[0].img_src)}
                    alt=""
                    width={1000}
                    height={250}
                    className="object-cover rounded-none w-full h-28"
                  />
                ) : (
                  ""
                )}

                <div className="p-4">
                  <h3
                    className="text-2xl first-letter:uppercase font-bold mb-4"
                    style={{ color: secondary }}
                  >
                    {project.title}
                  </h3>
                  <p
                    className="text-sm mb-4 line-clamp-2"
                    style={{ color: secondary }}
                  >
                    {project.description}
                  </p>
                </div>
              </div>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default BantoFlow;

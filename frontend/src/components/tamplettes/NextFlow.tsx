import { Portfolio } from "@/interfaces/Portfolio";
import { Card, Button, Image } from "@nextui-org/react";

function NextFlow({ portfolio }: { portfolio: Portfolio }) {
  return (
    <div className="bg-gradient-to-br from-[#003049] to-[#669BBC] min-h-screen p-8 font-sans">
      <div className=" mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="bg-[#FDF0D5] shadow-xl rounded-xl overflow-hidden mb-10 col-span-2">
          <div className="bg-[#669BBC] p-6">
            <h1 className="text-4xl font-bold text-[#FDF0D5]  mb-2 transition-colors duration-300">
              {portfolio.title}
            </h1>
            <h3 className="text-xl text-[#FDF0D5] transition-colors duration-300">
              {portfolio.subtitle}
            </h3>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
              <div className="w-full flex justify-center">
                <Image
                  src={
                    portfolio.users.avatar_url ||
                    "/placeholder.svg?height=250&width=250"
                  }
                  alt={portfolio.title}
                  width={250}
                  height={250}
                  className="rounded-lg shadow-md object-cover"
                />
              </div>
              <p className="text-lg text-[#003049] col-span-2 leading-relaxed p-4">
                {portfolio.bio}
              </p>
            </div>
          </div>
        </Card>

        <Card className="bg-[#FDF0D5] shadow-xl rounded-xl overflow-hidden mb-10 transition-all duration-300 hover:shadow-2xl">
          <div className="p-6">
            <h2 className="text-2xl font-bold text-[#003049] mb-4">
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
                    src={tool.picto}
                    className="rounded-sm"
                  />
                  <p className="text-sm font-semibold text-center text-[#003049]">
                    {tool.name}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </Card>
        {portfolio.projects.map((project, index) => (
          <Card
            key={index}
            className="bg-[#003049]  shadow-lg rounded-xl overflow-hidden transition-all duration-300 hover:shadow-2xl pb-4 pt-4 cursor-pointer"
          >
            <div className=" inset-0  bg-opacity-50 flex items-end p-4 transition-opacity duration-300 opacity-100">
              <div>
                <h3 className="text-xl first-letter:uppercase font-bold text-[#FDF0D5] mb-4">
                  {project.title}
                </h3>
                <p className="text-sm text-[#FDF0D5] mb-4 line-clamp-2">
                  {project.description}
                </p>
            
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default NextFlow;

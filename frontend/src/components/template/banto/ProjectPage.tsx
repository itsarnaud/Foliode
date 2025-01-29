import { Card, Image }      from "@heroui/react";
import { formatImage }      from "@/utils/formatImage";
import { ProjectPageProps } from "@/interfaces/ProjectPageProps";

export default function ProjectPage({ portfolio, project }: ProjectPageProps) {
  const { primary, secondary, warning, success, info, light } =
    portfolio.config.colors;

  if (!project) {
    return <div>Project not found</div>;
  }

  return (
    <div
      className="bg-gradient-to-br min-h-screen font-sans p-8"
      style={{
        background: `linear-gradient(to bottom right, ${light}, ${primary})`,
      }}
    >
      <div className="max-w-6xl mx-auto">
        <Card
          className="shadow-xl rounded-xl overflow-hidden mb-8"
          style={{ backgroundColor: secondary }}
        >
          <div className="p-6" style={{ backgroundColor: primary }}>
            <h1
              className="text-4xl font-bold mb-2 transition-colors duration-300"
              style={{ color: secondary }}
            >
              {project.title}
            </h1>
          </div>
          <div className="p-6">
            <p
              className="text-lg leading-relaxed mb-6"
              style={{ color: light }}
            >
              {project.description}
            </p>
            {project.projectsImages.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                {project.projectsImages.map((image, index) => (
                  <Image
                    key={index}
                    src={formatImage(image.img_src)}
                    alt={`Project image ${index + 1}`}
                    width={500}
                    height={300}
                    className="rounded-lg object-cover w-full h-64"
                  />
                ))}
              </div>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
}

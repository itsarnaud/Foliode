import { Portfolio } from "@/interfaces/Portfolio";
import { Image } from "@heroui/react";
import { formatImage } from "@/utils/formatImage";
import Link from "next/link";
interface ProjectPageProps {
  portfolio: Portfolio;
  project:
    | {
        title: string;
        description: string;
        projectsLinks: {
          name: string;
          url: string;
        }[];
        projectsImages: { img_src: string; img_alt: string }[];
      }
    | undefined;
}

export default function ProjectPage({ portfolio, project }: ProjectPageProps) {
  const { primary, secondary, warning, success, info, light } =
    portfolio.config.colors;

  if (!project) {
    return <div>Project not found</div>;
  }

  return (
    <main className="min-h-screen w-full bg-black">
    <div 
      className="absolute inset-0 "
      style={{
        background: `linear-gradient(to bottom right, ${primary}, ${primary})`,
      }}
    />
    
    <section className="relative py-20 px-4">
      <div className="max-w-6xl mx-auto">
        {/* En-tête luxueux */}
        <div className="mb-20 text-center">
          <h1
            className="text-5xl md:text-7xl font-bold mb-8 tracking-tight"
            style={{ color: secondary }}
          >
            {project.title}
          </h1>
          <div className="flex items-center justify-center gap-4 mb-8">
            <div className="w-16 h-[1px]" style={{ backgroundColor: secondary }} />
            <div className="w-3 h-3 rotate-45" style={{ backgroundColor: secondary }} />
            <div className="w-16 h-[1px]" style={{ backgroundColor: secondary }} />
          </div>
        </div>
  
        {/* Description avec style vitrine */}
        <div
          className="p-12 rounded-2xl mb-16 backdrop-blur-xl"
          style={{ 
            backgroundColor: `${secondary}`,
            border: `1px solid ${warning}`,
            boxShadow: `0 8px 32px ${primary}`
          }}
        >
          <p 
            className="text-xl leading-relaxed"
            style={{ color: light }}
          >
            {project.description}
          </p>
        </div>
  
        {/* Galerie d'images élégante */}
        {project.projectsImages.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            {project.projectsImages.map((image, index) => (
              <div
                key={index}
                className="group relative overflow-hidden rounded-xl"
                style={{
                  border: `1px solid ${warning}22`,
                  boxShadow: `0 8px 32px ${primary}11`
                }}
              >
                <Image
                  src={formatImage(image.img_src)}
                  alt={`Project image ${index + 1}`}
                  width={500}
                  height={300}
                  className="w-full h-64 object-cover transition-transform duration-700 "
                />
              </div>
            ))}
          </div>
        )}
  
        {/* Section des liens avec style luxe */}
        {project.projectsLinks && project.projectsLinks.length > 0 && (
          <div className="mb-16">
            <h2
              className="text-2xl font-bold mb-8 text-center"
              style={{ color: secondary }}
            >
              Découvrir le projet
            </h2>
            <div className="flex flex-wrap justify-center gap-6">
              {project.projectsLinks.map((link, index) => (
                <a
                  key={index}
                  href={link.url}
                  className="px-8 py-4 rounded-full transition-all duration-500 hover:scale-105"
                  style={{ backgroundColor: primary, color: secondary }}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {link.name}
                </a>
              ))}
            </div>
          </div>
        )}
  
        {/* Bouton Retour élégant */}
        <div className="mt-16 text-center">
            <Link
            href={`/${portfolio.users.firstname}/${portfolio.users.name}`}
            className="inline-block px-10 py-4 rounded-full transition-all duration-500 hover:scale-105 relative overflow-hidden group"
            style={{
              backgroundColor: primary,
              borderColor: info,
              color: secondary,
            }}
            >
            <span className="relative z-10 group-hover:text-[var(--color-primary)] transition-colors duration-500" style={{ "--color-primary": primary } as any}>Retour au portfolio</span>
            <div 
              className="absolute inset-0 w-0 group-hover:w-full transition-all duration-500"
              style={{ background: secondary }}
            />
            </Link>
        </div>
      </div>
    </section>
  </main>
  );
}

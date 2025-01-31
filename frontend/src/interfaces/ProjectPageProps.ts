import { Portfolio } from "@/interfaces/Portfolio";

export interface ProjectPageProps {
  portfolio: Portfolio;
  project: {
    title: string;
    description: string;
    links: string[];
    projectsImages?: { img_src: string; img_alt: string }[];
    projectsLinks: { name: string; url: string; }[];
  };
}
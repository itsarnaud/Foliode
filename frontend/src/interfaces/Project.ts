export interface Project {
  id?: string;
  title: string;
  description: string;
  projectsLinks: {
    name: string;
    url: string;
  }[];
  images?: File[];
  projectsImages?: { img_src: string; img_alt: string }[];
}

export interface receivedProject {
  id: string
  title: string;
  description: string;
  projectsLinks: {
    name: string;
    url: string;
  }[];
  projectsImages: { img_src: string; img_alt: string }[] | undefined;
  links?: string[];
}

export interface ProjectUpdateProps {
  project: Project;
  onFinish?: () => void;
}
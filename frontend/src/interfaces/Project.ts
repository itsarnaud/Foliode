export interface Project {
  title: string;
  description: string;
  links: {
    name: string;
    link: string;
  }[];
  images: File[];

  projectsImages: { img_src: string; img_alt: string }[] | undefined;
}

export interface Portfolio {
  title: string;
  subtitle: string;
  bio: string;
  template: string;
  config: {
    colors: {
      primary: string;
      secondary: string;
      warning: string;
      success: string;
      info: string;
      light: string;
    };
  };
  
  users: {
    name: string;
    firstname: string;
    email: string;
    avatar_url: string | null;
  };

  projects: {
    title: string;
    description: string;
    links: string[];
    projectsImages: { img_src: string; img_alt: string }[];
  }[];
  tools: { name: string; picto: string }[];
}

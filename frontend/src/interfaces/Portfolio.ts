
import { Project } from "./Project";

export interface Portfolio {
  title: string;
  subtitle: string;
  bio: string;
  config: string[] | null;
  site: string | null;
  users: {
    name: string;
    firstName: string;
    email: string;
    avatar_url: string | null;
  };

  projects: Project[];
  tools: { name: string; picto: string }[];
}

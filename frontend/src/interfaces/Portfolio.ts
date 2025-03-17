import { receivedProject } from "./Project";
import { Promotion } from "./Promotion";

export interface Portfolio {
  title: string;
  subtitle: string;
  bio: string;
  template: string;
  url: string;
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
    lastname: string;
    firstname: string;
    username: string;
    email: string;
    avatar_url: string | null;
    promotion: Promotion | null;
  };

  projects: receivedProject[];
  tools: { name: string; picto: string }[];
}

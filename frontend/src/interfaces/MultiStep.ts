import { Project } from "@/interfaces/Project";
import { Tools } from "@/interfaces/Tools";
import { colors } from "./Colors";

export interface MultiStep {
  portfolio: {
    title: string;
    subtitle: string;
    bio: string;
    template: string;
    config: {
      colors: colors | null;
    };
  };
  tools: Tools[];
  projects: Project[];
}

export interface MsPortfolio {
  title: string;
  url: string, 
  subtitle: string;
  bio: string;
  template: string;
  config: {
    colors: colors | null;
  };
}
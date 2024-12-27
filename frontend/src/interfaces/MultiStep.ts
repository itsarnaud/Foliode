import {Project} from "@/interfaces/Project";
import {Tools} from "@/interfaces/Tools";

export interface MultiStep {
    portfolio: {
        title: string;
        subtitle: string;
        bio: string;
    };
    tools: Tools[];
    projects: Project[]
    style: {
        template: string
        couleurs: string
        typo: string
    }
}
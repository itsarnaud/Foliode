import {Project} from "@/interfaces/Project";
import {Tools} from "@/interfaces/Tools";

export interface MultiStep {
    portfolio: {
        title: string
        subtitle: string
        bio: string
        template: string
        config: config

    };
    tools: Tools[];
    projects: Project[]
    style: {
        template: string
        colors: string[]
        typo: string
    }
}


interface config {
    style: {
        colors: {
            primary: string
            secondary: string
            background: string
        }
    }
}
import {Project} from "@/interfaces/Project";
import {Tools} from "@/interfaces/Tools";

export interface MultiStep {
    portfolio: {
        titre: string;
        sousTitre: string;
        presentation: string;
    };
    tools: Tools[];
    projects: Project[]
    step4: {
        template: string;
        couleurs: string;
        presentation: string;
        logo: File | null;
    };
}
import {Project} from "@/interfaces/Project";

export interface MultiStep {
    step1: {
        titre: string;
        sousTitre: string;
        presentation: string;
    };
    step2: {
        competences: Array<{
            nom: string;
            description: string;
            medias: string[];
        }>;
        projects: Project[]
    };
    step3: {
        template: string;
        couleurs: string;
        presentation: string;
        logo: File | null;
    };
}
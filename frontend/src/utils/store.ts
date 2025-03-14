"use client";
import { create } from "zustand";
import { User } from "../interfaces/User";
import { MsPortfolio} from "../interfaces/MultiStep";
import { Project, receivedProject } from "@/interfaces/Project";
import { Tools } from "@/interfaces/Tools";

interface UserState {
  user: User | null;
  setUser: (user: User) => void;
}

export const useUser = create<UserState>((set) => ({
  user: null,
  setUser: (user: User) => set({ user }),
}));

interface multiStepState {
  portfolio: MsPortfolio;
  projects: Project[];
  tools: Tools[];
  setProject: (project: Project[]) => void;
  setTools: (tools: Tools[]) => void;
  setPortfolio: (portfolio: MsPortfolio) => void;
}

interface projectsState {
  projects: receivedProject[];
  setProjects: (projects: receivedProject[]) => void;
}

export const useMultiStep = create<multiStepState>((set) => ({
  portfolio: { title: '', url: '', subtitle: '', bio: '', config: { colors: null }, template: '' },
  tools: [],
  projects: [],
  setPortfolio: (portfolio) => {
    set({ portfolio: portfolio });
  },

  setProject: (project) => {
    set({ projects: project });
  },

  setTools: (tools) => {
    set({ tools: tools });
  },

}));

export const useProjects = create<projectsState>((set) => ({
  projects: [],
  setProjects: (projects) => {
    set({ projects });
  },
}));


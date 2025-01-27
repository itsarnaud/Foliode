"use client";
import { create } from "zustand";
import { User } from "../interfaces/User";
import { MultiStep } from "../interfaces/MultiStep";
import { receivedProject } from "@/interfaces/Project";

interface UserState {
  user: User | null;
  setUser: (user: User) => void;
}

export const useUser = create<UserState>((set) => ({
  user: null,
  setUser: (user: User) => set({ user }),
}));

interface multiStepState {
  multiStep: MultiStep;
  setMultiStep: (multiStep: MultiStep) => void;
}

interface projectsState {
  projects: receivedProject[];
  setProjects: (projects: receivedProject[]) => void;
}

export const useMultiStep = create<multiStepState>((set) => ({
  multiStep: {
    portfolio: {
      title: "",
      subtitle: "",
      bio: "",
      template: "",
      config: {
        colors: null,
      },
    },
    tools: [],
    projects: [],
  },
  setMultiStep: (multiStep: MultiStep) => set({ multiStep }),
}));

export const useProjects = create<projectsState>((set) => ({
  projects: [],
  setProjects: (projects) => {
    set({ projects });
  },
}));

export const useUsername = create((set) => ({
  username: null,
  setUsername: (username: string) => set({ username })
}))
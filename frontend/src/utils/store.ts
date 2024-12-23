"use client"
import {create} from 'zustand'
import {User} from '../interfaces/User'
import {MultiStep} from '../interfaces/MultiStep'

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

export const useMultiStep = create<multiStepState>((set) => ({
    multiStep: {
        step1: {
            titre: "",
            sousTitre: "",
            presentation: "",
        },
        step2: {
            competences: [],
            projects: [],
        },
        step3: {
            template: "",
            couleurs: "",
            presentation: "",
            logo: null,
        },
    },
    setMultiStep: (multiStep: MultiStep) => set({ multiStep }),
}))

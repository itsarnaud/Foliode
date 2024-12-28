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
        portfolio: {
            title: "",
            subtitle: "",
            bio: "",
            template: '',
            config: {
                colors: null,
            }
            
        },
        tools: [],
        projects: [],
       
    },
    setMultiStep: (multiStep: MultiStep) => set({ multiStep }),
}))

"use client"
import {create} from 'zustand'
import {User} from '../interfaces/User'

interface UserState {
    user: User | null;
    setUser: (user: User) => void;
}

export const useUser = create<UserState>((set) => ({
    user: null,
    setUser: (user: User) => set({ user }),
}));
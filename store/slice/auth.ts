import { UserType } from "@/interfaces/user";
import { StateCreator } from "zustand";

export interface AuthSlice{
    userInfo : undefined  | UserType;
    setUserInfo : (userInfo : UserType) => void;
}

export const createAuthSlice:StateCreator<AuthSlice> = (set : any) => ({
    userInfo : undefined,
    setUserInfo : (userInfo : UserType) => set({userInfo})
})
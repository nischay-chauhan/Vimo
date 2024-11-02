import { create } from "zustand";
import { AuthSlice, createAuthSlice } from "./slice/auth";
type StoreState = AuthSlice;

export const useAppStore = create<StoreState>()((...a) => ({
    ...createAuthSlice(...a),
}))
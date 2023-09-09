import { User } from "@/types/types";
import { create } from "zustand";

interface MembersState {
  members: User[];
  setMembers: (members: User[]) => void;
}

export const useMembersStore = create<MembersState>((set) => ({
  members: [],
  setMembers: (members) => set({ members }),
}));

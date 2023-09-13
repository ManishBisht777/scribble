import { create } from "zustand";

interface messageStore {
  messages: string[];
  setMessages: (updater: (prevMessages: string[]) => string[]) => void;
}

export const useMessageStore = create<messageStore>((set) => ({
  messages: [],
  setMessages: (updater) =>
    set((state) => ({ messages: updater(state.messages) })),
}));

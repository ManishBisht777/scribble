import { create } from "zustand";

interface CanvasState {
  strokeColor: string;
  strokeWidth: number[];
  setStrokeColor: (strokeColor: string) => void;
  setStrokeWidth: (strokeWidth: number[]) => void;
}

export const useCanvasStore = create<CanvasState>((set) => ({
  strokeColor: "#B4D455",
  strokeWidth: [3],
  setStrokeColor: (strokeColor) => set({ strokeColor }),
  setStrokeWidth: (strokeWidth) => set({ strokeWidth }),
}));

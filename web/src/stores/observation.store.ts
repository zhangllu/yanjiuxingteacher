import { create } from "zustand";
import { persist } from "zustand/middleware";
import { MOCK_OBSERVATIONS } from "@/lib/mock-data";

export interface Observation {
  id: string;
  title: string;
  content: string;
  focusArea: string;
  observationDate: string;
  createdAt: string;
  updatedAt: string;
}

interface ObservationState {
  observations: Observation[];
  addObservation: (obs: Omit<Observation, "id" | "createdAt" | "updatedAt">) => void;
  updateObservation: (id: string, data: Partial<Observation>) => void;
  deleteObservation: (id: string) => void;
  getObservation: (id: string) => Observation | undefined;
}

export const useObservationStore = create<ObservationState>()(
  persist(
    (set, get) => ({
      observations: MOCK_OBSERVATIONS,
      addObservation: (obs) =>
        set((state) => ({
          observations: [
            {
              ...obs,
              id: crypto.randomUUID(),
              createdAt: new Date().toISOString(),
              updatedAt: new Date().toISOString(),
            },
            ...state.observations,
          ],
        })),
      updateObservation: (id, data) =>
        set((state) => ({
          observations: state.observations.map((obs) =>
            obs.id === id ? { ...obs, ...data, updatedAt: new Date().toISOString() } : obs
          ),
        })),
      deleteObservation: (id) =>
        set((state) => ({
          observations: state.observations.filter((obs) => obs.id !== id),
        })),
      getObservation: (id) => get().observations.find((obs) => obs.id === id),
    }),
    { name: "observation-storage" }
  )
);

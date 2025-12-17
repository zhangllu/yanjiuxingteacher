import { create } from "zustand";
import { persist } from "zustand/middleware";
import { MOCK_TEACHER } from "@/lib/mock-data";

interface Teacher {
  id: string;
  email: string;
  name: string;
  schoolLevel: "kindergarten" | "primary" | "junior" | "senior";
  subject: string;
  teachingYears: string;
  stage: "beginner" | "intermediate" | "advanced";
}

interface AuthState {
  teacher: Teacher | null;
  isAuthenticated: boolean;
  login: (teacher: Teacher) => void;
  logout: () => void;
  updateProfile: (data: Partial<Teacher>) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      teacher: MOCK_TEACHER,
      isAuthenticated: true,
      login: (teacher) => set({ teacher, isAuthenticated: true }),
      logout: () => set({ teacher: null, isAuthenticated: false }),
      updateProfile: (data) =>
        set((state) => ({
          teacher: state.teacher ? { ...state.teacher, ...data } : null,
        })),
    }),
    { name: "auth-storage" }
  )
);

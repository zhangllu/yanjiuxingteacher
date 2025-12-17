import { create } from "zustand";
import { persist } from "zustand/middleware";
import { MOCK_QUESTIONS } from "@/lib/mock-data";

export interface Question {
  id: string;
  questionText: string;
  background: string;
  questionType: "descriptive" | "explanatory" | "interventional";
  source: "teacher" | "ai_assisted";
  status: "pending" | "researching" | "completed";
  relatedObservationIds: string[];
  createdAt: string;
}

interface QuestionState {
  questions: Question[];
  addQuestion: (q: Omit<Question, "id" | "createdAt">) => void;
  updateQuestion: (id: string, data: Partial<Question>) => void;
  deleteQuestion: (id: string) => void;
}

export const useQuestionStore = create<QuestionState>()(
  persist(
    (set) => ({
      questions: MOCK_QUESTIONS,
      addQuestion: (q) =>
        set((state) => ({
          questions: [
            { ...q, id: crypto.randomUUID(), createdAt: new Date().toISOString() },
            ...state.questions,
          ],
        })),
      updateQuestion: (id, data) =>
        set((state) => ({
          questions: state.questions.map((q) => (q.id === id ? { ...q, ...data } : q)),
        })),
      deleteQuestion: (id) =>
        set((state) => ({
          questions: state.questions.filter((q) => q.id !== id),
        })),
    }),
    { name: "question-storage" }
  )
);

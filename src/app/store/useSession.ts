import { DefaultSession } from "next-auth";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface SessionStore {
  session: DefaultSession | null;
  setSession: (session: DefaultSession) => void;
  removeSession: () => void;
}

export const useSessionStore = create<SessionStore>()(
  persist(
    (set) => ({
      session: {
        session: null,
        expires: " ",
      },
      setSession: (session) => set({ session }),
      removeSession: () => set({ session: null }),
    }),
    {
      name: "session-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

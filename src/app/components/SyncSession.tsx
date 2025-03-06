"use client";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { useSessionStore } from "../store/useSession";

const SyncSession = () => {
  const { data: session } = useSession();
  const setSession = useSessionStore((state) => state.setSession);

  useEffect(() => {
    if (session) {
      setSession(session);
    }
  }, [session, setSession]);
  return null;
};

export default SyncSession;

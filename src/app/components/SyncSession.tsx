"use client";
import React, { useEffect } from "react";
import { useSessionStore } from "../store/useSession";
import { useSession } from "next-auth/react";

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

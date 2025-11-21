import { useState, useEffect } from "react";

export interface Speaker {
  id: string;
  name: string;
  linkedinId: string;
  photo: string;
  bio?: string;
  startTime?: string;
  endTime?: string;
}

export interface ConclaveSession {
  id: string;
  name: string;
  description?: string;
  startTime?: string;
  endTime?: string;
  speakers: Speaker[];
  createdAt: number;
  isActive?: boolean;
}

const defaultSessions: ConclaveSession[] = [];

export function useConclaveSessionsData() {
  const [sessions, setSessions] = useState<ConclaveSession[]>(defaultSessions);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadSessions = async () => {
      try {
        const response = await fetch("/data/sessions.json");
        if (response.ok) {
          const data = await response.json();
          setSessions(data.sessions || []);
        }
      } catch (error) {
        console.warn("Failed to load sessions:", error);
        setSessions(defaultSessions);
      } finally {
        setLoading(false);
      }
    };

    loadSessions();
  }, []);

  return {
    sessions,
    loading,
  };
}

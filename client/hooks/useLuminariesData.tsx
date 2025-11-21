import { useState, useEffect } from "react";

export interface TeamMember {
  id: string;
  name: string;
  title: string;
  bio: string;
  image: string;
  email: string;
  linkedin?: string;
  achievements: string[];
  expertise: string[];
  quote: string;
  isLeadership?: boolean;
}

interface LuminariesData {
  faculty: TeamMember[];
  leadership: TeamMember[];
}

const defaultData: LuminariesData = {
  faculty: [],
  leadership: [],
};

export function useLuminariesData() {
  const [faculty, setFaculty] = useState<TeamMember[]>([]);
  const [leadership, setLeadership] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadLuminaries = async () => {
      try {
        const response = await fetch("/data/luminaries.json");
        if (response.ok) {
          const data = await response.json();
          setFaculty(data.faculty || []);
          setLeadership(data.leadership || []);
        }
      } catch (error) {
        console.warn("Failed to load luminaries:", error);
        setFaculty(defaultData.faculty);
        setLeadership(defaultData.leadership);
      } finally {
        setLoading(false);
      }
    };

    loadLuminaries();
  }, []);

  return {
    faculty,
    leadership,
    loading,
  };
}

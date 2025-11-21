import { useState, useEffect } from "react";

export interface SponsorItem {
  id: string;
  name: string;
  logo: string;
  industry: string;
  description: string;
  website?: string;
  isActive: boolean;
}

const defaultSponsors: SponsorItem[] = [];

export function useSponsorsData() {
  const [sponsors, setSponsors] = useState<SponsorItem[]>(defaultSponsors);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadSponsors = async () => {
      try {
        const response = await fetch("/data/sponsors.json");
        if (response.ok) {
          const data = await response.json();
          setSponsors(data.sponsors || []);
        }
      } catch (error) {
        console.warn("Failed to load sponsors:", error);
        setSponsors(defaultSponsors);
      } finally {
        setLoading(false);
      }
    };

    loadSponsors();
  }, []);

  return {
    sponsors,
    loading,
  };
}

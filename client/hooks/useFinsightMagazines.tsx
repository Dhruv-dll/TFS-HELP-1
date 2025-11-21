import { useState, useEffect } from "react";

export interface Magazine {
  id: string;
  title: string;
  edition: string;
  description: string;
  cover: string;
  articles: number;
  downloads: number;
  readTime: string;
  categories: string[];
  highlights: string[];
  link: string;
  isActive: boolean;
}

const defaultMagazines: Magazine[] = [];

export function useFinsightMagazines() {
  const [magazines, setMagazines] = useState<Magazine[]>(defaultMagazines);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadMagazines = async () => {
      try {
        const response = await fetch("/data/magazines.json");
        if (response.ok) {
          const data = await response.json();
          setMagazines(data.magazines || []);
        }
      } catch (error) {
        console.warn("Failed to load magazines:", error);
        setMagazines(defaultMagazines);
      } finally {
        setLoading(false);
      }
    };

    loadMagazines();
  }, []);

  return {
    magazines,
    loading,
  };
}

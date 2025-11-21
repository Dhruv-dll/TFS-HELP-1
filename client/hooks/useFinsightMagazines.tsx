import { useState, useEffect } from "react";
import magazinesData from "../../data/magazines.json";

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

export function useFinsightMagazines() {
  const [magazines, setMagazines] = useState<Magazine[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setMagazines(magazinesData.magazines);
    setLoading(false);
  }, []);

  return {
    magazines,
    loading,
  };
}

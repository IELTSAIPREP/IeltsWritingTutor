import { useState, useEffect } from "react";

export function useTextStats() {
  const [stats, setStats] = useState({
    wordCount: 0,
    charCount: 0,
    paragraphCount: 0,
  });

  useEffect(() => {
    const updateStats = () => {
      const content = localStorage.getItem("ielts-essay-content") || "";
      
      const wordCount = content.trim() ? content.trim().split(/\s+/).length : 0;
      const charCount = content.length;
      const paragraphCount = content.trim() ? content.split(/\n\s*\n/).filter(p => p.trim()).length : 0;

      setStats({
        wordCount,
        charCount,
        paragraphCount,
      });
    };

    // Update stats initially
    updateStats();

    // Listen for storage changes
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === "ielts-essay-content") {
        updateStats();
      }
    };

    window.addEventListener("storage", handleStorageChange);

    // Poll for changes (in case same tab updates)
    const interval = setInterval(updateStats, 1000);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
      clearInterval(interval);
    };
  }, []);

  return stats;
}

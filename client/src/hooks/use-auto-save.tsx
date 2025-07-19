import { useEffect, useState } from "react";

export function useAutoSave(content: string, key: string, delay: number = 2000) {
  const [lastSaved, setLastSaved] = useState<string | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (content.trim()) {
        localStorage.setItem(key, content);
        const now = new Date();
        const timeString = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        setLastSaved(`at ${timeString}`);
      }
    }, delay);

    return () => clearTimeout(timer);
  }, [content, key, delay]);

  return { lastSaved };
}

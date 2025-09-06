// src/hooks/use-media-query.ts
import { useState, useEffect } from "react";

/**
 * A custom hook to track whether a media query matches.
 * @param query The media query string to watch (e.g., "(min-width: 1024px)").
 * @returns A boolean indicating whether the query currently matches.
 */
export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    // Ensure window is defined (for server-side rendering safety)
    if (typeof window === "undefined") return;

    const media = window.matchMedia(query);
    if (media.matches !== matches) {
      setMatches(media.matches);
    }

    const listener = () => setMatches(media.matches);
    media.addEventListener("change", listener);

    return () => {
      media.removeEventListener("change", listener);
    };
  }, [matches, query]);

  return matches;
}

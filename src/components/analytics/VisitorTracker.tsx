"use client";

import { useEffect, useRef } from "react";

export default function VisitorTracker() {
  const hasTracked = useRef(false);

  useEffect(() => {
    // Only track once per full page load to avoid duplicates
    if (hasTracked.current) return;
    
    const track = async () => {
      try {
        await fetch("/api/track-visit", { 
          method: "POST",
          // Use 'keepalive' to ensure the request finishes even if the tab closes
          keepalive: true 
        });
        hasTracked.current = true;
      } catch (error) {
        // Silently fail to not disturb user experience
      }
    };

    // Track after a short delay so it doesn't block the initial page load
    const timer = setTimeout(track, 1000);
    return () => clearTimeout(timer);
  }, []);

  return null; // This component doesn't render anything
}

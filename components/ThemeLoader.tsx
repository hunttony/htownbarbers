"use client";

import { useEffect } from "react";

export default function ThemeLoader() {
  useEffect(() => {
    // Load theme colors from API
    fetch("/api/settings")
      .then((res) => res.json())
      .then((data) => {
        if (data.theme) {
          document.documentElement.style.setProperty("--color-primary", data.theme.primary);
          document.documentElement.style.setProperty("--color-secondary", data.theme.secondary);
          document.documentElement.style.setProperty("--color-accent", data.theme.accent);
        }
      })
      .catch((err) => console.error("Failed to load theme:", err));
  }, []);

  return null;
}

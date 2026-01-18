"use client";

import { JSX, useEffect, useState } from "react";
import ToggleButtonTheme from "./toggleButton";

export default function ThemeToggle(): JSX.Element {
  const [isDark, setIsDark] = useState<boolean>(() => {
    if (typeof window === "undefined") return false;
    return document.documentElement.classList.contains("dark");
  });

  useEffect(() => {
    if (typeof window === "undefined") return;
    document.documentElement.classList.toggle("dark", isDark);
  }, [isDark]);

  return (
    <ToggleButtonTheme
      defaultChecked={isDark}
      onChange={(v) => setIsDark(v)}
      size="md"
      aria-label="Dark mode"
    />
  );
}

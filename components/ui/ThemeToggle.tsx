"use client";

import { JSX, useEffect, useState } from "react";
import ToggleButtonTheme from "./toggleButton";

const THEME_COOKIE_NAME = "theme";

function getCookie(name: string): string | null {
  if (typeof document === "undefined") return null;
  const match = document.cookie.match(new RegExp(`(^| )${name}=([^;]+)`));
  return match ? match[2] : null;
}

function setCookie(name: string, value: string, days: number = 365): void {
  if (typeof document === "undefined") return;
  const expires = new Date(Date.now() + days * 864e5).toUTCString();
  document.cookie = `${name}=${value}; expires=${expires}; path=/; SameSite=Lax`;
}

export default function ThemeToggle(): JSX.Element {
  // Inicia com false para evitar hydration mismatch (servidor sempre retorna false)
  const [isDark, setIsDark] = useState<boolean>(false);
  const [mounted, setMounted] = useState<boolean>(false);

  // Lê o cookie apenas no cliente após a montagem
  useEffect(() => {
    const cookieValue = getCookie(THEME_COOKIE_NAME);
    if (cookieValue !== null) {
      setIsDark(cookieValue === "true");
    } else {
      // Fallback: verifica se já tem a classe dark
      setIsDark(document.documentElement.classList.contains("dark"));
    }
    setMounted(true);
  }, []);

  // Aplica o tema e salva no cookie quando isDark muda (após montagem)
  useEffect(() => {
    if (!mounted) return;
    document.documentElement.classList.toggle("dark", isDark);
    setCookie(THEME_COOKIE_NAME, isDark ? "true" : "false");
  }, [isDark, mounted]);

  // Evita renderizar o toggle até estar montado para prevenir flash
  if (!mounted) {
    return (
      <div
        style={{ width: 56, height: 28 }}
        className="rounded-full bg-gray-300 animate-pulse"
      />
    );
  }

  return (
    <ToggleButtonTheme
      checked={isDark}
      onChange={(v) => setIsDark(v)}
      size="md"
      aria-label="Dark mode"
    />
  );
}

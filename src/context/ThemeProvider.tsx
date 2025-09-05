// src/context/ThemeProvider.tsx
import React, { useState, useEffect, ReactNode, useCallback } from "react";
import { ThemeMode } from "../types/clock";
import { ThemeContext } from "./ThemeContext";
import { ThemeContextType } from "../types/theme";

const THEME_STORAGE_KEY = "clock-app-theme";

export const ThemeProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [theme, setTheme] = useState<ThemeMode>(() => {
    const savedTheme = localStorage.getItem(THEME_STORAGE_KEY) as ThemeMode;
    if (savedTheme) return savedTheme;
    return window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  });

  const isDarkMode = theme === "dark";

  useEffect(() => {
    // HTML 요소에 적용
    document.documentElement.classList.toggle("dark", isDarkMode);
    // body 요소에도 적용 (이 부분이 추가/수정되었습니다)
    document.body.classList.toggle("dark", isDarkMode);

    localStorage.setItem(THEME_STORAGE_KEY, theme);
  }, [theme, isDarkMode]);

  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  }, []);

  const value: ThemeContextType = { theme, toggleTheme, isDarkMode };

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
};

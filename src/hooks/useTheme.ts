// src/hooks/useTheme.ts
import { useState, useEffect } from "react";
import { ThemeMode } from "../types/clock";

// 로컬 스토리지 키
const THEME_STORAGE_KEY = "clock-app-theme";

export function useTheme() {
  // 초기 테마를 로컬 스토리지에서 가져오거나 시스템 환경 설정 사용
  const [theme, setTheme] = useState<ThemeMode>(() => {
    const savedTheme = localStorage.getItem(THEME_STORAGE_KEY) as ThemeMode;

    if (savedTheme) {
      return savedTheme;
    }

    // 저장된 테마가 없으면 시스템 기본값 사용
    return window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  });

  // 테마가 변경될 때마다 HTML 클래스 및 로컬 스토리지 업데이트
  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    localStorage.setItem(THEME_STORAGE_KEY, theme);
  }, [theme]);

  // 테마 토글 함수
  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  return { theme, toggleTheme };
}

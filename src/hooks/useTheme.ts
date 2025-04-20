// src/hooks/useTheme.ts
import { useState, useEffect, useCallback } from "react";
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

  // 테마가 변경될 때마다 HTML 및 body 클래스 및 로컬 스토리지 업데이트
  useEffect(() => {
    // HTML 요소에 적용
    document.documentElement.classList.toggle("dark", theme === "dark");

    // body 요소에도 적용하여 일관성 보장
    document.body.classList.toggle("dark", theme === "dark");

    // localStorage에 저장
    localStorage.setItem(THEME_STORAGE_KEY, theme);
  }, [theme]);

  // 테마 토글 함수 - 변경 후 페이지 새로고침
  const toggleTheme = useCallback(() => {
    const newTheme = theme === "dark" ? "light" : "dark";

    // 먼저 로컬 스토리지에 새 테마 저장
    localStorage.setItem(THEME_STORAGE_KEY, newTheme);

    // 그 다음 테마 상태 업데이트
    setTheme(newTheme);

    // 잠시 후 페이지 새로고침 (UI 변경이 보이도록 약간의 지연 추가)
    setTimeout(() => {
      window.location.reload();
    }, 100);
  }, [theme]);

  return { theme, toggleTheme };
}

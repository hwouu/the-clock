// src/context/ThemeContext.tsx
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { ThemeMode } from "../types/clock";

// 로컬 스토리지 키
const THEME_STORAGE_KEY = "clock-app-theme";

// 컨텍스트 타입 정의
interface ThemeContextType {
  theme: ThemeMode;
  toggleTheme: () => void;
  isDarkMode: boolean;
}

// 컨텍스트 생성
const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// Provider 컴포넌트 정의
interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
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

  // isDarkMode 계산
  const isDarkMode = theme === "dark";

  // 테마 변경시 문서에 적용 및 로컬 스토리지 저장
  useEffect(() => {
    // HTML 요소에 적용
    document.documentElement.classList.toggle("dark", isDarkMode);

    // body 요소에도 적용
    document.body.classList.toggle("dark", isDarkMode);

    // localStorage에 저장
    localStorage.setItem(THEME_STORAGE_KEY, theme);
  }, [theme, isDarkMode]);

  // 테마 토글 함수
  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  // 컨텍스트 값
  const contextValue: ThemeContextType = {
    theme,
    toggleTheme,
    isDarkMode,
  };

  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  );
};

// 커스텀 훅 생성
export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};

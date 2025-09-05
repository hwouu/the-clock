// src/types/theme.ts
import { ThemeMode } from "./clock";

export interface ThemeContextType {
  theme: ThemeMode;
  toggleTheme: () => void;
  isDarkMode: boolean;
}

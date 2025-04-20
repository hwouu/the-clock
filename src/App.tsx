// src/App.tsx
import { useState, useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Header from "./components/header/Header";
import MemoList from "./components/memo/MemoList";
import { useTheme } from "./context/ThemeContext"; // 경로 업데이트
import { useKeyboardShortcuts } from "./utils/keyboardShortcuts";
import { ClockMode } from "./types/clock";
import "./App.css";

// 로컬 스토리지에서 상태 읽기/쓰기를 위한 키
const CLOCK_MODE_STORAGE_KEY = "clock-app-mode";

function App() {
  // 초기 상태를 로컬 스토리지에서 가져오거나 기본값 사용
  const [clockMode, setClockMode] = useState<ClockMode>(() => {
    const savedMode = localStorage.getItem(CLOCK_MODE_STORAGE_KEY);
    return (savedMode as ClockMode) || "digital";
  });

  // 키보드 단축키 안내를 위한 상태
  const [showShortcutsTip, setShowShortcutsTip] = useState(
    localStorage.getItem("shortcuts-viewed") !== "true"
  );

  const { isDarkMode, toggleTheme } = useTheme(); // isDarkMode 직접 사용
  const location = useLocation();

  // toggleClockMode 함수 정의
  const toggleClockMode = () => {
    setClockMode((prev) => (prev === "analog" ? "digital" : "analog"));
  };

  // 키보드 단축키 설정
  useKeyboardShortcuts({
    toggleClockMode,
    toggleTheme,
  });

  // 모드가 변경될 때마다 로컬 스토리지에 저장
  useEffect(() => {
    localStorage.setItem(CLOCK_MODE_STORAGE_KEY, clockMode);
  }, [clockMode]);

  // 페이지 타이틀 업데이트
  useEffect(() => {
    document.title =
      location.pathname === "/about" ? "About | The Clock" : "The Clock";
  }, [location]);

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${
        isDarkMode ? "bg-gray-900 text-white" : "bg-gray-50 text-gray-900"
      }`}
    >
      <div className="container mx-auto px-4 py-8 transition-colors duration-300">
        <Header clockMode={clockMode} toggleClockMode={toggleClockMode} />
        <main className="animate-fadeIn">
          <Outlet context={{ clockMode, toggleClockMode }} />
        </main>
      </div>

      {/* 메모 리스트 */}
      <MemoList />

      {/* 키보드 단축키 안내 (React 상태를 사용하여 관리) */}
      {showShortcutsTip && (
        <div
          className={`fixed bottom-6 left-6 p-4 rounded-lg shadow-lg max-w-xs theme-transition ${
            isDarkMode ? "bg-gray-800" : "bg-white"
          }`}
        >
          <h3 className="font-bold mb-2">키보드 단축키</h3>
          <ul className="text-sm space-y-1">
            <li>Cmd/Ctrl + M: 시계 모드 전환</li>
            <li>Cmd/Ctrl + D: 다크/라이트 모드 전환</li>
            <li>Cmd/Ctrl + T: 타이머 열기</li>
            <li>Cmd/Ctrl + N: 새 메모 작성</li>
          </ul>
          <button
            className="mt-3 text-xs text-blue-500 hover:underline"
            onClick={() => {
              localStorage.setItem("shortcuts-viewed", "true");
              setShowShortcutsTip(false);
            }}
          >
            닫기
          </button>
        </div>
      )}
    </div>
  );
}

export default App;

// src/App.tsx
import { useState, useEffect, useCallback } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Header from "./components/header/Header";
import MemoList from "./components/memo/MemoList";
import { useTheme } from "./context/ThemeContext"; // 경로 업데이트
import { useKeyboardShortcuts } from "./utils/keyboardShortcuts";
import { ClockMode } from "./types/clock";
import { Keyboard, X, Timer, Pause, Play } from "lucide-react"; // Import Timer icon
import { useTimerStore } from "./store/timerStore"; // Import timer store
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

  // 단축키 가이드 표시를 위한 상태
  const [isShortcutsGuideOpen, setIsShortcutsGuideOpen] = useState(false);

  // 모바일 여부 확인을 위한 상태
  const [isMobile, setIsMobile] = useState(false);

  const { isDarkMode, toggleTheme } = useTheme(); // isDarkMode 직접 사용
  const location = useLocation();

  // Check if the current page is the About page to hide header
  const isAboutPage = location.pathname === "/about";

  const { activeTimer } = useTimerStore(); // Get the active timer
  const [timerCompleted, setTimerCompleted] = useState(false); // State for timer completion

  // Effect to detect timer completion
  useEffect(() => {
    if (
      activeTimer &&
      activeTimer.remainingTime === 0 &&
      !activeTimer.isRunning
    ) {
      setTimerCompleted(true);

      // Reset the pulsing effect after 10 seconds
      const timeout = setTimeout(() => {
        setTimerCompleted(false);
      }, 10000);

      return () => clearTimeout(timeout);
    } else {
      setTimerCompleted(false);
    }
  }, [activeTimer]);

  // Timer tick function to update the timer every second
  const timerTick = useCallback(() => {
    if (!activeTimer) return;

    const { updateTimer, pauseTimer } = useTimerStore.getState();

    if (activeTimer.isRunning && activeTimer.remainingTime > 0) {
      updateTimer(activeTimer.id, activeTimer.remainingTime - 1);
    } else if (activeTimer.isRunning && activeTimer.remainingTime === 0) {
      // Timer is complete, pause it
      pauseTimer(activeTimer.id);
    }
  }, [activeTimer]);

  // Set up timer interval
  useEffect(() => {
    if (!activeTimer) return;

    const intervalId = setInterval(timerTick, 1000);
    return () => clearInterval(intervalId);
  }, [activeTimer, timerTick]);

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

  // 모바일 감지
  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    // 초기 확인
    checkIsMobile();

    // 리사이즈 이벤트 리스너 추가
    window.addEventListener("resize", checkIsMobile);

    // 클린업
    return () => {
      window.removeEventListener("resize", checkIsMobile);
    };
  }, []);

  // 메인 페이지에서만 스크롤 제한
  const isMainPage = location.pathname === "/";

  // HTML과 BODY 요소에 스크롤 제한 클래스 적용
  useEffect(() => {
    const htmlElement = document.documentElement;
    const bodyElement = document.body;

    if (isMainPage) {
      htmlElement.classList.add("no-scroll");
      bodyElement.classList.add("no-scroll");
    } else {
      htmlElement.classList.remove("no-scroll");
      bodyElement.classList.remove("no-scroll");
    }

    // 컴포넌트 언마운트 시 클래스 제거
    return () => {
      htmlElement.classList.remove("no-scroll");
      bodyElement.classList.remove("no-scroll");
    };
  }, [isMainPage]);

  // 메인 페이지에서 시계 모드에 따라 마진 결정
  const getMarginClass = () => {
    if (!isMainPage) return "items-center";

    // 모바일에서는 중앙 정렬을 위해 마진 조정
    if (isMobile) {
      return "flex flex-col items-center justify-center h-screen overflow-hidden";
    }

    // PC에서는 화면에 따라 유동적인 마진 적용 - 상단/하단 여백을 균등하게 조정
    return `items-center justify-center h-screen py-[10vh] overflow-hidden`;
  };

  // 단축키 가이드 토글 함수
  const toggleShortcutsGuide = () => {
    setIsShortcutsGuideOpen(!isShortcutsGuideOpen);
  };

  // 최초 안내 닫기 함수
  const closeInitialTip = () => {
    localStorage.setItem("shortcuts-viewed", "true");
    setShowShortcutsTip(false);
  };

  return (
    <div
      className={`min-h-screen flex justify-center transition-colors duration-300 ${
        isDarkMode ? "bg-gray-900 text-white" : "bg-gray-50 text-gray-900"
      } ${getMarginClass()}`}
    >
      <div
        className={`container max-w-4xl px-4 sm:px-6 md:px-8 ${
          isMobile && isMainPage ? "py-0 -mt-16" : "py-4 sm:py-6"
        } transition-colors duration-300 ${
          isMobile && isMainPage ? "flex flex-col justify-center" : ""
        }`}
      >
        {/* 모바일에서는 로고를 상단 중앙에 표시 */}
        {isMobile && isMainPage && (
          <div className="text-center mb-4">
            <h1 className="text-2xl font-bold">The Clock</h1>
          </div>
        )}

        {/* Only show header if not on AboutPage */}
        {!isAboutPage && (
          <Header
            clockMode={clockMode}
            toggleClockMode={toggleClockMode}
            hideLogo={isMobile && isMainPage}
          />
        )}
        <main className="animate-fadeIn">
          <Outlet context={{ clockMode, toggleClockMode }} />
        </main>
      </div>

      {/* 메모 리스트 */}
      <MemoList />

      {/* 타이머 플로팅 버튼 (타이머가 활성화되었을 때만 표시) */}
      {activeTimer && (
        <div className="fixed bottom-20 right-6 z-30">
          <button
            onClick={() => useTimerStore.getState().openModal()}
            className={`flex items-center px-3 py-2 rounded-full shadow-lg ${
              timerCompleted ? "animate-pulse-ring" : ""
            } ${
              isDarkMode ? "bg-gray-800 text-white" : "bg-white text-gray-900"
            }`}
            title={activeTimer.name}
          >
            <Timer
              className={`w-5 h-5 mr-2 ${timerCompleted ? "text-red-500" : ""}`}
            />
            <span className="font-mono">
              {Math.floor(activeTimer.remainingTime / 60)}:
              {String(activeTimer.remainingTime % 60).padStart(2, "0")}
            </span>
            {activeTimer.isRunning ? (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  useTimerStore.getState().pauseTimer(activeTimer.id);
                }}
                className="ml-2 p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
                title="일시정지"
              >
                <Pause className="w-3.5 h-3.5" />
              </button>
            ) : (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  useTimerStore.getState().startTimer(activeTimer.id);
                }}
                className="ml-2 p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
                title="시작"
              >
                <Play className="w-3.5 h-3.5" />
              </button>
            )}
          </button>
        </div>
      )}

      {/* 키보드 단축키 안내 (최초 표시) - 모바일에서는 숨김 */}
      {showShortcutsTip && !isMobile && (
        <div
          className={`fixed bottom-6 left-6 p-4 rounded-lg shadow-lg max-w-xs theme-transition ${
            isDarkMode ? "bg-gray-800" : "bg-white"
          }`}
        >
          <h3 className="font-bold mb-2 text-left">키보드 단축키</h3>
          <ul className="text-sm space-y-1 text-left">
            <li>Cmd/Ctrl + B: 시계 모드 전환</li>
            <li>Cmd/Ctrl + D: 다크/라이트 모드 전환</li>
            <li>Cmd/Ctrl + I: 타이머 열기</li>
            <li>Cmd/Ctrl + K: 새 메모 작성</li>
          </ul>
          <button
            className="mt-3 text-xs text-blue-500 hover:underline"
            onClick={closeInitialTip}
          >
            닫기
          </button>
        </div>
      )}

      {/* 단축키 가이드 플로팅 버튼 및 패널 - 모바일에서는 숨김 */}
      {!isMobile && (
        <div className="fixed bottom-6 left-6 z-40">
          {isShortcutsGuideOpen ? (
            <div
              className={`rounded-lg shadow-xl overflow-hidden ${
                isDarkMode ? "bg-gray-800 text-white" : "bg-white text-gray-900"
              }`}
            >
              <div className="flex items-center justify-between p-3 border-b">
                <h3 className="font-bold text-left">키보드 단축키</h3>
                <button
                  onClick={toggleShortcutsGuide}
                  className={`p-1 rounded-full ${
                    isDarkMode ? "hover:bg-gray-700" : "hover:bg-gray-200"
                  }`}
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="p-3">
                <ul className="text-sm space-y-1 text-left">
                  <li>Cmd/Ctrl + B: 시계 모드 전환</li>
                  <li>Cmd/Ctrl + D: 다크/라이트 모드 전환</li>
                  <li>Cmd/Ctrl + I: 타이머 열기</li>
                  <li>Cmd/Ctrl + K: 새 메모 작성</li>
                </ul>
              </div>
            </div>
          ) : (
            !showShortcutsTip && (
              <button
                onClick={toggleShortcutsGuide}
                className={`flex items-center justify-center p-2 rounded-full shadow-lg ${
                  isDarkMode
                    ? "bg-gray-800 text-white"
                    : "bg-white text-gray-900"
                }`}
                title="키보드 단축키 안내"
              >
                <Keyboard className="w-5 h-5" />
              </button>
            )
          )}
        </div>
      )}
    </div>
  );
}

export default App;

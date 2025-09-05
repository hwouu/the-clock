// src/App.tsx
import { useState, useEffect, useCallback } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Header from "./components/header/Header";
import MemoList from "./components/memo/MemoList";
import AlarmList from "./components/alarm/AlarmList";
import { useTheme } from "./hooks/useTheme";
import { useKeyboardShortcuts } from "./utils/keyboardShortcuts";
import { ClockMode } from "./types/clock";
import { Keyboard, X, Timer, Pause, Play } from "lucide-react";
import { useTimerStore } from "./store/timerStore";
import { useAlarmStore } from "./store/alarmStore";
import "./App.css";

const CLOCK_MODE_STORAGE_KEY = "clock-app-mode";

function App() {
  const [clockMode, setClockMode] = useState<ClockMode>(() => {
    const savedMode = localStorage.getItem(CLOCK_MODE_STORAGE_KEY);
    return (savedMode as ClockMode) || "digital";
  });
  const [showShortcutsTip, setShowShortcutsTip] = useState(
    localStorage.getItem("shortcuts-viewed") !== "true"
  );
  const [isShortcutsGuideOpen, setIsShortcutsGuideOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const { isDarkMode, toggleTheme } = useTheme();
  const location = useLocation();
  const isAboutPage = location.pathname === "/about";

  const { activeTimer } = useTimerStore();
  const [timerCompleted, setTimerCompleted] = useState(false);
  const { alarms } = useAlarmStore();

  // 알람 체크 로직
  useEffect(() => {
    const checkAlarms = () => {
      const now = new Date();
      const currentHour = now.getHours();
      const currentMinute = now.getMinutes();

      alarms.forEach((alarm) => {
        if (
          alarm.isEnabled &&
          alarm.hour === currentHour &&
          alarm.minute === currentMinute
        ) {
          // 1분 이내 중복 알림 방지
          const lastTriggered = localStorage.getItem(
            `alarm-triggered-${alarm.id}`
          );
          if (
            !lastTriggered ||
            now.getTime() - parseInt(lastTriggered) > 60000
          ) {
            alert(`알람: ${alarm.name}`);
            localStorage.setItem(
              `alarm-triggered-${alarm.id}`,
              now.getTime().toString()
            );
          }
        }
      });
    };

    const interval = setInterval(checkAlarms, 10000); // 10초마다 체크
    return () => clearInterval(interval);
  }, [alarms]);

  useEffect(() => {
    if (
      activeTimer &&
      activeTimer.remainingTime === 0 &&
      !activeTimer.isRunning
    ) {
      setTimerCompleted(true);
      const timeout = setTimeout(() => setTimerCompleted(false), 10000);
      return () => clearTimeout(timeout);
    } else {
      setTimerCompleted(false);
    }
  }, [activeTimer]);

  const timerTick = useCallback(() => {
    if (!activeTimer) return;
    const { updateTimer, pauseTimer } = useTimerStore.getState();
    if (activeTimer.isRunning && activeTimer.remainingTime > 0) {
      updateTimer(activeTimer.id, activeTimer.remainingTime - 1);
    } else if (activeTimer.isRunning && activeTimer.remainingTime === 0) {
      pauseTimer(activeTimer.id);
    }
  }, [activeTimer]);

  useEffect(() => {
    if (!activeTimer) return;
    const intervalId = setInterval(timerTick, 1000);
    return () => clearInterval(intervalId);
  }, [activeTimer, timerTick]);

  const toggleClockMode = () => {
    setClockMode((prev) => (prev === "analog" ? "digital" : "analog"));
  };

  useKeyboardShortcuts({ toggleClockMode, toggleTheme });

  useEffect(() => {
    localStorage.setItem(CLOCK_MODE_STORAGE_KEY, clockMode);
  }, [clockMode]);

  useEffect(() => {
    document.title =
      location.pathname === "/about" ? "About | The Clock" : "The Clock";
  }, [location]);

  useEffect(() => {
    const checkIsMobile = () => setIsMobile(window.innerWidth <= 768);
    checkIsMobile();
    window.addEventListener("resize", checkIsMobile);
    return () => window.removeEventListener("resize", checkIsMobile);
  }, []);

  const isMainPage = location.pathname === "/";

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
    return () => {
      htmlElement.classList.remove("no-scroll");
      bodyElement.classList.remove("no-scroll");
    };
  }, [isMainPage]);

  const getMarginClass = () => {
    if (!isMainPage) return "items-start";
    if (isMobile)
      return "flex flex-col items-center justify-center h-screen overflow-hidden";
    return `items-center justify-center h-screen py-[10vh] overflow-hidden`;
  };

  const toggleShortcutsGuide = () =>
    setIsShortcutsGuideOpen(!isShortcutsGuideOpen);
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
        {isMobile && isMainPage && (
          <div className="text-center mb-4">
            <h1 className="text-2xl font-bold">The Clock</h1>
          </div>
        )}
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

      <AlarmList />
      <MemoList />

      {activeTimer && (
        <div className="fixed bottom-20 right-6 z-30">
          <button
            onClick={() => useTimerStore.getState().openModal()}
            className={`flex items-center px-3 py-2 rounded-full shadow-lg ${
              timerCompleted ? "animate-pulse-ring" : ""
            } ${isDarkMode ? "bg-gray-800" : "bg-white"}`}
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
                aria-label="일시정지"
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
                aria-label="시작"
              >
                <Play className="w-3.5 h-3.5" />
              </button>
            )}
          </button>
        </div>
      )}

      {showShortcutsTip && !isMobile && (
        <div
          className={`fixed bottom-6 right-6 p-4 rounded-lg shadow-lg max-w-xs ${
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

      {!isMobile && (
        <div className="fixed bottom-6 right-6 z-40">
          {isShortcutsGuideOpen ? (
            <div
              className={`rounded-lg shadow-xl overflow-hidden ${
                isDarkMode ? "bg-gray-800" : "bg-white"
              }`}
            >
              <div className="flex items-center justify-between p-3 border-b">
                <h3 className="font-bold text-left">키보드 단축키</h3>
                <button
                  onClick={toggleShortcutsGuide}
                  className={`p-1 rounded-full ${
                    isDarkMode ? "hover:bg-gray-700" : "hover:bg-gray-200"
                  }`}
                  aria-label="단축키 가이드 닫기"
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
                  isDarkMode ? "bg-gray-800" : "bg-white"
                }`}
                aria-label="키보드 단축키 안내"
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

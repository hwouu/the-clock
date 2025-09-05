// src/App.tsx
import { useState, useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Header from "./components/header/Header";
import MemoList from "./components/memo/MemoList";
import AlarmList from "./components/alarm/AlarmList";
import TimerStatus from "./components/timer/TimerStatus";
import FloatingStatusPanel from "./components/ui/FloatingStatusPanel";
import { useTheme } from "./hooks/useTheme";
import { useKeyboardShortcuts } from "./utils/keyboardShortcuts";
import { ClockMode } from "./types/clock";
import { Keyboard, X } from "lucide-react";
import { useTimerStore } from "./store/timerStore";
import { useAlarmStore } from "./store/alarmStore";
import {
  requestNotificationPermission,
  sendNotification,
} from "./utils/notifications";
import "./App.css";

const CLOCK_MODE_STORAGE_KEY = "clock-app-mode";

function App() {
  const [clockMode, setClockMode] = useState<ClockMode>(() => {
    const savedMode = localStorage.getItem(CLOCK_MODE_STORAGE_KEY);
    return (savedMode as ClockMode) || "digital";
  });
  const [isShortcutsGuideOpen, setIsShortcutsGuideOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const { isDarkMode, toggleTheme } = useTheme();
  const location = useLocation();
  const isAboutPage = location.pathname === "/about";

  const { activeTimer } = useTimerStore();
  const { alarms, toggleAlarm } = useAlarmStore(); // toggleAlarm 함수 가져오기

  // 최초 렌더링 시 알림 권한 요청
  useEffect(() => {
    requestNotificationPermission();
  }, []);

  // 알람 로직: 정확한 시간에 알림이 오도록 setTimeout 사용
  useEffect(() => {
    let alarmTimeout: ReturnType<typeof setTimeout>;

    const scheduleNextAlarm = () => {
      const now = new Date();
      let nextAlarm: { time: number; id: string; name: string } | null = null;

      alarms.forEach((alarm) => {
        if (alarm.isEnabled) {
          const alarmTime = new Date();
          alarmTime.setHours(alarm.hour, alarm.minute, 0, 0);

          // 알람 시간이 이미 지났으면 다음 날로 설정
          if (alarmTime.getTime() <= now.getTime()) {
            alarmTime.setDate(alarmTime.getDate() + 1);
          }

          if (nextAlarm === null || alarmTime.getTime() < nextAlarm.time) {
            nextAlarm = {
              time: alarmTime.getTime(),
              id: alarm.id,
              name: alarm.name,
            };
          }
        }
      });

      if (nextAlarm) {
        const delay = nextAlarm.time - now.getTime();
        alarmTimeout = setTimeout(() => {
          sendNotification("", nextAlarm!.name);
          // 알람이 울리면 토글을 OFF로 변경하는 로직 추가
          toggleAlarm(nextAlarm!.id);
        }, delay);
      }
    };

    scheduleNextAlarm();

    // 컴포넌트 언마운트 시 또는 알람 목록 변경 시 타이머 정리
    return () => clearTimeout(alarmTimeout);
  }, [alarms, toggleAlarm]);

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

  const getMarginClass = () => {
    if (location.pathname !== "/") return "items-start";
    if (isMobile) return "flex flex-col items-center justify-center h-screen";
    return `items-center justify-center h-screen py-[10vh]`;
  };

  const toggleShortcutsGuide = () =>
    setIsShortcutsGuideOpen(!isShortcutsGuideOpen);

  return (
    <div
      className={`min-h-screen flex justify-center transition-colors duration-300 ${
        isDarkMode ? "bg-gray-900 text-white" : "bg-gray-50 text-gray-900"
      } ${getMarginClass()}`}
    >
      <div
        className={`container max-w-4xl px-4 sm:px-6 md:px-8 ${
          isMobile && location.pathname === "/" ? "py-0 -mt-16" : "py-4 sm:py-6"
        } transition-colors duration-300 ${
          isMobile && location.pathname === "/"
            ? "flex flex-col justify-center"
            : ""
        }`}
      >
        {isMobile && location.pathname === "/" && (
          <div className="text-center mb-4">
            <h1 className="text-2xl font-bold">The Clock</h1>
          </div>
        )}
        {!isAboutPage && (
          <Header
            clockMode={clockMode}
            toggleClockMode={toggleClockMode}
            hideLogo={isMobile && location.pathname === "/"}
          />
        )}
        <main className="animate-fadeIn">
          <Outlet context={{ clockMode, toggleClockMode }} />
        </main>
      </div>

      {(alarms.length > 0 || activeTimer) && (
        <FloatingStatusPanel>
          <AlarmList />
          {activeTimer && <TimerStatus />}
        </FloatingStatusPanel>
      )}

      <MemoList />

      {/* 키보드 단축키 안내 (좌측 상단으로 이동) */}
      {!isMobile && (
        <div className="fixed top-6 left-6 z-40">
          {isShortcutsGuideOpen ? (
            <div
              className={`rounded-lg shadow-xl overflow-hidden ${
                isDarkMode ? "bg-gray-800 text-white" : "bg-white text-gray-900"
              }`}
            >
              <div className="flex items-center justify-between p-3 border-b dark:border-gray-700">
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
                  <li>Cmd/Ctrl + A: 새 알람 작성</li>
                  <li>Cmd/Ctrl + I: 타이머 열기</li>
                  <li>Cmd/Ctrl + K: 새 메모 작성</li>
                </ul>
              </div>
            </div>
          ) : (
            <button
              onClick={toggleShortcutsGuide}
              className={`flex items-center justify-center p-2 rounded-full shadow-lg ${
                isDarkMode ? "bg-gray-800 text-white" : "bg-white text-gray-900"
              }`}
              aria-label="키보드 단축키 안내"
            >
              <Keyboard className="w-5 h-5" />
            </button>
          )}
        </div>
      )}
    </div>
  );
}

export default App;

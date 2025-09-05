// src/components/header/Header.tsx
import { Link, useLocation } from "react-router-dom";
import {
  Sun,
  Moon,
  Info,
  Timer,
  StickyNote,
  Clock,
  AlarmClock,
} from "lucide-react";
import { useTheme } from "../../hooks/useTheme";
import { ClockMode } from "../../types/clock";
import { useTimerStore } from "../../store/timerStore";
import { useMemoStore } from "../../store/memoStore";
import { useAlarmStore } from "../../store/alarmStore";
import TimerModal from "../timer/TimerModal";
import MemoModal from "../memo/MemoModal";
import AlarmModal from "../alarm/AlarmModal";
import { useEffect, useState } from "react";

interface HeaderProps {
  clockMode: ClockMode;
  toggleClockMode: () => void;
  hideLogo?: boolean;
}

const Header = ({
  clockMode,
  toggleClockMode,
  hideLogo = false,
}: HeaderProps) => {
  const { isDarkMode, toggleTheme } = useTheme();
  const { openModal: openTimerModal, isModalOpen: isTimerModalOpen } =
    useTimerStore();
  const { openModal: openMemoModal, isModalOpen: isMemoModalOpen } =
    useMemoStore();
  const { openModal: openAlarmModal, isModalOpen: isAlarmModalOpen } =
    useAlarmStore();
  const [isMobile, setIsMobile] = useState(false);
  const location = useLocation();
  const isAboutPage = location.pathname === "/about";

  useEffect(() => {
    const checkIsMobile = () => setIsMobile(window.innerWidth <= 768);
    checkIsMobile();
    window.addEventListener("resize", checkIsMobile);
    return () => window.removeEventListener("resize", checkIsMobile);
  }, []);

  const shouldHideLogo = hideLogo || (isMobile && isAboutPage);

  return (
    <>
      <header
        className={`py-3 px-4 md:px-5 ${
          isMobile ? "mb-3" : "mb-6"
        } rounded-xl flex items-center justify-between transition-colors ${
          isDarkMode ? "bg-gray-800" : "bg-white"
        } shadow-md`}
      >
        {/* Left Buttons */}
        <div className="flex items-center space-x-1 md:space-x-2">
          <Link
            to="/about"
            className={`p-2 rounded-full ${
              isDarkMode ? "hover:bg-gray-700" : "hover:bg-gray-200"
            }`}
            aria-label="About"
          >
            <Info className="w-5 h-5" />
          </Link>
          <button
            onClick={toggleTheme}
            className={`p-2 rounded-full ${
              isDarkMode ? "hover:bg-gray-700" : "hover:bg-gray-200"
            }`}
            aria-label={isDarkMode ? "라이트 모드로 전환" : "다크 모드로 전환"}
          >
            {isDarkMode ? (
              <Sun className="w-5 h-5" />
            ) : (
              <Moon className="w-5 h-5" />
            )}
          </button>
          <button
            onClick={toggleClockMode}
            className={`p-2 rounded-full ${
              isDarkMode ? "hover:bg-gray-700" : "hover:bg-gray-200"
            }`}
            aria-label={
              clockMode === "analog"
                ? "디지털 시계로 전환"
                : "아날로그 시계로 전환"
            }
          >
            {clockMode === "analog" ? (
              <span className="font-mono text-sm font-bold">12:34</span>
            ) : (
              <Clock className="w-5 h-5" />
            )}
          </button>
        </div>

        {/* Center Title */}
        {!shouldHideLogo && (
          <div className="absolute left-1/2 -translate-x-1/2">
            <Link to="/" className="flex items-center gap-3">
              <h1 className="text-xl font-bold">The Clock</h1>
            </Link>
          </div>
        )}

        {/* Right Buttons */}
        <div className="flex items-center space-x-1 md:space-x-2">
          <button
            onClick={() => openAlarmModal()}
            className={`p-2 rounded-full ${
              isDarkMode ? "hover:bg-gray-700" : "hover:bg-gray-200"
            }`}
            aria-label="알람 설정"
          >
            <AlarmClock className="w-5 h-5" />
          </button>
          <button
            onClick={openTimerModal}
            className={`p-2 rounded-full ${
              isDarkMode ? "hover:bg-gray-700" : "hover:bg-gray-200"
            }`}
            aria-label="타이머 설정"
          >
            <Timer className="w-5 h-5" />
          </button>
          <button
            onClick={() => openMemoModal()}
            className={`p-2 rounded-full ${
              isDarkMode ? "hover:bg-gray-700" : "hover:bg-gray-200"
            }`}
            aria-label="메모 작성"
          >
            <StickyNote className="w-5 h-5" />
          </button>
        </div>
      </header>
      {isTimerModalOpen && <TimerModal />}
      {isMemoModalOpen && <MemoModal />}
      {isAlarmModalOpen && <AlarmModal />}
    </>
  );
};

export default Header;

// src/components/header/Header.tsx
import { Link } from "react-router-dom";
import { Sun, Moon, Clock, Info, Timer, StickyNote } from "lucide-react";
import { useTheme } from "../../context/ThemeContext"; // 경로 업데이트
import { ClockMode } from "../../types/clock";
import { useTimerStore } from "../../store/timerStore";
import { useMemoStore } from "../../store/memoStore";
import TimerDisplay from "../timer/TimerDisplay";
import TimerModal from "../timer/TimerModal";
import MemoModal from "../memo/MemoModal";

interface HeaderProps {
  clockMode: ClockMode;
  toggleClockMode: () => void;
}

const Header = ({ clockMode, toggleClockMode }: HeaderProps) => {
  const { isDarkMode, toggleTheme } = useTheme(); // isDarkMode 직접 사용
  const {
    activeTimer,
    openModal: openTimerModal,
    isModalOpen: isTimerModalOpen,
  } = useTimerStore();
  const { openModal: openMemoModal, isModalOpen: isMemoModalOpen } =
    useMemoStore();

  return (
    <>
      <header
        className={`py-4 px-6 mb-6 rounded-xl flex items-center justify-between transition-colors ${
          isDarkMode ? "bg-gray-800 text-white" : "bg-white text-gray-900"
        } shadow-md`}
      >
        <div className="flex items-center gap-3">
          <Clock className="w-6 h-6" />
          <h1 className="text-xl font-bold">The Clock</h1>
        </div>

        <div className="flex items-center space-x-2 sm:space-x-4">
          {/* 타이머 표시 영역 */}
          {activeTimer && <TimerDisplay />}

          <Link
            to="/about"
            className={`p-2 rounded-full hover:bg-opacity-20 ${
              isDarkMode ? "hover:bg-gray-700" : "hover:bg-gray-200"
            }`}
            title="About"
          >
            <Info className="w-5 h-5" />
          </Link>

          <button
            onClick={toggleClockMode}
            className={`p-2 rounded-full hover:bg-opacity-20 ${
              isDarkMode ? "hover:bg-gray-700" : "hover:bg-gray-200"
            }`}
            title={
              clockMode === "analog" ? "Switch to Digital" : "Switch to Analog"
            }
          >
            {clockMode === "analog" ? (
              <span className="font-mono text-sm font-bold">12:34</span>
            ) : (
              <Clock className="w-5 h-5" />
            )}
          </button>

          <button
            onClick={toggleTheme}
            className={`p-2 rounded-full hover:bg-opacity-20 ${
              isDarkMode ? "hover:bg-gray-700" : "hover:bg-gray-200"
            }`}
            title={isDarkMode ? "Light Mode" : "Dark Mode"}
          >
            {isDarkMode ? (
              <Sun className="w-5 h-5" />
            ) : (
              <Moon className="w-5 h-5" />
            )}
          </button>

          {/* 타이머 버튼 */}
          <button
            onClick={openTimerModal}
            className={`p-2 rounded-full hover:bg-opacity-20 ${
              isDarkMode ? "hover:bg-gray-700" : "hover:bg-gray-200"
            }`}
            title="Timer"
          >
            <Timer className="w-5 h-5" />
          </button>

          {/* 메모 버튼 */}
          <button
            onClick={() => openMemoModal()}
            className={`p-2 rounded-full hover:bg-opacity-20 ${
              isDarkMode ? "hover:bg-gray-700" : "hover:bg-gray-200"
            }`}
            title="Memo"
          >
            <StickyNote className="w-5 h-5" />
          </button>
        </div>
      </header>

      {/* 타이머 모달 */}
      {isTimerModalOpen && <TimerModal />}

      {/* 메모 모달 */}
      {isMemoModalOpen && <MemoModal />}
    </>
  );
};

export default Header;

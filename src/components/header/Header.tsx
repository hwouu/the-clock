// src/components/header/Header.tsx
import { Link, useLocation } from "react-router-dom";
import { Sun, Moon, Info, Timer, StickyNote, ClockFading } from "lucide-react";
import { useTheme } from "../../context/ThemeContext"; // 경로 업데이트
import { ClockMode } from "../../types/clock";
import { useTimerStore } from "../../store/timerStore";
import { useMemoStore } from "../../store/memoStore";
import TimerDisplay from "../timer/TimerDisplay";
import TimerModal from "../timer/TimerModal";
import MemoModal from "../memo/MemoModal";
import { useEffect, useState } from "react";

interface HeaderProps {
  clockMode: ClockMode;
  toggleClockMode: () => void;
  hideLogo?: boolean; // Optional prop to hide the logo
}

const Header = ({
  clockMode,
  toggleClockMode,
  hideLogo = false,
}: HeaderProps) => {
  const { isDarkMode, toggleTheme } = useTheme(); // isDarkMode 직접 사용
  const {
    activeTimer,
    openModal: openTimerModal,
    isModalOpen: isTimerModalOpen,
  } = useTimerStore();
  const { openModal: openMemoModal, isModalOpen: isMemoModalOpen } =
    useMemoStore();

  // 모바일 여부 확인을 위한 상태
  const [isMobile, setIsMobile] = useState(false);

  // 현재 경로 확인
  const location = useLocation();
  const isAboutPage = location.pathname === "/about";

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

  // 로고를 숨길지 여부 결정 (메인 페이지에서 모바일 또는 About 페이지에서 모바일일 때)
  const shouldHideLogo = hideLogo || (isMobile && isAboutPage);

  return (
    <>
      <header
        className={`py-3 px-5 md:px-6 ${
          isMobile ? "mb-3" : "mb-6"
        } rounded-xl flex items-center transition-colors ${
          isDarkMode ? "bg-gray-800 text-white" : "bg-white text-gray-900"
        } shadow-md`}
      >
        {!shouldHideLogo && (
          <Link to="/" className="flex items-center gap-3">
            <h1 className="text-xl font-bold">The Clock</h1>
          </Link>
        )}

        {/* If logo is hidden, use an empty div to maintain the space */}
        {shouldHideLogo && <div></div>}

        <div
          className={`flex items-center ${
            isMobile ? "w-full justify-around" : "space-x-4 ml-auto"
          }`}
        >
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
              <ClockFading className="w-5 h-5" />
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

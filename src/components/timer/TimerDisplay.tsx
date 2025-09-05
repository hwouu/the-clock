// src/components/timer/TimerDisplay.tsx
import { useEffect, useCallback } from "react";
import { Play, Pause, RefreshCw, X } from "lucide-react";
import { useTimerStore } from "../../store/timerStore";
import { useTheme } from "../../hooks/useTheme";
import { sendNotification } from "../../utils/notifications";

const TimerDisplay = () => {
  const { isDarkMode } = useTheme();
  const {
    activeTimer,
    startTimer,
    pauseTimer,
    resetTimer,
    removeTimer,
    updateTimer,
  } = useTimerStore();

  // 남은 시간 포맷팅
  const formatTime = (seconds: number): string => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;

    const format = (num: number) => (num < 10 ? `0${num}` : num);

    if (hrs > 0) {
      return `${format(hrs)}:${format(mins)}:${format(secs)}`;
    } else {
      return `${format(mins)}:${format(secs)}`;
    }
  };

  // 타이머 업데이트 함수
  const tick = useCallback(() => {
    if (activeTimer && activeTimer.isRunning && activeTimer.remainingTime > 0) {
      updateTimer(activeTimer.id, activeTimer.remainingTime - 1);
    } else if (
      activeTimer &&
      activeTimer.isRunning &&
      activeTimer.remainingTime <= 1
    ) {
      // 타이머가 0이 되면 자동으로 정지하고 알림 전송
      pauseTimer(activeTimer.id);
      updateTimer(activeTimer.id, 0); // 남은 시간을 0으로 설정
      sendNotification(
        "타이머 완료",
        `${activeTimer.name} 타이머가 완료되었습니다.`
      );
    }
  }, [activeTimer, updateTimer, pauseTimer]);

  // 타이머 업데이트를 위한 인터벌 설정
  useEffect(() => {
    if (activeTimer?.isRunning) {
      const intervalId = setInterval(tick, 1000);
      return () => clearInterval(intervalId);
    }
  }, [activeTimer, tick]);

  if (!activeTimer) {
    return null;
  }

  return (
    <div
      className={`flex items-center gap-2 px-3 py-1.5 rounded-full ${
        isDarkMode ? "bg-gray-700" : "bg-gray-200"
      }`}
    >
      <span className="font-mono font-medium mr-1">
        {formatTime(activeTimer.remainingTime)}
      </span>

      {/* 컨트롤 버튼 */}
      <div className="flex items-center gap-1">
        {activeTimer.isRunning ? (
          <button
            onClick={() => pauseTimer(activeTimer.id)}
            className={`p-1 rounded-full ${
              isDarkMode ? "hover:bg-gray-600" : "hover:bg-gray-300"
            }`}
            title="일시정지"
          >
            <Pause className="w-3.5 h-3.5" />
          </button>
        ) : (
          <button
            onClick={() => startTimer(activeTimer.id)}
            className={`p-1 rounded-full ${
              isDarkMode ? "hover:bg-gray-600" : "hover:bg-gray-300"
            }`}
            title="시작"
          >
            <Play className="w-3.5 h-3.5" />
          </button>
        )}

        <button
          onClick={() => resetTimer(activeTimer.id)}
          className={`p-1 rounded-full ${
            isDarkMode ? "hover:bg-gray-600" : "hover:bg-gray-300"
          }`}
          title="리셋"
        >
          <RefreshCw className="w-3.5 h-3.5" />
        </button>

        <button
          onClick={() => removeTimer(activeTimer.id)}
          className={`p-1 rounded-full ${
            isDarkMode ? "hover:bg-gray-600" : "hover:bg-gray-300"
          }`}
          title="삭제"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};

export default TimerDisplay;

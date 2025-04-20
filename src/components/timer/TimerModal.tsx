// src/components/timer/TimerModal.tsx
import { useState } from "react";
import { useTimerStore } from "../../store/timerStore";
import Modal from "../ui/Modal";
import { useTheme } from "../../context/ThemeContext";

const TimerModal = () => {
  const { isDarkMode } = useTheme();
  const { isModalOpen, closeModal, addTimer } = useTimerStore();

  const [name, setName] = useState("");
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [error, setError] = useState("");

  // 타이머 모드 상태: "duration" (기간 경과 후) 또는 "specificTime" (특정 시각에)
  const [timerMode, setTimerMode] = useState<"duration" | "specificTime">(
    "duration"
  );

  // 특정 시각을 위한 상태
  const [specificHour, setSpecificHour] = useState(new Date().getHours());
  const [specificMinute, setSpecificMinute] = useState(new Date().getMinutes());

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (timerMode === "duration") {
      // 유효성 검사 - 기간 모드
      if (hours === 0 && minutes === 0 && seconds === 0) {
        setError("시간을 최소 1초 이상 설정해주세요.");
        return;
      }

      setError("");

      // 총 시간을 초 단위로 계산
      const totalSeconds = hours * 3600 + minutes * 60 + seconds;

      // 타이머 추가
      addTimer({
        name: name.trim() || "타이머",
        duration: totalSeconds,
        remainingTime: totalSeconds,
        isRunning: true,
      });
    } else {
      // 특정 시각 모드
      const now = new Date();
      const targetTime = new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate(),
        specificHour,
        specificMinute,
        0
      );

      // 타겟 시간이 현재보다 이전인 경우 다음 날로 설정
      if (targetTime.getTime() <= now.getTime()) {
        targetTime.setDate(targetTime.getDate() + 1);
      }

      // 남은 시간 계산 (초 단위)
      const diffInSeconds = Math.floor(
        (targetTime.getTime() - now.getTime()) / 1000
      );

      if (diffInSeconds <= 0) {
        setError("유효한 시간을 설정해주세요.");
        return;
      }

      setError("");

      // 타이머 추가
      addTimer({
        name: name.trim() || `${specificHour}시 ${specificMinute}분 알림`,
        duration: diffInSeconds,
        remainingTime: diffInSeconds,
        isRunning: true,
      });
    }

    // 입력 필드 초기화 및 모달 닫기
    resetForm();
    closeModal();
  };

  const resetForm = () => {
    setName("");
    setHours(0);
    setMinutes(0);
    setSeconds(0);
    setError("");
    setTimerMode("duration");

    // 현재 시간으로 특정 시각 필드 초기화
    const now = new Date();
    setSpecificHour(now.getHours());
    setSpecificMinute(now.getMinutes());
  };

  // 시간 옵션 생성 (0-23)
  const hourOptions = Array.from({ length: 24 }, (_, i) => i);

  // 분 옵션 생성 (0-59)
  const minuteOptions = Array.from({ length: 60 }, (_, i) => i);

  return (
    <Modal isOpen={isModalOpen} onClose={closeModal} title="타이머 설정">
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label
            htmlFor="timer-name"
            className="block mb-2 text-sm font-medium"
          >
            타이머 이름 (선택사항)
          </label>
          <input
            id="timer-name"
            type="text"
            placeholder="타이머 이름을 입력하세요"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={`w-full p-2 border rounded-md ${
              isDarkMode
                ? "bg-gray-700 border-gray-600 text-white"
                : "bg-white border-gray-300 text-gray-900"
            }`}
          />
        </div>

        {/* 타이머 모드 선택 */}
        <div className="mb-4">
          <div className="flex border rounded-md overflow-hidden">
            <button
              type="button"
              onClick={() => setTimerMode("duration")}
              className={`flex-1 py-2 px-4 text-center ${
                timerMode === "duration"
                  ? isDarkMode
                    ? "bg-blue-600 text-white"
                    : "bg-blue-500 text-white"
                  : isDarkMode
                  ? "bg-gray-700"
                  : "bg-gray-100"
              }`}
            >
              시간 경과 후
            </button>
            <button
              type="button"
              onClick={() => setTimerMode("specificTime")}
              className={`flex-1 py-2 px-4 text-center ${
                timerMode === "specificTime"
                  ? isDarkMode
                    ? "bg-blue-600 text-white"
                    : "bg-blue-500 text-white"
                  : isDarkMode
                  ? "bg-gray-700"
                  : "bg-gray-100"
              }`}
            >
              특정 시각에
            </button>
          </div>
        </div>

        {timerMode === "duration" ? (
          <div className="mb-6">
            <label className="block mb-2 text-sm font-medium">시간 설정</label>
            <div className="flex items-center space-x-2">
              <div className="flex-1">
                <label htmlFor="hours" className="block text-center text-sm">
                  시
                </label>
                <input
                  id="hours"
                  type="number"
                  min="0"
                  max="23"
                  value={hours}
                  onChange={(e) =>
                    setHours(Math.max(0, parseInt(e.target.value) || 0))
                  }
                  className={`w-full p-2 text-center border rounded-md ${
                    isDarkMode
                      ? "bg-gray-700 border-gray-600 text-white"
                      : "bg-white border-gray-300 text-gray-900"
                  }`}
                />
              </div>
              <span className="text-xl">:</span>
              <div className="flex-1">
                <label htmlFor="minutes" className="block text-center text-sm">
                  분
                </label>
                <input
                  id="minutes"
                  type="number"
                  min="0"
                  max="59"
                  value={minutes}
                  onChange={(e) =>
                    setMinutes(Math.max(0, parseInt(e.target.value) || 0))
                  }
                  className={`w-full p-2 text-center border rounded-md ${
                    isDarkMode
                      ? "bg-gray-700 border-gray-600 text-white"
                      : "bg-white border-gray-300 text-gray-900"
                  }`}
                />
              </div>
              <span className="text-xl">:</span>
              <div className="flex-1">
                <label htmlFor="seconds" className="block text-center text-sm">
                  초
                </label>
                <input
                  id="seconds"
                  type="number"
                  min="0"
                  max="59"
                  value={seconds}
                  onChange={(e) =>
                    setSeconds(Math.max(0, parseInt(e.target.value) || 0))
                  }
                  className={`w-full p-2 text-center border rounded-md ${
                    isDarkMode
                      ? "bg-gray-700 border-gray-600 text-white"
                      : "bg-white border-gray-300 text-gray-900"
                  }`}
                />
              </div>
            </div>
          </div>
        ) : (
          <div className="mb-6">
            <label className="block mb-2 text-sm font-medium">시각 설정</label>
            <div className="flex items-center space-x-2">
              <div className="flex-1">
                <label
                  htmlFor="specific-hour"
                  className="block text-center text-sm"
                >
                  시
                </label>
                <select
                  id="specific-hour"
                  value={specificHour}
                  onChange={(e) => setSpecificHour(parseInt(e.target.value))}
                  className={`w-full p-2 text-center border rounded-md ${
                    isDarkMode
                      ? "bg-gray-700 border-gray-600 text-white"
                      : "bg-white border-gray-300 text-gray-900"
                  }`}
                >
                  {hourOptions.map((hour) => (
                    <option key={hour} value={hour}>
                      {hour}
                    </option>
                  ))}
                </select>
              </div>
              <span className="text-xl">:</span>
              <div className="flex-1">
                <label
                  htmlFor="specific-minute"
                  className="block text-center text-sm"
                >
                  분
                </label>
                <select
                  id="specific-minute"
                  value={specificMinute}
                  onChange={(e) => setSpecificMinute(parseInt(e.target.value))}
                  className={`w-full p-2 text-center border rounded-md ${
                    isDarkMode
                      ? "bg-gray-700 border-gray-600 text-white"
                      : "bg-white border-gray-300 text-gray-900"
                  }`}
                >
                  {minuteOptions.map((minute) => (
                    <option key={minute} value={minute}>
                      {minute}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        )}

        {error && <p className="mt-2 text-sm text-red-500">{error}</p>}

        <div className="flex justify-end space-x-3">
          <button
            type="button"
            onClick={() => {
              resetForm();
              closeModal();
            }}
            className={`px-4 py-2 rounded-md ${
              isDarkMode
                ? "bg-gray-600 hover:bg-gray-700"
                : "bg-gray-200 hover:bg-gray-300"
            }`}
          >
            취소
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            시작
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default TimerModal;

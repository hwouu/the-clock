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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // 유효성 검사
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
      isRunning: false,
    });

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
  };

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
          {error && <p className="mt-2 text-sm text-red-500">{error}</p>}
        </div>

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

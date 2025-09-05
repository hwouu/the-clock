// src/components/timer/TimerModal.tsx
import { useState } from "react";
import { useTimerStore } from "../../store/timerStore";
import Modal from "../ui/Modal";
import { useTheme } from "../../hooks/useTheme";

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

    if (hours === 0 && minutes === 0 && seconds === 0) {
      setError("시간을 최소 1초 이상 설정해주세요.");
      return;
    }
    setError("");

    const totalSeconds = hours * 3600 + minutes * 60 + seconds;
    addTimer({
      name: name.trim() || "타이머",
      duration: totalSeconds,
      remainingTime: totalSeconds,
      isRunning: true,
    });

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
      <form onSubmit={handleSubmit} className="flex flex-col space-y-6">
        <div>
          <label
            htmlFor="timer-name"
            className="block mb-2 text-sm font-medium text-left"
          >
            타이머 이름 (선택사항)
          </label>
          <input
            id="timer-name"
            type="text"
            placeholder="타이머 이름을 입력하세요"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 transition-all ${
              isDarkMode
                ? "bg-gray-700 border-gray-600 text-white"
                : "bg-white border-gray-300 text-gray-900"
            }`}
          />
        </div>

        <div>
          <label className="block mb-3 text-sm font-medium text-left">
            시간 설정
          </label>
          <div className="flex items-center space-x-3">
            <div className="flex-1">
              <label
                htmlFor="hours"
                className="block text-center text-xs mb-1 text-gray-500 dark:text-gray-400"
              >
                시
              </label>
              <input
                id="hours"
                type="number"
                min="0"
                value={hours}
                onChange={(e) =>
                  setHours(Math.max(0, parseInt(e.target.value) || 0))
                }
                className={`w-full p-3 text-center text-lg font-medium border rounded-lg focus:ring-2 focus:ring-blue-500 transition-all ${
                  isDarkMode
                    ? "bg-gray-700 border-gray-600 text-white"
                    : "bg-white border-gray-300 text-gray-900"
                }`}
              />
            </div>
            <span className="text-2xl font-light">:</span>
            <div className="flex-1">
              <label
                htmlFor="minutes"
                className="block text-center text-xs mb-1 text-gray-500 dark:text-gray-400"
              >
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
                className={`w-full p-3 text-center text-lg font-medium border rounded-lg focus:ring-2 focus:ring-blue-500 transition-all ${
                  isDarkMode
                    ? "bg-gray-700 border-gray-600 text-white"
                    : "bg-white border-gray-300 text-gray-900"
                }`}
              />
            </div>
            <span className="text-2xl font-light">:</span>
            <div className="flex-1">
              <label
                htmlFor="seconds"
                className="block text-center text-xs mb-1 text-gray-500 dark:text-gray-400"
              >
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
                className={`w-full p-3 text-center text-lg font-medium border rounded-lg focus:ring-2 focus:ring-blue-500 transition-all ${
                  isDarkMode
                    ? "bg-gray-700 border-gray-600 text-white"
                    : "bg-white border-gray-300 text-gray-900"
                }`}
              />
            </div>
          </div>
        </div>

        {error && (
          <div className="rounded-md px-3 py-2 bg-red-100 dark:bg-red-900/30 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 text-sm">
            {error}
          </div>
        )}

        <div className="flex justify-end space-x-3 pt-2">
          <button
            type="button"
            onClick={() => {
              resetForm();
              closeModal();
            }}
            className={`px-4 py-2.5 rounded-lg font-medium transition-colors ${
              isDarkMode
                ? "bg-gray-700 hover:bg-gray-600 text-gray-200"
                : "bg-gray-200 hover:bg-gray-300 text-gray-700"
            }`}
          >
            취소
          </button>
          <button
            type="submit"
            className={`px-5 py-2.5 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors ${
              isDarkMode ? "shadow-none" : "shadow"
            }`}
          >
            시작
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default TimerModal;

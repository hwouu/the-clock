// src/components/alarm/AlarmModal.tsx
import { useState, useEffect } from "react";
import { useAlarmStore } from "../../store/alarmStore";
import Modal from "../ui/Modal";
import { useTheme } from "../../hooks/useTheme";

const AlarmModal = () => {
  const { isDarkMode } = useTheme();
  const { isModalOpen, closeModal, addAlarm, updateAlarm, editingAlarm } =
    useAlarmStore();

  const [name, setName] = useState("");
  const [hour, setHour] = useState(new Date().getHours());
  const [minute, setMinute] = useState(new Date().getMinutes());

  useEffect(() => {
    if (editingAlarm) {
      setName(editingAlarm.name);
      setHour(editingAlarm.hour);
      setMinute(editingAlarm.minute);
    } else {
      const now = new Date();
      setHour(now.getHours());
      setMinute(now.getMinutes());
      setName("");
    }
  }, [editingAlarm]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const alarmData = {
      name: name.trim() || "알람",
      hour,
      minute,
      isEnabled: true,
    };
    if (editingAlarm) {
      updateAlarm(editingAlarm.id, alarmData);
    } else {
      addAlarm(alarmData);
    }
    closeModal();
  };

  const handleHourChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value) || 0;
    if (value >= 0 && value <= 23) {
      setHour(value);
    }
  };

  const handleMinuteChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value) || 0;
    if (value >= 0 && value <= 59) {
      setMinute(value);
    }
  };

  return (
    <Modal
      isOpen={isModalOpen}
      onClose={closeModal}
      title={editingAlarm ? "알람 수정" : "새 알람"}
    >
      <form onSubmit={handleSubmit} className="flex flex-col space-y-6">
        <div>
          <label
            htmlFor="alarm-name"
            className="block mb-2 text-sm font-medium text-left"
          >
            알람 이름
          </label>
          <input
            id="alarm-name"
            type="text"
            placeholder="알람 이름 (예: 기상)"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 transition-all ${
              isDarkMode
                ? "bg-gray-700 border-gray-600"
                : "bg-white border-gray-300"
            }`}
          />
        </div>
        <div>
          <label className="block mb-3 text-sm font-medium text-left">
            알람 시각
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
                max="23"
                value={hour}
                onChange={handleHourChange}
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
                value={minute}
                onChange={handleMinuteChange}
                className={`w-full p-3 text-center text-lg font-medium border rounded-lg focus:ring-2 focus:ring-blue-500 transition-all ${
                  isDarkMode
                    ? "bg-gray-700 border-gray-600 text-white"
                    : "bg-white border-gray-300 text-gray-900"
                }`}
              />
            </div>
          </div>
        </div>
        <div className="flex justify-end space-x-3 pt-2">
          <button
            type="button"
            onClick={closeModal}
            className={`px-4 py-2.5 rounded-lg font-medium ${
              isDarkMode
                ? "bg-gray-700 hover:bg-gray-600"
                : "bg-gray-200 hover:bg-gray-300"
            }`}
          >
            취소
          </button>
          <button
            type="submit"
            className="px-5 py-2.5 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700"
          >
            {editingAlarm ? "수정" : "저장"}
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default AlarmModal;

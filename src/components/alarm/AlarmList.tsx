// src/components/alarm/AlarmList.tsx
import { useAlarmStore } from "../../store/alarmStore";
import { useTheme } from "../../hooks/useTheme";
import { Trash2, Edit } from "lucide-react";

const AlarmList = () => {
  const { alarms, toggleAlarm, removeAlarm, openModal } = useAlarmStore();
  const { isDarkMode } = useTheme();

  if (alarms.length === 0) {
    return null;
  }

  return (
    <div className="fixed bottom-6 left-6 z-30 max-w-xs w-full">
      <div
        className={`rounded-lg shadow-xl overflow-hidden ${
          isDarkMode ? "bg-gray-800" : "bg-white"
        }`}
      >
        <div className="p-3 border-b">
          <h3 className="font-bold text-left">알람 목록</h3>
        </div>
        <div className="max-h-60 overflow-y-auto">
          {alarms.map((alarm) => (
            <div
              key={alarm.id}
              className={`flex items-center justify-between p-3 border-b ${
                isDarkMode ? "border-gray-700" : "border-gray-200"
              }`}
            >
              <div>
                <p className="font-semibold text-left">{alarm.name}</p>
                <p
                  className={`text-2xl font-mono ${
                    isDarkMode ? "text-gray-300" : "text-gray-600"
                  }`}
                >
                  {String(alarm.hour).padStart(2, "0")}:
                  {String(alarm.minute).padStart(2, "0")}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <button onClick={() => openModal(alarm)} aria-label="알람 수정">
                  <Edit className="w-4 h-4" />
                </button>
                <button
                  onClick={() => removeAlarm(alarm.id)}
                  aria-label="알람 삭제"
                >
                  <Trash2 className="w-4 h-4 text-red-500" />
                </button>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={alarm.isEnabled}
                    onChange={() => toggleAlarm(alarm.id)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                </label>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AlarmList;

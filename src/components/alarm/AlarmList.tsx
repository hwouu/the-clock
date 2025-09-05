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
    <div className="max-h-60 overflow-y-auto">
      <div className="p-3">
        <h3 className="font-bold text-left text-sm mb-2">알람</h3>
      </div>
      {alarms.map((alarm) => (
        <div
          key={alarm.id}
          className={`flex items-center justify-between p-3 border-t ${
            isDarkMode ? "border-gray-700" : "border-gray-200"
          }`}
        >
          <div>
            <p className="font-semibold text-left text-base">{alarm.name}</p>
            <p
              className={`text-xl font-mono ${
                isDarkMode ? "text-gray-300" : "text-gray-500"
              }`}
            >
              {String(alarm.hour).padStart(2, "0")}:
              {String(alarm.minute).padStart(2, "0")}
            </p>
          </div>
          <div className="flex items-center gap-3">
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
              <div className="w-11 h-6 bg-gray-200 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AlarmList;

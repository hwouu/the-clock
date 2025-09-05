// src/components/timer/TimerStatus.tsx
import { useTimerStore } from "../../store/timerStore";
import TimerDisplay from "./TimerDisplay";

const TimerStatus = () => {
  const { activeTimer } = useTimerStore();

  if (!activeTimer) {
    return null;
  }

  return (
    <div className="p-3 border-t border-gray-200 dark:border-gray-700">
      <h4 className="text-sm font-bold text-left mb-2">{activeTimer.name}</h4>
      <TimerDisplay />
    </div>
  );
};

export default TimerStatus;

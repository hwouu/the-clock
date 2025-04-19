import React from "react";
import { TimeData } from "../../types/clock";
import { format } from "date-fns";
import { ko } from "date-fns/locale";

interface DigitalClockProps {
  time: TimeData;
}

const DigitalClock: React.FC<DigitalClockProps> = ({ time }) => {
  const formatTimeUnit = (unit: number): string => {
    return unit < 10 ? `0${unit}` : `${unit}`;
  };

  const formatDate = (date: Date): string => {
    return format(date, "yyyy년 MM월 dd일 eeee", { locale: ko });
  };

  return (
    <div className="text-center p-6 rounded-lg">
      <div className="text-6xl font-mono font-bold tracking-widest mb-4 relative">
        <span className="transition-all duration-300 inline-block min-w-10 text-center">
          {formatTimeUnit(time.hours)}
        </span>
        <span className="mx-1 animate-pulse">:</span>
        <span className="transition-all duration-300 inline-block min-w-10 text-center">
          {formatTimeUnit(time.minutes)}
        </span>
        <span className="mx-1 animate-pulse">:</span>
        <span className="transition-all duration-300 inline-block min-w-10 text-center">
          {formatTimeUnit(time.seconds)}
        </span>
      </div>

      <div className="text-xl mt-2 text-gray-500 font-medium">
        {formatDate(time.date)}
      </div>
    </div>
  );
};

export default DigitalClock;

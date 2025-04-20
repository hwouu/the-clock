// src/components/clock/DigitalClock.tsx
import React, { useEffect, useState } from "react";
import { TimeData } from "../../types/clock";
import { format } from "date-fns";
import { ko } from "date-fns/locale";

interface DigitalClockProps {
  time: TimeData;
}

const DigitalClock: React.FC<DigitalClockProps> = ({ time }) => {
  const [isMobile, setIsMobile] = useState(false);

  // 화면 크기 감지
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 640);
    };

    // 초기 체크
    checkIfMobile();

    // 리사이즈 시 체크
    window.addEventListener("resize", checkIfMobile);

    return () => {
      window.removeEventListener("resize", checkIfMobile);
    };
  }, []);

  const formatTimeUnit = (unit: number): string => {
    return unit < 10 ? `0${unit}` : `${unit}`;
  };

  const formatDate = (date: Date): string => {
    return format(date, "yyyy년 MM월 dd일 eeee", { locale: ko });
  };

  return (
    <div className={`text-center ${isMobile ? "p-2" : "p-4"} rounded-lg`}>
      <div
        className={`digital-time font-mono font-bold tracking-wider ${
          isMobile ? "mb-2" : "mb-4"
        } ${isMobile ? "text-4xl" : "text-7xl"}`}
      >
        <span className="transition-all duration-300 inline-block min-w-12 text-center">
          {formatTimeUnit(time.hours)}
        </span>
        <span className="mx-1 animate-pulse">:</span>
        <span className="transition-all duration-300 inline-block min-w-12 text-center">
          {formatTimeUnit(time.minutes)}
        </span>
        <span className="mx-1 animate-pulse">:</span>
        <span className="transition-all duration-300 inline-block min-w-12 text-center">
          {formatTimeUnit(time.seconds)}
        </span>
      </div>

      <div
        className={`digital-date ${isMobile ? "text-sm" : "text-xl"} ${
          isMobile ? "mt-1" : "mt-2"
        } font-medium`}
      >
        {formatDate(time.date)}
      </div>
    </div>
  );
};

export default DigitalClock;

// src/components/clock/AnalogClock.tsx
import React, { useEffect, useState } from "react";
import { TimeData } from "../../types/clock";
import { format } from "date-fns";
import { ko } from "date-fns/locale";

interface AnalogClockProps {
  time: TimeData;
  isDarkMode: boolean;
}

const AnalogClock: React.FC<AnalogClockProps> = ({ time, isDarkMode }) => {
  const [clockSize, setClockSize] = useState(300);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const updateClockSize = () => {
      const mobile = window.innerWidth < 640;
      setIsMobile(mobile);
      setClockSize(mobile ? 220 : 300);
    };
    updateClockSize();
    window.addEventListener("resize", updateClockSize);
    return () => window.removeEventListener("resize", updateClockSize);
  }, []);

  // 시침/분침 색상 결정
  const handColorClass = isDarkMode ? "bg-white" : "bg-gray-800";
  const markerColorClass = isDarkMode ? "bg-gray-300" : "bg-gray-600";
  const centerDotBorderColorClass = isDarkMode
    ? "border-gray-800"
    : "border-white";

  return (
    <div className="flex flex-col items-center">
      <div
        className="relative rounded-full"
        style={{ width: `${clockSize}px`, height: `${clockSize}px` }}
      >
        <div
          className={`w-full h-full rounded-full ${
            isDarkMode ? "bg-gray-700" : "bg-white"
          } border-4 ${
            isDarkMode ? "border-gray-600" : "border-gray-300"
          } shadow-xl`}
        >
          {/* Hour Markers */}
          {[...Array(12)].map((_, i) => {
            const hour = i + 1;
            const isPrimary = hour % 3 === 0;
            return (
              <div
                key={i}
                className="absolute w-full h-full"
                style={{ transform: `rotate(${hour * 30}deg)` }}
              >
                <div
                  className={`absolute ${
                    isPrimary ? "w-1 h-4" : "w-0.5 h-2"
                  } ${markerColorClass}`}
                  style={{ left: "calc(50% - 2px)", top: "6px" }}
                />
              </div>
            );
          })}
        </div>

        {/* Hands */}
        <div className="absolute top-0 left-0 w-full h-full flex justify-center items-center">
          {/* Hour Hand */}
          <div
            className={`absolute w-1.5 h-1/4 rounded-full ${handColorClass}`}
            style={{
              transform: `rotate(${time.hours * 30 + time.minutes / 2}deg)`,
              transformOrigin: "bottom",
              bottom: "50%",
            }}
          />
          {/* Minute Hand */}
          <div
            className={`absolute w-1 h-1/3 rounded-full ${handColorClass}`}
            style={{
              transform: `rotate(${time.minutes * 6}deg)`,
              transformOrigin: "bottom",
              bottom: "50%",
            }}
          />
          {/* Second Hand */}
          <div
            className="absolute w-0.5 h-2/5 bg-red-500 rounded-full"
            style={{
              transform: `rotate(${time.seconds * 6}deg)`,
              transformOrigin: "bottom",
              bottom: "50%",
            }}
          />
          {/* Center Dot */}
          <div
            className={`absolute w-3 h-3 bg-red-500 rounded-full border-2 ${centerDotBorderColorClass}`}
          />
        </div>
      </div>
      <div className={`mt-6 font-medium ${isMobile ? "text-base" : "text-xl"}`}>
        {format(time.date, "yyyy년 MM월 dd일 eeee", { locale: ko })}
      </div>
    </div>
  );
};

export default AnalogClock;

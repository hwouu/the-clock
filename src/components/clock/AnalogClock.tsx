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

  useEffect(() => {
    const updateClockSize = () => {
      setClockSize(window.innerWidth < 640 ? 250 : 300);
    };
    updateClockSize();
    window.addEventListener("resize", updateClockSize);
    return () => window.removeEventListener("resize", updateClockSize);
  }, []);

  const formatHour = (hour: number) =>
    hour > 12 ? hour - 12 : hour === 0 ? 12 : hour;

  const hourNumbers = Array.from({ length: 12 }, (_, i) => {
    const hour = i + 1;
    const angle = hour * 30 - 90;
    const radians = (angle * Math.PI) / 180;
    const center = clockSize / 2;
    const radius = clockSize * 0.38;
    const x = Math.cos(radians) * radius + center;
    const y = Math.sin(radians) * radius + center;
    return { hour, x, y };
  });

  const fontSize = clockSize < 300 ? "14px" : "16px";
  const formatDate = (date: Date): string =>
    format(date, "yyyy년 MM월 dd일 eeee", { locale: ko });

  return (
    <div className="flex flex-col items-center">
      <div
        className="relative mx-auto rounded-full border-4 border-gray-300 shadow-xl"
        style={{
          width: `${clockSize}px`,
          height: `${clockSize}px`,
          paddingBottom: "1.5rem", // 시계 컴포넌트 자체 하단 여백 추가
        }}
      >
        <div
          className={`absolute inset-0 rounded-full ${
            isDarkMode ? "bg-gray-700" : "bg-white"
          }`}
        >
          {[...Array(12)].map(
            (_, i) =>
              i !== 0 && (
                <div
                  key={i}
                  className={`absolute w-1.5 h-5 ${
                    isDarkMode ? "bg-gray-300" : "bg-gray-600"
                  }`}
                  style={{
                    transformOrigin: "bottom center",
                    left: "calc(50% - 0.75px)",
                    top: "5%",
                    transform: `rotate(${i * 30}deg)`,
                  }}
                />
              )
          )}

          {[...Array(60)].map(
            (_, i) =>
              i % 5 !== 0 &&
              i !== 0 && (
                <div
                  key={i}
                  className={`absolute w-0.5 h-2.5 ${
                    isDarkMode ? "bg-gray-500" : "bg-gray-400"
                  }`}
                  style={{
                    transformOrigin: "bottom center",
                    left: "calc(50% - 0.25px)",
                    top: "6%",
                    transform: `rotate(${i * 6}deg)`,
                  }}
                />
              )
          )}

          {hourNumbers.map(({ hour, x, y }) => (
            <div
              key={hour}
              className={`absolute font-medium ${
                isDarkMode ? "text-gray-200" : "text-gray-800"
              }`}
              style={{
                left: `${x}px`,
                top: `${y}px`,
                transform: "translate(-50%, -50%)",
                fontSize: fontSize,
              }}
            >
              {hour}
            </div>
          ))}

          <div
            className="absolute w-0.5 bg-red-500 rounded-full z-10"
            style={{
              height: "45%",
              left: "calc(50% - 0.25px)",
              bottom: "50%",
              transformOrigin: "bottom center",
              transform: `rotate(${time.seconds * 6}deg)`,
            }}
          />
          <div
            className={`absolute w-2 rounded-full z-20 ${
              isDarkMode ? "bg-gray-200" : "bg-gray-800"
            }`}
            style={{
              height: "40%",
              left: "calc(50% - 1px)",
              bottom: "50%",
              transformOrigin: "bottom center",
              transform: `rotate(${time.minutes * 6}deg)`,
            }}
          />
          <div
            className={`absolute w-2.5 rounded-full z-30 ${
              isDarkMode ? "bg-gray-200" : "bg-gray-800"
            }`}
            style={{
              height: "30%",
              left: "calc(50% - 1.25px)",
              bottom: "50%",
              transformOrigin: "bottom center",
              transform: `rotate(${
                formatHour(time.hours) * 30 + time.minutes * 0.5
              }deg)`,
            }}
          />
          <div
            className={`absolute bg-red-500 rounded-full left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-40 ${
              isDarkMode
                ? "border-2 border-gray-200"
                : "border-2 border-gray-800"
            }`}
            style={{
              width: clockSize * 0.05,
              height: clockSize * 0.05,
            }}
          />
        </div>
      </div>

      {/* 날짜 및 요일 표시 */}
      <div
        className={`font-medium ${clockSize < 300 ? "text-sm" : "text-xl"} ${
          isDarkMode ? "text-gray-200" : "text-gray-800"
        } mt-8`}
      >
        {formatDate(time.date)}
      </div>
    </div>
  );
};

export default AnalogClock;

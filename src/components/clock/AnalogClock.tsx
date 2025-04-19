// src/components/clock/AnalogClock.tsx
import React, { useEffect, useState } from "react";
import { TimeData } from "../../types/clock";

interface AnalogClockProps {
  time: TimeData;
  isDarkMode: boolean;
}

const AnalogClock: React.FC<AnalogClockProps> = ({ time, isDarkMode }) => {
  const [clockSize, setClockSize] = useState(300);

  // 반응형 크기 조정
  useEffect(() => {
    const updateClockSize = () => {
      if (window.innerWidth < 640) {
        // 모바일 화면에서는 더 작은 시계
        setClockSize(250);
      } else {
        // 데스크톱에서는 더 큰 시계
        setClockSize(300);
      }
    };

    // 초기 크기 설정
    updateClockSize();

    // 리사이즈 이벤트 리스너
    window.addEventListener("resize", updateClockSize);

    return () => {
      window.removeEventListener("resize", updateClockSize);
    };
  }, []);

  const formatHour = (hour: number) => {
    return hour > 12 ? hour - 12 : hour === 0 ? 12 : hour;
  };

  // 시간 숫자 위치 계산
  const hourNumbers = Array.from({ length: 12 }, (_, i) => {
    const hour = i + 1;
    const angle = hour * 30 - 90; // 시간당 30도, 12시 기준으로 시작하기 위해 -90
    const radians = (angle * Math.PI) / 180;

    // 시계 원형과 정확히 정렬되도록 반지름과 중심점 조정
    const center = clockSize / 2;
    const radius = clockSize * 0.38; // 원형 크기의 38%에 숫자 배치

    const x = Math.cos(radians) * radius + center;
    const y = Math.sin(radians) * radius + center;

    return { hour, x, y };
  });

  const clockStyles = {
    width: `${clockSize}px`,
    height: `${clockSize}px`,
  };

  const fontSize = clockSize < 300 ? "14px" : "16px";

  return (
    <div
      className="relative w-full h-full mx-auto rounded-full border-4 border-gray-300 shadow-xl"
      style={clockStyles}
    >
      {/* 시계 표면 */}
      <div
        className={`absolute inset-0 rounded-full ${
          isDarkMode ? "bg-gray-700" : "bg-white"
        }`}
      >
        {/* 시간 마커 - 12시 마커는 제외 */}
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

        {/* 분 마커 - 12시 방향(0, 5, 10, ...분)의 마커는 제외 */}
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

        {/* 시간 숫자 */}
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

        {/* 초침 */}
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

        {/* 분침 */}
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

        {/* 시침 */}
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

        {/* 중앙 점 */}
        <div
          className={`absolute bg-red-500 rounded-full left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-40 ${
            isDarkMode ? "border-2 border-gray-200" : "border-2 border-gray-800"
          }`}
          style={{
            width: clockSize * 0.05,
            height: clockSize * 0.05,
          }}
        />
      </div>
    </div>
  );
};

export default AnalogClock;

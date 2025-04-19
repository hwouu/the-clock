import React from "react";
import { TimeData } from "../../types/clock";

interface AnalogClockProps {
  time: TimeData;
  isDarkMode: boolean;
}

const AnalogClock: React.FC<AnalogClockProps> = ({ time, isDarkMode }) => {
  const formatHour = (hour: number) => {
    return hour > 12 ? hour - 12 : hour === 0 ? 12 : hour;
  };

  // Generate hour numbers
  const hourNumbers = Array.from({ length: 12 }, (_, i) => {
    const hour = i + 1;
    const angle = hour * 30 - 90; // 30 degrees per hour, -90 to start at 12 o'clock
    const radians = (angle * Math.PI) / 180;
    const radius = 100; // Distance from center

    const x = Math.cos(radians) * radius + 128; // 128 is half of clock width (256/2)
    const y = Math.sin(radians) * radius + 128;

    return { hour, x, y };
  });

  return (
    <div className="relative w-64 h-64 mx-auto rounded-full border-4 border-gray-300 shadow-lg">
      {/* Clock face */}
      <div
        className={`absolute inset-0 rounded-full ${
          isDarkMode ? "bg-gray-700" : "bg-white"
        }`}
      >
        {/* Hour marks */}
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className={`absolute w-1 h-4 ${
              isDarkMode ? "bg-gray-400" : "bg-gray-600"
            }`}
            style={{
              transformOrigin: "bottom center",
              left: "calc(50% - 0.5px)",
              top: "5%",
              transform: `rotate(${i * 30}deg)`,
            }}
          />
        ))}

        {/* Minute marks */}
        {[...Array(60)].map(
          (_, i) =>
            i % 5 !== 0 && (
              <div
                key={i}
                className={`absolute w-0.5 h-2 ${
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

        {/* Hour numbers */}
        {hourNumbers.map(({ hour, x, y }) => (
          <div
            key={hour}
            className={`absolute text-sm font-bold ${
              isDarkMode ? "text-gray-300" : "text-gray-800"
            }`}
            style={{
              left: `${x}px`,
              top: `${y}px`,
              transform: "translate(-50%, -50%)",
            }}
          >
            {hour}
          </div>
        ))}

        {/* Hands */}
        {/* Second hand */}
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

        {/* Minute hand */}
        <div
          className={`absolute w-1.5 rounded-full z-20 ${
            isDarkMode ? "bg-gray-300" : "bg-gray-800"
          }`}
          style={{
            height: "40%",
            left: "calc(50% - 0.75px)",
            bottom: "50%",
            transformOrigin: "bottom center",
            transform: `rotate(${time.minutes * 6}deg)`,
          }}
        />

        {/* Hour hand */}
        <div
          className={`absolute w-2 rounded-full z-30 ${
            isDarkMode ? "bg-gray-300" : "bg-gray-800"
          }`}
          style={{
            height: "30%",
            left: "calc(50% - 1px)",
            bottom: "50%",
            transformOrigin: "bottom center",
            transform: `rotate(${
              formatHour(time.hours) * 30 + time.minutes * 0.5
            }deg)`,
          }}
        />

        {/* Center dot */}
        <div
          className={`absolute w-4 h-4 bg-red-500 rounded-full left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-40 ${
            isDarkMode ? "border-2 border-gray-300" : "border-2 border-gray-800"
          }`}
        />
      </div>
    </div>
  );
};

export default AnalogClock;

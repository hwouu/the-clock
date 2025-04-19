// src/components/weather/WeatherDisplay.tsx
import React, { useEffect, useState } from "react";
import { MapPin, CalendarClock, RefreshCw, AlertTriangle } from "lucide-react";
import { WeatherData } from "../../types/clock";
import { format } from "date-fns";
import { ko } from "date-fns/locale";

interface WeatherDisplayProps {
  weather: WeatherData;
  location: string;
  isDarkMode: boolean;
  date: Date;
  error?: string | null;
  isLoading?: boolean;
  onRefresh?: () => void;
}

const WeatherDisplay: React.FC<WeatherDisplayProps> = ({
  weather,
  location,
  isDarkMode,
  date,
  error,
  isLoading,
  onRefresh,
}) => {
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

  const formatDateTime = (date: Date): string => {
    return format(
      date,
      isMobile ? "yyyy.MM.dd HH:mm" : "yyyy년 MM월 dd일 HH:mm",
      { locale: ko }
    );
  };

  const getWeatherIconSize = () => {
    return weather.icon === "⛅" ||
      weather.icon === "☀️" ||
      weather.icon === "🌧️"
      ? "text-xl"
      : "text-lg";
  };

  return (
    <div
      className={`p-4 rounded-lg transition-colors duration-300 ${
        isDarkMode ? "bg-gray-700 text-gray-100" : "bg-gray-100 text-gray-800"
      }`}
    >
      <div
        className={`flex ${
          isMobile ? "flex-col space-y-2" : "items-center justify-between mb-3"
        }`}
      >
        <div className="flex items-center space-x-2">
          <MapPin
            className={`${isMobile ? "w-4 h-4" : "w-5 h-5"} ${
              isDarkMode ? "text-gray-300" : "text-gray-500"
            }`}
          />
          <span className={`${isMobile ? "text-sm" : "text-base"} font-medium`}>
            {location}
          </span>
        </div>
        <div className="flex items-center">
          {isLoading ? (
            <RefreshCw
              className={`mr-2 ${
                isMobile ? "w-3.5 h-3.5" : "w-4 h-4"
              } animate-spin ${isDarkMode ? "text-gray-300" : "text-gray-500"}`}
            />
          ) : error ? (
            <AlertTriangle
              className={`mr-2 ${isMobile ? "w-3.5 h-3.5" : "w-4 h-4"} ${
                isDarkMode ? "text-yellow-300" : "text-yellow-500"
              }`}
            />
          ) : (
            <span className={`mr-2 ${getWeatherIconSize()}`}>
              {weather.icon}
            </span>
          )}
          <span className={`${isMobile ? "text-sm" : "text-base"} font-medium`}>
            {weather.temp} | {weather.condition}
          </span>
          {onRefresh && (
            <button
              onClick={onRefresh}
              className={`ml-2 p-1 rounded-full ${
                isDarkMode ? "hover:bg-gray-600" : "hover:bg-gray-200"
              } transition-colors ${
                isLoading ? "opacity-50 cursor-not-allowed" : ""
              }`}
              disabled={isLoading}
              aria-label="날씨 새로고침"
            >
              <RefreshCw
                className={`${isMobile ? "w-3 h-3" : "w-3.5 h-3.5"} ${
                  isDarkMode ? "text-gray-300" : "text-gray-500"
                }`}
              />
            </button>
          )}
        </div>
      </div>

      {error && (
        <div
          className={`${isMobile ? "text-xs" : "text-sm"} ${
            isDarkMode ? "text-red-300" : "text-red-500"
          } mb-2`}
        >
          {error}
        </div>
      )}

      <div
        className={`flex items-center space-x-2 ${
          isMobile ? "text-xs mt-2" : "text-sm"
        }`}
      >
        <CalendarClock
          className={`${isMobile ? "w-3.5 h-3.5" : "w-4 h-4"} ${
            isDarkMode ? "text-gray-300" : "text-gray-500"
          }`}
        />
        <span className={isDarkMode ? "text-gray-100" : "text-gray-800"}>
          {formatDateTime(date)}
        </span>
      </div>
    </div>
  );
};

export default WeatherDisplay;

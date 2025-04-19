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

  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 640);
    };

    checkIfMobile();
    window.addEventListener("resize", checkIfMobile);

    return () => {
      window.removeEventListener("resize", checkIfMobile);
    };
  }, []);

  const formatDateTime = (date: Date): string => {
    return format(date, "yyyy년 MM월 dd일 HH:mm", { locale: ko });
  };

  return (
    <div
      className={`p-4 rounded-lg transition-colors duration-300 ${
        isDarkMode ? "bg-gray-700 text-gray-100" : "bg-gray-100 text-gray-800"
      }`}
    >
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-3 space-y-2 sm:space-y-0">
        {/* 위치 */}
        <div className="flex items-center space-x-2">
          <MapPin className="w-4 h-4 text-gray-400" />
          <span className="text-sm font-medium">{location}</span>
        </div>

        {/* 날씨 */}
        <div className="flex items-center space-x-2">
          {isLoading ? (
            <RefreshCw className="w-4 h-4 animate-spin text-gray-400" />
          ) : error ? (
            <AlertTriangle className="w-4 h-4 text-yellow-400" />
          ) : (
            <span className="text-base">{weather.icon}</span>
          )}
          <span className="text-sm font-medium">
            {weather.temp} | {weather.condition}
          </span>
          {onRefresh && (
            <button
              onClick={onRefresh}
              className={`p-1 rounded-full transition-colors ${
                isDarkMode ? "hover:bg-gray-600" : "hover:bg-gray-200"
              } ${isLoading ? "opacity-50 cursor-not-allowed" : ""}`}
              disabled={isLoading}
              aria-label="날씨 새로고침"
            >
              <RefreshCw className="w-4 h-4 text-gray-400" />
            </button>
          )}
        </div>
      </div>

      {/* 에러 메시지 */}
      {error && <div className="text-xs text-red-400 mb-2">{error}</div>}

      {/* 날짜 표시 */}
      <div className="flex items-center space-x-2 text-xs mt-1">
        <CalendarClock className="w-4 h-4 text-gray-400" />
        <span className="text-sm text-gray-200">{formatDateTime(date)}</span>
      </div>
    </div>
  );
};

export default WeatherDisplay;

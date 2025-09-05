// src/components/weather/WeatherDisplay.tsx
import React, { useEffect, useState } from "react";
import { MapPin, RefreshCw, AlertTriangle } from "lucide-react";
import { WeatherData } from "../../types/clock";

interface WeatherDisplayProps {
  weather: WeatherData;
  location: string;
  isDarkMode: boolean;
  error?: string | null;
  isLoading?: boolean;
  onRefresh?: () => void;
}

const WeatherDisplay: React.FC<WeatherDisplayProps> = ({
  weather,
  location,
  isDarkMode,
  error,
  isLoading,
  onRefresh,
}) => {
  const [isMobile, setIsMobile] = useState(false);
  const [lastUpdated, setLastUpdated] = useState(new Date());

  useEffect(() => {
    const checkIfMobile = () => setIsMobile(window.innerWidth < 640);
    checkIfMobile();
    window.addEventListener("resize", checkIfMobile);
    return () => window.removeEventListener("resize", checkIfMobile);
  }, []);

  useEffect(() => {
    if (!isLoading) {
      setLastUpdated(new Date());
    }
  }, [isLoading]);

  const handleRefresh = () => {
    if (onRefresh) onRefresh();
  };

  return (
    <div
      className={`p-4 rounded-lg duration-300 ${
        isDarkMode ? "text-gray-100" : "text-gray-800"
      }`}
    >
      <div
        className={`flex ${
          isMobile ? "flex-col space-y-3" : "items-center justify-between"
        }`}
      >
        <div className="flex items-center space-x-2">
          <MapPin
            className={`w-5 h-5 ${
              isDarkMode ? "text-gray-300" : "text-gray-500"
            }`}
          />
          <span className="font-medium">{location}</span>
        </div>
        <div className="flex items-center">
          {isLoading ? (
            <RefreshCw className="mr-2 w-4 h-4 animate-spin" />
          ) : error ? (
            <AlertTriangle className="mr-2 w-4 h-4 text-yellow-500" />
          ) : (
            <span className="mr-2 text-xl">{weather.icon}</span>
          )}
          <span className="font-medium">
            {weather.temp} | {weather.condition}
          </span>
          <button
            onClick={handleRefresh}
            className={`ml-2 p-1 rounded-full ${
              isLoading ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={isLoading}
            aria-label="날씨 새로고침"
          >
            <RefreshCw
              className={`w-3.5 h-3.5 ${
                isDarkMode ? "text-gray-300" : "text-gray-500"
              }`}
            />
          </button>
        </div>
      </div>
      {error && (
        <div
          className={`mt-2 text-sm ${
            isDarkMode ? "text-red-300" : "text-red-500"
          }`}
        >
          {error}
        </div>
      )}
    </div>
  );
};

export default WeatherDisplay;

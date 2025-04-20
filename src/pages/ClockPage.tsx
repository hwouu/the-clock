// src/pages/ClockPage.tsx
import { useState, useEffect, useCallback } from "react";
import AnalogClock from "../components/clock/AnalogClock";
import DigitalClock from "../components/clock/DigitalClock";
import WeatherDisplay from "../components/weather/WeatherDisplay";
import { ClockMode } from "../types/clock";
import { useTime } from "../hooks/useTime";
import { useTheme } from "../context/ThemeContext"; // 경로 업데이트
import { useWeather } from "../hooks/useWeather";

const ClockPage = () => {
  // 로컬 스토리지에서 상태 읽기/쓰기를 위한 키
  const CLOCK_MODE_STORAGE_KEY = "clock-app-mode";

  // 초기 상태를 로컬 스토리지에서 가져오거나 기본값 사용
  const [clockMode, setClockMode] = useState<ClockMode>(() => {
    const savedMode = localStorage.getItem(CLOCK_MODE_STORAGE_KEY);
    return (savedMode as ClockMode) || "digital";
  });

  const [isMobile, setIsMobile] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

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

  const time = useTime();
  const { isDarkMode } = useTheme(); // isDarkMode 직접 사용
  const { weather, location, error, isLoading, refreshWeather } = useWeather();

  // 모드가 변경될 때마다 로컬 스토리지에 저장
  useEffect(() => {
    localStorage.setItem(CLOCK_MODE_STORAGE_KEY, clockMode);
  }, [clockMode]);

  const toggleClockMode = () => {
    setClockMode((prev) => {
      const newMode = prev === "analog" ? "digital" : "analog";
      return newMode;
    });
  };

  const handleRefreshWeather = useCallback(async () => {
    if (refreshing || isLoading) return;

    setRefreshing(true);
    try {
      await refreshWeather();
    } catch (err) {
      console.error("Error refreshing weather:", err);
    } finally {
      setRefreshing(false);
    }
  }, [refreshing, isLoading, refreshWeather]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 transition-colors duration-300">
      <div
        className={`w-full max-w-2xl p-6 sm:p-8 rounded-xl shadow-lg transition-all duration-300 ${
          isDarkMode ? "bg-gray-800" : "bg-white"
        }`}
      >
        {/* 시계 표시 */}
        <div className="mb-5 flex justify-center items-center">
          {clockMode === "analog" ? (
            <AnalogClock time={time} isDarkMode={isDarkMode} />
          ) : (
            <DigitalClock time={time} />
          )}
        </div>

        {/* 구분선 추가 */}
        <div
          className={`border-t ${
            isDarkMode ? "border-gray-700" : "border-gray-300"
          } `}
        />

        {/* 날씨 및 위치 정보 */}
        <WeatherDisplay
          weather={weather}
          location={location}
          isDarkMode={isDarkMode}
          date={time.date}
          error={error}
          isLoading={isLoading || refreshing}
          onRefresh={handleRefreshWeather}
        />
      </div>

      {/* Attribution */}
      <div
        className={`mt-4 text-xs ${
          isDarkMode ? "text-gray-400" : "text-gray-500"
        }`}
      >
        Weather data provided by OpenWeatherMap
      </div>
    </div>
  );
};

export default ClockPage;

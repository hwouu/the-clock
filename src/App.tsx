// src/App.tsx
import { useState, useEffect, useCallback } from "react";
import { Sun, Moon, Clock } from "lucide-react";
import AnalogClock from "./components/clock/AnalogClock";
import DigitalClock from "./components/clock/DigitalClock";
import WeatherDisplay from "./components/weather/WeatherDisplay";
import { ClockMode } from "./types/clock";
import { useTime } from "./hooks/useTime";
import { useTheme } from "./hooks/useTheme";
import { useWeather } from "./hooks/useWeather";

// 로컬 스토리지에서 상태 읽기/쓰기를 위한 키
const CLOCK_MODE_STORAGE_KEY = "clock-app-mode";

function App() {
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
  const { theme, toggleTheme } = useTheme();
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

  const isDarkMode = theme === "dark";

  // 모바일 전용 타이틀 컴포넌트
  const MobileTitle = () => (
    <div className="sm:hidden text-center mb-4">
      <div className="flex items-center justify-center gap-2">
        <Clock className="w-6 h-6" />
        <h1 className="text-2xl font-bold">The Clock</h1>
      </div>
    </div>
  );

  // 모바일 전용 버튼 컴포넌트 (양쪽 대칭 배치)
  const MobileButtons = () => (
    <div className="flex sm:hidden justify-between items-center mb-4 px-1">
      <button
        onClick={toggleClockMode}
        className={`px-3 py-1.5 rounded-lg font-medium transition-colors text-sm ${
          isDarkMode ? " hover:bg-gray-600" : " hover:bg-gray-300"
        }`}
        aria-label={
          clockMode === "analog" ? "디지털 모드로 전환" : "아날로그 모드로 전환"
        }
      >
        {clockMode === "analog" ? "Digital" : "Analog"}
      </button>

      <button
        onClick={toggleTheme}
        className={`p-2 rounded-lg transition-colors ${
          isDarkMode ? "hover:bg-gray-600" : "hover:bg-gray-300"
        }`}
        aria-label={isDarkMode ? "라이트 모드로 전환" : "다크 모드로 전환"}
      >
        {isDarkMode ? (
          <Sun className="w-4 h-4" />
        ) : (
          <Moon className="w-4 h-4" />
        )}
      </button>
    </div>
  );

  return (
    <div
      className={`min-h-screen flex flex-col items-center justify-center p-4 transition-colors duration-300 ${
        isDarkMode ? "bg-gray-900 text-white" : "bg-white text-gray-900"
      }`}
    >
      {/* 모바일 전용 타이틀 */}
      <MobileTitle />

      <div
        className={`w-full max-w-2xl p-6 sm:p-8 rounded-xl shadow-lg transition-colors duration-300 ${
          isDarkMode ? "bg-gray-800" : "bg-gray-100"
        }`}
      >
        {/* 데스크톱에서만 표시되는 헤더 */}
        <div className="hidden sm:flex justify-between items-center mb-6 sm:mb-8">
          <div className="flex items-center gap-3">
            <Clock className="w-7 h-7" />
            <h1 className="text-3xl font-bold">The Clock</h1>
          </div>
          <div className="flex gap-4">
            <button
              onClick={toggleClockMode}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                isDarkMode ? " hover:bg-gray-600" : " hover:bg-gray-300"
              }`}
              aria-label={
                clockMode === "analog"
                  ? "디지털 모드로 전환"
                  : "아날로그 모드로 전환"
              }
            >
              {clockMode === "analog" ? "Digital" : "Analog"}
            </button>
            <button
              onClick={toggleTheme}
              className={`p-3 rounded-lg transition-colors ${
                isDarkMode ? " hover:bg-gray-600" : " hover:bg-gray-300"
              }`}
              aria-label={
                isDarkMode ? "라이트 모드로 전환" : "다크 모드로 전환"
              }
            >
              {isDarkMode ? (
                <Sun className="w-6 h-6" />
              ) : (
                <Moon className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* 모바일 버전에서만 표시되는 버튼 (양쪽 배치) */}
        <MobileButtons />

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
}

export default App;

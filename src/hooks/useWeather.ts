// src/hooks/useWeather.ts
import { useState, useEffect } from "react";
import { WeatherData } from "../types/clock";
import { getFullWeatherInfo } from "../services/weatherService";

export function useWeather() {
  const [weather, setWeather] = useState<WeatherData>({
    temp: "--",
    condition: "Loading...",
    icon: "🔄",
  });
  const [location, setLocation] = useState<string>("Loading location...");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        setIsLoading(true);

        // Get weather data
        const { weather, location } = await getFullWeatherInfo();

        setWeather(weather);
        setLocation(location);
        setError(null);
      } catch (err) {
        console.error("Error in useWeather hook:", err);
        setError(
          "Failed to fetch weather data. Please check permissions and try again."
        );

        // Set fallback values
        setWeather({
          temp: "--",
          condition: "Weather unavailable",
          icon: "❓",
        });
        setLocation("Location unavailable");
      } finally {
        setIsLoading(false);
      }
    };

    fetchWeatherData();

    // Set up a timer to refresh weather data periodically
    const refreshInterval = setInterval(fetchWeatherData, 30 * 60 * 1000); // refresh every 30 minutes

    return () => clearInterval(refreshInterval);
  }, []);

  const refreshWeather = async () => {
    if (isLoading) return;

    try {
      setIsLoading(true);
      const result = await getFullWeatherInfo();
      setWeather(result.weather);
      setLocation(result.location);
      setError(null);
    } catch (err) {
      console.error("Error refreshing weather data:", err);
      setError("Failed to refresh weather data");
    } finally {
      setIsLoading(false);
    }
  };

  return { weather, location, error, isLoading, refreshWeather };
}

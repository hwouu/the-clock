// src/services/weatherService.ts
import { WeatherData } from "../types/clock";

// ===================================================================================
// ⚠️ SECURITY WARNING ⚠️
// ===================================================================================
// Exposing API keys on the client-side is a significant security risk.
// For any real-world application, this functionality should be moved to a
// backend server or a serverless function that acts as a proxy.
// The client should make requests to your server, which then securely
// attaches the API key and forwards the request to the OpenWeatherMap API.
//
// This approach is used here for demonstration purposes only.
// DO NOT deploy an application with an exposed API key in a production environment.
// ===================================================================================
const API_KEY = import.meta.env.VITE_OPENWEATHERMAP_API_KEY;

if (!API_KEY || API_KEY === "YOUR_API_KEY") {
  console.warn(
    "OpenWeatherMap API key is missing. Set VITE_OPENWEATHERMAP_API_KEY in your .env file."
  );
}

export interface GeoLocation {
  latitude: number;
  longitude: number;
}

export const getCurrentLocation = (): Promise<GeoLocation> => {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      return reject(new Error("Geolocation is not supported by your browser"));
    }
    navigator.geolocation.getCurrentPosition(
      (position) =>
        resolve({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        }),
      (error) => reject(error),
      { timeout: 10000, enableHighAccuracy: true }
    );
  });
};

export const getLocationName = async (
  latitude: number,
  longitude: number
): Promise<{ city: string; country: string }> => {
  if (!API_KEY) return { city: "N/A", country: "" };
  try {
    const response = await fetch(
      `https://api.openweathermap.org/geo/1.0/reverse?lat=${latitude}&lon=${longitude}&limit=1&appid=${API_KEY}`
    );
    if (!response.ok) throw new Error("Failed to fetch location data");
    const data = await response.json();
    return data && data.length > 0
      ? { city: data[0].name, country: data[0].country }
      : { city: "Unknown", country: "Unknown" };
  } catch (error) {
    console.error("Error fetching location name:", error);
    return { city: "Unknown", country: "Unknown" };
  }
};

export const getWeatherData = async (
  latitude: number,
  longitude: number
): Promise<WeatherData> => {
  if (!API_KEY) return { temp: "--", condition: "API Key Missing", icon: "❓" };
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${API_KEY}`
    );
    if (!response.ok) throw new Error("Failed to fetch weather data");
    const data = await response.json();
    return {
      temp: `${Math.round(data.main.temp)}°C`,
      condition: data.weather[0].main,
      icon: getWeatherIcon(data.weather[0].id),
    };
  } catch (error) {
    console.error("Error fetching weather data:", error);
    return { temp: "--", condition: "Unavailable", icon: "❓" };
  }
};

export const getWeatherIcon = (weatherId: number): string => {
  if (weatherId >= 200 && weatherId < 300) return "⛈️"; // Thunderstorm
  if (weatherId >= 300 && weatherId < 400) return "🌧️"; // Drizzle
  if (weatherId >= 500 && weatherId < 600) return "🌧️"; // Rain
  if (weatherId >= 600 && weatherId < 700) return "❄️"; // Snow
  if (weatherId >= 700 && weatherId < 800) return "🌫️"; // Atmosphere
  if (weatherId === 800) return "☀️"; // Clear
  if (weatherId > 800) return "☁️"; // Clouds
  return "❓"; // Unknown
};

export const getFullWeatherInfo = async (): Promise<{
  weather: WeatherData;
  location: string;
}> => {
  try {
    const geoLocation = await getCurrentLocation();
    const [locationInfo, weatherData] = await Promise.all([
      getLocationName(geoLocation.latitude, geoLocation.longitude),
      getWeatherData(geoLocation.latitude, geoLocation.longitude),
    ]);
    return {
      weather: weatherData,
      location: `${locationInfo.city}, ${locationInfo.country}`,
    };
  } catch (error) {
    console.error("Error getting weather information:", error);
    return {
      weather: { temp: "--", condition: "Weather unavailable", icon: "❓" },
      location: "Location unavailable",
    };
  }
};

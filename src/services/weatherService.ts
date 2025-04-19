// src/services/weatherService.ts
import { WeatherData } from "../types/clock";

// API key from environment variables
const API_KEY = import.meta.env.VITE_OPENWEATHERMAP_API_KEY || "YOUR_API_KEY";

// 콘솔에 API 키가 올바르게 로드되었는지 확인하기 위한 로그 추가
console.log("API Key loaded:", API_KEY ? "Yes (hidden for security)" : "No");

// Check if API key is valid
if (!API_KEY || API_KEY === "YOUR_API_KEY") {
  console.warn(
    "OpenWeatherMap API key is missing. Set VITE_OPENWEATHERMAP_API_KEY in your .env file."
  );
}

export interface GeoLocation {
  latitude: number;
  longitude: number;
  city?: string;
  country?: string;
}

/**
 * Get user's current geolocation using browser's Geolocation API
 */
export const getCurrentLocation = (): Promise<GeoLocation> => {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error("Geolocation is not supported by your browser"));
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        resolve({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      },
      (error) => {
        reject(error);
      },
      { timeout: 10000, enableHighAccuracy: true }
    );
  });
};

/**
 * Reverse geocode to get city and country from coordinates
 */
export const getLocationName = async (
  latitude: number,
  longitude: number
): Promise<{ city: string; country: string }> => {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/geo/1.0/reverse?lat=${latitude}&lon=${longitude}&limit=1&appid=${API_KEY}`
    );

    if (!response.ok) {
      throw new Error("Failed to fetch location data");
    }

    const data = await response.json();

    if (data && data.length > 0) {
      return {
        city: data[0].name,
        country: data[0].country,
      };
    }

    return {
      city: "Unknown",
      country: "Unknown",
    };
  } catch (error) {
    console.error("Error fetching location name:", error);
    return {
      city: "Unknown",
      country: "Unknown",
    };
  }
};

/**
 * Get current weather data from OpenWeatherMap API
 */
export const getWeatherData = async (
  latitude: number,
  longitude: number
): Promise<WeatherData> => {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${API_KEY}`
    );

    if (!response.ok) {
      throw new Error("Failed to fetch weather data");
    }

    const data = await response.json();

    return {
      temp: `${Math.round(data.main.temp)}°C`,
      condition: data.weather[0].main,
      icon: getWeatherIcon(data.weather[0].id),
    };
  } catch (error) {
    console.error("Error fetching weather data:", error);
    return {
      temp: "--",
      condition: "Weather unavailable",
      icon: "❓",
    };
  }
};

/**
 * Get emoji icon based on OpenWeatherMap condition code
 */
export const getWeatherIcon = (weatherId: number): string => {
  // Weather condition codes: https://openweathermap.org/weather-conditions
  if (weatherId >= 200 && weatherId < 300) {
    return "⛈️"; // Thunderstorm
  } else if (weatherId >= 300 && weatherId < 400) {
    return "🌧️"; // Drizzle
  } else if (weatherId >= 500 && weatherId < 600) {
    return "🌧️"; // Rain
  } else if (weatherId >= 600 && weatherId < 700) {
    return "❄"; // Snow
  } else if (weatherId >= 700 && weatherId < 800) {
    return "☁"; // Atmosphere (fog, mist, etc.)
  } else if (weatherId === 800) {
    return "☀️"; // Clear
  } else if (weatherId >= 801 && weatherId <= 804) {
    return weatherId === 801 ? "⛅" : "☁️"; // Clouds
  } else {
    return "🌈"; // Unknown
  }
};

/**
 * Main function to get full weather information
 */
export const getFullWeatherInfo = async (): Promise<{
  weather: WeatherData;
  location: string;
}> => {
  try {
    const geoLocation = await getCurrentLocation();
    const locationInfo = await getLocationName(
      geoLocation.latitude,
      geoLocation.longitude
    );
    const weatherData = await getWeatherData(
      geoLocation.latitude,
      geoLocation.longitude
    );

    return {
      weather: weatherData,
      location: `${locationInfo.city}, ${locationInfo.country}`,
    };
  } catch (error) {
    console.error("Error getting weather information:", error);
    return {
      weather: {
        temp: "--",
        condition: "Weather unavailable",
        icon: "❓",
      },
      location: "Location unavailable",
    };
  }
};

import React from 'react';
import { MapPin, CalendarClock } from 'lucide-react';
import { WeatherData } from '../../types/clock';
import { format } from 'date-fns';
import { ko } from 'date-fns/locale';

interface WeatherDisplayProps {
  weather: WeatherData;
  location: string;
  isDarkMode: boolean;
  date: Date;
}

const WeatherDisplay: React.FC<WeatherDisplayProps> = ({ 
  weather, 
  location, 
  isDarkMode, 
  date 
}) => {
  const formatDateTime = (date: Date): string => {
    return format(date, 'yyyy년 MM월 dd일 HH:mm', { locale: ko });
  };

  const getWeatherIconSize = () => {
    return weather.icon === '⛅' || weather.icon === '☀️' || weather.icon === '🌧️' ? 'text-2xl' : 'text-xl';
  };

  return (
    <div className={`p-4 rounded-lg transition-colors duration-300 ${
      isDarkMode ? 'bg-gray-700 text-gray-100' : 'bg-gray-100 text-gray-800'
    }`}>
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center space-x-2">
          <MapPin className="w-4 h-4 text-gray-500" />
          <span className="text-sm font-medium">{location}</span>
        </div>
        <div className="flex items-center">
          <span className={`mr-2 ${getWeatherIconSize()}`}>{weather.icon}</span>
          <span className="text-sm font-medium">
            {weather.temp} | {weather.condition}
          </span>
        </div>
      </div>
      <div className="flex items-center space-x-2 text-sm text-gray-500">
        <CalendarClock className="w-4 h-4" />
        <span>{formatDateTime(date)}</span>
      </div>
    </div>
  );
};

export default WeatherDisplay;
import React from 'react';
import { MapPin, CalendarDays } from 'lucide-react';
import { WeatherData } from '../../types/clock';

interface WeatherDisplayProps {
  weather: WeatherData;
  location: string;
  isDarkMode: boolean;
  date: Date;
}

const WeatherDisplay: React.FC<WeatherDisplayProps> = ({ weather, location, isDarkMode, date }) => {
  const formatDateTime = (date: Date): string => {
    const options: Intl.DateTimeFormatOptions = { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    };
    return date.toLocaleString('ko-KR', options);
  };

  return (
    <div className={`p-4 rounded-lg ${isDarkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center space-x-2">
          <MapPin className="w-4 h-4 text-gray-500" />
          <span className="text-sm">{location}</span>
        </div>
        <div className="flex items-center">
          <span className="text-xl mr-2">{weather.icon}</span>
          <span className="text-sm">{weather.temp} | {weather.condition}</span>
        </div>
      </div>
      <div className="flex items-center space-x-2 text-sm text-gray-500">
        <CalendarDays className="w-4 h-4" />
        <span>{formatDateTime(date)}</span>
      </div>
    </div>
  );
};

export default WeatherDisplay;
import { useState } from 'react';
import { Sun, Moon, Clock } from 'lucide-react';
import AnalogClock from './components/clock/AnalogClock';
import DigitalClock from './components/clock/DigitalClock';
import WeatherDisplay from './components/weather/WeatherDisplay';
import { ClockMode } from './types/clock';
import { useTime } from './hooks/useTime';
import { useTheme } from './hooks/useTheme';
import { useWeather } from './hooks/useWeather';

function App() {
  const [clockMode, setClockMode] = useState<ClockMode>('analog');
  const time = useTime();
  const { theme, toggleTheme } = useTheme();
  const { weather, location } = useWeather();

  const toggleClockMode = () => {
    setClockMode(prev => prev === 'analog' ? 'digital' : 'analog');
  };

  const isDarkMode = theme === 'dark';

  return (
    <div className={`min-h-screen flex flex-col items-center justify-center p-6 transition-colors duration-300 ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
      <div className={`w-full max-w-lg p-8 rounded-xl shadow-lg transition-colors duration-300 ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center space-x-2">
            <Clock className="w-6 h-6" />
            <h1 className="text-2xl font-bold">The Clock</h1>
          </div>
          <div className="flex space-x-4">
            <button
              onClick={toggleClockMode}
              className={`p-2 rounded-lg transition-colors ${isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-200'}`}
            >
              {clockMode === 'analog' ? 'Digital' : 'Analog'}
            </button>
            <button
              onClick={toggleTheme}
              className={`p-2 rounded-lg transition-colors ${isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-200'}`}
            >
              {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Clock Display */}
        <div className="mb-8">
          {clockMode === 'analog' ? (
            <AnalogClock time={time} isDarkMode={isDarkMode} />
          ) : (
            <DigitalClock time={time} />
          )}
        </div>

        {/* Weather and Location */}
        <WeatherDisplay 
          weather={weather} 
          location={location} 
          isDarkMode={isDarkMode} 
          date={time.date} 
        />
      </div>
    </div>
  );
}

export default App;
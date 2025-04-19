import React from 'react';
import { TimeData } from '../../types/clock';

interface AnalogClockProps {
  time: TimeData;
  isDarkMode: boolean;
}

const AnalogClock: React.FC<AnalogClockProps> = ({ time, isDarkMode }) => {
  const formatHour = (hour: number) => {
    return hour > 12 ? hour - 12 : hour === 0 ? 12 : hour;
  };

  return (
    <div className="relative w-64 h-64 mx-auto rounded-full border-4 border-gray-300">
      {/* Clock face */}
      <div className={`absolute inset-0 rounded-full ${isDarkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
        {/* Hour marks */}
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-3 bg-gray-500"
            style={{
              transform: `rotate(${i * 30}deg) translateY(-28px)`,
              left: 'calc(50% - 0.5px)',
              top: '50%',
              transformOrigin: '50% 28px'
            }}
          />
        ))}
        
        {/* Hands */}
        <div
          className="absolute w-1 bg-red-500 rounded-full"
          style={{
            height: '40%',
            left: 'calc(50% - 0.5px)',
            bottom: '50%',
            transformOrigin: 'bottom center',
            transform: `rotate(${time.seconds * 6}deg)`
          }}
        />
        <div
          className="absolute w-1.5 bg-white rounded-full"
          style={{
            height: '35%',
            left: 'calc(50% - 0.75px)',
            bottom: '50%',
            transformOrigin: 'bottom center',
            transform: `rotate(${time.minutes * 6}deg)`
          }}
        />
        <div
          className="absolute w-2 bg-white rounded-full"
          style={{
            height: '25%',
            left: 'calc(50% - 1px)',
            bottom: '50%',
            transformOrigin: 'bottom center',
            transform: `rotate(${(formatHour(time.hours) * 30) + (time.minutes * 0.5)}deg)`
          }}
        />
        
        {/* Center dot */}
        <div className="absolute w-3 h-3 bg-red-500 rounded-full left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2" />
      </div>
    </div>
  );
};

export default AnalogClock;
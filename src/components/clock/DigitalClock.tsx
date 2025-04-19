import React from 'react';
import { TimeData } from '../../types/clock';

interface DigitalClockProps {
  time: TimeData;
}

const DigitalClock: React.FC<DigitalClockProps> = ({ time }) => {
  const formatTimeUnit = (unit: number): string => {
    return unit < 10 ? `0${unit}` : `${unit}`;
  };

  const formatDate = (date: Date): string => {
    const options: Intl.DateTimeFormatOptions = { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    };
    return date.toLocaleDateString('ko-KR', options);
  };

  return (
    <div className="text-center">
      <div className="text-6xl font-bold tracking-tight">
        {formatTimeUnit(time.hours)}:{formatTimeUnit(time.minutes)}:{formatTimeUnit(time.seconds)}
      </div>
      <div className="text-xl mt-2 text-gray-500">
        {formatDate(time.date)}
      </div>
    </div>
  );
};

export default DigitalClock;
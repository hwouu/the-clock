import { useState, useEffect } from 'react';
import { TimeData } from '../types/clock';

export function useTime() {
  const [time, setTime] = useState<TimeData>(() => {
    const now = new Date();
    return {
      hours: now.getHours(),
      minutes: now.getMinutes(),
      seconds: now.getSeconds(),
      date: now
    };
  });

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      setTime({
        hours: now.getHours(),
        minutes: now.getMinutes(),
        seconds: now.getSeconds(),
        date: now
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return time;
}
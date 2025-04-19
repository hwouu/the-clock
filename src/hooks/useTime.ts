// src/hooks/useTime.ts
import { useState, useEffect, useCallback } from "react";
import { TimeData } from "../types/clock";

export function useTime() {
  const getCurrentTime = useCallback((): TimeData => {
    const now = new Date();
    return {
      hours: now.getHours(),
      minutes: now.getMinutes(),
      seconds: now.getSeconds(),
      date: now,
    };
  }, []);

  const [time, setTime] = useState<TimeData>(getCurrentTime);

  useEffect(() => {
    // Update time immediately to ensure accuracy
    setTime(getCurrentTime());

    // Calculate milliseconds until the next second
    const now = new Date();
    const millisToNextSecond = 1000 - now.getMilliseconds();

    // Set initial timeout to sync with the exact second
    const initialTimeout = setTimeout(() => {
      setTime(getCurrentTime());

      // After initial sync, set up the regular interval
      const timer = setInterval(() => {
        setTime(getCurrentTime());
      }, 1000);

      return () => clearInterval(timer);
    }, millisToNextSecond);

    return () => clearTimeout(initialTimeout);
  }, [getCurrentTime]);

  return time;
}

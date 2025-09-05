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
    // 1초마다 정확한 시간에 동기화하여 시간을 업데이트합니다.
    const now = new Date();
    const millisToNextSecond = 1000 - now.getMilliseconds();

    const timeout = setTimeout(() => {
      setTime(getCurrentTime());
      const interval = setInterval(() => {
        setTime(getCurrentTime());
      }, 1000);

      return () => clearInterval(interval);
    }, millisToNextSecond);

    return () => clearTimeout(timeout);
  }, [getCurrentTime]);

  return time;
}

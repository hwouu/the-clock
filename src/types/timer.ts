// src/types/timer.ts
export interface Timer {
  id: string;
  name: string;
  duration: number; // 초 단위
  remainingTime: number; // 초 단위
  isRunning: boolean;
  createdAt: Date;
}

export interface TimerFormData {
  name: string;
  hours: number;
  minutes: number;
  seconds: number;
}

// src/types/alarm.ts
export interface Alarm {
  id: string;
  name: string;
  hour: number;
  minute: number;
  isEnabled: boolean;
  createdAt: Date;
}

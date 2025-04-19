export type ClockMode = 'analog' | 'digital';
export type ThemeMode = 'dark' | 'light';

export interface TimeData {
  hours: number;
  minutes: number;
  seconds: number;
  date: Date;
}

export interface WeatherData {
  temp: string;
  condition: string;
  icon: string;
}
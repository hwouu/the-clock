import { useState, useEffect } from 'react';
import { WeatherData } from '../types/clock';

export function useWeather() {
  const [weather, setWeather] = useState<WeatherData>({
    temp: '--',
    condition: 'Loading...',
    icon: '?'
  });
  const [location, setLocation] = useState<string>('Loading location...');

  useEffect(() => {
    // 실제 프로젝트에서는 여기에 지오로케이션 API와 날씨 API를 사용할 수 있습니다
    // 현재는 더미 데이터로 시뮬레이션합니다
    const getLocationAndWeather = async () => {
      try {
        // 위치 가져오기
        setTimeout(() => {
          setLocation('Seoul, South Korea');
          // 날씨 가져오기
          setWeather({
            temp: '18°C',
            condition: 'Partly Cloudy',
            icon: '⛅'
          });
        }, 1500);
      } catch (error) {
        console.error('Error fetching location or weather:', error);
        setLocation('Location unavailable');
        setWeather({
          temp: '--',
          condition: 'Weather unavailable',
          icon: '?'
        });
      }
    };
    
    getLocationAndWeather();
  }, []);

  return { weather, location };
}
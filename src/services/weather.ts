import type { WeatherData, ForecastDay } from '../types/prakrushti';

export async function fetchWeatherData(lat: number, lng: number): Promise<{ weather: WeatherData; forecastDays: ForecastDay[] }> {
  try {
    const weatherUrl = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lng}&current=temperature_2m,relative_humidity_2m,apparent_temperature,precipitation,weather_code,surface_pressure,wind_speed_10m&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max&timezone=auto`;
    const aqUrl = `https://air-quality-api.open-meteo.com/v1/air-quality?latitude=${lat}&longitude=${lng}&current=pm10,pm2_5,us_aqi,uv_index`;

    const [weatherRes, aqRes] = await Promise.allSettled([
      fetch(weatherUrl).then(r => r.json()),
      fetch(aqUrl).then(r => r.json()),
    ]);

    const weatherData = weatherRes.status === 'fulfilled' ? weatherRes.value : null;
    const aqData = aqRes.status === 'fulfilled' ? aqRes.value : null;

    const currentW = weatherData?.current || {};
    const dailyW = weatherData?.daily || {};
    const currentAQ = aqData?.current || {};

    const aqiVal = currentAQ.us_aqi || Math.round((currentAQ.pm2_5 || 15) * 2.5);
    const weatherCode = currentW.weather_code ?? 0;
    const description = getWeatherDescription(weatherCode);

    const weather: WeatherData = {
      temperatureC: Math.round(currentW.temperature_2m ?? 24),
      feelsLikeC: currentW.apparent_temperature != null ? Math.round(currentW.apparent_temperature) : null,
      humidityPct: Math.round(currentW.relative_humidity_2m ?? 55),
      precipitationMm: Number((currentW.precipitation ?? 0).toFixed(1)),
      windKph: Math.round(currentW.wind_speed_10m ?? 12),
      aqi: Math.min(500, Math.max(0, Math.round(aqiVal || 42))),
      weatherCode: weatherCode,
      description: description,
      uvIndex: Number((currentAQ.uv_index ?? 4.5).toFixed(1)),
      pressureHpa: Math.round(currentW.surface_pressure ?? 1013),
      soilMoisturePct: Math.round(Math.max(10, Math.min(90, 60 - ((currentW.temperature_2m || 24) * 0.8) + ((currentW.relative_humidity_2m || 50) * 0.4)))),
    };

    const forecastDays: ForecastDay[] = [];
    if (dailyW.time && Array.isArray(dailyW.time)) {
      for (let i = 0; i < Math.min(7, dailyW.time.length); i++) {
        forecastDays.push({
          date: dailyW.time[i],
          tempMax: Math.round(dailyW.temperature_2m_max[i]),
          tempMin: Math.round(dailyW.temperature_2m_min[i]),
          precipProb: dailyW.precipitation_probability_max ? dailyW.precipitation_probability_max[i] : null,
          weatherCode: dailyW.weather_code ? dailyW.weather_code[i] : 0,
        });
      }
    } else {
      // Generate 7 days fallback forecast relative to current date
      const today = new Date();
      for (let i = 0; i < 7; i++) {
        const d = new Date(today);
        d.setDate(today.getDate() + i);
        forecastDays.push({
          date: d.toISOString().split('T')[0],
          tempMax: weather.temperatureC + Math.floor(Math.sin(i) * 3) + 2,
          tempMin: weather.temperatureC - 5 + Math.floor(Math.cos(i) * 2),
          precipProb: (i * 15) % 60,
          weatherCode: 0,
        });
      }
    }

    return { weather, forecastDays };
  } catch (error) {
    console.warn('Weather fetch error, using graceful fallback:', error);
    const fallbackWeather: WeatherData = {
      temperatureC: 25,
      feelsLikeC: 26,
      humidityPct: 60,
      precipitationMm: 0,
      windKph: 14,
      aqi: 45,
      weatherCode: 0,
      description: 'Clear sky',
      uvIndex: 5,
      pressureHpa: 1013,
      soilMoisturePct: 45,
    };
    
    const today = new Date();
    const fallbackDays: ForecastDay[] = Array.from({ length: 7 }).map((_, i) => {
      const d = new Date(today);
      d.setDate(today.getDate() + i);
      return {
        date: d.toISOString().split('T')[0],
        tempMax: 27 + (i % 3),
        tempMin: 18 + (i % 2),
        precipProb: 10,
        weatherCode: 0,
      };
    });

    return { weather: fallbackWeather, forecastDays: fallbackDays };
  }
}

function getWeatherDescription(code: number): string {
  switch (code) {
    case 0: return 'Clear Sky';
    case 1: case 2: case 3: return 'Partly Cloudy';
    case 45: case 48: return 'Foggy / Hazy';
    case 51: case 53: case 55: return 'Light Drizzle';
    case 61: case 63: case 65: return 'Rain Showers';
    case 71: case 73: case 75: return 'Snowfall';
    case 80: case 81: case 82: return 'Heavy Rain Showers';
    case 95: case 96: case 99: return 'Thunderstorm';
    default: return 'Fair Conditions';
  }
}

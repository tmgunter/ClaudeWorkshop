export enum WeatherCondition {
  Sunny = "sunny",
  PartlyCloudy = "partlyCloudy",
  Cloudy = "cloudy",
  Rain = "rain",
  Thunderstorm = "thunderstorm",
  Snow = "snow",
  Fog = "fog",
  Windy = "windy",
}

export interface DailyForecast {
  date: string;
  highTempF: number;
  lowTempF: number;
  highTempC: number;
  lowTempC: number;
  humidityPercent: number;
  precipitationChancePercent: number;
  condition: WeatherCondition;
  conditionDescription: string;
}

export interface LocationInfo {
  id: string;
  city: string;
  state: string;
  country: string;
  latitude: number;
  longitude: number;
}

export interface WeatherResponse {
  location: LocationInfo;
  today: DailyForecast;
  weeklyForecast: DailyForecast[];
  monthlyForecast: DailyForecast[];
}

export type TemperatureUnit = "F" | "C";

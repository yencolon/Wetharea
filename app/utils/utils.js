import { PureComponent } from "react";

export const kelvinToCelsius = (measure) => {
  return Number((measure - 273.15).toFixed(1));
};

export const getHoursToday = (date) => {
  const time = new Date(date * 1000);
  const formatTime =
    time.getHours().toString().length === 1
      ? `0${time.getHours()}:${time.getMinutes()}0`
      : `${time.getHours()}:${time.getMinutes()}0`;
  return formatTime;
};

//Envia el main del objeto weather retorna un simbolo. 
export const getWeatherIcon = (weather) => {
  switch (weather) {
      case 'Clear': 
          return '☀';
      case 'Clouds':
          return '☁'
      case 'Rain':
          return '🌧';
      case 'Thunderstorm':
          return '⛈';
      case 'Snow':
          return '❄';
      case 'Mist': 
          return '🌫'
      default: return '☁';
  }
}

export const getDayDateName = (date) => {
  return (
      [
          "Domingo",
          "Lunes",
          "Martes",
          "Miercoles",
          "Jueves",
          "Viernes",
          "Sábado",
      ][date.getDay()] + ' ' + date.getDate()
  );
}
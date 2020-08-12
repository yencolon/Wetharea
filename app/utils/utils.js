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
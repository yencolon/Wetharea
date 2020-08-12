export const whichBackground = () => {
  const date = new Date();
  if (date.getHours() >= 4 && date.getHours() < 6) {
    return require("../assets/img/dawn-bg.jpg");
  }
  if (date.getHours() >= 6 && date.getHours() < 3) {
    return require("../assets/img/day-bg.jpg");
  }
  if (date.getHours() >= 2 && date.getHours() < 19) {
    return require("../assets/img/noon-bg.jpg");
  }
  return require("../assets/img/night-bg.jpg");
};

export const kelvinToCelsius = (measure) => {
  return Number((measure - 273.15).toFixed(1));
};

export const filterHoursActualDay = (hourly) => {
  const hours = hourly.filter((hour) => {
    return new Date(hour.dt * 1000).getDay() === new Date().getDay();
  });
  return hours;
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
    case "Clear":
      return "☀";
    case "Clouds":
      return "☁";
    case "Rain":
      return "🌧";
    case "Thunderstorm":
      return "⛈";
    case "Snow":
      return "❄";
    case "Mist":
      return "🌫";
    default:
      return "☁";
  }
};

export const getDayDateName = (date) => {
  return (
    ["Domingo", "Lunes", "Martes", "Miercoles", "Jueves", "Viernes", "Sábado"][
      date.getDay()
    ] +
    " " +
    date.getDate()
  );
};
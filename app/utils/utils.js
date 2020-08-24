export const whichBackground = () => {
  const date = new Date();
  if (date.getHours() >= 4 && date.getHours() < 6) {
    return require("../assets/img/dawn-bg.jpg");
  }
  if (date.getHours() >= 6 && date.getHours() < 15) {
    return require("../assets/img/day-bg.jpg");
  }
  if (date.getHours() >= 16 && date.getHours() < 19) {
    return require("../assets/img/noon-bg.jpg");
  }
  return require("../assets/img/night-bg.jpg");
};

export const kelvinToCelsius = (measure) => {
  return Number((measure - 273.15).toFixed(1));
};

export const filterHoursActualDay = (hourly) => {
  if (hourly === undefined) return [];

  const hours = hourly.filter((hour, index) => {
    return index < 24;
  });
  return hours;
};

export const getHoursToday = (date, timezoneOffset) => {  
  
  const time =  new Date(date * 1000);
  time.setUTCSeconds(timezoneOffset + time.getTimezoneOffset() * 60);

  if (
    time.getHours().toString().length > 1 &&
    time.getMinutes().toString().length > 1
  ) {
    return `${time.getHours()}:${time.getMinutes()}`;
  }
  if (
    time.getHours().toString().length > 1 &&
    time.getMinutes().toString().length === 1
  ) {
    return `${time.getHours()}:0${time.getMinutes()}`;
  }
  if (
    time.getHours().toString().length === 1 &&
    time.getMinutes().toString().length > 1
  ) {
    return `0${time.getHours()}:${time.getMinutes()}`;
  }
  if (
    time.getHours().toString().length === 1 &&
    time.getMinutes().toString().length === 1
  ) {
    return `0${time.getHours()}:0${time.getMinutes()}`;
  }
};

export const getUVIndex = (uvIndex) => {
  if (uvIndex < 2) return "Bajo 🟢";
  if (uvIndex >= 3 && uvIndex <= 5) return "Moderado 🟡";
  if (uvIndex >= 6 && uvIndex <= 7) return "Alto 🟠";
  if (uvIndex >= 8 && uvIndex <= 10) return "Muy Alto 🔴";

  return "Ext. Alto 🟣";
};

//Envia el main del objeto weather retorna un simbolo.
export const getWeatherIcon = (weatherIcon) => {

  switch (weatherIcon) {
    case '01d':
      return  {icon1: "☀", icon2: ''};
    case '01n':
      return {icon1: '🌕', icon2: ''};

    case '02d':
      return {icon1: "⛅", icon2: ''};
    case '02n':
      return {icon1: "🌕", icon2: '☁'};

    case '03d':
      return {icon1: "☁", icon2: ''};
    case '03n':
      return {icon1: "☁", icon2: ''};

    case "04d":
      return {icon1: "☁", icon2: '☁'};
    case "04n":
      return {icon1: "☁", icon2: '☁'};

    case "09d":
      return {icon1: "🌧", icon2: ''};
    case "09n":
      return {icon1: "🌧", icon2: ''};

    case "10d":
      return {icon1: "🌦", icon2: ''};
    case "10n":
      return {icon1: "🌕", icon2: '🌧'};

    case "11d":
      return {icon1: "⛈", icon2: ''};
    case "11n":
      return {icon1: "⛈", icon2: ''};

    case "13d":
      return {icon1: "🌨", icon2: ''};
    case "13n":
      return {icon1: "🌨", icon2: ''};

    case "50d":
      return {icon1: "🌫", icon2: ''};
    case "50n":
      return {icon1: "🌫", icon2: ''};
    default:
      return "";
  }
};

export const getDayDateName = (date) => {
  if (isNaN(date)) return "Cargando";

  return (
    ["Domingo", "Lunes", "Martes", "Miercoles", "Jueves", "Viernes", "Sábado"][
    date.getDay()
    ] +
    " " +
    date.getDate()
  );
};

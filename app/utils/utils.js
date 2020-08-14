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
  const hours = hourly.filter((hour, index) =>{
    return index < 24
  })
  // const hours = hourly.filter((hour) => {
  //   return new Date(hour.dt * 1000).getDay() === new Date().getDay();
  // });
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

export const getUVIndex = (uvIndex) => {
  if(uvIndex < 2) return 'Bajo 🟢';
  if(uvIndex >= 3 && uvIndex <= 5) return 'Moderado 🟡';
  if(uvIndex >= 6 && uvIndex <= 7) return 'Alto 🟠';
  if(uvIndex >=8 && uvIndex <= 10) return 'Muy Alto 🔴'

  return 'Ext. Alto 🟣';
}

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
  if(isNaN(date))    
    return 'Cargando';

  return (
    ["Domingo", "Lunes", "Martes", "Miercoles", "Jueves", "Viernes", "Sábado"][
      date.getDay()
    ] +
    " " +
    date.getDate()
  );
};
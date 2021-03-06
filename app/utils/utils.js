export const whichBackground = (date_, timezoneOffset) => {
  const time = new Date(date_ * 1000);
  time.setUTCSeconds(timezoneOffset + time.getTimezoneOffset() * 60);
  if (time.getHours() >= 4 && time.getHours() < 6) {
    return require("../assets/img/dawn-bg.jpg");
  }
  if (time.getHours() >= 6 && time.getHours() < 15) {
    return require("../assets/img/day-bg.jpg");
  }
  if (time.getHours() >= 16 && time.getHours() < 19) {
    return require("../assets/img/noon-bg.jpg");
  }
  if (
    (time.getHours() >= 19 && time.getHours() <= 23) ||
    (time.getHours() >= 0 && time.getHours() < 4)
  ) {
    return require("../assets/img/night-bg.jpg");
  }
};

export const filterHoursActualDay = (hourly) => {
  if (hourly === undefined) return [];

  const hours = hourly.filter((hour, index) => {
    return index < 24;
  });
  return hours;
};

export const getHoursToday = (date, timezoneOffset) => {
  const time = new Date(date * 1000);
  time.setUTCSeconds(timezoneOffset + time.getTimezoneOffset() * 60);
  return time.toLocaleTimeString().slice(0, 5);
};

export const getUVIndex = (uvIndex) => {
  if (uvIndex < 2) return "Bajo 🟢";
  if (uvIndex >= 3 && uvIndex <= 5) return "Moderado 🟡";
  if (uvIndex >= 6 && uvIndex <= 7) return "Alto 🟠";
  if (uvIndex >= 8 && uvIndex <= 10) return "Muy Alto 🔴";

  return "Ext. Alto 🟣";
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
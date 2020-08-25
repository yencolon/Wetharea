import { API_URL, API_KEY, API_GEOCODING, API_REVERSE_GEOCODING } from "./env";

export const weather = {
  async getWeather(lat, long) {
    return await fetch(
      `${API_URL}lat=${lat}&lon=${long}&units=metric&lang=es&
      exclude=current,daily&appid=${API_KEY}`
    );
  },
};

export const searchLoaction = {
  async getPlaces(place) {
    return await fetch(`${API_GEOCODING}${place}&format=json&limit=10`);
  },
  async getReverseLocation(lat, lon) {
    return await fetch(`${API_REVERSE_GEOCODING}lat=${lat}&lon=${lon}&zoom=10`);
  },
};
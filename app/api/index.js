import { API_URL, API_KEY, API_GEOCODING } from "./env";
export const weather = {
  async getWeather(lat, long) {
    return await fetch(
      `${API_URL}lat=${lat}&lon=${long}&
      exclude=current,daily&appid=${API_KEY}`
    );
  },
};

export const searchLoaction = {
  async getPlaces(place) {
    return await fetch(
      `${API_GEOCODING}${place}&format=json&limit=10`
    );
  },
};
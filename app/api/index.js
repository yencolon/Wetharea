import { API_URL, API_KEY } from "./env";
export const weather = {
  async getWeather(lat, long) {
    return await fetch(
      `${API_URL}lat=${lat}&lon=${long}&
      exclude=current,daily&appid=${API_KEY}`
    );
  },
};
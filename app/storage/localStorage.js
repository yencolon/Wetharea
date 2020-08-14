import AsyncStorage from "@react-native-community/async-storage";

export const localStorage = {
  async setForecast(forecast) {
    try {
      await AsyncStorage.setItem("forecast", JSON.stringify(forecast));
    } catch (error) {
      console.log(error + ", no se pudo guardar pronostico");
    }
  },
  async getForecast() {
    try {
      return JSON.parse(await AsyncStorage.getItem("forecast"));
    } catch (error) {
      console.log(error + ", no se pudo obtener pronostico");
    }
  },
};
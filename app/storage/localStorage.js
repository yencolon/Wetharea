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
  async setAddress(address) {
    try {
      await AsyncStorage.setItem("address", address);
    } catch (error) {
      console.log(error + ", no se pudo guardar la direccion");
    }
  },
  async getAddress() {
    try {
      return await AsyncStorage.getItem("address");
    } catch (error) {
      console.log(error + ", no se pudo obtener direccion");
    }
  },
  async setCoordinates(latitude, longitude) {
    try {
      await AsyncStorage.setItem(
        "coordinates",
        JSON.stringify({ latitude, longitude })
      );
    } catch (error) {
      console.log(error + ", no se pudo guardar las coordenadas");
    }
  },
  async getCoordinates() {
    try {
      return JSON.parse(await AsyncStorage.getItem("coordinates"));
    } catch (error) {
      console.log(error + ", no se pudo obtener las coordenadas");
    }
  },
};
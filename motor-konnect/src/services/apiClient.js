// apiClient.js
import axios from "axios";
import * as SecureStore from "expo-secure-store";
import { Platform } from "react-native";

const getBaseURL = () => {
  if (Platform.OS === "android") {
    // Android Emulator
    return "https://046v55w0-8000.inc1.devtunnels.ms/api";
    // return "https://moto-clients.onrender.com/api";
  }

  // iOS Simulator
  return "https://046v55w0-8000.inc1.devtunnels.ms/api";
  // return "https://moto-clients.onrender.com/api";
};

const api = axios.create({
  baseURL: getBaseURL(),
  timeout: 10000,
});

api.interceptors.request.use(async (config) => {
  const token = await SecureStore.getItemAsync("accessToken");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default api;

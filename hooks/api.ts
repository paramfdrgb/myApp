import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";

const api = axios.create({
  baseURL: process.env.EXPO_PUBLIC_API_URL, // our API base URL
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

// Request interceptor for adding the bearer token
api.interceptors.request.use(
  async (config) => {
    const jsonValue: any = await AsyncStorage.getItem("user-data");
    const token = await JSON.parse(jsonValue)?.data?.access_token;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  async (response) => {
    return response;
  },
  (error) => {
    if (error.response.status === 401) {
      AsyncStorage.clear();
      router.replace("/otp");
    }
    return Promise.reject(error);
  }
);

// Export the api instance
export default api;

import axios from "axios";
import { Alert } from "react-native";
import * as SecureStore from "expo-secure-store";

const baseUrl = "https://instedu-api.orikfw.com/api/v1";

const axiosInstance = axios.create({
  baseURL: baseUrl,
});

const getUserToken = async () => {
  return await SecureStore.getItemAsync("userToken");
};

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  function (error) {
    const { response } = error;
    console.log("ERROR----", error);
    console.log("ERROR----response", response);
    if (response) {
      switch (response.status) {
        case 500:
          Alert.alert(
            "Oops, we have a server error",
            JSON.stringify(response.data.detail)
          );
          break;
      }
    } else {
      Alert.alert("Error:", JSON.stringify(error));
    }
    return Promise.reject(error);
  }
);

export const getMe = () => {
  return axiosInstance.get("/user/me");
};

export const getUserDataById = async (id) => {
  const token = await getUserToken();
  console.log('token', token)
  return await axiosInstance.get(`/user/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const login = async (credentials) => {
  return await axiosInstance.post(
    "/login/access-token",
    `username=${credentials.username}&password=${credentials.password}`,
    {
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
    }
  );
};

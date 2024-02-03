import axios from "axios";

export const client = (config) => {
  const _axiosInstance = axios.create({
    baseURL: "http://localhost:8000/api",
    timeout: 50000,
  });
  return _axiosInstance.request(config);
};

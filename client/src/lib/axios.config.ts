import axios from "axios";

export const baseUrl = "http://localhost:3001";

const api = axios.create({
  baseURL: baseUrl,
  withCredentials: true,
});

export default api;

import axios from "axios";
import.meta.env.VITE_API_URL

const API = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}/api`,
});

// ADD TOKEN AUTOMATICALLY
API.interceptors.request.use((req) => {
  const user = JSON.parse(
    localStorage.getItem("user")
  );

  if (user?.token) {
    req.headers.Authorization =
      `Bearer ${user.token}`;
  }

  return req;
});

export default API;


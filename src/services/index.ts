import axios from "axios";

const API = axios.create({
  baseURL: "http://127.0.0.1:8000/api/",
});

// Request interceptor to add token
API.interceptors.request.use((config) => {
  const accessToken = localStorage.getItem("access");
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

// Response interceptor to refresh token
API.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // If 401 and not already retried
    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      localStorage.getItem("refresh")
    ) {
      originalRequest._retry = true;
      try {
        const refreshToken = localStorage.getItem("refresh");
        const res = await axios.post(
          "http://127.0.0.1:8000/api/users/token/refresh/",
          {
            refresh: refreshToken,
          }
        );

        const newAccess = res.data.access;
        localStorage.setItem("access", newAccess);

        // Set new token to retry the original request
        originalRequest.headers.Authorization = `Bearer ${newAccess}`;
        return API(originalRequest);
      } catch (err) {
        localStorage.removeItem("access");
        localStorage.removeItem("refresh");
        localStorage.removeItem("user");
        window.location.href = "/login"; // Optional: redirect to login
      }
    }

    return Promise.reject(error);
  }
);

export default API;

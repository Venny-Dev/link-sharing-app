import api from "./apiClient";

export const signup = (data) => api.post("/user/signup", data);
export const login = (data) => api.post("/user/login", data);
export const verifyEmail = (token) =>
  api.get(`/user/verify-email?token=${token}`);
export const forgotPassword = (data) => api.post("/user/forgot-password", data);
export const resetPassword = ({ data, token }) =>
  api.post(`/user/reset-password?token=${token}`, data);
export const logout = () => api.get("/user/logout");

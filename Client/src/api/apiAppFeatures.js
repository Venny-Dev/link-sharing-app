import api from "./apiClient";

export const getLinks = () => api.get("/links");
export const updateLinks = (data) => api.post("/links", data);
export const getUser = () => api.get("/user/get-user-details");
export const updateUser = (data) => api.patch("/user/update-me", data);
export const getSharedProfile = (id) =>
  api.get(`/user/shared-profile?id=${id}`);

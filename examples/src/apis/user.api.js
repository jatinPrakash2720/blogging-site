import { apiClient } from "./apiConfig";

const registerUser = (data) => {
  return apiClient.post("/users/register", data);
};
const loginUser = (data) => {
  return apiClient.post("/users/login", data);
};
const logoutUser = () => {
  return apiClient.get("/users/logout");
};
const refreshAccessToken = () => {
  return apiClient.post("/users/refresh-token");
};
const changeCurrentPassword = (data) => {
  return apiClient.post("/users/change-password", data);
};
const getCurrentUser = () => {
  return apiClient.post("/users/current-user");
};
const updateUserFullName = (data) => {
  return apiClient.patch("/users/update-fullname", data);
};
const updateUserEmail = (data) => {
  return apiClient.patch("/users/update-email", data);
};
const updateUserAvatar = (avatar) => {
  return apiClient.patch("/users/update-avatar", avatar);
};
const updateUserCoverImage = (coverImage) => {
  return apiClient.patch("/users/update-cover", coverImage);
};
const getUserPageProfile = (username) => {
  return apiClient.post(`/users/c/${username}`);
};
const getReadHistory = (page = 1, limit = 10) => {
  return apiClient.get("/user/history", {
    params: {
      page: page,
      limit: limit,
    },
  });
};

export {
  registerUser,
  loginUser,
  logoutUser,
  refreshAccessToken,
  changeCurrentPassword,
  getCurrentUser,
  updateUserFullName,
  updateUserEmail,
  updateUserAvatar,
  updateUserCoverImage,
  getUserPageProfile,
  getReadHistory,
};

import { apiClient } from "../utils/apiConfig.util.js";

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
  return apiClient.get("/users/current-user");
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
  return apiClient.get(`/users/c/${username}`);
};
const getReadHistory = (params = { page: 1, limit: 10 }) => {
  return apiClient.get("/users/history", { params });
};
const getUserBlogs = ({
  userId,
  page = 1,
  limit = 10,
  sortBy = "createdAt",
  sortOrder = "desc",
}) => {
  return apiClient.get(`/users/${userId}/blogs`, {
    params: {
      page: page,
      limit: limit,
      sortBy: sortBy,
      sortOrder: sortOrder,
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
  getUserBlogs,
};

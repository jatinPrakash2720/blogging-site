import { apiClient } from "../utils/apiConfig.util.js";

const toggleFollow = (userIdToFollow) => {
  return apiClient.post(`/follow/toggle/${userIdToFollow}`);
};

const getUserFollowers = (userId) => {
  return apiClient.get(`/follow/followers/${userId}`);
};

const getUserFollowing = (userId) => {
  return apiClient.get(`/follow/following/${userId}`);
};

export { toggleFollow, getUserFollowers, getUserFollowing };

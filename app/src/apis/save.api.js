import { apiClient } from "../utils/apiConfig.util.js";

const createSaveCollection = (data) => {
  return apiClient.post("/saves", data);
};

const getUserCollections = () => {
  return apiClient.get("/saves");
};

const getBlogsInCollection = (
  collectionId,
  params = { page: 1, limit: 10 }
) => {
  return apiClient.get(`/saves/${collectionId}`, { params });
};
const deleteSaveCollection = (collectionId) => {
  return apiClient.delete(`/saves/${collectionId}`);
};

const updateSaveCollection = (collectionId, data) => {
  // data can be { name: "new name" } or { description: "new desc" } or both
  return apiClient.patch(`/saves/${collectionId}`, data);
};

const toggleBlogInCollection = (collectionId, blogId) => {
  return apiClient.patch(`/saves/toggle/${collectionId}/${blogId}`);
};

export {
  createSaveCollection,
  toggleBlogInCollection,
  getUserCollections,
  getBlogsInCollection,
  updateSaveCollection,
  deleteSaveCollection,
};

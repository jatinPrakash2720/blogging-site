import { apiClient } from "../utils/apiConfig.util.js";

const getBlogComments = (blogId, params = { page: 1, limit: 10 }) => {
  return apiClient.get(`/comments/${blogId}`, { params });
};

const addCommentToBlogs = (blogId, content) => {
  return apiClient.post(`/comments/${blogId}`, content);
};

const deleteComment = (commentId) => {
  return apiClient.delete(`/comments/c/${commentId}`);
};

export { getBlogComments, addCommentToBlogs, deleteComment };

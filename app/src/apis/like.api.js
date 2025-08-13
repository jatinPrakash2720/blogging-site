import { apiClient } from "../utils/apiConfig.util.js";

const toggleBlogLike = (blogId) => {
  return apiClient.post(`/likes/toggle/blog/${blogId}`);
};

const toggleCommentLike = (commentId) => {
  return apiClient.post(`/likes/toggle/comment/${commentId}`);
};

const getBlogsLikedByUser = () => {
  return apiClient.get("/likes/blogs");
};

const getBlogLikes = (blogId) => {
  return apiClient.get(`/likes/blog/${blogId}`);
};

const getCommentLikes = (commentId) => {
  return apiClient.get(`/likes/comment/${commentId}`);
};

export {
  toggleBlogLike,
  toggleCommentLike,
  getBlogsLikedByUser,
  getBlogLikes,
  getCommentLikes,
};

import { apiClient } from "../utils/apiConfig.util.js";

const getBlogs = ({
  page = 1,
  limit = 10,
  sortBy = "createdAt",
  sortOrder = "asc",
  q,
}) => {
  return apiClient.get("/blogs", {
    params: {
      page: page,
      limit: limit,
      sortBy: sortBy,
      sortOrder: sortOrder,
      q: q,
    },
  });
};

const getBlog = (blogId) => {
  return apiClient.get(`/blogs/${blogId}`);
};

const createBlog = (data) => {
  return apiClient.post("/blogs", data);
};

const updateBlogTitle = ({ blogId, newTitle }) => {
  return apiClient.patch(`/blogs/${blogId}/title`, { newTitle });
};

const updateBlogContent = ({ blogId, newContent }) => {
  return apiClient.patch(`/blogs/${blogId}/content`, { newContent });
};

const updateBlogThumbnail = ({ blogId, thumbnailFormData }) => {
  return apiClient.patch(`/blogs/${blogId}/thumbnail`, thumbnailFormData);
};

const toggleBlogStatus = (blogId) => {
  return apiClient.patch(`/blogs/${blogId}/toggle-status`);
};

const deleteBlog = (blogId) => {
  return apiClient.delete(`/blogs/${blogId}`);
};

const restoreBlog = (blogId) => {
  return apiClient.patch(`/blogs/${blogId}/restore`);
};

const getBlogsByTopLevelCategory = (
  categoryId,
  params = { page: 1, limit: 10 }
) => {
  return apiClient.get(`/blogs/by-category/${categoryId}`, { params });
};

const getBlogsBySubCategory = (
  subCategoryId,
  params = { page: 1, limit: 10 }
) => {
  return apiClient.get(`/blogs/by-sub-category/${subCategoryId}`, { params });
};

export {
  getBlogs,
  getBlog,
  createBlog,
  updateBlogTitle,
  updateBlogContent,
  updateBlogThumbnail,
  toggleBlogStatus,
  deleteBlog,
  restoreBlog,
  getBlogsByTopLevelCategory,
  getBlogsBySubCategory,
};

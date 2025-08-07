import { apiClient } from "./apiConfig";

const getBlogs = async ({
  page = 1,
  limit = 10,
  sortBy = "createdAt",
  sortOrder = "asc",
  q,
}) => {
  return apiClient.get("/blogs/", {
    params: {
      page: page,
      limit: limit,
      sortBy: sortBy,
      sortOrder: sortOrder,
      q: q,
    },
  });
};

const getBlog = async (blogId) => {
  return apiClient.post(`/blogs/${blogId}`);
};

const createBlog = async (data) => {
  return apiClient.post("/blogs/", data);
};

const updateBlogTitle = async ({ blogId, newTitle }) => {
  return apiClient.patch(`/blogs/${blogId}/title`, newTitle);
};

const updateBlogContent = async ({ blogId, newContent }) => {
  return apiClient.patch(`/blogs/${blogId}/content`, newContent);
};

const updateBlogThumbnail = async ({ blogId, newThumbnail }) => {
  return apiClient.patch(`/blogs/${blogId}/thumbnail`, newThumbnail);
};

const toggleBlogStatus = async (blogId) => {
  return apiClient.patch(`/blogs/${blogId}/toggle-status`);
};

const deleteBlog = async (blogId) => {
  return apiClient.delete(`/blogs/${blogId}`);
};

const restoreBlog = async (blogId) => {
  return apiClient.patch(`/blogs/${blogId}/restore`);
};

const getUserBlogs = async ({
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
  getBlogs,
  getBlog,
  createBlog,
  updateBlogTitle,
  updateBlogContent,
  updateBlogThumbnail,
  toggleBlogStatus,
  deleteBlog,
  restoreBlog,
  getUserBlogs
};

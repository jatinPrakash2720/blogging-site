import { apiClient } from "../utils/apiConfig.util.js";

const createSubCategory = (parentId, data) => {
  return apiClient.post(`/categories/${parentId}/sub-categories`, data);
};

const getTopLevelCategories = () => {
  return apiClient.get("/categories/top-level");
};

const getSubCategories = (parentId) => {
  return apiClient.get(`/categories/${parentId}/sub-categories`);
};

const getFilterableSubCategories = (parentId, params = { threshold: 5 }) => {
  return apiClient.get(`/categories/${parentId}/filterable-subcategories`, {
    params,
  });
};

export {
  createSubCategory,
  getTopLevelCategories,
  getSubCategories,
  getFilterableSubCategories,
};

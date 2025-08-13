import { createContext, useCallback, useContext } from "react";
import * as categoryApi from "../apis/categories.api.js";
import { requestHandler } from "../utils";

const CategoryContext = createContext({
  topLevelCategories: [],
  subCategories: [],
  filterableSubCategories: [],
  loading: false,
  error: null,
  fetchTopLevelCategories: async () => {},
  fetchSubCategories: async (parentId) => {},
  fetchFilterableSubCategories: async (parentId, threshold) => {},
  createSubCategory: async (parentId, data) => false,
});

export const useCategories = () => {
  const context = useContext(CategoryContext);
  if (!context) {
    throw new Error("useCategories must be used within a CategoryProvider");
  }
  return context;
};

export const CategoryProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [topLevelCategories, setTopLevelCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [filterableSubCategories, setFilterableSubCategories] = useState([]);

  const fetchTopLevelCategories = useCallback(async () => {
    setError(null);
    await requestHandler(
      () => categoryApi.getTopLevelCategories(),
      setLoading,
      (response) => setTopLevelCategories(response.data),
      (error) => setError(error)
    );
  }, []);

  const fetchSubCategories = useCallback(async (parentId) => {
    setError(null);
    await requestHandler(
      () => categoryApi.getSubCategories(parentId),
      setLoading,
      (response) => setSubCategories(response.data),
      (error) => setError(error)
    );
  }, []);

  const fetchFilterableSubCategories = useCallback(
    async (parentId, threshold = 5) => {
      setError(null);
      await requestHandler(
        () => categoryApi.getFilterableSubCategories(parentId, threshold),
        setLoading,
        (response) => setFilterableSubCategories(response.data),
        (error) => setError(error)
      );
    },
    []
  );

  const createSubCategory = useCallback(async (parentId, data) => {
    setError(null);
    let success = false;
    await requestHandler(
      () => categoryApi.createSubCategory(parentId, data),
      setLoading,
      (response) => {
        setSubCategories((prev) => [...prev, response.data]);
        success = true;
      },
      (error) => setError(error)
    );
    return success;
  }, []);

  const contextValue = {
    topLevelCategories,
      subCategories,
    filterableSubCategories,
    loading,
    error,
    fetchTopLevelCategories,
    fetchSubCategories,
    createSubCategory,
    fetchFilterableSubCategories,
  };

  return (
    <CategoryContext.Provider value={contextValue}>
      {children}
    </CategoryContext.Provider>
  );
};

import React, { createContext, useContext, useState, useCallback } from "react";
import {
  createBlog,
  getBlog,
  getBlogs,
  updateBlogContent,
  updateBlogThumbnail,
  updateBlogTitle,
  updateBlogThumbnail,
  toggleBlogStatus,
  deleteBlog,
  restoreBlog,
  getUserBlogs,
} from "../apis/blog.api.js";
import { getReadHistory } from "../apis/user.api.js";
import { useAuth } from "./AuthContext.jsx";
import { requestHandler } from "../utils/index.js";
import Loader from "../components/Loader.jsx";

const BlogContext = createContext({
  allBlogs: [],
  currentBlog: null,
  userBlogs: [],
  readHistory: [],
  loading: false,
  loadingSingleBlog: false,
  error: null,
  pagination: {
    totalDocs: 0,
    page: 1,
    limit: 10,
    totalPages: 1,
    hasNextPage: false,
    hasPrevPage: false,
    nextPage: null,
  },
  userBlogsPagination: {
    totalDocs: 0,
    page: 1,
    limit: 10,
    totalPages: 1,
    hasNextPage: false,
    hasPrevPage: false,
    nextPage: null,
  },
  readHistoryPagination: {
    totalDocs: 0,
    page: 1,
    limit: 10,
    totalPages: 1,
    hasNextPage: false,
    hasPrevPage: false,
    nextPage: null,
  },
  fetchAllBlogs: async () => {},
  fetchSingleBlog: async () => {},
  createNewBlog: async () => {},
  updateBlogTitleAction: async () => {},
  updateBlogContentAction: async () => {},
  updateBlogThumbnailAction: async () => {},
  toggleBlogStatusAction: async () => {},
  deleteBlogAction: async () => {},
  restoreBlogAction: async () => {},
  fetchUserBlogs: async () => {},
  fetchReadHistory: async () => {},
  clearBlogError: () => {},
  clearCurrentBlog: () => {},
  clearAllBlogs: () => {},
  clearUserBlogs: () => {},
  clearReadHistory: () => {},
});

export const BlogProvider = ({ children }) => {
  const [allBlogs, setAllBlogs] = useState([]);
  const [currentBlog, setCurrentBlog] = useState(null);
  const [userBlogs, setUserBlogs] = useState([]);
  const [readHistory, setReadHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingSingleBlog, setLoadingSingleBlog] = useState(false);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState({
    totalDocs: 0,
    page: 1,
    limit: 10,
    totalPages: 1,
    hasNextPage: false,
    hasPrevPage: false,
    nextPage: null,
  });
  const [userBlogsPagination, setUserBlogsPagination] = useState({
    totalDocs: 0,
    page: 1,
    limit: 10,
    totalPages: 1,
    hasNextPage: false,
    hasPrevPage: false,
    nextPage: null,
  });
  const [readHistoryPagination, setReadHistoryPagination] = useState({
    totalDocs: 0,
    page: 1,
    limit: 10,
    totalPages: 1,
    hasNextPage: false,
    hasPrevPage: false,
    nextPage: null,
  });

  const { currentUser } = useAuth();
  const updatePagination = (data, setter) => {
    setter({
      totalDocs: data.totalDocs,
      limit: data.limit,
      page: data.page,
      totalPages: data.totalPages,
      hasNextPage: data.hasNextPage,
      hasPrevPage: data.hasPrevPage,
      nextPage: data.nextPage,
      prevPage: data.prevPage,
    });
  };

  const fetchAllBlogs = useCallback(async (params = {}) => {
    setError(null);
    await requestHandler(
      () => getBlogs(params),
      setLoading,
      (data) => {
        setAllBlogs(data.blogs);
        updatePagination(data, setPagination);
      },
      (err) => {
        setError(err);
        setAllBlogs([]);
        updatePagination({}, setPagination);
      }
    );
  }, []);

  const fetchSingleBlog = useCallback(async (blogId) => {
    setError(null);
    await requestHandler(
      () => getBlog(blogId),
      setLoadingSingleBlog,
      (data) => {
        setCurrentBlog(data);
      },
      (err) => {
        setError(err);
        setCurrentBlog(null);
      }
    );
  }, []);

  const createNewBlog = useCallback(async (blogData) => {
    setError(null);
    let success = false;
    await requestHandler(
      () => createBlog(blogData),
      setLoading,
      (data) => {
        // Optionally add the new blog to allBlogs or userBlogs if desired
        setAllBlogs((prev) => [data, ...prev]);
        setUserBlogs((prev) => [data, ...prev]);
        success = true;
      },
      (err) => {
        setError(err);
      }
    );
    return success; // Return success status for component to act on
  }, []);

  const updateBlogTitleAction = useCallback(async ({ blogId, newTitle }) => {
    setError(null);
    let success = false;
    await requestHandler(
      () => updateBlogTitle({ blogId, newTitle }),
      setLoading,
      (data) => {
        setCurrentBlog((prev) =>
          prev && prev._id === blogId ? { ...prev, title: newTitle } : prev
        );
        setAllBlogs((prev) =>
          prev.map((blog) =>
            blog._id === blogId ? { ...blog, title: newTitle } : blog
          )
        );
        setUserBlogs((prev) =>
          prev.map((blog) =>
            blog._id === blogId ? { ...blog, title: newTitle } : blog
          )
        );
        success = true;
      },
      (err) => {
        setError(err);
      }
    );
    return success;
  }, []);

  const updateBlogContentAction = useCallback(async ({ blogId, newContent }) => {
      setError(null);
      let success = false;
      await requestHandler(
        () => updateBlogContent({ blogId, newContent }),
        setLoading,
        (data) => {
          setCurrentBlog((prev) =>
            prev && prev._id === blogId
              ? { ...prev, content: newContent }
              : prev
          );
          success = true;
        },
        (err) => {
          setError(err);
        }
      );
      return success;
  }, []);
  
  const updateBlogThumbnailAction = useCallback(async ({ blogId, newThumbnailFile }) => {
      setError(null);
      let success = false;

      const formData = new FormData();
      if (newThumbnailFile) {
        formData.append("thumbnail", newThumbnailFile);
      } else {
        setError("No new thumbnail file provided.");
        return false;
      }

      await requestHandler(
        () => updateBlogThumbnail({ blogId, newThumbnail: formData }),
        setLoading,
        (data) => {
          const newThumbnailUrl = data.thumbnail;
          setCurrentBlog((prev) =>
            prev && prev._id === blogId
              ? { ...prev, thumbnail: newThumbnailUrl }
              : prev
          );
          setAllBlogs((prev) =>
            prev.map((blog) =>
              blog._id === blogId
                ? { ...blog, thumbnail: newThumbnailUrl }
                : blog
            )
          );
          setUserBlogs((prev) =>
            prev.map((blog) =>
              blog._id === blogId
                ? { ...blog, thumbnail: newThumbnailUrl }
                : blog
            )
          );
          success = true;
        },
        (err) => {
          setError(err);
        }
      );
      return success;
  }, []);
  
  const toggleBlogStatusAction = useCallback(async (blogId) => {
    setError(null);
    let success = false;
    await requestHandler(
      () => toggleBlogStatus(blogId),
      setLoading,
      (data) => {
        setCurrentBlog((prev) =>
          prev && prev._id === blogId
            ? {
                ...prev,
                isPublished: data.isPublished,
                status: data.status,
                updatedAt: data.updatedAt,
              }
            : prev
        );
        setAllBlogs((prev) =>
          prev.map((blog) =>
            blog._id === blogId
              ? {
                  ...blog,
                  isPublished: data.isPublished,
                  status: data.status,
                  updatedAt: data.updatedAt,
                }
              : prev
          )
        );
        setUserBlogs((prev) =>
          prev.map((blog) =>
            blog._id === blogId
              ? {
                  ...blog,
                  isPublished: data.isPublished,
                  status: data.status,
                  updatedAt: data.updatedAt,
                }
              : prev
          )
        );
        success = true;
      },
      (err) => {
        setError(err);
      }
    );
    return success;
  }, []);

  const deleteBlogAction = useCallback(async (blogId) => {
      setError(null);
      let success = false;
      await requestHandler(
        () => deleteBlog(blogId),
        setLoading,
        (data) => {
          setAllBlogs((prev) => prev.filter((blog) => blog._id !== blogId));
          setUserBlogs((prev) => prev.filter((blog) => blog._id !== blogId));
          if (currentBlog && currentBlog._id === blogId) {
            setCurrentBlog(null);
          }
          success = true;
        },
        (err) => {
          setError(err);
        }
      );
  }, [currentBlog]);
  
  const restoreBlogAction = useCallback(async (blogId) => {
      setError(null);
      let success = false;
      await requestHandler(
        () => restoreBlog(blogId),
        setLoading,
        async (data) => {
          success = true;
          if (currentBlog && currentBlog._id === blogId) {
            await fetchSingleBlog(blogId);
          }
          if (currentUser && currentUser._id) {
            await fetchUserBlogs({ userId: currentUser._id });
          }
        },
        (err) => {
          setError(err);
        }
      );
      return success;
  }, [currentBlog, currentUser, fetchSingleBlog, fetchUserBlogs, fetchAllBlogs]);
  
  const fetchUserBlogs = useCallback(async ({ userId, page = 1, limit = 10, sortBy = "createdAt", sortOrder = "desc",}) => {
      setError(null);
      await requestHandler(
        () => getUserBlogs({ userId, page, limit, sortBy, sortOrder }),
        setLoading,
        (data) => {
          setUserBlogs(data.blogs);
          updatePagination(data, setUserBlogsPagination);
        },
        (err) => {
          setError(err);
          setUserBlogs([]);
          updatePagination({}, setUserBlogsPagination);
        }
      );
  }, [updatePagination]);
  
  const fetchReadHistory = useCallback(async (params = { page: 1, limit: 10 }) => {
    setError(null);
    await requestHandler(
      () => getReadHistory(params.page, params.limit),
      setLoading,
      (data) => {
        setReadHistory(data.blogs);
        updatePagination(data, setReadHistoryPagination);
      },
      (err) => {
        setError(err);
        setReadHistory([]);
        updatePagination({}, setReadHistoryPagination);
      }
    )
  }, [updatePagination])

  const clearBlogError = useCallback(() => setError(null), []);

  const clearCurrentBlog = useCallback(() => setCurrentBlog(null), []);

  const clearAllBlogs = useCallback(() => {
    setAllBlogs([]);
    setPagination({ totalDocs: 0, page: 1, limit: 10, totalPages: 1, hasNextPage: false, hasPrevPage: false, nextPage: null, prevPage: null });
  }, []);

  const clearUserBlogs = useCallback(() => {
    setUserBlogs([]);
    setUserBlogsPagination({ totalDocs: 0, page: 1, limit: 10, totalPages: 1, hasNextPage: false, hasPrevPage: false, nextPage: null, prevPage: null });
  }, []);
  
  const clearReadHistory = useCallback(() => {
    setReadHistory([]);
    setReadHistoryPagination({ totalDocs: 0, page: 1, limit: 10, totalPages: 1, hasNextPage: false, hasPrevPage: false, nextPage: null, prevPage: null });
  }, []);

  const contextValue = {
    allBlogs,
    currentBlog,
    userBlogs,
    readHistory,
    loading,
    loadingSingleBlog,
    error,
    pagination,
    userBlogsPagination,
    readHistoryPagination,
    fetchAllBlogs,
    fetchSingleBlog,
    createNewBlog,
    updateBlogTitleAction,
    updateBlogContentAction,
    updateBlogThumbnailAction,
    toggleBlogStatusAction,
    deleteBlogAction,
    restoreBlogAction,
    fetchUserBlogs,
    fetchReadHistory,
    clearBlogError,
    clearCurrentBlog,
    clearAllBlogs,
    clearUserBlogs,
    clearReadHistory
  };
  
  if (loading || loadingSingleBlog) {
    return <Loader />
  }

  return (
    <BlogContext.Provider value={contextValue}>
      {children}
    </BlogContext.Provider>
  )
};

export const useBlogs = () => {
  return useContext(BlogContext);
}
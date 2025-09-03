import * as blogService from "../services/blog.service.ts";
import * as userService from "../services/user.service.ts";
import * as contextInterfaces from "../types/context.ts";
import * as apiInterfaces from "../types/api.ts";
import type { Blog } from "../types/api.ts";
import React, { createContext, useCallback, useContext, useState } from "react";
import { requestHandler } from "../lib/requestHandler.ts";
import { useAuth } from "./auth.tsx";

const BlogContext = createContext<contextInterfaces.IBlogContext | undefined>(
  undefined
);

export const useBlogs = () => {
  const context = useContext(BlogContext);
  if (!context) {
    throw new Error("useBlogs must be used within a BlogProvider.");
  }
  return context;
};

export const BlogProvider: React.FC<contextInterfaces.BlogProviderProps> = ({
  children,
}) => {
  const [allBlogs, setAllBlogs] = useState<Blog[]>([]);
  const [currentBlog, setCurrentBlog] = useState<Blog | null>(null);
  const [userBlogs, setUserBlogs] = useState<Blog[]>([]);
  const [readHistory, setReadHistory] = useState<Blog[]>([]);
  const [feedBlogs, setFeedBlogs] = useState<Blog[]>([]);
  const [feedPagination, setFeedPagination] =
    useState<apiInterfaces.PaginatedBlogResponse | null>(null);

  const [loading, setLoading] = useState<boolean>(false);
  const [loadingSingleBlog, setLoadingSingleBlog] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const [pagination] = useState<apiInterfaces.PaginatedBlogResponse | null>(
    null
  );
  const [userBlogsPagination, setUserBlogsPagination] =
    useState<apiInterfaces.PaginatedBlogResponse | null>(null);
  const [readHistoryPagination, setReadHistoryPagination] =
    useState<apiInterfaces.PaginatedBlogResponse | null>(null);

  const { currentUser } = useAuth();
  const updatePaginationState = useCallback(
    (
      data: apiInterfaces.PaginatedBlogResponse,
      setter: React.Dispatch<
        React.SetStateAction<apiInterfaces.PaginatedBlogResponse | null>
      >
    ) => {
      setter(data);
    },
    []
  );

  // const fetchAllBlogs = useCallback(
  //   async (params: apiInterfaces.GetBlogsParams = {}) => {
  //     await requestHandler(
  //       () => blogService.getBlogs(params),
  //       setLoading,
  //       (response) => {
  //         console.log(response);
  //         const { blogs } = response;
  //         // console.log(data);
  //         console.log(blogs);
  //         setAllBlogs(blogs);
  //         updatePaginationState(data, setPagination);
  //       },
  //       setError
  //     );
  //   },
  //   [updatePaginationState]
  // );

  const fetchSingleBlog = useCallback(async (blogId: string) => {
    await requestHandler(
      () => blogService.getBlog(blogId),
      setLoadingSingleBlog,
      (response) => {
        const { data } = response;
        setCurrentBlog(data);
      },
      setError
    );
  }, []);

  const createNewBlog = useCallback(async (blogData: FormData) => {
    let success = false;
    await requestHandler(
      () => blogService.createBlog(blogData),
      setLoading,
      (response) => {
        const { data } = response;
        setAllBlogs((prev) => [data, ...prev]);
        setUserBlogs((prev) => [data, ...prev]);
        success = true;
      },
      setError
    );
    return success;
  }, []);

  const updateBlogTitleAction = useCallback(
    async (payload: apiInterfaces.UpdateBlogTitlePayload) => {
      let success = false;
      await requestHandler(
        () => blogService.updateBlogTitle(payload),
        setLoading,
        () => {
          const updater = (blog: apiInterfaces.Blog) =>
            blog._id === payload.blogId
              ? { ...blog, title: payload.newTitle }
              : blog;
          setAllBlogs((prev) => prev.map(updater));
          setCurrentBlog((prev) =>
            prev?._id === payload.blogId ? updater(prev) : prev
          );
          success = true;
        },
        setError
      );
      return success;
    },
    []
  );

  const updateBlogContentAction = useCallback(
    async (payload: apiInterfaces.UpdateBlogContentPayload) => {
      let success = false;
      await requestHandler(
        () => blogService.updateBlogContent(payload),
        setLoading,
        () => {
          setCurrentBlog((prev) =>
            prev?._id === payload.blogId
              ? { ...prev, content: payload.newContent }
              : prev
          );
          success = true;
        },
        setError
      );
      return success;
    },
    []
  );

  const updateBlogThumbnailAction = useCallback(
    async (payload: apiInterfaces.UpdateBlogThumbnailPayload) => {
      let success = false;
      await requestHandler(
        () => blogService.UpdateBlogThumbnail(payload),
        setLoading,
        (response) => {
          const { data } = response;
          const updater = (blog: apiInterfaces.Blog) =>
            blog._id === payload.blogId
              ? { ...blog, thumbnail: data.thumbnail }
              : blog;
          setAllBlogs((prev) => prev.map(updater));
          setUserBlogs((prev) => prev.map(updater));
          setCurrentBlog((prev) =>
            prev?._id === payload.blogId ? updater(prev) : prev
          );
          success = true;
        },
        setError
      );
      return success;
    },
    []
  );

  const toggleBlogStatusAction = useCallback(async (blogId: string) => {
    let success = false;
    await requestHandler(
      () => blogService.toggleBlogStatus(blogId),
      setLoading,
      (response) => {
        const data = response.data;
        const updater = (blog: apiInterfaces.Blog): apiInterfaces.Blog =>
          blog._id === blogId
            ? {
                ...blog,
                isPublished: Boolean(data.isPublished),
                status: data.status as "draft" | "published" | "archived",
                updatedAt: data.updatedAt,
              }
            : blog;
        setAllBlogs((prev) => prev.map(updater));
        setUserBlogs((prev) => prev.map(updater));
        setCurrentBlog((prev) =>
          prev && prev._id === blogId ? updater(prev) : prev
        );
        success = true;
      },
      setError
    );
    return success;
  }, []);

  const fetchUserBlogs = useCallback(
    async (params: apiInterfaces.GetUserBlogsParams) => {
      await requestHandler(
        () => userService.getUserBlogs(params),
        setLoading,
        (response) => {
          const { data } = response;
          setUserBlogs(data.blogs);
          updatePaginationState(data, setUserBlogsPagination);
        },
        setError
      );
    },
    [updatePaginationState]
  );

  const deleteBlogAction = useCallback(
    async (blogId: string) => {
      let success = false;
      await requestHandler(
        () => blogService.deleteBlog(blogId),
        setLoading,
        () => {
          setAllBlogs((prev) => prev.filter((blog) => blog._id !== blogId));
          setUserBlogs((prev) => prev.filter((blog) => blog._id !== blogId));
          if (currentBlog && currentBlog._id === blogId) {
            setCurrentBlog(null);
          }
          success = true;
        },
        setError
      );
      return success;
    },
    [currentBlog]
  );

  const restoreBlogAction = useCallback(
    async (blogId: string) => {
      let success = false;
      await requestHandler(
        () => blogService.restoreBlog(blogId),
        setLoading,
        async () => {
          success = true;
          if (currentBlog && currentBlog._id === blogId) {
            await fetchSingleBlog(blogId);
          }
          if (currentUser && currentUser._id) {
            await fetchUserBlogs({ userId: currentUser._id });
          }
        },
        setError
      );
      return success;
    },
    [currentBlog, currentUser, fetchSingleBlog, fetchUserBlogs]
  );

  const fetchReadHistory = useCallback(
    async (params: apiInterfaces.PaginationParams = {}) => {
      await requestHandler(
        () => userService.getReadHistory(params),
        setLoading,
        (response) => {
          const { data } = response;
          setReadHistory(data.blogs);
          updatePaginationState(data, setReadHistoryPagination);
        },
        setError
      );
    },
    [updatePaginationState]
  );
  const fetchFollowingFeed = useCallback(
    async (params: apiInterfaces.GetBlogsParams = {}) => {
      await requestHandler(
        () => blogService.getFollowingFeed(params),
        setLoading,
        (response) => {
          // const { data } = response;
          setFeedBlogs(response.blogs);
          updatePaginationState(response, setFeedPagination);
        },
        setError
      );
    },
    [updatePaginationState]
  );

  const contextValue: contextInterfaces.IBlogContext = {
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
    feedBlogs,
    feedPagination,
    // fetchAllBlogs,
    fetchSingleBlog,
    createNewBlog,
    updateBlogTitleAction,
    updateBlogContentAction,
    updateBlogThumbnailAction,
    fetchUserBlogs,
    fetchReadHistory,
    toggleBlogStatusAction,
    deleteBlogAction,
    restoreBlogAction,

    fetchFollowingFeed,
  };

  return (
    <BlogContext.Provider value={contextValue}>{children}</BlogContext.Provider>
  );
};

import { createContext, useCallback, useContext } from "react";
import { requestHandler } from "../utils";

import * as userfollowApi from "../apis/userfollow.api.js";
import * as likeApi from "../apis/like.api.js";
import * as commentApi from "../apis/comment.api.js";
import * as saveApi from "../apis/save.api.js";

const SocialContext = createContext({
  comments: [],
  followers: [],
  following: [],
  collections: [],
  likedByUsers: [],
  loading: false,
  error: null,

  //comments
  fetchComments: async (blogId) => {},
  addComment: async (blogId, content) => {},
  deleteComment: async (commentId) => {},

  //likes
  toggleBlogLike: async (blogId) => false,
  toggleCommentLike: async (commentId) => false,
  fetchUsersWhoLikedBlog: async (blogId) => {},
  fetchUsersWhoLikedComment: async (commentId) => {},

  //follows
  toggleFollowUser: async (userId) => false,
  fetchFollowers: async (userId) => {},
  fetchFollowing: async (userId) => {},

  //Saves
  createSaveCollection: async (data) => false,
  fetchCollections: async () => {},
  toggleSaveToCollection: async (collectionId, blogId) => {},
  updateSaveCollection: async (collectionId, data) => false,
  deleteSaveCollection: async (collectionId) => false,
});

export const useSocial = () => {
  const context = useContext(SocialContext);
  if (!context) {
    throw new Error("useSocial must be used within a SocialProvider");
  }
  return context;
};

export const SocialProvider = ({ children }) => {
  //   const { currentUser } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [comments, setComments] = useState([]);
  const [followers, setFollowers] = useState([]);
  const [following, setFollowing] = useState([]);
  const [collections, setCollections] = useState([]);
  const [likedByUsers, setLikedByUsers] = useState([]);

  //comment functions
  const fetchComments = useCallback(async (blogId) => {
    await requestHandler(
      () => commentApi.getBlogComments(blogId),
      setLoading,
      (response) => setComments(response.data.docs || []),
      setError
    );
  }, []);

  const addComment = useCallback(async (blogId, content) => {
    let success = false;
    await requestHandler(
      () => commentApi.addCommentToBlogs(blogId, { content }),
      setLoading,
      (response) => {
        setComments((prev) => [response.data, ...prev]);
        success = true;
      },
      setError
    );
    return success;
  }, []);

  const deleteComment = useCallback(async (commentId) => {
    let success = false;
    await requestHandler(
      () => commentApi.deleteComment(commentId),
      setLoading,
      () => {
        setComments((prev) => prev.filter((c) => c._id !== commentId));
        success = true;
      },
      setError
    );
    return success;
  }, []);

  //like functions
  const toggleBlogLike = useCallback(async (blogId) => {
    let likedStatus = false;
    await requestHandler(
      () => likeApi.toggleBlogLike(blogId),
      null,
      (response) => (likedStatus = response.data.liked),
      setError
    );
    return likedStatus;
  }, []);

  const toggleCommentLike = useCallback(async (commentId) => {
    let likedStatus = false;
    await requestHandler(
      () => likeApi.toggleCommentLike(commentId),
      null,
      (response) => (likedStatus = response.data.liked),
      setError
    );
    return likedStatus;
  }, []);

  const fetchUsersWhoLikedBlog = useCallback(async (blogId) => {
    await requestHandler(
      () => likeApi.getBlogLikes(blogId),
      setLoading,
      (response) => setLikedByUsers(response.data),
      setError
    );
  }, []);

  const fetchUsersWhoLikedComment = useCallback(async (commentId) => {
    await requestHandler(
      () => likeApi.getCommentLikes(commentId),
      setLoading,
      (response) => setLikedByUsers(response.data),
      setError
    );
  }, []);

  // Follow action function
  const toggleFollowUser = useCallback(async (userId) => {
    let followStatus = false;
    await requestHandler(
      () => userfollowApi.toggleFollow(userId),
      null,
      (response) => (followStatus = response.data.followed),
      setError
    );
    return followStatus;
  }, []);
  const fetchFollowers = useCallback(async (userId) => {
    await requestHandler(
      () => userfollowApi.getUserFollowers(userId),
      setLoading,
      (response) => setFollowers(response.data),
      setError
    );
  }, []);

  const fetchFollowing = useCallback(async (userId) => {
    await requestHandler(
      () => userfollowApi.getUserFollowing(userId),
      setLoading,
      (response) => setFollowing(response.data),
      setError
    );
  }, []);

  // Save action function
  const createSaveCollection = useCallback(async (data) => {
    let success = false;
    await requestHandler(
      () => saveApi.createSaveCollection(data),
      setLoading,
      (response) => {
        setCollections((prev) => [...prev, response.data]);
      },
      setError
    );
    return success;
  }, []);

  const fetchCollections = useCallback(async () => {
    await requestHandler(
      () => saveApi.getUserCollections(),
      setLoading,
      (response) => setCollections(response.data),
      setError
    );
  }, []);

  const toggleSaveToCollection = useCallback(async (collectionId, blogId) => {
    await requestHandler(
      () => saveApi.toggleBlogInCollection(collectionId, blogId),
      null,
      (response) => {
        setCollections((prev) =>
          prev.map((c) =>
            c._id === collectionId ? response.data.collection : c
          )
        );
      },
      setError
    );
  }, []);

  const updateSaveCollection = useCallback(async (collectionId, data) => {
    let success = false;
    await requestHandler(
      () => saveApi.updateSaveCollection(collectionId, data),
      setLoading,
      (response) => {
        setCollections((prev) =>
          prev.map((c) => (c._id === collectionId ? response.data : c))
        );
      },
      setError
    );
    return success;
  }, []);

  const deleteSaveCollection = useCallback(async (collectionId) => {
    let success = false;
    await requestHandler(
      () => saveApi.deleteSaveCollection(collectionId),
      setLoading,
      () => {
        setCollections((prev) => prev.filter((c) => c._id !== collectionId));
        success = true;
      }
    );
    return success;
  }, []);

  const contextValue = {
    loading,
    error,
    comments,
    followers,
    following,
    collections,
    likedByUsers,
    fetchComments,
    addComment,
    deleteComment,
    toggleBlogLike,
    toggleCommentLike,
    fetchUsersWhoLikedBlog,
    fetchUsersWhoLikedComment,
    toggleFollowUser,
    fetchFollowers,
    fetchFollowing,
    createSaveCollection,
    fetchCollections,
    toggleSaveToCollection,
    updateSaveCollection,
    deleteSaveCollection,
    };
    
    return (
        <SocialContext.Provider value={contextValue}>
            {children}
        </SocialContext.Provider>
    )
};

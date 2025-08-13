import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { useNavigate } from "react-router-dom";
import {
  registerUser,
  loginUser,
  logoutUser,
  refreshAccessToken,
  changeCurrentPassword,
  getCurrentUser,
  updateUserFullName,
  updateUserEmail,
  updateUserAvatar,
  updateUserCoverImage,
} from "../apis/user.api.js";
import Loader from "../components/Loader.jsx";
import { LocalStorage, requestHandler } from "../utils/index.js";

const AuthContext = createContext({
  currentUser: null,
  isAuthenticated: false,
  loading: false,
  error: null,
  isAuthReady: false,
  login: async () => {},
  register: async () => {},
  logout: async () => {},
  refreshAuthToken: async () => {},
  changePassword: async () => {},
  fetchCurrentUser: async () => {},
  updateProfile: async () => {},
  clearAuthError: () => {},
});

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isAuthReady, setIsAuthReady] = useState(false);

  const navigate = useNavigate();

  //Helper Function to clear auth State
  const clearAuthState = useCallback(() => {
    setCurrentUser(null);
    setIsAuthenticated(false);
    LocalStorage.remove("token");
    LocalStorage.remove("user");
  }, []);

  const login = useCallback(
    async (credentials) => {
      setError(null);
      await requestHandler(
        // loginUser(credentials),
        () => loginUser(credentials),
        setLoading,
        (data) => {
          setCurrentUser(data.data.user);
          setIsAuthenticated(true);
          LocalStorage.set("token", data.data.accessToken);
          LocalStorage.set("user", data.data.user);
          navigate("/");
        },
        (err) => {
          setError(err);
          clearAuthState();
        }
      );
    },
    [navigate, clearAuthState]
  );
  const register = useCallback(
    async (userData) => {
      setError(null);
      await requestHandler(
        () => registerUser(userData),
        setLoading,
        (data) => {
          setCurrentUser(data.data);
          setIsAuthenticated(true);
          LocalStorage.set("user", data.data);
          navigate("/");
        },
        (err) => {
          setError(err);
          clearAuthState();
        }
      );
    },
    [navigate, clearAuthState]
  );
  const logout = useCallback(async () => {
    setError(null);
    await requestHandler(
      () => logoutUser(),
      setLoading,
      () => {
        clearAuthState();
        navigate("/login");
      },
      (err) => {
        setError(err);
        clearAuthState();
        navigate("/login");
      }
    );
  }, [navigate, clearAuthState]);
  const refreshAuthToken = useCallback(async () => {
    setError(null);
    await requestHandler(
      () => refreshAccessToken(),
      setLoading,
      (data) => {
        LocalStorage.set("token", data.data.accessToken);
        fetchCurrentUser();
      },
      (err) => {
        setError(err);
        clearAuthState();
        navigate("/login");
      }
    );
  }, [navigate, clearAuthState, fetchCurrentUser]);
  const fetchCurrentUser = useCallback(async () => {
    setError(null);
    await requestHandler(
      () => getCurrentUser(),
      setLoading,
      (data) => {
        setCurrentUser(data.data);
        setIsAuthenticated(true);
        LocalStorage.set("user", data.data);
      },
      (err) => {
        setError(err);
        clearAuthState();
      }
    );
  }, [clearAuthState]);
  const changePassword = useCallback(async (passwordData) => {
    await requestHandler(
      () => changeCurrentPassword(passwordData),
      setLoading,
      (data) => {
        console.log(data.message);
      },
      (err) => {
        setError(err);
      }
    );
  }, []);
  const updateProfile = useCallback(
    async (updateData) => {
      setError(null);
      let apiCall;
      let successMessage = "Profile updated successfully!";

      if (updateData.fullName) {
        apiCall = () => updateUserFullName({ fullName: updateData.fullName });
      } else if (updateData.email) {
        apiCall = () => updateUserEmail({ email: updateData.email });
      } else if (updateData.avatar instanceof File) {
        const formData = new FormData();
        formData.append("avatar", updateData.avatar);
        apiCall = () => updateUserAvatar(formData);
        successMessage = "Avatar updated successfully!";
      } else if (updateData.coverImage instanceof File) {
        const formData = new FormData();
        formData.append("coverImage", updateData.coverImage);
        apiCall = () => updateUserCoverImage(formData);
        successMessage = "Cover image updated successfully!";
      } else {
        setError("No valid profile update data provided.");
        return;
      }

      await requestHandler(
        apiCall,
        setLoading,
        async (data) => {
          await fetchCurrentUser();
          console.log(successMessage);
        },
        (err) => {
          setError(err);
        }
      );
    },
    [fetchCurrentUser]
  );
  const clearAuthError = useCallback(() => {
    setError(null);
  }, []);

  useEffect(() => {
    const token = LocalStorage.get("token");
    const user = LocalStorage.get("user");

    const initializeAuth = async () => {
      if (token && user) {
        await fetchCurrentUser();
      } else {
        clearAuthState();
      }
      setLoading(false);
      setIsAuthReady(true);
    };

    initializeAuth();
  }, [fetchCurrentUser, clearAuthState]);

  const contextValue = {
    currentUser,
    isAuthenticated,
    loading,
    error,
    isAuthReady,
    login,
    register,
    logout,
    refreshAuthToken,
    changePassword,
    fetchCurrentUser,
    updateProfile,
    clearAuthError,
  };

  if (loading && !isAuthReady) {
    return <Loader />;
  }

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};

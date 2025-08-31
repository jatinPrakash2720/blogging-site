import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from "react";
import { useNavigate } from "react-router-dom";
import * as userService from "../services/user.service.ts";
import Loader from "../components/ui/Loader.js";
import { LocalStorage, requestHandler } from "../lib/index.ts";
import type { IAuthContext, AuthProviderProps } from "../types/context.ts";
import type {
  ChangePasswordData,
  ForgotPasswordPayload,
  LoginCredentials,
  ResetPasswordPayload,
  User,
} from "../types/api.ts";

const AuthContext = createContext<IAuthContext | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("UseAuth must be used within an AuthProvider.");
  }
  return context;
};

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isAuthReady, setIsAuthReady] = useState<boolean>(false);

  const navigate = useNavigate();

  const clearAuthState = useCallback(() => {
    setCurrentUser(null);
    setIsAuthenticated(false);
    LocalStorage.remove("token");
    LocalStorage.remove("user");
  }, []);

  const fetchCurrentUser = useCallback(async () => {
    await requestHandler(
      () => userService.getCurrentUser(),
      null,
      (response) => {
        const user = response.data;
        setCurrentUser(user);
        setIsAuthenticated(true);
        LocalStorage.set("user", user);
      },
      () => {
        clearAuthState();
      }
    );
  }, [clearAuthState]);

  useEffect(() => {
    const token = LocalStorage.get("token");
    const initializeAuth = async () => {
      if (token) {
        await fetchCurrentUser();
      }
      setLoading(false);
      setIsAuthReady(true);
    };
    initializeAuth();
  }, [fetchCurrentUser]);

  const login = useCallback(
    async (credentials: LoginCredentials) => {
      await requestHandler(
        () => userService.loginUser(credentials),
        setLoading,
        (response: { user: User; accessToken: string }) => {
          const { user, accessToken } = response;
          setCurrentUser(user);

          setIsAuthenticated(true);

          LocalStorage.set("token", accessToken);

          LocalStorage.set("user", user);

          navigate("/");
        },
        setError
      );
    },
    [navigate]
  );

  const register = useCallback(
    async (userData: FormData) => {
      await requestHandler(
        () => userService.registerUser(userData),
        setLoading,
        () => {
          navigate("/auth/login");
        },
        setError
      );
    },
    [navigate]
  );

  const logout = useCallback(async () => {
    await requestHandler(
      () => userService.logoutUser(),
      setLoading,
      () => {
        clearAuthState();
        navigate("/auth/login");
      },
      (error) => {
        clearAuthState();
        navigate("/auth/login");
        setError(error);
      }
    );
  }, [navigate, clearAuthState]);

  const refreshAuthToken = useCallback(async () => {
    await requestHandler(
      () => userService.refreshAccessToken(),
      setLoading,
      (response) => {
        const { data } = response;
        LocalStorage.set("token", data.accessToken);
        fetchCurrentUser();
      },
      (error) => {
        setError(error);
        clearAuthState();
        navigate("/auth/login");
      }
    );
  }, [navigate, clearAuthState, fetchCurrentUser]);

  const changePassword = useCallback(
    async (passwordData: ChangePasswordData) => {
      await requestHandler(
        () => userService.changeCurrentPassword(passwordData),
        setLoading,
        () => {},
        setError
      );
    },
    []
  );

  const updateProfile = useCallback(
    async (updateData: FormData | { fullName?: string; email?: string }) => {
      const getApiCall = () => {
        if (updateData instanceof FormData) {
          if (updateData.has("avatar"))
            return () => userService.updateUserAvatar(updateData);
          if (updateData.has("coverImage"))
            return () => userService.updateUserCoverImage(updateData);
        } else {
          if (updateData.fullName)
            return () =>
              userService.updateUserFullName({
                fullName: updateData.fullName!,
              });
          if (updateData.email)
            return () =>
              userService.updateUserEmail({ email: updateData.email! });
        }
        throw new Error("Invalid update data provided.");
      };
      await requestHandler(
        getApiCall() as () => Promise<any>,
        setLoading,
        (response: User | {}) => {
          if (response && "_id" in response) {
            const updatedUser = response as User;
            setCurrentUser(updatedUser);
            LocalStorage.set("user", updatedUser);
          } else {
            fetchCurrentUser();
          }
        },
        setError
      );
    },
    [fetchCurrentUser]
  );

  const forgotPassword = useCallback(async (payload: ForgotPasswordPayload) => {
    let success = false;
    await requestHandler(
      () => userService.forgotPassword(payload),
      setLoading,
      () => {
        success = true;
      },
      setError
    );
    return success;
  }, []);

  const restorePassword = useCallback(
    async (token: string, payload: ResetPasswordPayload) => {
      let success = false;
      await requestHandler(
        () => userService.restorePassword(token, payload),
        setLoading,
        () => {
          success = true;
          navigate("/auth/login");
        },
        setError
      );
      return success;
    },
    [navigate]
  );

  const clearAuthError = useCallback(() => {
    setError(null);
  }, []);

  const contextValue: IAuthContext = {
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
    updateProfile,
    forgotPassword,
    restorePassword,
    clearAuthError,
  };

  if (!isAuthReady) {
    return <Loader />;
  }

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

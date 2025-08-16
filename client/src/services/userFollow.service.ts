import { apiClient } from "../lib/apiConfig.ts";
import type { User, FollowToggleResponse } from "../types/api.ts";
import type { ApiResponse } from "../types/apiResponse.ts";

export const toggleFollow = (userIdToFollow: string) => {
  return apiClient.post<ApiResponse<{ data: FollowToggleResponse }>>(
    `/follow/toggle/${userIdToFollow}`
  );
};

export const getUserFollowers = (userId: string) => {
  return apiClient.get<ApiResponse<{ data: User[] }>>(
    `/follow/followers/${userId}`
  );
};

export const getUserFollowing = (userId: string) => {
  return apiClient.get<ApiResponse<{ data: User[] }>>(
    `/follow/following/${userId}`
  );
};

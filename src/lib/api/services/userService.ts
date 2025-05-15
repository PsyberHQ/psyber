import apiClient from '../client';
import { Endpoints } from '../config';
import { UserData } from '@/types/api';

/**
 * User service for managing user profile and data
 */
export const userService = {
  /**
   * Get the current user's profile
   */
  async getCurrentUser(): Promise<UserData> {
    return await apiClient.get<UserData>(Endpoints.ME);
  },

  /**
   * Update the current user's profile
   */
  async updateProfile(userData: Partial<UserData>): Promise<UserData> {
    return await apiClient.put<UserData>(Endpoints.UPDATE_ME, userData);
  },

  /**
   * Delete user account
   */
  async deleteAccount(): Promise<any> {
    return await apiClient.delete(Endpoints.DELETE_ACCOUNT);
  },

  /**
   * Upload a file (profile picture or other)
   */
  async uploadFile(file: File, type: 'profile' | 'other'): Promise<{ file_url: string }> {
    return await apiClient.uploadFile<{ file_url: string }>(Endpoints.UPLOAD_FILE, file, type);
  }
};
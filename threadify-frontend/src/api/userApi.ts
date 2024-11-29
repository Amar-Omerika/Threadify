import apiClient from './apiClient';
import { UserInfo } from '../interfaces/UserInterface';

export const register = async (userInfo: UserInfo) => {
  try {
    const response = await apiClient.post('/users/register', userInfo);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const login = async (email: string, password: string) => {
  try {
    const response = await apiClient.post('/users/login', { email, password });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getUsersWithTopComments = async (): Promise<UserInfo[]> => {
  try {
    const response = await apiClient.get(`/users/top-commenters`);
    return response.data;
  } catch (error) {
    console.error('Error fetching hot topics:', error);
    throw error;
  }
};

export const getUserInfo = async (): Promise<UserInfo> => {
  try {
    const response = await apiClient.get('/users/me');
    return response.data;
  } catch (error) {
    console.error('Error fetching user info:', error);
    throw error;
  }
};

export const updateUserInfo = async (
  userInfo: Partial<UserInfo>,
): Promise<UserInfo> => {
  try {
    const response = await apiClient.put('/users/me', userInfo);
    return response.data;
  } catch (error) {
    console.error('Error updating user info:', error);
    throw error;
  }
};

export const changeUserPassword = async (
  newPassword: string,
): Promise<void> => {
  try {
    await apiClient.put('/users/me/password', { newPassword });
  } catch (error) {
    console.error('Error changing user password:', error);
    throw error;
  }
};

export const deleteUserAccount = async (): Promise<void> => {
  try {
    await apiClient.delete('/users/me');
  } catch (error) {
    console.error('Error deleting user account:', error);
    throw error;
  }
};

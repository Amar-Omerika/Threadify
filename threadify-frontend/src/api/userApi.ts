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

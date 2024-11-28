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

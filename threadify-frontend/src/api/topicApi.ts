import apiClient from './apiClient';
import { Topic } from '../interfaces/TopicInterface';

export const getAllTopics = async (
  page: number = 1,
  pageSize: number = 20,
): Promise<Topic[]> => {
  try {
    const response = await apiClient.get(
      `/topics?page=${page}&pageSize=${pageSize}`,
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching topics:', error);
    throw error;
  }
};

export const getHotTopics = async (): Promise<Topic[]> => {
  try {
    const response = await apiClient.get(`/topics/hot`);
    return response.data;
  } catch (error) {
    console.error('Error fetching hot topics:', error);
    throw error;
  }
};

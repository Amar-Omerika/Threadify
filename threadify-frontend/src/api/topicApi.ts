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

export const getOneTopic = async (id: number): Promise<Topic[]> => {
  try {
    const response = await apiClient.get(`/topics/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching hot topics:', error);
    throw error;
  }
};

export const likeTopic = async (id: number) => {
  try {
    const response = await apiClient.post(`/likes/like-topic`, { topicId: id });
    return response.data;
  } catch (error) {
    console.error('Error liking topic', error);
    throw error;
  }
};

export const disLikeTopic = async (id: number) => {
  try {
    const response = await apiClient.post(`/likes/dislike-topic`, {
      topicId: id,
    });
    return response.data;
  } catch (error) {
    console.error('Error disliking topic', error);
    throw error;
  }
};

export const deleteTopic = async (id: number) => {
  try {
    const response = await apiClient.delete(`/topics/${id}`, {
      topicId: id,
    });
    return response.data;
  } catch (error) {
    console.error('Error disliking topic', error);
    throw error;
  }
};

export const updateTopic = async (
  id: number,
  data: { title: string; description: string },
) => {
  try {
    const response = await apiClient.put(`/topics/${id}`, data);
    return response.data;
  } catch (error) {
    console.error('Error updating topic', error);
    throw error;
  }
};

export const getUserTopics = async (): Promise<Topic[]> => {
  try {
    const response = await apiClient.get(`/topics//user/topics`);
    return response.data;
  } catch (error) {
    console.error('Error fetching hot topics:', error);
    throw error;
  }
};

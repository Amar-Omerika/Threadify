import apiClient from './apiClient';
import { Comment } from '../interfaces/TopicInterface';

interface UpdateCommentInterface {
  id: number;
  content: string;
}

export const addComment = async (
  payload: UpdateCommentInterface,
): Promise<Comment> => {
  try {
    const response = await apiClient.post(`/comments`, {
      topicId: payload.id,
      content: payload.content,
    });
    return response.data;
  } catch (error) {
    console.error('Error updating comment', error);
    throw error;
  }
};

export const updateComment = async (
  payload: UpdateCommentInterface,
): Promise<Comment> => {
  try {
    const response = await apiClient.put(`/comments/${payload.id}`, {
      content: payload.content,
    });
    return response.data;
  } catch (error) {
    console.error('Error updating comment', error);
    throw error;
  }
};

export const deleteComment = async (id: number): Promise<void> => {
  try {
    await apiClient.delete(`/comments/${id}`);
  } catch (error) {
    console.error('Error deleting comment', error);
    throw error;
  }
};

export const likeComment = async (id: number) => {
  try {
    const response = await apiClient.post(`/likes/like-comment`, {
      commentId: id,
    });
    return response.data;
  } catch (error) {
    console.error('Error liking comment', error);
    throw error;
  }
};

export const disLikeComment = async (id: number) => {
  try {
    const response = await apiClient.post(`/likes/dislike-comment`, {
      commentId: id,
    });
    return response.data;
  } catch (error) {
    console.error('Error disliking comment', error);
    throw error;
  }
};

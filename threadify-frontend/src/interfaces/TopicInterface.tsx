export interface Author {
  firstName: string;
  lastName: string;
  avatarUrl: string;
}

export interface Like {
  id: number;
  createdAt: string;
  userId: number;
  topicId: number;
  commentId: number | null;
}

export interface Count {
  likes: number;
}

export interface Comment {
  id: number;
  content: string;
  createdAt: string;
  updatedAt: string;
  authorId: number;
  topicId: number;
  author: Author;
  _count: Count;
  likes: Like[];
  isLikedByUser: boolean;
  isAuthoredByUser: boolean;
  authorName: string;
}

export interface Topic {
  id: number;
  title: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  authorId: number;
  author: Author;
  comments: Comment[];
  likes: Like[];
  isLikedByUser: boolean;
  authorName: string;
  isAuthoredByUser: boolean;
  _count: any;
}
